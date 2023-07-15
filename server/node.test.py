import unittest
from node import Node


class TestNode(unittest.TestCase):

    def test_node_creation(self):
        node = Node(id=0, name='George Washington', is_manager=True, department='Presidency')
        self.assertEqual(node.name, 'George Washington')
        self.assertEqual(node.is_manager, True)
        self.assertEqual(node.department, 'Presidency')
        self.assertEqual(node.height, 0)

    def test_add_child(self):
        parent = Node(id=0, name='Marie Curie', is_manager=True, department='Physics')
        child = Node(id=1, name='Pierre Curie', is_developer=True, programming_language='Physics')
        parent.add_child(child)
        self.assertEqual(child.parent, parent)
        self.assertEqual(child.height, 1)
        self.assertEqual(parent.children[0], child)

    def test_change_parent(self):
        parent1 = Node(id=0, name='Grace Hopper', is_manager=True, department='Computer Science')
        parent2 = Node(id=1, name='Alan Turing', is_manager=True, department='Mathematics')
        child = Node(id=2, name='Ada Lovelace', is_developer=True, programming_language='Babbage Engine')
        parent1.add_child(child)
        child.change_parent(parent2)
        self.assertEqual(child.parent, parent2)
        self.assertEqual(child.height, 1)

    def test_no_cycles(self):
        ceo = Node(id=1, name='CEO', is_manager=True, department='Executive')
        cto = Node(id=2, name='CTO', is_manager=True, department='Technology')

        # Adding child should work fine
        ceo.add_child(cto)

        # Trying to create cycle should raise an error
        with self.assertRaises(ValueError):
            cto.add_child(ceo)

    def test_no_multiple_roots(self):
        ceo1 = Node(id=1, name='CEO1', is_manager=True, department='Executive')
        ceo2 = Node(id=2, name='CEO2', is_manager=True, department='Executive')

        # Adding first root should work fine
        ceo1.add_child(ceo2)

        # Trying to add second root should raise an error
        with self.assertRaises(ValueError):
            ceo2.change_parent(ceo1)


if __name__ == '__main__':
    unittest.main()
