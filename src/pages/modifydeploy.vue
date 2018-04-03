<template>

  <div class="container-fluid">
    <div id="pad-wrapper" class="new-user">
      <div class="row-fluid header">
        <h3 class="header-wrapper-modify">修改部署设计信息</h3>
      </div>

      <div id="modifydeploy" class="row-fluid form-wrapper">
        <!-- left column -->
        <div class="span10">
          <div class="container">
            <form class="new_user_form inline-input">

              <!-- <div v-for="(deployplan,index) in deployplans"> -->
              <div class="span12 field-box">
                <label>名称:</label>
                <input class="span9" type="text" id="edit-name"/>
                <span class="muststar">*</span>
              </div>


              <div class="span12 field-box">
                <label>描述:</label>
                <input class="span9" type="text" id="edit-des"/>
              </div>


              <div class="span7 field-box actions">

                <button type="submit" class="btn-flat primary" @click="modifyDeploy">保存</button>
                <!--<input type="button" class="btn-glow primary" value="保存" style="width: 100px;" @click="modifyDevice"/>-->
                <button type="submit" class="btn-flat danger" @click="formReset">取消</button>
              </div>
              <!-- </div> -->

            </form>
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
        deployplans: []
      }
    }, created() {

      let username = this.getCookie('username');
      let password = this.getCookie('password');

      var deployPlanId = this.$route.params.id;  //所选择的部署设计的id
      //console.log(deployPlanId);

      this.$axios.get(this.getIP() + 'deploymentdesigns/' + deployPlanId, {
        //设置头
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        auth: {
          username: username,
          password: password
        }
      }).then(res => {
        this.deployplans = res.data.data;

        document.getElementById("edit-name").value = res.data.data.name;
        document.getElementById("edit-des").value = res.data.data.description;
      })
        .catch(err => {
          console.log(err);
        })

    },
    methods: {

      modifyDeploy: function () {
        let deployPlanId = this.$route.params.id;

        let username = this.getCookie('username');
        let password = this.getCookie('password');

        let qs = require('qs');
        this.$axios.patch(this.getIP() + 'deploymentdesigns/' + deployPlanId, qs.stringify({

          "name": $("input[id='edit-name']").val(),
          "description": $("input[id='edit-des']").val()
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
          this.$router.replace({path: '/deployplan'})
        }).catch(err => {
          alert("修改失败！");
        })
      },

      formReset: function () {
        $("input").val('');
        this.$router.replace({path: '/deployplan'})

      }
    }
  }
</script>
<style>
  .muststar {
    margin-left: 10px;
    color: red;
  }
  h3.header-wrapper-modify {
    height:36px;
    padding:2px 6px;
    border-radius: 4px;
    line-height: 36px;
    text-align: center;
    font-size: 24px;
    background-color: #f56954;
    color:#fff;
  }
  #modifydeploy label{
    width:40px;
    height:20px;
    line-height:20px;
    margin:4px 4px 0 0;
  }
  #modifydeploy input.span9 {
    width:80%;
  }
  #modifydeploy .span7.actions {
    padding-right: 110px;
  }
</style>
