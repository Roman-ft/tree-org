import { calculateChildrenLayout } from "./utils";
import {
  HORIZONTAL_SPACING,
  NODE_HEIGHT,
  NODE_WIDTH,
  NodeTree,
  VERTICAL_SPACING,
} from "@/types/node";

describe("calculateChildrenLayout", () => {
  it("updates layout correctly when adding more children", () => {
    // Create a sample tree structure for testing
    const rootNode = {
      id: 1,
      name: "Root",
      parentId: null,
      isManager: true,
      department: null,
      isDeveloper: false,
      programmingLanguage: null,
      childrenLength: 1,
      height: 1,
      x: 0,
      y: 0,
    } as NodeTree;

    calculateChildrenLayout(rootNode);

    // Add more children to the existing node
    rootNode.children = [
      {
        id: 3,
        name: "Child 2",
        parentId: 1,
        isManager: false,
        department: "Department B",
        isDeveloper: true,
        programmingLanguage: "Python",
        height: 1,
        x: 0,
        y: 0,
      },
      {
        id: 4,
        name: "Child 3",
        parentId: 1,
        isManager: false,
        department: "Department B",
        isDeveloper: false,
        programmingLanguage: null,
        childrenLength: 2,
        height: 1,
        x: 0,
        y: 0,
        children: [
          {
            id: 5,
            name: "Grandchild 1",
            parentId: 4,
            isManager: false,
            department: "Department C",
            isDeveloper: true,
            programmingLanguage: "Java",
            height: 1,
            x: 0,
            y: 0,
          },
          {
            id: 6,
            name: "Grandchild 2",
            parentId: 4,
            isManager: false,
            department: "Department C",
            isDeveloper: false,
            programmingLanguage: null,
            childrenLength: 0,
            height: 1,
            x: 0,
            y: 0,
          },
        ],
      },
    ] as NodeTree[];

    calculateChildrenLayout(rootNode as NodeTree);

    const shiftH = NODE_WIDTH + HORIZONTAL_SPACING;
    const shiftV = NODE_HEIGHT + VERTICAL_SPACING;
    expect(rootNode.x).toBe(shiftH);
    expect(rootNode.y).toBe(shiftV);

    expect(rootNode.children[0].x).toBe(shiftH);
    expect(rootNode.children[0].y).toBe(shiftV * 2);

    expect(rootNode.children[1].x).toBe(shiftH * 2);
    expect(rootNode.children[1].y).toBe(shiftV);

    expect(rootNode.children[1]?.children?.[0].x).toBe(shiftH * 2);
    expect(rootNode.children[1]?.children?.[0].y).toBe(shiftH);

    expect(rootNode.children[1]?.children?.[1].x).toBe(shiftH * 2);
    expect(rootNode.children[1]?.children?.[1].y).toBe(shiftV * 3);
  });
});
