import { NodeTree as NodeTreeType } from "@/types/node";
import {
  HORIZONTAL_SPACING,
  NODE_HEIGHT,
  NODE_WIDTH,
  VERTICAL_SPACING,
} from "@/components/TreeOrg/TreeOrg.types";

export const calculateChildrenLayout = (
  node: NodeTreeType,
  x = 0,
  y = 0,
  number = 0
) => {
  node.x = x;

  node.y = node.children
    ? (node.parent?.y || 0) + NODE_HEIGHT + VERTICAL_SPACING
    : y;

  if (node.children) {
    node.x =
      node.x +
      (calculateLeftSiblingSubtreeWidth(node) + 1) *
        (NODE_WIDTH + HORIZONTAL_SPACING);
    let childX = node.x;
    let childY = node.y;

    node.children.forEach((child, index) => {
      childY += child.children ? 0 : NODE_HEIGHT + VERTICAL_SPACING;
      calculateChildrenLayout(child, childX, childY, number);
    });
  }
};

const calculateLeftSiblingSubtreeWidth = (node: NodeTreeType): number => {
  if (!node.parent || !node.parent.children) {
    return 0;
  }

  let currentIndex = node.parent.children.indexOf(node);
  let leftSiblingSubtreeWidth = 0;
  for (let i = 0; i < currentIndex; i++) {
    leftSiblingSubtreeWidth += calculateSubtreeWidth(node.parent.children[i]);
  }

  return leftSiblingSubtreeWidth;
};

const calculateSubtreeWidth = (node: NodeTreeType): number => {
  if (!node.children || node.children.length === 0) {
    return 0;
  }

  let subtreeWidth = 1;
  node.children.forEach((child) => {
    subtreeWidth += calculateSubtreeWidth(child);
  });

  return subtreeWidth;
};
