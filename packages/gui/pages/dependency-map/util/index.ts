// 将infodb的格式转换为g6可读的格式
import * as TypePackageRecord from '../../../../cli/src/resource/type/record';
import * as ConstColor from '../resource/const/color';
import * as Consts from '../resource/const/index';
import * as TypeG6 from '../resource/type/g6-echarts';

/**
 * 将依赖数据转换为G6绘图所需数据
 * @param packageRecord
 * @returns
 */
export function infoDb2G6(
  packageRecordList: TypePackageRecord.packageAnaylzeResult[],
): TypeG6.G6Data {
  const g6NodeList: TypeG6.G6Node[] = [];
  const g6EdgeList: TypeG6.G6Edge[] = [];

  // 先初始化uuid => item 映射表
  const uuidMap = new Map();
  for (let packageRecord of packageRecordList) {
    uuidMap.set(packageRecord.uuid, packageRecord);
    for (let item of packageRecord.packageList) {
      uuidMap.set(item.uuid, item);
    }
  }

  const uniqueNodeSet = new Set<string>();
  const uniquePathSet = new Set<string>();

  // 然后再绘制依赖图
  for (let packageRecord of packageRecordList) {
    for (let record of [...packageRecord.packageList]) {
      const node: TypeG6.G6Node = {
        id: record.uuid,
        label: `${record.packageName}@${record.version}`,
      };
      // 避免重复添加node节点
      if (uniqueNodeSet.has(node.id) === false) {
        uniqueNodeSet.add(node.id);
        g6NodeList.push(node);
      }
      for (let dependencyPackageName of Object.keys(
        record.detectInfo.dependencyInstallStatus.dependencies,
      )) {
        const dependencyPackageUuid =
          record.detectInfo.dependencyInstallStatus.dependencies[
            dependencyPackageName
          ];
        if (dependencyPackageUuid === '') {
          // 未检测到依赖, 自动跳过
          continue;
        }
        if (uuidMap.has(dependencyPackageUuid) === false) {
          // 数据表中无此id, 自动跳过
          // console.log("auto skip =>", dependencyPackageUuid)
          continue;
        }
        // 避免重复添加edge边
        const pathLink = `${record.uuid}->${dependencyPackageUuid}`;
        if (uniquePathSet.has(pathLink) === false) {
          uniquePathSet.add(pathLink);
          g6EdgeList.push({
            source: record.uuid,
            target: dependencyPackageUuid,
          });
        }
      }
    }
  }

  return {
    nodes: g6NodeList,
    edges: g6EdgeList,
  };
}

let colorCounter = 0;
/**
 * 自动从颜色列表中获取一个色值
 * @returns
 */
export function getRgbColor(): `#${string}` {
  colorCounter = colorCounter + 1;
  const colorList = ConstColor.materialColorList;
  const colorRgb = colorList[colorCounter % colorList.length];
  return `#${colorRgb}`;
}

/**
 * 将依赖数据转换为Echarts绘图所需数据
 * @param packageRecord
 * @returns
 */
export function infoDb2Echarts(
  packageRecordList: TypePackageRecord.packageAnaylzeResult[],
): TypeG6.EchartsData {
  const echartsNodeList: TypeG6.EchartsNode[] = [];
  const echartsEdgeList: TypeG6.EchartsEdge[] = [];

  // 数据量太大, 先只展示第一个
  // packageRecordList = [packageRecordList[0]]

  // 先初始化uuid => item 映射表
  const uuidMap: Map<TypePackageRecord.item['uuid'], TypePackageRecord.item> =
    new Map();
  for (let packageRecord of packageRecordList) {
    uuidMap.set(packageRecord.uuid, packageRecord);
    for (let item of packageRecord.packageList) {
      uuidMap.set(item.uuid, item);
    }
  }
  const dataCategoryList = [...uuidMap.keys()];

  const uniqueNodeSet = new Set<string>();
  const uniquePathSet = new Set<string>();

  const ConstSymbolSize = {
    // // 根节点
    // [0]: [100, 10],
    // // 第一层依赖
    // [1]: [50, 10],
    // // 第二层依赖
    // [2]: [20, 10],
    // [3]: [10, 10],
    // "default": [5, 5]
    // 根节点
    [0]: 100,
    // 第一层依赖
    [1]: 50,
    // 第二层依赖
    [2]: 20,
    [3]: 10,
    default: 5,
  };

  const categoryMap: Map<
    string,
    {
      isShow: boolean;
    }
  > = new Map();

  // 然后再绘制依赖图
  for (let packageRecord of packageRecordList) {
    let recordCounter = 0;
    // 每个模块的颜色不一样
    const packageColor = getRgbColor();
    for (let record of [...packageRecord.packageList]) {
      recordCounter = recordCounter + 1;

      // @ts-ignore
      const symbolSize =
        ConstSymbolSize[record.deepLevel as any] ?? ConstSymbolSize.default;

      // symbolSize[1] = Math.max(symbolSize[1], `${record.packageName}@${record.version}`.length)

      // 将子依赖项对应的categoryIndex添加到Set中, 方便后续展示
      if (categoryMap.has(record.uuid) === false) {
        categoryMap.set(record.uuid, {
          isShow: record.deepLevel < Consts.DefaultShowLevel,
        });
      }
      const node = {
        id: record.uuid,
        symbol: 'circle',
        itemStyle: {
          color: packageColor,
        },
        symbolSize: symbolSize,
        // 每项一个类目
        category: dataCategoryList.indexOf(record.uuid),
        name: `${record.packageName}\n${record.version}`,
        label: {
          show: true,
          overflow: 'truncate',
        },
        // y: 0,
        // x: 0,
        attributes: {},
      };

      // 避免重复添加node节点
      if (uniqueNodeSet.has(node.id) === false) {
        uniqueNodeSet.add(node.id);
        echartsNodeList.push(node);
      }
      for (let dependencyPackageName of Object.keys(
        record.detectInfo.dependencyInstallStatus.dependencies,
      )) {
        const dependencyPackageUuid =
          record.detectInfo.dependencyInstallStatus.dependencies[
            dependencyPackageName
          ];
        if (dependencyPackageUuid === '') {
          // 未检测到依赖, 自动跳过
          continue;
        }
        const dependencyPackage = uuidMap.get(dependencyPackageUuid);
        if (dependencyPackage === undefined) {
          // 数据表中无此id, 自动跳过
          // console.log("auto skip =>", dependencyPackageUuid)
          continue;
        }
        // 避免重复添加edge边
        const pathLink = `${record.uuid}->${dependencyPackageUuid}`;
        if (uniquePathSet.has(pathLink) === false) {
          uniquePathSet.add(pathLink);
          const link = {
            source: record.uuid,
            target: dependencyPackageUuid,
            tooltip: `${record.packageName}->${dependencyPackage.packageName}`,
            size: 1,
          };
          // @ts-ignore
          echartsEdgeList.push(link);
        }
      }
    }
  }

  return {
    nodes: echartsNodeList,
    edges: echartsEdgeList,
    categoryMap: categoryMap,
    dataCategoryList,
    uuidMap,
  };
}
