<template>
  <div>
    <section class="layout">
      <section>
        <div class="page-container">
          <div class="page-content">
            <section class="content-container-wrap">
              <div class="content-container">
                <h2>{{ packageAnaylzeResult.packageName }} 项目依赖关系分析</h2>
                <div class="autocomplete-input-box">
                  <div class="current-path">
                    项目根路径:{{ packageAnaylzeResult.rootDir }}
                  </div>
                </div>
                <div class="autocomplete-input-box_footer">
                  <div class="quick-stats-bar"></div>
                </div>

                <div class="conbine-container">
                  <div class="content-split-container">
                    <div class="stats-container">
                      <div class="left-info-container">
                        <div class="size-container">
                          <h3>分析统计</h3>
                          <div class="size-stats">
                            <Stat
                              :count="maxDeepLevel"
                              unit="层"
                              tip="最大依赖深度"
                            ></Stat>
                            <Stat
                              :count="totalSubPackageCount"
                              unit="个"
                              tip="npm包"
                            ></Stat>
                          </div>
                        </div>
                        <div class="time-container">
                          <h3>项目概览</h3>
                          <div class="time-stats">
                            <Stat
                              :count="muiltInstanceCount"
                              unit="个"
                              tip="多重实例"
                            ></Stat>
                            <Stat
                              :count="circularCount"
                              unit="条"
                              tip="循环依赖链路数"
                            ></Stat>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="content-split-container">
                    <div class="bar-graph-container">
                      <DependencyMap
                        :package-anaylze-result="packageAnaylzeResult"
                      ></DependencyMap>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </section>
  </div>
</template>
<script lang="ts" setup>
import Stat from './stat.vue';
import * as GlobalUtil from '../../../utils';
import DependencyMap from '../../dependency-map/index.vue';

const { packageAnaylzeResult } = defineProps<{
  packageAnaylzeResult: ReturnType<
    typeof GlobalUtil.getPackageAnaylzeResult
  >[number];
}>();

let totalSubPackageCount = 0;
let maxDeepLevel = 0;
let circularCount = 0;
let muiltInstanceCount = 0;
const analyzeInfo = GlobalUtil.getPackageSummary(packageAnaylzeResult);
totalSubPackageCount = totalSubPackageCount + analyzeInfo.packageCount;
circularCount = circularCount + analyzeInfo.circularPackageNameListList.length;
for (let muiltInstancePackageList of analyzeInfo.muiltInstancePackageListList) {
  muiltInstanceCount = muiltInstancePackageList.length;
}
maxDeepLevel = Math.max(maxDeepLevel, analyzeInfo.maxDeepLevel);
</script>
<style lang="scss" scoped>
@import 'scss-stylesheets/variables.scss';
@import 'scss-stylesheets/colors.scss';

.conbine-container {
  display: flex;
  margin-top: 3vh;
  align-items: flex-start;
}
.left-info-container {
  width: 45vw;
  height: 48vh;
  border: 1px solid rgba(0, 0, 0, 0.07);
  border-radius: 10px;
  background: transparent;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.layout {
  max-width: 100%;
}

.page-header {
  padding: $global-spacing * 3;
  padding-bottom: $global-spacing * 2;
  display: flex;
  align-items: center;

  @media screen and (max-width: 40em) {
    padding: $global-spacing * 2;
  }
}
.autocomplete-input-box {
  border: 1px solid $autocomplete-border-color;
  border-radius: 10px;
  background: transparent;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  max-width: 700px;
  min-width: 600px;
  min-height: 80px;

  @media screen and (max-width: 48em) {
    width: 85vw;
    max-width: 550px;
    min-width: auto;
  }

  @media screen and (max-width: 40em) {
    width: 85vw;
    min-width: auto;
  }
}

.autocomplete-input-box__footer {
  position: relative;

  &::after {
    content: '';
    position: absolute;
    width: 80%;
    margin: auto;
    height: 1px;
  }
}

.quick-stats-bar {
  display: flex;
  align-content: center;
  font-size: 0.8rem;
  color: #8d949e;
  background: #fbfbfc;
  border-radius: 0 0 10px 10px;
  overflow: hidden;
}

.current-path {
  font-size: 1.3rem;
  padding: 15px 45px 15px 30px;
  font-family: Source Code Pro, SF Mono, Consolas, Liberation Mono, Menlo,
    Courier, monospace;
  font-weight: 300;
  width: 100%;
  box-sizing: border-box;
  letter-spacing: -0.7px;
  margin: 0;
  word-break: break-all;
}

.page-header--right-section {
  margin-left: auto;
  display: flex;
  align-items: center;
}

.github-logo {
  width: 30px;
  height: 30px;

  @media screen and (max-width: 40em) {
    width: 20px;
    height: 20px;
  }

  path {
    fill: #666;
    transition: fill 0.2s;
  }

  &:hover {
    path {
      fill: black;
    }
  }
}

.logo-small {
  //   @include font-size-reg;
  text-transform: uppercase;
  font-weight: $font-weight-very-bold;
  letter-spacing: 3px;
  user-select: none;
  cursor: pointer;
  color: #212121;
}

.logo-small__alt {
  color: #888;
}

.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-height: calc(100vh - 6px);
  flex-grow: 1;
}

