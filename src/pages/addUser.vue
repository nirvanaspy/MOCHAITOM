<template>
  <div id="addUser">
    <div class="container-fluid">
      <div id="pad-wrapper" class="new-user">
        <div class="row-fluid header">
          <h3 class="header-wrapper-add">创建一个新用户</h3>
        </div>
        <div class="row-fluid form-wrapper">
          <!-- left column -->
          <div class="span10">
            <div class="container">
              <form class="new_user_form inline-input"/>
              <div class="span12 field-box">
                <label>用户名:</label>
                <input class="span9" type="text" name="add-name"/>
                <span class="muststar">*</span>
              </div>

              <div class="span12 field-box">
                <label>密码:</label>
                <input class="span9" type="password" name="add-password"/>
                <span class="muststar">*</span>
              </div>

              <div class="span12 field-box" style="margin-top: -11px;">
                <label>再次输入:</label>
                <input class="span9" type="password" name="again-password"/>
                <span class="muststar">*</span>
              </div>

              <div class="span7 field-box actions">
                <input type="button" class="btn-flat primary" value="创建" @click="addUser"/>
                <button type="submit" class="btn-flat danger" @click="formReset">取消</button>
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
      return {}
    },
    methods: {
      addUser: function () {
        var qs = require('qs');
        var reg1 = /^[a-zA-Z]{6,}$/;
        var reg2 = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

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
        } else if (!reg1.test(username)) {
          layer.msg("用户名必须是英文字母，至少6位")
        } else if (!reg2.test(password)) {
          layer.msg('密码必须是大小写英文字母和数字混合，至少6位！')
        }
          else {
          this.$axios.post(this.getIP() + 'users', qs.stringify({
            "username": $("input[name='add-name']").val(),
            "password": $("input[name='add-password']").val()
          }), {

            params: {  //get请求在第二个位置，post在第三个位置
              isAdmin: false
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
<style scoped>
  #addUser h3.header-wrapper-add {
    height:36px;
    padding:2px 6px;
    border-radius: 4px;
    line-height: 36px;
    text-align: center;
    font-size: 24px;
    background-color: #f56954;
    color:#fff;
  }
  #addUser div.row-fluid.header {
    margin-bottom:40px;
  }
  #addUser div.row-fluid label{
    width:80px;
    height:20px;
    line-height:20px;
    margin:2px 0 0 0;
  }
  #addUser div.row-fluid input.span9{
    width:84%;
  }
  #addUser div.row-fluid div.actions {
    padding-right: 50px;
  }
  .muststar {
    margin-left: 10px;
    color: red;
  }
</style>
