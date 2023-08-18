// 将infodb的格式转换为g6可读的格式
import * as TypePackageRecord from '../resource/type/info_record'
import * as TypeG6 from '../resource/type/g6'

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