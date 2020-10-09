
export interface DataNode {
    name: string;
    value: string | number;
    parentId: string | number;
    children?: DataNode[];
    checked: boolean;
    [prop: string]: any;
}

export interface LooseObj {
    [k: string]: any
}
