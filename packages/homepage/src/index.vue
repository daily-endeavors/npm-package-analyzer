<script setup lang="ts">
import HelloWorld from './components/hello_world.vue'
</script>

<template>
  <!-- <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="日拱一卒" /> -->
  <div class="mbody">
      <!-- 头部区域 -->
    <div class="header">
      <div class="wrapper">
        <!-- logo -->
        <div class="logo">
          <img src="../src/images/日拱一卒logo.jpg" alt="">
          <h1><a href="https://github.com/daily-endeavors/npm-package-analyzer ">日常努力</a></h1>
        </div>
        <!-- nav -->
        <div class="nav">
          <ul>
            <li><a href="#">文库</a></li>
            <li><a href="#">专栏</a></li>
            <li><a href="#">友链</a></li>
            <li><a href="#">我的</a></li>
          </ul>  
        </div>
        <div class="rrnav">
            <!-- go -->
          <div class="go rnav">
            <a href="#"><p>go</p></a>
            <!-- 需要图片和随机生成链接 -->
          </div>
          <!-- search -->
          <div class="search rnav">
            <a href="#" class="iconfont icon-search"><p>sreach</p></a>
          </div>
          <!-- control -->
          <div class="control rnav">
            <a href="#"><p>control</p></a>
          </div>
        </div>
        
      </div>
    </div>

    <!-- banner区域 -->
    <div class="banner">
      <div class="wrapper">
        <div class="left">
          <p>11111</p>
          <p>22222</p>
          <p>33333</p>
        </div>
        <div class="center">
          <img src="../src/images/日拱一卒logo.jpg" alt="">
        </div>
        <div class="right">
          <p>11111</p>
          <p>22222</p>
          <p>33333</p>
        </div>
      </div>
      <h1>关于本站</h1>
    </div>

    <!-- content -->
    <div class="content">
      <!-- content第一块 -->
      <div class="author-item">
        <div class="author-item-left">
          <p>你好很高兴认识你</p>
          <h1>我们是 <a href="https://daily-endeavors.github.io/blog/">日常努力</a> 团队</h1>
          <p>由六人组成，是齐心协力、不断上进的小组</p>
        </div>
        <div class="author-item-right">
          <p>追求</p>
          <h2>源于热爱而去创造</h2>
          <div class="mask">
            <span>程序</span>
          </div>
        </div> 
      </div>
      <!-- content第2块 -->
      <div class="author-item">
          <div class="author-left-skill">
            <!-- <p>团队列表</p> -->
            <div class="content-center">
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
                      <a href="https://github.com/yaogeyou-github" target="_blank">yaogeyou_github</a>
                    </td>
                    <td class="border border-slate-300 w-24 hover:animate-pulse flex justify-center content-center">
                      <a href="https://github.com/yaogeyou-github" target="_blank">
                        <img class="rounded-full w-16"
                          src="https://avatars.githubusercontent.com/u/141559074?s=400&u=839e2d7981c945b832d857d982996d314199eaee&v=4" />
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td class="border border-slate-300">雪舟寺</td>
                    <td class="border border-slate-300">
                      <a href="https://github.com/FionaYuliang" target="_blank">FionaYuliang_github</a>
                    </td>
                    <td class="border border-slate-300 w-24 hover:animate-pulse flex justify-center content-center">
                      <a href="https://github.com/FionaYuliang" target="_blank">
                        <img class="rounded-full w-16" src="https://avatars.githubusercontent.com/u/20492174?v=4" />
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td class="border border-slate-300">戴戴戴yc</td>
                    <td class="border border-slate-300">
                      <a href="https://github.com/2003dyc" target="_blank">DaiDaiDaiyc_github</a>
                    </td>
                    <td class="border border-slate-300 w-24 hover:animate-pulse flex justify-center content-center">
                      <a href="https://github.com/2003dyc" target="_blank">
                        <img class="rounded-full w-16" src="https://avatars.githubusercontent.com/u/141700623?v=4" />
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td class="border border-slate-300">Dynamite</td>
                    <td class="border border-slate-300">
                      <a href="https://github.com/jjiuen" target="_blank">jjiuen_github</a>
                    </td>
                    <td class="border border-slate-300 w-24 hover:animate-pulse flex justify-center content-center">
                      <a href="https://github.com/jjiuen" target="_blank">
                        <img class="rounded-full w-16" src="https://avatars.githubusercontent.com/u/122665661?v=4" />
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td class="border border-slate-300">叶钰茹</td>
                    <td class="border border-slate-300">
                      <a href="https://github.com/yuruYe" target="_blank">yuruYe_github</a>
                    </td>
                    <td class="border border-slate-300 w-24 hover:animate-pulse flex justify-center content-center">
                      <a href="https://github.com/yuruYe" target="_blank">
                        <img class="rounded-full w-16" src="https://avatars.githubusercontent.com/u/141724265?v=4" />
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="author-right-carrer">
            <p>任务完成进度和情况</p>
          </div>
      </div>
      <!-- content第3块 -->
      <div class="member">
        <div class="bottom">
          成员列表
        </div>
        <div class="section">
          <a href="#">成员1</a>
        </div>
        <div class="section">
          <a href="#">成员2</a>
        </div>
        <div class="section">
          <a href="#">成员3</a>
        </div>
        <div class="section">
          <a href="#">成员4</a>
        </div>
        <div class="section">
          <a href="#">成员5</a>
        </div>
        <div class="section">
          <a href="#">成员6</a>
        </div>
        <div class="section">
          <a href="#">成员7</a>
        </div>
      </div>
      <!-- <div class="author-item">
        <div class="author-left-personality">
          <p>人格</p>
          <img src="./images/INFP-T.svg" alt="">
        </div>
        <div class="author-right-photo">
          <p>photo</p>
          <img src="" alt="">
        </div>
      </div> -->
      <!-- content第4块 -->
      <!-- <div class="author-item">
        <div class="author-left-motto">
          <p>座右铭</p>
        </div>
        <div class="author-right-specialty">
          <p>特长</p>
        </div>
      </div> -->
      <!-- content第5块 -->
      <!-- <div class="author-item">
        <div class="author-left-hobby1">
          <p>爱好</p>
        </div>
        <div class="author-right-hobby2">
          <p>爱好</p>
        </div>
      </div> -->
      <!-- content第6块 -->
      <!-- <div class="author-item">
        <div class="author-left-concern">
          <p>关注偏好</p>
        </div>
        <div class="author-right-music">
          <p>音乐偏好</p>
        </div>
      </div> -->
      <!-- content第7块 -->
      <!-- <div class="author-item">
        <div class="author-left-figures">
          <p>访问统计</p>
        </div>
        <div class="author-right">
          <div class="author-right1-address">
            <p>我现在住在中国，xx</p>
          </div>
          <div class="author-right2-profile">
            <p>简介</p>
          </div>
        </div>
        
      </div> -->
      
    </div>
  </div>
  
