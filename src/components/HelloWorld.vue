<template>
  <div class="hello">
    <!-- navbar -->
    <div class="navbar navbar-inverse">
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

        <ul class="nav pull-right">
          <li class="hidden-phone">
            <input class="search" type="text" />
          </li>
          <li class="notification-dropdown hidden-phone">
            <a href="#" class="trigger">
              <i class="icon-warning-sign"></i>
              <span class="count">8</span>
            </a>
            <div class="pop-dialog">
              <div class="pointer right">
                <div class="arrow"></div>
                <div class="arrow_border"></div>
              </div>
              <div class="body">
                <a href="#" class="close-icon"><i class="icon-remove-sign"></i></a>
                <div class="notifications">
                  <h3>You have 6 new notifications</h3>
                  <a href="#" class="item">
                    <i class="icon-signin"></i> New user registration
                    <span class="time"><i class="icon-time"></i> 13 min.</span>
                  </a>
                  <a href="#" class="item">
                    <i class="icon-signin"></i> New user registration
                    <span class="time"><i class="icon-time"></i> 18 min.</span>
                  </a>
                  <a href="#" class="item">
                    <i class="icon-envelope-alt"></i> New message from Alejandra
                    <span class="time"><i class="icon-time"></i> 28 min.</span>
                  </a>
                  <a href="#" class="item">
                    <i class="icon-signin"></i> New user registration
                    <span class="time"><i class="icon-time"></i> 49 min.</span>
                  </a>
                  <a href="#" class="item">
                    <i class="icon-download-alt"></i> New order placed
                    <span class="time"><i class="icon-time"></i> 1 day.</span>
                  </a>
                  <div class="footer">
                    <a href="#" class="logout">View all notifications</a>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li class="notification-dropdown hidden-phone">
            <a href="#" class="trigger">
              <i class="icon-envelope-alt"></i>
            </a>
            <div class="pop-dialog">
              <div class="pointer right">
                <div class="arrow"></div>
                <div class="arrow_border"></div>
              </div>
              <div class="body">
                <a href="#" class="close-icon"><i class="icon-remove-sign"></i></a>
                <div class="messages">
                  <a href="#" class="item">
                    <img src="static/img/contact-img.png" class="display" />
                    <div class="name">Alejandra Galván</div>
                    <div class="msg">
                      There are many variations of available, but the majority have suffered alterations.
                    </div>
                    <span class="time"><i class="icon-time"></i> 13 min.</span>
                  </a>
                  <a href="#" class="item">
                    <img src="static/img/contact-img2.png" class="display" />
                    <div class="name">Alejandra Galván</div>
                    <div class="msg">
                      There are many variations of available, have suffered alterations.
                    </div>
                    <span class="time"><i class="icon-time"></i> 26 min.</span>
                  </a>
                  <a href="#" class="item last">
                    <img src="static/img/contact-img.png" class="display" />
                    <div class="name">Alejandra Galván</div>
                    <div class="msg">
                      There are many variations of available, but the majority have suffered alterations.
                    </div>
                    <span class="time"><i class="icon-time"></i> 48 min.</span>
                  </a>
                  <div class="footer">
                    <a href="#" class="logout">View all messages</a>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li class="dropdown">
            <a href="#" class="dropdown-toggle hidden-phone" data-toggle="dropdown">
              Your account
              <b class="caret"></b>
            </a>
            <ul class="dropdown-menu">
              <li><a href="personal-info.html">Personal info</a></li>
              <li><a href="#">Account settings</a></li>
              <li><a href="#">Billing</a></li>
              <li><a href="#">Export your data</a></li>
              <li><a href="#">Send feedback</a></li>
            </ul>
          </li>
          <li class="settings hidden-phone">
            <a href="personal-info.html" role="button">
              <i class="icon-cog"></i>e
            </a>
          </li>
          <li class="settings hidden-phone">
            <a href="signin.html" role="button">
              <i class="icon-share-alt"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <!-- sidebar -->
    <div id="sidebar-nav">
      <ul id="dashboard-menu">
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
            <i class="icon-magnet"></i>
            <span>部署管理</span>
          </router-link>
        </li>

        <li>
          <router-link to="/deploybind">
            <i class="icon-sitemap"></i>
            <span>部署设计</span>
          </router-link>
        </li>

        <!-- <li>
          <router-link to="/ztree">
            <i class="icon-move"></i>
            <span>ztree</span>
          </router-link>
        </li>
        
        <li>
          <router-link to="/signin">
            <i class="icon-move"></i>
            <span>sign</span>
          </router-link>
        </li> -->
        <li>
          <router-link to="/scan">
            <i class="icon-headphones"></i>
            <span>部署状态</span>
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
