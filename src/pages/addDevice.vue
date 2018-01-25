<template>
    <div id="addUser">
        


        <div class="container-fluid">
            <div id="pad-wrapper" class="new-user">
                <div class="row-fluid header">
                    <h3>创建一个新设备</h3>
                </div>

                <div class="row-fluid form-wrapper">
                    <!-- left column -->
                    <div class="span10 with-sidebar">
                        <div class="container">
                            <form class="new_user_form inline-input" id="myForm"/>
                                <div class="span12 field-box">
                                    <label>设备名:</label>
                                    <input class="span9" type="text" name="add-name"/>
                                    <span class="muststar">*</span>
                                </div>

                                <div class="span12 field-box">
                                    <label>IP:</label>
                                    <input class="span9" type="text" name="add-ip"/>
                                    <span class="muststar">*</span>

                                </div>

                                <div class="span12 field-box">
                                    <label>路径:</label>
                                    <input class="span9" type="text" name="add-path"/>
                                    <span class="muststar">*</span>

                                </div>

                                <div class="span12 field-box">
                                    <label>描述:</label>

                                    <input class="span9" type="text" name="add-des"/>

                                </div>

                                <div class="span7 field-box actions">
                                    <button type="submit" class="btn-glow primary" @click="addUser">创建</button>
                                    <button type="submit" class="btn-glow primary" @click="formReset">取消</button>
                                    <!-- <input type="button" class="btn-glow primary" value="创建" style="width: 100px;" @click="addUser"/>
                                    <span>或</span>
                                    <input type="button" class="btn-glow primary" value="取消" style="width: 100px;" @click="formReset"/> -->
                                    <!-- <input type="reset" value="Cancel" class="reset" /> -->
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
/*let projectId = "5a922835-a587-4dad-b3b7-bb5005ef4c99";*/
/*let projectId = "2ec24245-0f8d-4db5-9d9b-1726ed727057";*/
    export default{

        data(){
            return{

            }
        },
        methods: {
            addUser: function (){
                var qs = require('qs');
                var projectId = this.getCookie('projectId');
                var username = this.getCookie('username');
                var password = this.getCookie('password');
                this.$axios.post('project/'+projectId+'/device',qs.stringify({
                    "name": $("input[name='add-name']").val(),
                    "ip": $("input[name='add-ip']").val(),
                    "path": $("input[name='add-path']").val(),
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
                    this.$router.replace({ path: '/devices'})
                })
                    .catch(err=>{
                        alert("请重新输入用户名！");
                    })
            },

            formReset: function(){
                console.log(document.getElementById("myForm"));
                $("input").val('');
              /*document.getElementById("myForm").reset()*/
            }
        },
        mounted: function(){
            this.$nextTick(function () {
                var $buttons = $(".toggle-inputs button");
                var $form = $("form.new_user_form");

                $buttons.click(function () {
                    var mode = $(this).data("input");
                    $buttons.removeClass("active");
                    $(this).addClass("active");

                    if (mode === "inline") {
                        $form.addClass("inline-input");
                    } else {
                        $form.removeClass("inline-input");
                    }
                });
            })
        }

        
    }
</script>
<style>
.muststar{
    margin-left: 10px;
    color: red;
}
</style>