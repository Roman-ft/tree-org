from node import Node


# Create nodes for the company hierarchy
root = Node(id=1, name='CEO', is_manager=True, department='Executive')
cto = Node(id=2, name='CTO', is_manager=True, department='Technology')
coo = Node(id=3, name='COO', is_manager=True, department='Operations')
developer1 = Node(id=4, name='Developer1', is_developer=True, programming_language='Python')
developer2 = Node(id=5, name='Developer2', is_developer=True, programming_language='JavaScript')

# Build the company hierarchy
root.add_child(cto)
root.add_child(coo)
cto.add_child(developer1)
cto.add_child(developer2)

# Generate and add more developers
for i in range(6, 16):
    developer = Node(id=i, name=f'Developer{i}', is_developer=True, programming_language='Python' if i % 2 == 0 else 'JavaScript')
    cto.add_child(developer)