</template>

<style scoped>
  @import './iconfont/iconfont.css';
</style>

<style scoped>
/* .logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
} */




/* 版心 */
.wrapper {
  margin: 0 auto;
}


/* 头部区域 */
.header {
  height: 60px;
  background-color: #F7F9FE;
  background-position: bottom;
  align-content: center;
}

.header .wrapper {
  padding-top: 19px;
  display: flex;
  align-items: center;
}

/* logo */
.logo {
  white-space: nowrap;
  display: flex;
}
.logo a{
  display: block;
  width: 35px;
  height: 35px;
  margin-left:25px ;
  background-image: url();
  font-size: 16px;
}

.logo img {
  width: 20px;
  height: 20px;
}

/* nav */
.nav {
  margin: auto;
}

.nav li {
  display: inline-block;
  
}

.nav li a {
  display: block;
  margin:12.5px;
  padding: 8px;
  white-space: nowrap;
  /* line-height: 67px; */
  font-size: 16.224px"PingFang SC";
}

.rnav {
  padding-left:10px ;
  display: inline-block;
}


/* banner */
.banner {
  padding: 20px 0;
}
.banner .wrapper{
  display: flex;
}.banner  .wrapper .left {
  animation:mymove 5s infinite alternate;
  position: relative;
}
@keyframes mymove
{
0%{top:0px;}
100%{top:20px;}
}

.banner .center {
  background-color: #fff;
  border-radius: 50%;
  width: 180px;
  height: 180px;
  margin: auto;
}
.banner .center img {
  width: 180px;
  height: 180px;
  border-radius: 50%;
}
.banner .left {
  margin-left:50px ;

}
.banner .left p {
  width: 138px;
  height: 31px;
  background-color: #fff;
  border-radius: 40px;
  margin: 20px 8px;
}

.banner .right {
  margin-right: 50px;
}
.banner .right p {
  width: 138px;
  height: 31px;
  background-color: #fff;
  border-radius: 40px;
  margin: 20px 8px;
}
.banner  .wrapper .right {
  animation:mymove 5s infinite alternate;
  position: relative;
}
@keyframes mymove
{
0%{top:0px;}
100%{top:20px;}
}
.banner h1 {
  height: 80px;
  font-weight: 700;
  line-height: 90px;
  text-align: center;
}


