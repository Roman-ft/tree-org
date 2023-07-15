
def find_node(node, node_id):
    if node.id == node_id:
        return node

    for child in node.children:
        found_node = find_node(child, node_id)
        if found_node:
            return found_node

    return None
