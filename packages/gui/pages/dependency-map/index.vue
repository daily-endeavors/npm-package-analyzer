<template>
  <div class="container">
    <div id="g6Container"></div>
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
  </div>
</template>
<script setup lang="ts">
import * as echarts from 'echarts';

import demoData from './resource/data/demo.json';
import * as Util from './util/index';
import { onMounted } from 'vue';

type EChartsOption = echarts.EChartsOption;

const echartData = Util.infoDb2Echarts(demoData as any);

const legendSelected: Record<string, boolean> = {};
for (let key of echartData.categoryMap.keys()) {
  legendSelected[key] = !!echartData.categoryMap.get(key)?.isShow;
}

const option: EChartsOption = {
  title: {
    text: 'NPM 依赖分析',
  },
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
        edgeLength: 20,
        gravity: 0.05,
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
    echartData.nodes.map(function (node) {
      return node.itemStyle.color;
    }),
  ).values(),
];

let myEchart: ReturnType<typeof echarts.init>;

onMounted(() => {
  const chartDom = document.getElementById('g6Container')!;
  myEchart = echarts.init(chartDom);
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

    const targetClickUuid = params.data.id;
    console.log('targetClickUuid =>', params);

    const targetClickItem = echartData.uuidMap.get(targetClickUuid)!;
    const categoryStatus = echartData.categoryMap.get(targetClickUuid)!;
    if (targetClickItem.deepLevel < 2) {
      // 层级小于2 直接展示子节点
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
}
#g6Container {
  display: flex;
  width: 100%;
  height: 48vh;
  /* border: 1px solid #f0f0f0;
  border-radius: 8px;

  margin-left: 4px;
  margin-right: 4px;
  margin-top: 16px;
  margin-bottom: 16px; */
}
div {
  display: flex;
  white-space: break-spaces;
  max-width: 50vw;
  word-break: break-all;
}
</style>
