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
          <img class="avatar" src="https://avatars.githubusercontent.com/u/141724265?v=4" />
          <h1><a href="#">日常努力</a></h1>
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
          <img src="" alt="">
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
          <h1>我们是 日常努力 团队</h1>
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
            <p>技能</p>
          </div>
          <div class="author-right-carrer">
            <p>生涯</p>
          </div>
      </div>
      <!-- content第3块 -->
      <div class="author-item">
        <div class="author-left-personality">
          <p>人格</p>
          <img src="./images/INFP-T.svg" alt="">
        </div>
        <div class="author-right-photo">
          <p>photo</p>
          <img src="" alt="">
        </div>
      </div>
      <!-- content第4块 -->
      <div class="author-item">
        <div class="author-left-motto">
          <p>座右铭</p>
        </div>
        <div class="author-right-specialty">
          <p>特长</p>
        </div>
      </div>
      <!-- content第5块 -->
      <div class="author-item">
        <div class="author-left-hobby1">
          <p>爱好</p>
        </div>
        <div class="author-right-hobby2">
          <p>爱好</p>
        </div>
      </div>
      <!-- content第6块 -->
      <div class="author-item">
        <div class="author-left-concern">
          <p>关注偏好</p>
        </div>
        <div class="author-right-music">
          <p>音乐偏好</p>
        </div>
      </div>
      <!-- content第7块 -->
      <div class="author-item">
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
        
      </div>
      
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
.banner  .wrapper .left {
  animation:mymove 2s infinite alternate;
  position: relative;
}
@keyframes mymove
{
0%{top:0px;}
100%{top:20px;}
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

.logo .avatar {
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
}
.banner .center {
  background-color: #fff;
  border-radius: 50%;
  width: 180px;
  height: 180px;
  margin: auto;
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
.banner h1 {
  height: 40px;
  font-weight: 700;
  line-height: 80px;
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
.content .author-right-carrer {
  width: 54%;
  height: 450px;
  padding: 20px 40px;
  background-color: #fff;
  border-radius: 40px;
  border: 1px solid #E8ECF8;
}
/* content-3 */
.content .author-left-personality {
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
}
/* content-4 */
.content .author-left-motto {
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
}
/* content-5 */
.content .author-left-hobby1 {
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
}
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
.content .author-left-concern {
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
}
/* content-7 */
.content .author-left-figures{
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
}
</style>
