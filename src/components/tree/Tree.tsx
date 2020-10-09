import React, {useState} from "react";
import {DataNode, LooseObj} from "./interface";

export interface TreeProps {
    treeData: DataNode[];
}

export const formatTreeObj = (data: DataNode[]) => {
    let treeObj: LooseObj = {};
    const inner = (list: DataNode[]) => {
        list.forEach(item => {
            const id = item.value.toString();
            treeObj[id] = item;
            if (item.children && Array.isArray(item.children)) {
                inner(item.children);
            }
        });
    };
    inner(data);
    return treeObj;
};

const Tree: React.FC<TreeProps> = (props) => {

    const {treeData} = props;
    const [hiddenList, setHiddenList] = useState<string[] | number[]>([]);
    const [treeList, setTreeList] = useState<DataNode[]>(treeData);
    const treeObj = formatTreeObj(treeData);

    const setCurrentStatus = (node: DataNode, checked: boolean) => {
        setChildStatus(node, checked);
        setParentStatus(treeList, node, checked);
        setTreeList([...treeList]);
    };

    const setChildStatus = (node: DataNode, checked: boolean) => {
        node.checked = checked;
        if (node.children && Array.isArray(node.children)) {
            node.children.forEach(child => setChildStatus(child, checked));
        }
    };

    const setParentStatus = (treeList: DataNode[], node: DataNode, checked: boolean) => {
        for (let i = 0; i < treeList.length; i++) {
            let item = treeList[i];
            if (item.value === node.parentId) {
                item.checked = checked;
                setParentStatus(treeData, item, checked);
                break;
            } else {
                if (item.children && Array.isArray(item.children)) {
                    setParentStatus(item.children, node, checked);
                }
            }
        }
    };

    const renderTreeNode = (list: DataNode[]) => {
        return (
            <ul className="tree-list">
                {
                    list.map(item => (
                        <li key={item.value}>
                            <div>
                                <input 
                                    type="checkbox" 
                                    value={item.value} 
                                    checked={item.checked}
                                    onChange={e => setCurrentStatus(item, !item.checked)} />
                                {item.name}
                            </div>
                            {Array.isArray(item.children) && renderTreeNode(item.children)}
                        </li>
                    ))
                }
            </ul>
        );
    };

    return (
        <div className="tree-container">
            {renderTreeNode(treeList)}
        </div>
    );
};

export default Tree;
