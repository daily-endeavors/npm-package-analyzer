<script setup lang="ts"></script>

<template>
  <div class="card flex justify-center content-center">
    <table class="border-collapse border border-slate-400">
      <thead>
        <tr>
          <th class="border border-slate-300">团队成员(Q群用户名)</th>
          <th class="border border-slate-300">github账号</th>
          <th class="border border-slate-300">头像</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="border border-slate-300">尧歌游</td>
          <td class="border border-slate-300">
            <a href="https://github.com/yaogeyou-github" target="_blank"
              >yaogeyou_github</a
            >
          </td>
          <td
            class="border border-slate-300 w-24 hover:animate-pulse flex justify-center content-center"
          >
            <a href="https://github.com/yaogeyou-github" target="_blank">
              <img
                class="rounded-full w-16"
                src="https://avatars.githubusercontent.com/u/141559074?s=400&u=839e2d7981c945b832d857d982996d314199eaee&v=4"
              />
            </a>
          </td>
        </tr>
        <tr>
          <td class="border border-slate-300">雪舟寺</td>
          <td class="border border-slate-300">
            <a href="https://github.com/FionaYuliang" target="_blank"
              >FionaYuliang_github</a
            >
          </td>
          <td
            class="border border-slate-300 w-24 hover:animate-pulse flex justify-center content-center"
          >
            <a href="https://github.com/FionaYuliang" target="_blank">
              <img
                class="rounded-full w-16"
                src="https://avatars.githubusercontent.com/u/20492174?v=4"
              />
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
.read-the-docs {
  color: #888;
}
</style>
