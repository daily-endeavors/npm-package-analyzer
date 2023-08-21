<template>
  <div class="container">
    <div class="base-container">
      <div ref="containerRef" class="echart-container"></div>
    </div>
    <div class="debug-container">
      <div>
        <input type="checkbox" id="checkbox" v-model="isDebug" />
        <label for="checkbox">调试模式:{{ isDebug }}</label>
      </div>
      <template v-if="isDebug">
        <div>
          <div>数据分布 =></div>
          <div>
            {{
              JSON.stringify(
                {
                  nodes节点数: echartData.nodes.length,
                  edges边数: echartData.edges.length,
                  颜色列表: colorList,
                  option,
                },
                null,
                2,
              )
            }}
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
import * as echarts from 'echarts';
import * as Consts from './resource/const/index';

import * as Util from './util/index';
import * as GlobalUtil from '@/utils/index';
import { onMounted, ref, shallowRef } from 'vue';

const containerRef = shallowRef();

const { packageAnaylzeResult } = defineProps<{
  packageAnaylzeResult: ReturnType<
    typeof GlobalUtil.getPackageAnaylzeResult
  >[number];
}>();

const isDebug = ref(false);
type EChartsOption = echarts.EChartsOption;

const echartData = Util.infoDb2Echarts([packageAnaylzeResult]);

const legendSelected: Record<string, boolean> = {};
for (let key of echartData.categoryMap.keys()) {
  legendSelected[key] = !!echartData.categoryMap.get(key)?.isShow;
}

const option: EChartsOption = {
  // title: {
  //   text: `${packageAnaylzeResult.packageName}@${packageAnaylzeResult.version} 依赖分析`,
  // },
  tooltip: {
    // 参考 https://echarts.apache.org/zh/option.html#series-graph.tooltip.formatter
    formatter: '{b}',
    trigger: 'item',
  },
  legend: {
    show: false,
    data: [...echartData.dataCategoryList],
    selected: legendSelected,
    // .map((uuid) => {
    //   return {
    //     name: uuid,
    //   };
    // }),
  },
  animationDurationUpdate: 1500,
  animationEasingUpdate: 'quinticInOut',
  series: [
    {
      type: 'graph',
      layout: 'force',
      animation: false,
      // selectedMode: 'series',
      force: {
        // edgeLength: 5,
        // repulsion: 20,
        // gravity: 0.2,
        repulsion: 50,
        edgeLength: 50,
        gravity: 0.02,
      },
      categories: [...echartData.dataCategoryList].map((uuid) => {
        return {
          name: uuid,
        };
      }),
      // progressiveThreshold: 700,
      data: echartData.nodes,
      links: echartData.edges,
      roam: true,
      lineStyle: {
        width: 0.5,
        curveness: 0.3,
        opacity: 0.7,
      },
      emphasis: {
        focus: 'adjacency',
        label: {
          position: 'right',
          show: true,
        },
      },
      edgeSymbol: ['circle', 'arrow'],
      edgeSymbolSize: [1, 5],
      edgeLabel: {
        fontSize: 20,
      },
    },
  ],
};
const colorList = [
  ...new Set(
    echartData.nodes.map((node: any) => {
      return node.itemStyle.color;
    }),
  ).values(),
];

let myEchart: ReturnType<typeof echarts.init>;

onMounted(() => {
  console.log('containerRef.value => ', containerRef.value);
  myEchart = echarts.init(containerRef.value);
  const width = document.querySelector('#g6Container')?.clientWidth ?? 500;
  const height = document.querySelector('#g6Container')?.clientHeight ?? 500;

  myEchart.setOption(option, true);

  // // 按图例隐藏节点
  // for (let categoryKey of echartData.categoryMap.keys()) {
  //   const item = echartData.categoryMap.get(categoryKey)!;
  //   if (item.isShow) {
  //     myEchart.dispatchAction({
  //       type: 'legendSelect',
  //       // 图例名称
  //       name: categoryKey,
  //     });
  //   } else {
  //     myEchart.dispatchAction({
  //       type: 'legendUnSelect',
  //       // 图例名称
  //       name: categoryKey,
  //     });
  //   }
  // }

  myEchart.on('click', function (params) {
    if (params.dataType !== 'node') {
      return;
    }

    // @ts-ignore
    const targetClickUuid = params.data.id;
    console.log('targetClickUuid =>', params);

    const targetClickItem = echartData.uuidMap.get(targetClickUuid)!;
    const categoryStatus = echartData.categoryMap.get(targetClickUuid)!;
    if (targetClickItem.deepLevel < Consts.MinShowLevel) {
      // 层级小于Consts.MinShowLevel 直接展示子节点
      for (let categoryUuid of Object.values(
        targetClickItem.detectInfo.dependencyInstallStatus.dependencies,
      )) {
        myEchart.dispatchAction({
          type: 'legendSelect',
          // 图例名称
          name: categoryUuid,
        });
      }

      categoryStatus.isShow = true;
      echartData.categoryMap.set(targetClickUuid, categoryStatus);
      return;
    }

    // 如果 category 状态为显示，则通过一定规则隐藏所有 childres

    if (categoryStatus.isShow) {
      for (let categoryUuid of Object.values(
        targetClickItem.detectInfo.dependencyInstallStatus.dependencies,
      )) {
        myEchart.dispatchAction({
          type: 'legendUnSelect',
          // 图例名称
          name: categoryUuid,
        });
      }

      categoryStatus.isShow = false;
      echartData.categoryMap.set(targetClickUuid, categoryStatus);
    } else {
      // 如 category 状态为隐藏，则显示

      for (let categoryUuid of Object.values(
        targetClickItem.detectInfo.dependencyInstallStatus.dependencies,
      )) {
        myEchart.dispatchAction({
          type: 'legendSelect',
          // 图例名称
          name: categoryUuid,
        });
      }

      categoryStatus.isShow = true;
      echartData.categoryMap.set(targetClickUuid, categoryStatus);
    }
  });
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
.base-container {
  display: flex;
  flex-direction: column;
  width: 45vw;
  align-items: center;
  justify-content: center;
}
.echart-container {
  display: flex;
  width: 100%;
  height: 48vh;
  /* border: 1px solid #f0f0f0;
  border-radius: 8px;

  margin-left: 4px;
  margin-right: 4px;
  margin-top: 16px;
  margin-bottom: 16px; */

  border: 1px solid rgba(0, 0, 0, 0.07);
  border-radius: 10px;
  background: transparent;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}
div.debug-container {
  display: flex;
  white-space: break-spaces;
  word-break: break-all;
}
</style>
