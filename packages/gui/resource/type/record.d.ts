/**
 * 使用字符串格式的package.json实际所在路径作为npm包的唯一id
 */
export type packageId = string

// 依赖解析算法, 基于Node.js模块解析机制实现
// 1. 首先从package.json所在的node_modules文件夹中查找依赖->查找到则终止流程
// 2. 从package.json上一层目录的node_modules目录下检查是否有package依赖->查找到则终止流程
// 3. 重复步骤2, 直到项目的根路径
// 概念说明
// 1. 幽灵依赖:
//    1.1 判断: 无法通过项目本身实现幽灵依赖检测
//    1.2 定义: 是指在一个产品或项目中存在的依赖项，但却没有被明确地包含在该产品或项目的依赖项清单文件（如 package.json）中。这种情况通常是因为该依赖项已经被其他依赖项包含，但同时也可能是因为开发人员不小心将依赖项添加到了项目中，但忘记了在清单文件中声明它。
// 2. 依赖提升:
//    2.1 判断:
//    2.2 定义:
// 3. 循环依赖:
//    3.1 判断:
//    3.2 定义:
// https://www.tslang.cn/docs/handbook/module-resolution.html

// 考虑使用echats的关系图进行渲染https://echarts.apache.org/examples/zh/editor.html?c=graph

/**
 * 基础分析单元
 */
export type item = {
    /**
     * 使用字符串格式的package.json实际所在路径作为npm包的唯一id
     */
    uuid: packageId
    /**
     * npm包名
     */
    packageName: string
    /**
     * npm包版本
     * case1: 正常版本号
     * case2: alpha发版 1.1.0-alpha.1
     * case3: monorepo项目: workspace:*
     */
    version: `${string}`
    /**
     * 字符串格式的package.json所在路径, 用于后续检测依赖关系
     * 由于 pnpm 使用硬链接进行安装, 因此该路径中既有硬链接生成的路径, 也有实际所在的路径
     * 但路径间不会重复
     */
    installPathObj: {
        [key: string]: true
    }
    /**
     * 字符串格式的package.json实际所在路径
     */
    reslovePath: string
    /**
     * 以根路径为0, 记录相对根路径的递归查询深度
     */
    deepLevel: number
    /**
     * package自身信息-直接从package.json中获取
     */
    packageInfo: {
        /**
         * 正式依赖
         */
        dependencies: {
            [packageName: string]: string
        }
        /**
         * dev依赖
         */
        devDependencies: {
            [packageName: string]: string
        }
    }
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
            hasMuiltInstance: boolean
            uuidList: item['uuid'][]
        }
        /**
         * 实际依赖安装情况
         * 检查到依赖记录uuid, 检查不到则记录空字符串
         */
        dependencyInstallStatus: {
            dependencies: {
                [packageName: string]: item['uuid'] | ''
            }
            devDependencies: {
                [packageName: string]: item['uuid'] | ''
            }
        },
        /**
         * 被哪些节点依赖(便于后续制作节点梯次展开效果)
         */
        dependencyBy: {
            /**
             * 通过dependencies依赖
             */
            dependencies: {
                [packageUuid: item['uuid']]: item['packageName'] | ''
            }
            /**
             * 通过devDependencies依赖
             */
            devDependencies: {
                [packageUuid: item['uuid']]: item['packageName'] | ''
            }
        }
    }
}

/**
 * 存储已分析完毕的包记录, 使用真实路径作为 key 值, 避免重复
 */
export type itemMap = Map<packageId, item>

export type packageAnaylzeResult = Omit<item, 'detectInfo'> & {
    /**
     * 根路径
     */
    rootDir: string
    packageList: item[]
    /**
     * 完成数据收集后, 进行后处理时生成的信息
     */
    detectInfo: {
        /**
         * 循环依赖检测. 若依赖中形成环路, 则记录环路上的所有信息
         */
        circularDependency: {
            /**
             * 是否有循环依赖情况
             */
            hasCircularDependency: boolean
            /**
             * 按顺序记录循环链路上的所有项目uuid, 并最终产生列表
             */
            circularChainListList: item['uuid'][][]
        },
        /**
         * 多实例检测. 若项目中存在多个同名且版本号不同的依赖, 记录在这里
         */
        muiltInstance: {
            /**
             * 是否有多实例情况
             */
            hasMuiltInstance: false
            uuidList: []
        }
        /**
         * 实际依赖安装情况
         * 检查到依赖记录uuid, 检查不到则记录空字符串
         */
        dependencyInstallStatus: {
            dependencies: {
                [packageName: string]: item['uuid'] | ''
            }
            devDependencies: {
                [packageName: string]: item['uuid'] | ''
            }
        },
        /**
         * 被哪些节点依赖(便于后续制作节点梯次展开效果)
         */
        dependencyBy: {
            /**
             * 通过dependencies依赖
             */
            dependencies: {
                [packageUuid: item['uuid']]: item['packageName'] | ''
            }
            /**
             * 通过devDependencies依赖
             */
            devDependencies: {
                [packageUuid: item['uuid']]: item['packageName'] | ''
            }
        }
    }
}

/**
 * 最终输出数据
 */
export type record = {
    /**
     * 根package
     */
    rootPackage: item
    /**
     * 扫描到的项目列表
     */
    packageDb: {
        [uuid: item['uuid']]: item
    }
}
