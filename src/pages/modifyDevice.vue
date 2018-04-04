<template>
  <div id="addUser">
    <div class="container-fluid">
      <div id="pad-wrapper" class="new-user">
        <div class="row-fluid header">
          <h3 class="header-wrapper-modify">修改设备信息</h3>
        </div>
        <div class="row-fluid form-wrapper">
          <!-- left column -->
          <div class="span10">
            <div class="container">
              <form class="new_user_form inline-input">


                <div class="span12 field-box">
                  <label>设备名:</label>
                  <input class="span9" type="text" id="edit-name"/>
                  <span class="muststar">*</span>
                </div>

                <div class="span12 field-box">
                  <label>IP:</label>
                  <input class="span9" type="text" id="edit-ip"/>
                  <span class="muststar">*</span>
                </div>

                <div class="span12 field-box">
                  <label>路径:</label>
                  <input class="span9" type="text" id="edit-path" placeholder="只填写盘符如： F:/ ； 填写盘符加文件夹如： F:/test/"/>
                  <span class="muststar">*</span>
                </div>

                <div class="span12 field-box">
                  <label>描述:</label>
                  <input class="span9" type="text" id="edit-des"/>
                </div>

                <div class="span7 field-box actions">

                  <button type="submit" class="btn-flat primary" @click="modifyDevice">保存</button>
                  <!--<input type="button" class="btn-glow primary" value="保存" style="width: 100px;" @click="modifyDevice"/>-->
                  <button type="submit" class="btn-flat danger" @click="formReset">取消</button>
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
  /* eslint-disable */
  export default {

    data() {
      return {
        device: []
      }
    },
    created() {
      let username = this.getCookie('username');
      let password = this.getCookie('password');

      var deviceId = this.$route.params.id;  //所选择的部署设计的id
      console.log(deviceId);

      this.$axios.get(this.getIP() + 'devices/' + deviceId, {
        //设置头
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        auth: {
          username: username,
          password: password
        }
      }).then(res => {
        this.device = res.data.data;

        document.getElementById("edit-name").value = res.data.data.name;
        document.getElementById("edit-ip").value = res.data.data.ip;
        document.getElementById("edit-path").value = res.data.data.deployPath;
        document.getElementById("edit-des").value = res.data.data.description;
      })
        .catch(err => {
          console.log(err);
        })

    },
    methods: {

      modifyDevice: function () {
        let deviceId = this.$route.params.id;

        let username = this.getCookie('username');
        let password = this.getCookie('password');

        let qs = require('qs');

        let name = $("input[id='edit-name']").val();
        let ip = $("input[id='edit-ip']").val();
        let path = $("input[id='edit-path']").val();
        let description = $("input[id='edit-des']").val();

        let pattern = /^([a-zA-Z]:(\\))([a-zA-Z]*)|(\/([a-zA-Z]+))*\/$/;

        //ip地址
        let exp = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
        let reg = ip.match(exp);

        //debugger;

        if ((name.length != 0) && (ip.length != 0) && (path.length != 0)) {

          if (!((path).match(pattern))){
            layer.msg("路径格式不正确!");
          }else if (reg == null) {
            layer.msg('IP地址不合法！');
          }else{
            this.$axios.patch(this.getIP() + 'devices/' + deviceId, qs.stringify({

              "name": name,
              "ip": ip,
              "deployPath": path,
              "description": description
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
              layer.msg("保存成功！");
              this.$router.replace({path: '/devices'})
            }).catch(err => {
              layer.msg("修改失败, 请检查ip是否重复！");
            })
          }

        } else {
          layer.msg("请输入必填项");
        }

      },

      formReset: function () {
        $("input").val('');
        this.$router.replace({path: '/devices'})

      }
    }
  }
</script>
<style>
  .muststar {
    margin-left: 10px;
    color: red;
  }
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
