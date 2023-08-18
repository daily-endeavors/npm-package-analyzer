// 将infodb的格式转换为g6可读的格式
import * as TypePackageRecord from '../resource/type/info_record'
import * as TypeG6 from '../resource/type/g6'

/**
 * 将依赖数据转换为G6绘图所需数据
 * @param packageRecord 
 * @returns 
 */
export function infoDb2G6(packageRecord: TypePackageRecord.packageAnaylzeResult): TypeG6.G6Data {

    const g6NodeList: TypeG6.G6Node[] = []
    const g6EdgeList: TypeG6.G6Edge[] = []

    const existUuidSet = new Set([...packageRecord.packageList].map(item => item.uuid))

    for (let record of [...packageRecord.packageList]) {
        const node: TypeG6.G6Node = {
            "id": record.uuid,
            "label": `${record.packageName}@${record.version}`
        }
        g6NodeList.push(node)
        for (let dependencyPackageName of Object.keys(record.detectInfo.dependencyInstallStatus.dependencies)) {
            const dependencyPackageUuid = record.detectInfo.dependencyInstallStatus.dependencies[dependencyPackageName]
            if (dependencyPackageUuid === '') {
                // 未检测到依赖, 自动跳过
                continue
            }
            if (existUuidSet.has(dependencyPackageUuid) === false) {
                // 数据表中无此id, 自动跳过
                continue
            }
            g6EdgeList.push({
                "source": record.uuid,
                target: dependencyPackageUuid
            })
        }
    }


    return {
        nodes: g6NodeList,
        edges: g6EdgeList,
    }
}