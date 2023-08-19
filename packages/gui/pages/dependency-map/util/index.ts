// 将infodb的格式转换为g6可读的格式
import * as TypePackageRecord from '../resource/type/info_record'
import * as TypeG6 from '../resource/type/g6-echarts'
import * as ConstColor from '../resource/const/color'

/**
 * 将依赖数据转换为G6绘图所需数据
 * @param packageRecord 
 * @returns 
 */
export function infoDb2G6(packageRecordList: TypePackageRecord.packageAnaylzeResult[]): TypeG6.G6Data {

    const g6NodeList: TypeG6.G6Node[] = []
    const g6EdgeList: TypeG6.G6Edge[] = []


    // 先初始化uuid => item 映射表
    const uuidMap = new Map()
    for (let packageRecord of packageRecordList) {
        uuidMap.set(packageRecord.uuid, packageRecord)
        for (let item of packageRecord.packageList) {
            uuidMap.set(item.uuid, item)
        }
    }


    const uniqueNodeSet = new Set<string>()
    const uniquePathSet = new Set<string>()

    // 然后再绘制依赖图
    for (let packageRecord of packageRecordList) {
        for (let record of [...packageRecord.packageList]) {
            const node: TypeG6.G6Node = {
                "id": record.uuid,
                "label": `${record.packageName}@${record.version}`
            }
            // 避免重复添加node节点
            if (uniqueNodeSet.has(node.id) === false) {
                uniqueNodeSet.add(node.id)
                g6NodeList.push(node)
            }
            for (let dependencyPackageName of Object.keys(record.detectInfo.dependencyInstallStatus.dependencies)) {
                const dependencyPackageUuid = record.detectInfo.dependencyInstallStatus.dependencies[dependencyPackageName]
                if (dependencyPackageUuid === '') {
                    // 未检测到依赖, 自动跳过
                    continue
                }
                if (uuidMap.has(dependencyPackageUuid) === false) {
                    // 数据表中无此id, 自动跳过
                    console.log("auto skip =>", dependencyPackageUuid)
                    continue
                }
                // 避免重复添加edge边
                const pathLink = `${record.uuid}->${dependencyPackageUuid}`
                if (uniquePathSet.has(pathLink) === false) {
                    uniquePathSet.add(pathLink)
                    g6EdgeList.push({
                        "source": record.uuid,
                        target: dependencyPackageUuid
                    })
                }
            }
        }
    }




    return {
        nodes: g6NodeList,
        edges: g6EdgeList,
    }
}

let colorCounter = 0
/**
 * 自动从颜色列表中获取一个色值
 * @returns 
 */
export function getRgbColor(): `#${string}` {
    colorCounter = colorCounter + 1
    const colorList = ConstColor.materialColorList
    const colorRgb = colorList[colorCounter % colorList.length]
    return `#${colorRgb}`
}

/**
 * 将依赖数据转换为Echarts绘图所需数据
 * @param packageRecord 
 * @returns 
 */
export function infoDb2Echarts(packageRecordList: TypePackageRecord.packageAnaylzeResult[]): TypeG6.EchartsData {

    const echartsNodeList: TypeG6.EchartsNode[] = []
    const echartsEdgeList: TypeG6.EchartsEdge[] = []

    // 数据量太大, 先只展示第一个
    // packageRecordList = [packageRecordList[0]]

    // 先初始化uuid => item 映射表
    const uuidMap = new Map()
    for (let packageRecord of packageRecordList) {
        uuidMap.set(packageRecord.uuid, packageRecord)
        for (let item of packageRecord.packageList) {
            uuidMap.set(item.uuid, item)
        }
    }


    const uniqueNodeSet = new Set<string>()
    const uniquePathSet = new Set<string>()

    // 然后再绘制依赖图
    for (let packageRecord of packageRecordList) {
        let recordCounter = 0
        // 每个模块的颜色不一样
        const packageColor = getRgbColor()
        for (let record of [...packageRecord.packageList]) {
            recordCounter = recordCounter + 1
            const node: TypeG6.EchartsNode = {
                id: record.uuid,
                symbol: "circle",
                itemStyle: {
                    color: packageColor,
                },
                // 用所处层数作为size大小, 保底为1
                symbolSize: Math.max((10 - record.deepLevel) * 2, 1),
                name: `${record.packageName}@${record.version}`,
                label: {
                    show: record.deepLevel <= 1 ? true : false,
                    overflow: "truncate",
                },
                y: 0,
                x: 0,
                attributes: {},
            }
            if (recordCounter === 1) {
                // 每个循环的第一个是根节点, 需要给与特殊标记
                // node.color = "#007bff"
                node.symbolSize = 100
            }

            // 避免重复添加node节点
            if (uniqueNodeSet.has(node.id) === false) {
                uniqueNodeSet.add(node.id)
                echartsNodeList.push(node)
            }
            for (let dependencyPackageName of Object.keys(record.detectInfo.dependencyInstallStatus.dependencies)) {
                const dependencyPackageUuid = record.detectInfo.dependencyInstallStatus.dependencies[dependencyPackageName]
                if (dependencyPackageUuid === '') {
                    // 未检测到依赖, 自动跳过
                    continue
                }
                if (uuidMap.has(dependencyPackageUuid) === false) {
                    // 数据表中无此id, 自动跳过
                    console.log("auto skip =>", dependencyPackageUuid)
                    continue
                }
                // 避免重复添加edge边
                const pathLink = `${record.uuid}->${dependencyPackageUuid}`
                if (uniquePathSet.has(pathLink) === false) {
                    uniquePathSet.add(pathLink)
                    echartsEdgeList.push({
                        sourceID: record.uuid,
                        attributes: {},
                        targetID: dependencyPackageUuid,
                        size: 1
                    })
                }
            }
        }
    }




    return {
        nodes: echartsNodeList,
        edges: echartsEdgeList,
    }
}