import React from 'react';
import './App.css';
import Tree from "./components/tree/Tree";
import groupJSON from "./mock/tree.json";
import {DataNode} from "./components/tree/interface";
export function listToTree(list: DataNode[], pid: string | number = "") {
  	let res: DataNode[] = [];
  	if (!Array.isArray(list)) {
    	return res;
  	}
  	list.forEach(item => {
		if (item.parentId === pid) {
			let children = listToTree(list, item.value);
			if (children && children.length) {
				item.children = children;
			}
			res.push(item);
		}
  	});
  	return res;
}

function App() {

	const rootNode = groupJSON.result.find(i => i.root);
	const formatGroupList: DataNode[] = groupJSON.result.map(i => ({
		name: i.name,
		value: i.id,
		parentId: i.parentId,
		root: i.root,
		checked: false
	}));
	const treeData = listToTree(formatGroupList, rootNode ? rootNode.id : "");

	return (
		<div className="App">
			<Tree treeData={treeData} />
		</div>
	);
}

export default App;
