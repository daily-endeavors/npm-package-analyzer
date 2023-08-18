import * as Type from '../type'
import * as RecordType from '../type/record'
import path from 'node:path'

export const json: Type.json = {
  package_name: 'test',
  version: '1.2.3',
}

export const defaultRecord: RecordType.item = {
  /**
   * npm包唯一id
   */
  uuid: '212313',
  /**
   * npm包名
   */
  packageName: 'string',
  /**
   * npm包版本
   * case1: 正常版本号
   * case2: alpha发版 1.1.0-alpha.1
   * case3: monorepo项目: workspace:*
   */
  version: `string`,
  /**
   * package.json实际所在位置, 用于检测依赖关系
   */
  reslovePath: '',
  /**
   * 包所在位置
   */
  installPathObj: {},
  /**
   * 以根路径为0, 记录相对根路径的递归查询深度
   */
  deepLevel: 0,
  /**
   * package自身信息-直接从package.json中获取
   */
  packageInfo: {
    /**
     * 正式依赖
     */
    dependencies: {},
    /**
     * dev依赖
     */
    devDependencies: {},
  },
  /**
   * 完成数据收集, 进行版本检测时生成的信息
   */
  detectInfo: {
    /**
     * 多实例检测. 若项目中存在多个同名且版本号不同的依赖, 记录在这里
     */
    muiltInstance: {
      /**
       * 是否有多实例情况
       */
      hasMuiltInstance: true,
      uuidList: [],
    },
    /**
     * 实际依赖安装情况
     * 检查到依赖记录uuid, 检查不到则记录空字符串
     */
    dependencyInstallStatus: {
      devDependencies: {},
      dependencies: {},
    },
  },
}

export const rootPath = path.resolve(__dirname, '../../../../..')
