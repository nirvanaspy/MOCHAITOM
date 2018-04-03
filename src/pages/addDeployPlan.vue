<template>
    <div id="addUser">
        <div class="container-fluid">
            <div id="pad-wrapper" class="new-user">
                <div class="row-fluid header">
                  <h3 class="header-wrapper-add">
                    创建一个新部署设计
                  </h3>
                </div>
                <div class="row-fluid form-wrapper">
                    <!-- left column -->
                    <div class="span10">
                        <div class="container">
                            <form class="new_user_form inline-input" />
                            <div class="span12 field-box">
                                <label>名称:</label>
                                <input class="span9" type="text" name="add-name"/>
                                <span class="muststar">*</span>
                            </div>
                            <div class="span12 field-box">
                                <label>描述:</label>
                                <input class="span9" type="text" name="add-des"/>
                            </div>
                            <div class="span7 field-box actions">
                                <button type="submit" class="btn-flat primary" @click="addDeployPlan">创建</button>
                                <button type="submit" class="btn-flat danger" @click="formReset">取消</button>
                                <!-- <input type="button" class="btn-glow primary" value="创建" style="width: 100px;" @click="addDeployPlan"/> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
/*let projectId = "5a922835-a587-4dad-b3b7-bb5005ef4c99";
let projectId = "2ec24245-0f8d-4db5-9d9b-1726ed727057";*/
    export default{

        data(){
            return{

            }
        },
        methods: {
            addDeployPlan: function (){
                var qs = require('qs');
                var projectId = this.getCookie('projectId');
                var username = this.getCookie('username');
                var password = this.getCookie('password');
                this.$axios.post(this.getIP() +'projects/'+projectId+'/deploymentdesigns',qs.stringify({
                    "name": $("input[name='add-name']").val(),
                    "description": $("input[name='add-des']").val()
                }),{
                    /*params:{  //get请求在第二个位置，post在第三个位置
                     ID:'c02da6e9-a334-4e41-b842-c59eb7d0d3f3'
                     },*/
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
                })
                    .catch(err=>{
                      layer.msg("请输入名称！");
                    })
            },

            formReset: function(){
                $("input").val('');
                this.$router.replace({ path: '/deployplan'});
            }

        }
    }
</script>
<style scoped>
  .muststar{
    margin-left: 10px;
    color: red;
}
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
    width:40px;
    height:20px;
    line-height:20px;
    margin:2px 0 0 0;
  }
  #addUser div.row-fluid input{
    width:84%;
  }
</style>