/* content */
.content .author-item {
  display: flex;
  justify-content: space-evenly;
  padding-bottom: 20px;
}
/* content-1 */
.content .author-item-left {
  width: 54%;
  height: 206px;
  padding: 20px 40px;
  background-color: #4C69FF;
  border-radius: 40px;
}
.content .author-item-right {
  width: 39%;
  height: 206px;
  padding: 20px 40px;
  background-color: #fff;
  border-radius: 40px;
  border: 1px solid #E8ECF8;
}
/* content-2 */
.content .author-left-skill {
  width: 39%;
  height: 450px;
  padding: 20px 40px;
  background-color: #fff;
  border-radius: 40px;
  border: 1px solid #E8ECF8;
}
.content .author-left-skill  {
   
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color:black;
  /* background-color: #242424; */

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
  
}
.content .author-left-skill table,th,td {
  border-collapse: collapse;
  border:solid 1px black;
}
.content .author-left-skill .rounded-full {
  width: 50px;
  height: 50px;
}

a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}
a:hover {
  color: #535bf2;
}

body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: #646cff;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

.card {
  padding: 2em;
}

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
  }
  a:hover {
    color: #747bff;
  }
  button {
    background-color: #f9f9f9;
  }
} 

.content .author-right-carrer {
  width: 54%;
  height: 450px;
  padding: 20px 40px;
  background-color: #fff;
  border-radius: 40px;
  border: 1px solid #E8ECF8;
}
/* content-3 */
.member {
  height: 450px;
  padding: 20px 40px;
  background-color: #fff;
  border-radius: 40px;
  border: 1px solid #E8ECF8;
}
.member .section {
  justify-content: space-evenly;
  height: 400px;
  width: 145px;
  margin: 19px;
  display: flex;
  border-radius: 20px;
  border: 1px solid #E8ECF8;
  float: left;

}
/* .content .author-left-personality {
  width: 54%;
  height: 206px;
  padding: 20px 40px;
  background-color: #fff;
  border-radius: 40px;
  border: 1px solid #E8ECF8;
  position: relative;
  overflow: hidden;
}
.content .author-left-personality img {
  position: absolute;
  right: 11px;
  top:30px;
  
}
.author-left-personality img:hover {
  transform: rotate(-15deg);
}
.content .author-right-photo {
  width: 39%;
  height: 206px;
  padding: 20px 40px;
  background-color: #fff;
  border-radius: 40px;
  border: 1px solid #E8ECF8;
} */
/* content-4 */
/* .content .author-left-motto {
  width: 39%;
  height: 206px;
  padding: 20px 40px;
  background-color: #fff;
  border-radius: 40px;
  border: 1px solid #E8ECF8;
}
.content .author-right-specialty {
  width: 54%;
  height: 206px;
  padding: 20px 40px;
  background-color: #a11010;
  border-radius: 40px;
  border: 1px solid #E8ECF8;
} */
/* content-5 */
/* .content .author-left-hobby1 {
  width: 54%;
  height: 206px;
  padding: 20px 40px;
  background-color: #fff;
  border-radius: 40px;
  border: 1px solid #E8ECF8;
}
.content .author-right-hobby2 {
  width: 39%;
  height: 206px;
  padding: 20px 40px;
  background-color: #fff;
  border-radius: 40px;
  border: 1px solid #E8ECF8;
} */
/* content-6
.content .author-left-hobby1 {
  width: 39%;
  height: 206px;
  padding: 20px 40px;
  background-color: #fff;
  border-radius: 40px;
  border: 1px solid #E8ECF8;
}
.content .author-right-hobby2 {
  width: 39%;
  height: 206px;
  padding: 20px 40px;
  background-color: #fff;
  border-radius: 40px;
  border: 1px solid #E8ECF8;
} */
/* content-6*/
/* .content .author-left-concern {
  width: 45%;
  height: 450px;
  padding: 20px 40px;
  background-color: #fff;
  border-radius: 40px;
  border: 1px solid #E8ECF8;
}
.content .author-right-music {
  width: 45%;
  height: 450px;
  padding: 20px 40px;
  background-color: #fff;
  border-radius: 40px;
  border: 1px solid #E8ECF8;
} */
/* content-7 */
/* .content .author-left-figures{
  width: 39%;
  height: 206px;
  padding: 20px 40px;
  background-color: #fff;
  border-radius: 40px;
  border: 1px solid #E8ECF8;
}
.content .author-right {
  flex-direction: column;
  display: flex;
  justify-content: space-between;
  width: 54%;
}
.content .author-right1-address {
  
  height: 136px;
  padding: 20px 40px;
  background-color: #fff;
  border-radius: 40px;
  border: 1px solid #E8ECF8;
}
.content .author-right2-profile {
 
  height: 60px;
  padding: 20px 40px;
  background-color: #fff;
  border-radius: 40px;
  border: 1px solid #E8ECF8;
} */
</style>
