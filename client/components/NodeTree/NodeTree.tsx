import { Fragment } from "react";
import styles from "./NodeTree.module.css";
import { NodeTree } from "@/types/node";
import { NODE_WIDTH, NODE_HEIGHT } from "@/types/node";

const NodeTree = ({
  node,
  onNodeClick = () => {},
}: {
  node: NodeTree;
  onNodeClick: (node) => void;
}) => {
  const { x, y } = node;
  const children = node.children || [];

  return (
    <>
      <button
        onClick={() => node.childrenLength && onNodeClick(node)}
        className={`${styles.button} ${node.children && styles.expanded} ${
          node.childrenLength && !node.children && styles.canExpand
        }`}
        style={{
          transform: `translate(${x}px, ${y}px)`,
          NODE_WIDTH,
          NODE_HEIGHT,
        }}
      >
        <div>
          <strong className={styles.name}>{node.name}</strong>
          {node.isManager && <p>Manager in {node.department}</p>}
          {node.isDeveloper && (
            <p>Developer skilled in {node.programmingLanguage}</p>
          )}
        </div>

        <div
          className={styles.connectorH}
          style={{
            height: 100,
          }}
        />
        <div className={styles.connectorV} />
      </button>

      {children.map((child) => {
        return (
          <Fragment key={child.id}>
            <NodeTree node={child} onNodeClick={onNodeClick} />
          </Fragment>
        );
      })}
    </>
  );
};

export default NodeTree;
