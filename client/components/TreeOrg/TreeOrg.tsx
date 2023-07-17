import { useEffect, useState } from "react";
import { NodeTree as NodeTreeType } from "@/types/node";
import NodeTree from "@/components/NodeTree";
import styles from "./TreeOrg.module.css";
import { fetchChildren } from "@/api/node";
import { calculateChildrenLayout } from "@/components/TreeOrg/utils";

const loadChildren = async (node: NodeTreeType) => {
  node.children = await fetchChildren(node.id);
  node.children.map((child) => {
    child.parent = node;
    child.x = node.x;
    child.y = node.y;
  });
};

const TreeOrg = () => {
  const [rootNode, setRootNode] = useState<NodeTreeType>();

  useEffect(() => {
    async function initialLoad() {
      const [root] = await fetchChildren(null);
      setRootNode(root);
    }

    initialLoad();
  }, []);

  const toggleChildren = async (node) => {
    if (node.children) {
      delete node.children;
    } else {
      await loadChildren(node);
    }

    setRootNode(() => window.structuredClone(rootNode));
    // add some animation
    setTimeout(() => {
      rootNode && calculateChildrenLayout(rootNode);
      setRootNode(() => window.structuredClone(rootNode));
    }, 100);
  };

  if (!rootNode) {
    return null;
  }

  return (
    <div className={styles.TreeOrg}>
      <NodeTree onNodeClick={toggleChildren} node={rootNode} />
    </div>
  );
};

export default TreeOrg;
