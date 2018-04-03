<template>
  <div id="addUser">


    <div class="container-fluid">
      <div id="pad-wrapper" class="new-user">
        <div class="row-fluid header">
          <h3 class="header-wrapper-modify">修改用户信息</h3>
        </div>

        <div class="row-fluid form-wrapper">
          <!-- left column -->
          <div class="span10">
            <div class="container">
              <form class="new_user_form inline-input"/>
              <div class="span12 field-box">
                <label>用户名:</label>
                <input class="span9" type="text" name="edit-name" :value="users.username" disabled="disabled"/>
              </div>

              <div class="span12 field-box">
                <label>密码:</label>
                <input class="span9" type="password" name="edit-password" :value="users.password"/>
              </div>

              <div class="span12 field-box" style="margin-top: -11px;">
                <label>再次输入确认:</label>
                <input class="span9" type="password" name="again-password"/>
              </div>

              <div class="span7 field-box actions">
                <input type="button" class="btn-flat primary" value="修改" @click="modifyUser"/>
                <input type="button" class="btn-flat danger" value="取消" @click="formReset"/>
              </div>
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
      return {
        users: []
      }
    }, created() {
      let username = this.getCookie('username');
      let password = this.getCookie('password');

      this.$axios.get(this.getIP() + 'users/' + this.$route.params.id, {
        /*params:{  //get请求在第二个位置，post在第三个位置
            ID:'c02da6e9-a334-4e41-b842-c59eb7d0d3f3'
        },*/
        //设置头
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        auth: {
          username: username,
          password: password
        }
      }).then(res => {
        this.users = res.data.data
      })
        .catch(err => {
          console.log(err);
        })

    },
    methods: {
      modifyUser: function () {
        var userId = this.$route.params.id;

        var qs = require('qs');

        var username = this.getCookie('username');
        var password = this.getCookie('password');

        let name = $("input[name='edit-name']").val();
        let password1 = $("input[name='edit-password']").val();
        let password2 = $("input[name='again-password']").val();


        if (name == "") {
          layer.msg("请输入用户名！");
        } else if (password1 == "") {
          layer.msg("请输入密码！");
        } else if (password2 == "") {
          layer.msg("请再次输入密码！");
        } else if (password1 !== password2) {
          layer.msg("两次输入密码不一致！");
        } else {

          this.$axios.patch(this.getIP() + 'users/' + userId, qs.stringify({

            "name": $("input[name='edit-name']").val(),
            "password": $("input[name='edit-password']").val(),
          }), {

            //设置头
            headers: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            auth: {
              username: username,
              password: password
            }
          }).then(res => {
            //this.users = res.data.data
            //console.log(res);
            layer.msg("修改成功！");

            this.$router.replace({path: '/users'})
          }).catch(err => {
            //alert("修改失败！");
            layer.msg("修改失败！");
          })

        }

      },

      formReset: function () {
        $("input").val('');
        this.$router.replace({path: '/users'})

      },
    }
  }
</script>
<style scoped>
  #addUser h3.header-wrapper-modify {
    height:36px;
    padding:2px 6px;
    border-radius: 4px;
    line-height: 36px;
    text-align: center;
    font-size: 24px;
    background-color: #f56954;
    color:#fff;
  }
</style>
