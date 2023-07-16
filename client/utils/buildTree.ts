// Recursive function to convert linear data to hierarchical structure
import { type NodeTree } from 'types/node';

export const buildTree = (data: NodeTree[], parent: NodeTree | null = null) => {
  const tree = [];

  for (const node of data) {
    // node.isActive = !node.parent;
    // node.isVisible = true;
    if (node.parent === parent) {
      const children: NodeTree[] = buildTree(data, node);
      if (children.length > 0) {
        node.children = children;
        children.map(child => child.parent = node)
      }
      tree.push(node);
    }
  }
  return tree;
};

