import { Fragment } from "react";
import styles from "./NodeTree.module.css";
import { NodeTree } from "@/types/node";

const NodeTree = ({
  node,
  width,
  height,
  onNodeClick = () => {},
}: {
  node: NodeTree;
  width: number;
  height: number;
  onNodeClick: (node) => void;
}) => {
  const { x, y } = node;
  const children = node.children || [];

  return (
    <>
      <button
        onClick={() => node.childrenLength && onNodeClick(node)}
        className={`${styles.nodeTree} ${node.children && styles.expanded} ${
          node.childrenLength && !node.children && styles.canExpand
        }`}
        style={{
          transform: `translate(${x}px, ${y}px)`,
          width,
          height,
        }}
      >
        <div className="node-content">
          <strong className={styles.name}>{node.name}</strong>
          {node.isManager && <p>Manager in {node.department}</p>}
          {node.isDeveloper && (
            <p>Developer skilled in {node.programmingLanguage}</p>
          )}
        </div>
      </button>
      {children.map((child) => {
        return (
          <Fragment key={child.id}>
            <NodeTree
              node={child}
              width={width}
              height={height}
              onNodeClick={onNodeClick}
            />
          </Fragment>
        );
      })}
    </>
  );
};

export default NodeTree;
