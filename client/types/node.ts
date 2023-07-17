export interface Node {
  id: number;
  name: string
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
  children: NodeTree[];
  openChildren: number;
  parent: NodeTree
}