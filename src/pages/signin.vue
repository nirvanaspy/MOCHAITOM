<template>
  <!--style="background: url(../../img/bgs/10.jpg) no-repeat;"-->
  <div class="signin">
    <div class="row-fluid login-wrapper">
      <a href="#" style="text-decoration:none">
        <!-- <img class="logo" src="img/logo-white.png" /> -->
        <h1 style="color:white;">一体化运维管理平台</h1>
      </a>
      <br/><br/>

      <div class="span4 box">
        <div class="content-wrap">
          <h6>登录</h6>
          <input id="username" class="span12" type="text" placeholder="用户名"
                 @keyup.enter="login"/>
          <input id="password" class="span12" type="password" placeholder="密码" @keyup.enter="login"/>
          <div class="span12" style="margin-left: 0;">
            <div class="span8">
              <input id="ip" class="span12" type="text" placeholder="请输入IP" :value="info.ip"
                     @keyup.enter="login"/>
            </div>
            <div class="span1" style="margin-top: 5px;">
              ：
            </div>
            <div class="span3">
              <input id="port" class="span12" type="text" placeholder="端口号" :value="info.port"
                     @keyup.enter="login"/>
            </div>

          </div>

          <!--<a href="#" class="forgot">忘记密码?</a>
          <div class="remember">
              <input id="remember-me" type="checkbox" />
              <label for="remember-me">记住我</label>
          </div>-->
          <button class="btn-flat primary" style="width: 100px;margin-top: 30px;"
                  v-on:click="login"
                  ref="loginBtn"
          >登录</button>
        </div>
      </div>

      <!-- <div class="span4 no-account">

          <a href="signup.html">注册</a>
      </div> -->
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  export default {
    data() {
      username: "";
      password: "";


      return {
        info: {}

      };
    }, created() {

    },
    methods: {
      login: function () {

        //alert(this.getIP());

        //debugger;
        let username = $("input#username").val();
        let password = $("input#password").val();
        let ip = $("input#ip").val();
        let port = $("input#port").val();

        //let expireDays = 1000 * 60 * 60 * 24 * 15;
        let expireDays = 30;        //天数

        if (username.length == 0 || password.length == 0) {
          //alert("请输入正确的用户名或密码。");
          layer.msg('请输入正确的用户名或密码！');
          return;
        } else {
          this.setCookie('username', username, expireDays);
          this.setCookie('password', password, expireDays);
        }

        //ip地址
        var exp = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
        var reg = ip.match(exp);
        if (reg == null) {
          //alert("IP地址不合法！");
          layer.msg('IP地址不合法！');
          return;
        } else {
          this.setCookie('ip', ip, expireDays);
        }

        if (port.length == 0) {
          layer.msg('请输入端口号！');
          return;
        } else {
          this.setCookie('port', port, expireDays);
        }

//alert(this.getIP());
        this.$axios.get(this.getIP() + "users/login",
          {
            auth: {
              username: username,
              password: password
            }
          }
        )
          .then(res => {
            this.$router.replace({path: "/selectProject"});
            //将用户名、密码的值存入cookie中

            this.setCookie('username', username, expireDays);
            this.setCookie('password', password, expireDays);
            this.setCookie('userId', res.data.data.id, expireDays);
            this.setCookie('ip', ip, expireDays);
            this.setCookie('port', port, expireDays);


          })
          .catch(function (error) {
            //console.log(res.data.data);
            console.log(typeof(error.response));
            if(typeof(error.response) == "undefined"){
              layer.msg('请检查IP或端口号是否正确！');
            }else{
              layer.msg('请输入正确的用户名或密码！');
              error.response.data.length = 0;
            }
            //console.log(error.response.data);


          });
      }
    },

    created() {

      //$(".signin").css("background-image", "url('img/bgs/10.jpg')");

           if (this.getCookie('ip')) {

              this.info.ip = this.getCookie('ip');

              console.log(this.info);

            }

          if (this.getCookie('port')) {         //记录上次输入端口号

            this.info.port = this.getCookie('port');

          }

    }

  };

</script>
<style scoped>
  .signin {
    background-image: url('../../img/bgs/10.jpg');
    height: 100%;
  }
</style>
