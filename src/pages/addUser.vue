<template>
  <div id="addUser">


    <div class="container-fluid">
      <div id="pad-wrapper" class="new-user">
        <div class="row-fluid header">
          <h3>创建一个新用户</h3>
        </div>

        <div class="row-fluid form-wrapper">
          <!-- left column -->
          <div class="span10 with-sidebar">
            <div class="container">
              <form class="new_user_form inline-input"/>
              <div class="span12 field-box">
                <label>用户名:</label>
                <input class="span9" type="text" name="add-name"/>
              </div>

              <div class="span12 field-box">
                <label>密码:</label>
                <input class="span9" type="password" name="add-password"/>
              </div>

              <div class="span12 field-box" style="margin-top: -11px;">
                <label>再次输入确认:</label>
                <input class="span9" type="password" name="again-password"/>
              </div>

              <div class="span7 field-box actions">
                <input type="button" class="btn-glow primary" value="创建" @click="addUser"/>
                <button type="submit" class="btn-glow primary" @click="formReset">取消</button>
              </div>
              </form>
            </div>
          </div>


        </div>
      </div>
    </div>
  </div>
</template>


<script>
  export default {
    /* eslint-disable */
    data() {
      return {}
    },
    methods: {
      addUser: function () {
        var qs = require('qs');

        let username = $("input[name='add-name']").val();
        let password = $("input[name='add-password']").val();
        let password2 = $("input[name='again-password']").val();


        if (username == "") {
          layer.msg("请输入用户名！");
        } else if (password == "") {
          layer.msg("请输入密码！");
        } else if (password2 == "") {
          layer.msg("请再次输入密码！");
        } else if (password !== password2) {
          layer.msg("两次输入密码不一致！");
        } else {
          this.$axios.post(this.getIP() + 'users', qs.stringify({
            "username": $("input[name='add-name']").val(),
            "password": $("input[name='add-password']").val()
          }), {

            params: {  //get请求在第二个位置，post在第三个位置
              isAdmin: true
            },

            //设置头
            headers: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            auth: {
              username: 'admin',
              password: 'admin'
            }
          }).then(res => {
            //this.users = res.data.data
            //console.log(res);
            this.$router.replace({path: '/users'})
          }).catch(err => {
            //alert("请重新输入用户名！");
            layer.msg("添加失败！");
          })

        }
        ;


      },
      formReset: function () {
        $("input").val('');
        this.$router.replace({path: '/users'})

      },


    }

  }
</script>
<style>

</style>
