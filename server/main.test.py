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


if __name__ == '__main__':
    unittest.main()
