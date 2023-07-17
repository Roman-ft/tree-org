from models.node import Node

# Create nodes for the company hierarchy
root = Node(id=1, name='CEO', is_manager=True, department='Executive')
cto = Node(id=2, name='CTO', is_manager=True, department='Technology')
coo = Node(id=3, name='COO', is_manager=True, department='Operations')
cfo = Node(id=11123, name='CFO', is_manager=True, department='Finance')
developer1 = Node(id=4, name='Developer1', is_developer=True, programming_language='Python')
developer2 = Node(id=5, name='Developer2', is_developer=True, programming_language='JavaScript')
dev_manager = Node(id=3374, name='Developer Manager', is_developer=True, programming_language='JavaScript')
dev_dev_manager = Node(id=3375, name='Developer Managed by Manager', is_developer=True, programming_language='Ruby')
person = Node(id=17, name="Manager Mark")

# Build the company hierarchy
root.add_child(cto)
root.add_child(coo)
root.add_child(cfo)
cto.add_child(developer1)
cto.add_child(developer2)
cto.add_child(dev_manager)
dev_manager.add_child(dev_dev_manager)
coo.add_child(person)

# Generate and add more developers
for i in range(6, 16):
    developer = Node(id=i, name=f'Developer{i}', is_developer=True,
                     programming_language='Python' if i % 2 == 0 else 'JavaScript')
    cto.add_child(developer)