.page-content {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex-grow: 1;

  @media screen and (max-width: 40em) {
    padding: 0 $global-spacing * 2;
  }
}

.page-header__quicklinks {
  list-style: none;
  margin: 0 2rem 0 0;
  font-weight: $font-weight-light;
  display: flex;

  a {
    // @include font-size-xs;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    font-weight: $font-weight-bold;
    opacity: 0.55;
    color: $raven;
    transition: opacity 0.2s;

    &:hover {
      opacity: 1;
    }
  }

  li + li {
    margin-left: $global-spacing * 2;
  }

  @media screen and (max-width: 40em) {
    max-width: 40vw;
    overflow: scroll;
    align-items: center;
    justify-content: flex-end;
    overflow: scroll;
  }
}

h2 {
  font-size: 1.35rem;
  letter-spacing: 2px;
  font-weight: 1000;
  margin: 0 0 20px;
  color: #666;
}

.size-container h3,
.time-container h3 {
  font-size: 1.35rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 300;
  margin: 20px 0 0;
  color: #7f8792;
}

.result-page__search-input {
  width: 100%;
}

.flash-message {
  @include font-size-sm;
  //   padding: math.div($global-spacing, 3) $global-spacing * 2;
  text-align: center;
  color: darken($pastel-green, 20%);
  align-self: center;
  margin-top: $global-spacing;
  position: relative;
  display: flex;
  align-items: center;

  code {
    color: darken($pastel-green, 25%);
    font-size: 95%;
  }

  a {
    text-decoration: underline;
    color: inherit;
  }
}

.flash-message__icon {
  margin-left: $global-spacing * 0.5;
  margin-right: $global-spacing;
  height: $global-spacing * 2.5;
  width: auto;
}

.result-error {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex-grow: 1;
}

.result-error__details {
  font-family: $font-family-code;
  text-transform: none;

  summary {
    text-align: center;
    color: lighten($raven, 10%);

    &:focus {
      outline: none;
    }
  }

  pre {
    max-width: 600px;
    @include font-size-sm;
    font-weight: $font-weight-light;
    text-align: left;
    color: $raven;
    line-height: 1.5;
    background: transparentize($raven, 0.94);
    padding: $global-spacing $global-spacing * 2;
    white-space: normal;
    border-radius: 10px;
  }
}

.result-error__img {
  width: 195px * 0.8;
  height: 181px * 0.8;
  opacity: 0.2;
}

.result-error__code {
  font-family: $font-family-code;
  margin-top: $global-spacing * 3;
  margin-bottom: 0;
}

.result-error__message {
  margin-top: $global-spacing;
  font-weight: $font-weight-light;
  color: $raven;
  max-width: $global-spacing * 60;
  text-align: center;
  line-height: 1.5;
}

.page-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 6px);
}

