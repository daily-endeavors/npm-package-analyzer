<template>
  <div class="container">
    <div id="g6Container"></div>
    <div>
      <div>数据分布 =></div>
      <div>
        {{
          JSON.stringify({
            nodes节点数: echartData.nodes.length,
            edges边数: echartData.edges.length,
          })
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
const option: EChartsOption = {
  title: {
    text: 'NPM 依赖分析',
  },
  animationDurationUpdate: 1500,
  animationEasingUpdate: 'quinticInOut',
  series: [
    {
      type: 'graph',
      layout: 'force',
      animation: false,
      force: {
        edgeLength: 5,
        repulsion: 20,
        gravity: 0.2,
      },
      // progressiveThreshold: 700,
      data: echartData.nodes.map(function (node) {
        return {
          ...node,
        };
      }),
      edges: echartData.edges.map(function (edge) {
        return {
          source: edge.sourceID,
          target: edge.targetID,
        };
      }),
      roam: true,
      lineStyle: {
        width: 0.5,
        curveness: 0.3,
        opacity: 0.7,
      },
      // emphasis: {
      //   focus: 'adjacency',
      //   label: {
      //     position: 'right',
      //     show: true,
      //   },
      // },
      edgeSymbol: ['arrow'],
      edgeSymbolSize: [4, 10],
      edgeLabel: {
        fontSize: 20,
      },

      // tooltip: {
      //   // 参考 https://echarts.apache.org/zh/option.html#series-graph.tooltip.formatter
      //   formatter: '{b}',
      //   trigger: 'item',
      // },
    },
  ],
};
onMounted(() => {
  const chartDom = document.getElementById('g6Container')!;
  const myEchart = echarts.init(chartDom);

  const width = document.querySelector('#g6Container')?.clientWidth ?? 500;
  const height = document.querySelector('#g6Container')?.clientHeight ?? 500;

  myEchart.setOption(option, true);
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
