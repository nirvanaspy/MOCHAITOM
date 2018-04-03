<template>
    <div id="addUser" class="signin">


        <div class="container-fluid" style="height:window.innerWidth">
            <div id="pad-wrapper" class="new-user">
                <div class="row-fluid header">
                    <h3>创建项目</h3>
                </div>

                <div class="row-fluid form-wrapper">
                    <!-- left column -->
                    <div class="span10">
                        <div class="container">
                            <form class="new_user_form inline-input" />
                                <div class="span12 field-box">
                                    <label>项目名:</label>
                                    <input class="span9" type="text" name="add-name"/>
                                    <span class="muststar">*</span>

                                </div>

                                <div class="span12 field-box">

                                    <label>描述:</label>
                                    <input class="span9" type="text" name="add-des"/>

                                </div>

                                <div class="span7 field-box actions">
                                    <button type="submit" class="btn-flat primary" @click="addProject($event)">创建</button>
                                    <button type="submit" class="btn-flat danger" @click="formReset">取消</button>
                                    <!-- <input type="button" class="btn-glow primary" value="添加组件" style="width: 100px;" @click="addComp($event)"/> -->
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
//let projectId = "5d0bccf0-1298-4be9-bcfa-2fc5571d9460";
    export default{

        data(){
            return{

            }
        },
        created() {

          //$("body").css("background-image", "url('img/bgs/10.jpg')");

        },
        methods: {
            addProject: function (){
                var qs = require('qs');
                var projectId = this.getCookie('projectId');
                var username = this.getCookie('username');
                var password = this.getCookie('password');
                this.$axios.post(this.getIP() +'projects',qs.stringify({
                    "name": $("input[name='add-name']").val(),
                    "description": $("input[name='add-des']").val()
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
                    layer.msg('添加成功！');
                    this.$router.replace({ path: '/selectProject'})
                })
                    .catch(err=>{
                       // alert("请重新输入！");
                        layer.msg('请输入项目名称！');

                    })
            },
            formReset: function(){
                $("input").val('');
                this.$router.replace({ path: '/selectProject'});
            }
        }
    }
</script>
<style scoped>

  .signin{
    background-image: url('../../img/bgs/10.jpg');
    height: 100%;
  }

    .muststar{
        margin-left: 10px;
        color: red;
    }

    .new-user .actions {
    margin-top: 30px;
    text-align: right;
    padding-right: 123px;
}
</style>
