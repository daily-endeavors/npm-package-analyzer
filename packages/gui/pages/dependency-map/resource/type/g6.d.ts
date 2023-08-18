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