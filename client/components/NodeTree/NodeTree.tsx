import { Fragment } from "react";
import styles from "./NodeTree.module.css";
import { HORIZONTAL_SPACING, VERTICAL_SPACING, NodeTree } from "@/types/node";
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
      {children.map((child) => {
        return (
          <Fragment key={child.id}>
            <NodeTree node={child} onNodeClick={onNodeClick} />
          </Fragment>
        );
      })}

      <button
        onClick={() => node.childrenLength && onNodeClick(node)}
        className={`${styles.button} ${node.children && styles.expanded} ${
          node.childrenLength && !node.children && styles.canExpand
        }`}
        style={{
          transform: `translate(${x}px, ${y}px)`,
          width: NODE_WIDTH,
          height: NODE_HEIGHT,
        }}
      >
        <div>
          <strong className={styles.name}>{node.name}</strong>
          {node.isManager && <p>Manager in {node.department}</p>}
          {node.isDeveloper && (
            <p>Developer skilled in {node.programmingLanguage}</p>
          )}
        </div>

        {node.parent && (
          <div
            className={styles.connectorV}
            style={{
              height: node.children
                ? NODE_HEIGHT / 2 + VERTICAL_SPACING
                : VERTICAL_SPACING,
              transform: `translate(${NODE_WIDTH / 2 - 1}px, 0)`,
            }}
          />
        )}

        {node.parent && (
          <div
            className={styles.connectorH}
            style={{
              right: NODE_WIDTH / 2 - 1,
              width: node.children
                ? (node.openLeftChildren || 0) * NODE_WIDTH -
                  NODE_WIDTH / 2 +
                  HORIZONTAL_SPACING
                : 0,
              top: `-${NODE_HEIGHT / 2 + VERTICAL_SPACING}px`,
            }}
          />
        )}
      </button>
    </>
  );
};

export default NodeTree;
