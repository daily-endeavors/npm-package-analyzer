import * as TypePackageRecord from '@/resource/type/record';
import demoData from '@/resource/data/demo';

const parseData: TypePackageRecord.packageAnaylzeResult[] =
    (globalThis as any)?.npmPackageAnalyzeResultList ?? demoData;

// 根据全局数据, 初始化uuid对象映射表, 方便其他模块使用
const uuidMap: Map<string, TypePackageRecord.item> = new Map()
for (let subParseResult of parseData) {
    for (let item of subParseResult.packageList) {
        uuidMap.set(item.uuid, item)
    }
}

export function getPackageAnaylzeResult() {
    return parseData
}

export function getPackageSummary(parseResult: TypePackageRecord.packageAnaylzeResult) {
    /**
     * 项目目录下的包总数
     */
    let packageCount = 0
    /**
     * 最大依赖层数
     */
    let maxDeepLevel = 0
    /**
     * 是否有循环依赖
     */
    let hasCircularDependency = false
    /**
     * 循环依赖列表
     */
    let circularPackageNameListList: string[][] = []
    /**
     * 是否有多实例
     */
    let hasMuiltInstance = false
    /**
     * 多实例项目列表
     */
    let muiltInstancePackageMap: Map<string, string[]> = new Map()

    // 更新信息列表
    for (let item of parseResult.packageList) {
        maxDeepLevel = Math.max(maxDeepLevel, item.deepLevel)
        if (item.detectInfo.muiltInstance.hasMuiltInstance) {
            const key = [...item.detectInfo.muiltInstance.uuidList].sort().join(",")
            const muiltInstancePackageList: string[] = []
            for (let uuid of item.detectInfo.muiltInstance.uuidList) {
                const instanceItem = uuidMap.get(uuid)
                if (instanceItem === undefined) {
                    continue
                }
                muiltInstancePackageList.push(`${instanceItem.packageName}@${instanceItem.version}`)
            }
            muiltInstancePackageMap.set(key, muiltInstancePackageList)
        }
    }
    // 更新循环依赖链路信息
    for (let chainUuidList of parseResult.detectInfo.circularDependency.circularChainListList) {
        const packageNameList = []
        for (let uuid of chainUuidList) {
            const instanceItem = uuidMap.get(uuid)
            if (instanceItem === undefined) {
                continue
            }
            packageNameList.push(`${instanceItem.packageName}@${instanceItem.version}`)
        }
        circularPackageNameListList.push(packageNameList)
    }

    packageCount = parseResult.packageList.length

    return {
        packageCount,
        maxDeepLevel,
        hasCircularDependency: circularPackageNameListList.length > 0,
        circularPackageNameListList,
        hasMuiltInstance: muiltInstancePackageMap.size > 0,
        muiltInstancePackageListList: [...muiltInstancePackageMap.values()]
    }
}