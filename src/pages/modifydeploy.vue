<template>

  <div class="container-fluid">
    <div id="pad-wrapper" class="new-user">
      <div class="row-fluid header">
        <h3>修改部署设计信息</h3>
      </div>

      <div class="row-fluid form-wrapper">
        <!-- left column -->
        <div class="span10 with-sidebar">
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

                    <button type="submit" class="btn-glow primary" @click="modifyDeploy">保存</button>
                    <!--<input type="button" class="btn-glow primary" value="保存" style="width: 100px;" @click="modifyDevice"/>-->
                    <button type="submit" class="btn-glow primary" @click="formReset">取消</button>
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
export default{

        data(){
            return{
                deployplans:[]
            }
        },created(){
            var deployPlanId = this.$route.params.id;  //所选择的部署设计的id
            //console.log(deployPlanId);

            this.$axios.get(this.getIP() + 'deployplan/' + deployPlanId,{
                //设置头
                headers:{
                    'content-type':'application/x-www-form-urlencoded'
                },
                auth: {
                    username: 'admin',
                    password: 'admin'
                }
            }).then(res=>{
                this.deployplans = res.data.data;

                document.getElementById("edit-name").value = res.data.data.name;
                document.getElementById("edit-des").value = res.data.data.description;
            })
            .catch(err=>{
                console.log(err);
            })

        },
        methods: {

            modifyDeploy: function (){
                let deployPlanId = this.$route.params.id;

                let username = this.getCookie('username');
                let password = this.getCookie('password');

                let qs = require('qs');
                this.$axios.patch(this.getIP() + 'deployplan/'+deployPlanId ,qs.stringify({

                    "name": $("input[id='edit-name']").val(),
                    "description": $("input[id='edit-des']").val()
                }),{

                    //设置头
                    headers:{
                        'content-type':'application/x-www-form-urlencoded'
                    },
                    auth: {
                        username: username,
                        password: password
                    }
                }).then(res=>{
                    //this.users = res.data.data
                    //console.log(res);
                    this.$router.replace({ path: '/deployplan'})
                }).catch(err=>{
                    alert("修改失败！");
                })
            },

            formReset: function(){
              $("input").val('');
              this.$router.replace({ path: '/deployplan'})

            }
        }
    }
</script>
<style>
  .muststar{
    margin-left: 10px;
    color: red;
  }
</style>
