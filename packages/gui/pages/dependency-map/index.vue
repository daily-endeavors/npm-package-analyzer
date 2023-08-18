<template>
  <div class="container">
    <div id="g6Container"></div>
    <div>
      <div>
        {{ JSON.stringify(data, null, 2) }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import G6 from '@antv/g6';
import demoData from './resource/data/demo.json';
import * as Util from './util/index';
import { onMounted } from 'vue';
const data = Util.infoDb2G6(demoData[0] as any);
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
  const rate = 0.8;
  const width = Math.round(screen.availWidth * rate ?? 500);
  const height = Math.round(screen.availHeight * rate ?? 500);
  // const width = 500;
  // const height = 500;
  const graph = new G6.Graph({
    container: 'g6Container',
    width,
    height,
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
    defaultNode: {
      size: 26,
      anchorPoints: [
        [0, 0.5],
        [1, 0.5],
      ],
    },
    // defaultEdge: {
    //   type: 'cubic-horizontal',
    // },
    // layout: {
    //   type: 'radial',
    //   unitRadius: 50,
    //   center: [500, 300],
    // },
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
  // graph.fitView();
});
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
}
#g6Container {
  display: flex;
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
