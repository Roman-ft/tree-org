import { NodeTree as NodeTreeType } from "@/types/node";

export const fetchChildren = async (
  parentId: number | null
): Promise<NodeTreeType[]> => {
  return await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/children/${
      parentId ? "?parent_id=" + parentId : ""
    }`
  ).then((data) => data.json());
};