.content-container {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 4vh 0;

  &:first-of-type {
    margin-top: 0;
  }
}

.content-split-container {
  display: flex;
  justify-content: space-around;
  width: 100%;

  @media screen and (max-width: 48em) {
    flex-direction: column;
    margin-top: 5vh;
  }

  @media screen and (max-width: 40em) {
    padding: 0 $global-spacing * 2;
  }
}

.content-container-wrap {
  display: flex;
  flex-direction: column;
  width: 100%;
  // padding: 0 10px;
  flex-grow: 1;
  animation: fade-in-full 0.2s;
}

.result-pending,
.result-error {
  min-height: 75vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stats-container {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: auto 0;
  flex: 1 1 0;

  @media screen and (max-width: 48em) {
    flex: 1;
  }
}

.size-container {
  margin-bottom: 5vh;

  @media screen and (max-width: 48em) {
    margin-bottom: 3vh;
  }
}

.size-container,
.time-container {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.size-container h3,
.time-container h3 {
  @include font-size-md;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: $font-weight-thin;
  margin: 0 0 $global-spacing * 2;
  color: lighten($raven, 10%);

  @media screen and (max-width: 48em) {
    margin: 0 0 $global-spacing;
  }
}

.size-stats,
.time-stats {
  display: flex;
}

.chart-container {
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 10vh;

  @media screen and (max-width: 48em) {
    flex-direction: column;
    margin-top: 5vh;
  }

  @media screen and (max-width: 40em) {
    padding: 0 $global-spacing * 2;
  }
}
.ct-series-a .ct-bar {
  stroke: #00b4ae;
  stroke-width: 40px;
}

@keyframes fade-in-full {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.result__section-heading {
  @include font-size-md-2;
  text-align: center;
  position: relative;
  margin-top: 0;
}

.result__section-heading--new {
  &::after {
    @include font-size-xs;
    content: 'NEW';
    font-family: $font-family-code;
    // padding: $global-spacing * 0.2 math.div($global-spacing, 1.5);
    position: absolute;
    top: 0;
    margin-left: $global-spacing;
    background: #ffbc40;
    border-radius: 2px;
    line-height: 1.2;
  }
}

// Treemap section

.treemap__section {
  width: 100%;
}

.treemap {
  @include font-size-sm;
  color: rgba(0, 0, 0, 0.6);
}

.treemap__square {
  transition: all 0.3s;
  position: relative;

  &:hover {
    //transform:scale(1.05);
    z-index: 1;
    color: rgba(0, 0, 0, 0.8);
    //box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.12);
    filter: brightness(105%);
  }
}

.treemap__content {
  max-height: 100%;
  max-width: 100%;
}
.treemap__label {
  font-family: $font-family-code;
  max-height: 75%;
  max-width: 100%;
  overflow: hidden;
  a {
    color: inherit;

    &:hover {
      text-decoration: underline;

      &::after {
        position: absolute;
        content: '↗';
      }
    }
  }
}

.treemap__percent {
  @include font-size-xl;
  display: block;
  font-weight: $font-weight-bold;
  letter-spacing: -1px;
  color: rgba(0, 0, 0, 0.5);

  .treemap__square:hover & {
    color: rgba(0, 0, 0, 0.8);
  }

  //color: black;
  mix-blend-mode: soft-light;

  // Disabling this for mobiles and tablets
  // since text seems to glitch due to it
  @media screen and (max-width: 48em) {
    mix-blend-mode: normal;
  }
}

.treemap__percent-sign {
  font-size: 50%;
  padding-left: 2px;
}

.treemap__ellipsis {
  color: rgba(0, 0, 0, 0.35);
}

.treemap__note {
  @include font-size-xs;
  color: $raven;
  margin: $global-spacing * 3 0 0 0;
  line-height: 1.2;
}

// .bar-graph,
// .bar-graph-container {
//   display: flex;
//   justify-content: center;
// }

// .bar-graph-container {
//   //   flex-direction: column;
//   width: 100%;
//   height: 48vh;
// }
</style>
