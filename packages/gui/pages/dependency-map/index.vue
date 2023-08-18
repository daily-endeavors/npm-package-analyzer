<template>
  <div class="container">
    <div id="g6Container"></div>
    <div>
      <div>
        {{
          JSON.stringify(
            {
              nodes: data.nodes.length,
              edges: data.edges.length,
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
import G6 from '@antv/g6';
import demoData from './resource/data/demo.json';
import * as Util from './util/index';
import { onMounted } from 'vue';
const data = Util.infoDb2G6(demoData as any);
// const data = {
//   id: 'Modeling Methods',
//   children: [
//     {
//       id: 'Classification',
//       children: [
//         { id: 'Logistic regression' },
//         { id: 'Linear discriminant analysis' },
//         { id: 'Rules' },
//         { id: 'Decision trees' },
//         { id: 'Naive Bayes' },
//         { id: 'K nearest neighbor' },
//         { id: 'Probabilistic neural network' },
//         { id: 'Support vector machine' },
//       ],
//     },
//     {
//       id: 'Consensus',
//       children: [
//         {
//           id: 'Models diversity',
//           children: [
//             { id: 'Different initializations' },
//             { id: 'Different parameter choices' },
//             { id: 'Different architectures' },
//             { id: 'Different modeling methods' },
//             { id: 'Different training sets' },
//             { id: 'Different feature sets' },
//           ],
//         },
//         {
//           id: 'Methods',
//           children: [
//             { id: 'Classifier selection' },
//             { id: 'Classifier fusion' },
//           ],
//         },
//         {
//           id: 'Common',
//           children: [{ id: 'Bagging' }, { id: 'Boosting' }, { id: 'AdaBoost' }],
//         },
//       ],
//     },
//     {
//       id: 'Regression',
//       children: [
//         { id: 'Multiple linear regression' },
//         { id: 'Partial least squares' },
//         { id: 'Multi-layer feedforward neural network' },
//         { id: 'General regression neural network' },
//         { id: 'Support vector regression' },
//       ],
//     },
//   ],
// };

onMounted(() => {
  const width = document.querySelector('#g6Container')?.clientWidth ?? 500;
  const height = document.querySelector('#g6Container')?.clientHeight ?? 500;
  // const width = 500;
  // const height = 500;
  const graph = new G6.Graph({
    container: 'g6Container',
    width,
    height,
    fitView: true,
    fitViewPadding: [20, 40, 50, 20],
    // 启用动画
    animate: true,
    modes: {
      default: [
        // {
        //   type: 'collapse-expand',
        //   onChange: function onChange(item, collapsed) {
        //     const data = item!.getModel();
        //     data.collapsed = collapsed;
        //     return true;
        //   },
        // },
        'drag-canvas',
        // 'zoom-canvas',
      ],
    },
    // 节点在默认状态下的样式配置（style）和其他配置
    defaultNode: {
      size: 30, // 节点大小
      // ...                 // 节点的其他配置
      // 节点样式配置
      style: {
        fill: 'steelblue', // 节点填充色
        stroke: '#666', // 节点描边色
        lineWidth: 1, // 节点描边粗细
      },
      // 节点上的标签文本配置
      labelCfg: {
        // 节点上的标签文本样式配置
        style: {
          fill: '#000000', // 节点标签文字颜色
        },
      },
    },
    // 边在默认状态下的样式配置（style）和其他配置
    defaultEdge: {
      // ...                 // 边的其他配置
      // 边样式配置
      style: {
        opacity: 0.6, // 边透明度
        stroke: 'grey', // 边描边颜色
      },
      // 边上的标签文本配置
      labelCfg: {
        autoRotate: true, // 边上的标签文本根据边的方向旋转
      },
    },
    // defaultEdge: {
    //   type: 'cubic-horizontal',
    // },
    layout: {
      type: 'force', // 指定为力导向布局
      preventOverlap: true, // 防止节点重叠
    },
    // layout: {
    //   type: 'compactBox',
    //   direction: 'LR',
    //   getId: function getId(d: any) {
    //     return d.id;
    //   },
    //   getHeight: function getHeight() {
    //     return 16;
    //   },
    //   getWidth: function getWidth() {
    //     return 16;
    //   },
    //   getVGap: function getVGap() {
    //     return 10;
    //   },
    //   getHGap: function getHGap() {
    //     return 100;
    //   },
    // },
  });

  // graph.node(function (node) {
  //   return {
  //     label: node.id,
  //     labelCfg: {
  //       offset: 10,
  //       position: node.children && node.children.length > 0 ? 'left' : 'right',
  //     },
  //   };
  // });

  graph.data(data);
  graph.render();
  graph.fitView();
});
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
}
#g6Container {
  display: flex;
  width: 50vw;
  height: 50vh;
  border: 1px solid #f0f0f0;
  border-radius: 8px;

  margin-left: 4px;
  margin-right: 4px;
  margin-top: 16px;
  margin-bottom: 16px;
}
div {
  display: flex;
  white-space: break-spaces;
  width: 50vw;
  word-break: break-all;
}
</style>
