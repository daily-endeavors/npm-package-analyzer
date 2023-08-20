import * as echats from 'echarts'
import * as TypePackageRecord from './info_record'

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

export type EchartsNode = echats.GraphSeriesOption['data']
export type EchartsEdge = echats.GraphSeriesOption['edges']
export type EchartsData = {
    nodes: EchartsNode[],
    edges: EchartsEdge[],
    categoryMap: Map<string, {
        isShow: boolean
    }>
    dataCategoryList: string[]
    uuidMap: Map<string, TypePackageRecord.item>
}