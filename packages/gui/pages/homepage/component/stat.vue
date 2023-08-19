<template>
  <div class="stat-container">
    <div class="stat-container__value-container">
      <div class="stat-container__value-wrap">
        <div class="stat-container__value">{roundedValue}</div>
      </div>
      <div class="stat-container__unit">
        {type === Type.SIZE ? formatSize(value).unit : formatTime(value).unit}{'
        '}
      </div>
    </div>
    <div class="stat-container__divider" />
    <div class="stat-container__footer">
      <div class="stat-container__label">{label}</div>

      <div
        class="stat-container__info-text"
        data-balloon-pos="right"
        data-balloon="{infoText}"
      ></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Static } from 'vue';
</script>
<style lang="less" scoped></style>
