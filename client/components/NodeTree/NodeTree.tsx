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
        className={styles.nodeTree}
        style={{
          transform: `translate(${x}px, ${y}px)`,
          width,
          height,
          background: node.children ? '#aaa' : '#fff'
        }}
      >
        <div className="node-content">
          <div>{node.name}</div>
          <div>height: {node.height}</div>
          <div>children length: {node.childrenLength}</div>
          <div>Open {node.openChildren}</div>

          <div>parent: x{node.parent?.x}, y{node.parent?.y}</div>

          <div>x{node.x}, y{node.y}</div>

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
