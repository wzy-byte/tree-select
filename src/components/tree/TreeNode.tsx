import React from "react";
import {DataNode} from "./interface";

export interface TreeNodeProps {
    treeNodeData: DataNode;
    handleItemClick: (item: DataNode) => void;
}

const TreeNode: React.FC<TreeNodeProps> = (props) => {
    const {treeNodeData, handleItemClick, children} = props;
    return (
        <li className="tree-list-node" onClick={e => handleItemClick(treeNodeData)}>
            <span></span>
            {treeNodeData.name}
            {children}
        </li>
    );
};

export default TreeNode;
