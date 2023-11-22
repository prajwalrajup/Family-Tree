import React, { memo } from "react";
import { Handle, Position } from "reactflow";
import styles from "./MarriedNode.module.css";

export default memo(({ data, isConnectable }) => {
  return (
    <div>
      <Handle
        id="MALE"
        type="target"
        position={Position.Top}
        style={{ left: 40, background: "#555" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />
      <Handle
        id="FEMALE"
        type="target"
        position={Position.Top}
        style={{ left: 110, background: "#555" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />
      <div className={styles.node}>
        <a>{data.MALE.name}</a>
        <a>{data.FEMALE.name}</a>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={{ background: "#555" }}
        isConnectable={isConnectable}
      />
    </div>
  );
});
