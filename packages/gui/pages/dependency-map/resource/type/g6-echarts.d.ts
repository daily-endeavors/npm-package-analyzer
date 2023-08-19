export type G6Node = {
    id: string,
    label: string
}
export type G6Edge = {
    source: G6Node['id'],
    target: G6Node['id']
}
export type G6Data = {
    nodes: G6Node[],
    edges: G6Edge[],
}

export type EchartsNode = {
    label: "jquery" | any,
    name: string,
    symbol?: "rect" | string,
    attributes: {},
    y: -404.26147 | number,
    x: -739.36383 | number,
    id: "jquery" | string,
    symbolSize: 4.7252817 | number
    itemStyle: {
        color: "#4f19c7" | `#${string}`,
    },
}
export type EchartsEdge = {
    sourceID: EchartsNode['id'],
    attributes: {},
    targetID: EchartsNode['id'],
    size: 1 | number
}
export type EchartsData = {
    nodes: EchartsNode[],
    edges: EchartsEdge[],
}