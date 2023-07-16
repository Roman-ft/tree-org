from fastapi.testclient import TestClient
import unittest
from main import app  # assuming the FastAPI app is defined in a file named main.py
from test_data import root


class TestFastAPI(unittest.TestCase):

    def setUp(self):
        self.client = TestClient(app)

    def test_root_children(self):
        response = self.client.get("/children/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), len(root.children))

    def test_node_children(self):
        # Test for a node that has children
        response = self.client.get("/children/?parent_id=2")
        self.assertEqual(response.status_code, 200)

        parent_node = root.children[0]
        self.assertEqual(len(response.json()), len(parent_node.children))

    def test_nonexistent_node(self):
        response = self.client.get("/children/?parent_id=100")
        self.assertEqual(response.status_code, 404)

    def test_add_node(self):
        # Define new node data
        new_node_data = {
            "id": 1000,
            "name": "NewNode",
            "is_manager": False,
            "department": None,
            "is_developer": True,
            "programming_language": "Python",
            "height": 0,
        }

        # Make a POST request to the add_node API endpoint
        response = self.client.post("/node/2", json=new_node_data)

        # Verify that the status code of the response is 200
        assert response.status_code == 200

        # Verify that the response contains the expected success message
        assert response.json() == {"message": "Node added successfully"}

    def test_change_parent(self):
        # Initial setup for your test case
        initial_node_id = 4  # Assuming 'Developer1' wants to change its parent
        new_parent_id = 1  # Assuming 'CEO' will be the new parent
        payload = {"new_parent_id": new_parent_id}

        # Make request to the API
        response = self.client.put(f"/node/{initial_node_id}/change_parent", json=payload)

        # Assert that the response status code is correct
        assert response.status_code == 200, f"Expected status code 200 but got {response.status_code}"

        # Assert that the response data is correct
        assert response.json() == {"message": "Parent changed successfully"}

        # Let's check if we can create a cycle, which should be prevented
        payload = {"new_parent_id": initial_node_id}
        response = self.client.put(f"/node/{new_parent_id}/change_parent", json=payload)
        assert response.status_code == 400, "API allowed a cycle to be created"


if __name__ == '__main__':
    unittest.main()
