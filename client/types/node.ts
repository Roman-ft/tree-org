export interface Node {
  id: number;
  name: string;
  parentId: number | null;
  isManager: boolean;
  department: string | null;
  isDeveloper: boolean;
  programmingLanguage: string | null;
  childrenLength: number;
  height: number;
}

export interface NodeTree extends Node {
  x: number;
  y: number;
  children?: NodeTree[];
  openLeftChildren?: number;
  parent?: NodeTree;
}

export const NODE_WIDTH = 200;
export const NODE_HEIGHT = 100;
export const HORIZONTAL_SPACING = 30;
export const VERTICAL_SPACING = 15;
