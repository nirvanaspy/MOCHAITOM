<template>
  <div class="hello" style="height: 100%">
    <!-- navbar -->
    <div class="navbar navbar-inverse" style="height: 50px">
      <div class="navbar-inner">
        <button type="button" class="btn btn-navbar visible-phone" id="menu-toggler">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>

        <a class="brand" href="index.html">
          <!-- <img src="img/logo.png" /> -->
          <div style="float:left;width:30px;">
            <!-- <img src="img/ico-mail.png" /> -->
            <i class="icon-leaf" style="color:blue;"></i>
          </div>

          <div style="float:right;">

            <h4 style="color:white;font-weight:700;">一体化运维管理平台</h4>
          </div>

        </a>
      </div>
    </div>
    <!-- sidebar -->
    <div id="sidebar-nav" style="background-color: #f8f8f8;top: 50px;bottom:0px">
      <ul id="dashboard-menu" style="background-color: #f8f8f8;">
        <li class="active">
          <div class="pointer">
            <div class="arrow"></div>
            <div class="arrow_border"></div>
          </div>
          <router-link to="/users">
            <i class="icon-group"></i>
            <span>用户管理</span>
          </router-link>
          <!-- <a id="index.html">
            <i class="icon-home"></i>
            <span>Home</span>
          </a> -->
        </li>
        <li>
          <router-link to="/components">
            <i class="icon-cogs"></i>
            <span>组件管理</span>
          </router-link>
          <!-- <a href="chart-showcase.html">
            <i class="icon-signal"></i>
            <span>Charts</span>
          </a> -->
        </li>
        <li>
          <router-link to="/devices">
            <i class="icon-laptop"></i>
            <span>设备管理</span>
          </router-link>
        </li>

        <!-- <li>
          <router-link to="/uploadtest">
            <i class="icon-signal"></i>
            <span>uploadtest</span>
          </router-link>
        </li> -->

        <li>
          <router-link to="/deployplan">
            <i class="icon-sitemap"></i>
            <span>部署设计</span>
          </router-link>
        </li>

<!--        <li>
          <router-link to="/deploybind">
            <i class="icon-sitemap"></i>
            <span>部署设计</span>
          </router-link>
        </li>-->

        <li>
          <router-link to="/scan">
            <i class="icon-headphones"></i>
            <span>在线监控</span>
          </router-link>
        </li>

         <li>
          <router-link to="/newdeploy">
            <i class="icon-magnet"></i>
            <span>部署</span>
          </router-link>
        </li>

        <li>
          <router-link to="/softpackage">
            <i class="icon-briefcase"></i>
            <span>软件包</span>
          </router-link>
        </li>

        <li>
          <router-link to="/baseline">
            <i class="icon-tasks"></i>
            <span>基线</span>
          </router-link>
        </li>

        <li>
          <router-link to="/log">
            <i class="icon-edit"></i>
            <span>日志</span>
          </router-link>
        </li>

      </ul>
    </div>

    <!-- main container -->
    <div class="content">
      <!-- 路由出口 -->
      <router-view></router-view>

    </div>
  </div>

</template>

<script>
/* eslint-disable */

export default {
  data () {
    return {
    }
  },
  created(){

      /*var projectId = this.$route.params.id;
     // alert(projectId);
      console.log(projectId);*/
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>


</style>
