<template>
	<div id="addUser">

		<div class="container-fluid">
            <div id="pad-wrapper" class="new-user">
                <div class="row-fluid header">
                    <h3 class="header-wrapper-modify">修改密码</h3>
                </div>

                <div class="row-fluid form-wrapper">
                    <!-- left column -->
                    <div class="span10">
                        <div class="container">
                            <form class="new_user_form inline-input" />

                                <div class="span12 field-box">
                                    <label>新密码:</label>
                                    <input class="span9" type="password" id="edit-newPassword"/>
                                </div>

                                <div class="span12 field-box" style="margin-top: -11px;">
                                    <label>再次输入密码:</label>
                                    <input class="span9" type="password" id="again-password" />
                                </div>

                                <div class="span7 field-box actions">
                                		<input type="button" class="btn-flat primary" value="修改"  @click="modifyUser"/>
                                    <input type="button" class="btn-flat danger" value="取消"  @click="formReset"/>
                                </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
	</div>
</template>

<script>
    export default{
        /* eslint-disable */
        data(){
            return{
                users:[]
            }
        },created(){
            let username = this.getCookie('username');
            let password = this.getCookie('password');

            this.$axios.get(this.getIP() + 'users/'+this.$route.params.id,{
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
                this.users = res.data.data
            })
            .catch(err=>{
                console.log(err);
            })

        },
        methods:{
           modifyUser: function (){
               let reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
               let userId = this.$route.params.id;

               let qs = require('qs');

               let username = this.getCookie('username');
               let password = this.getCookie('password');

                let newPassword=$("input[id='edit-newPassword']").val();
                let newPasswordAgain=$("input[id='again-password']").val();


               if(newPassword == ""){
                    layer.msg("请输入新密码！");
                }else if(newPasswordAgain == ""){
                    layer.msg("请再次输入密码！");
                }else if(!reg.test(newPassword)) {
                    layer.msg("密码必须是大小写英文字母和数字混合，至少6位!");
               } else if(newPassword !== newPasswordAgain){
                    layer.msg("两次输入密码不一致！");
                }else{

                    this.$axios.patch(this.getIP() + 'admin/users/' + userId + '/changepassword',qs.stringify({

                        "password": $("input[id='edit-newPassword']").val(),
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
                        layer.msg("修改成功！");

                        this.$router.replace({ path: '/users'})
                    }).catch(err=>{
                        //alert("修改失败！");
                        layer.msg("修改失败！");
                    })

                }

            },

            formReset: function(){
                $("input").val('');
                this.$router.replace({ path: '/users'})

            },
        }
    }
</script>
<style scoped>
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
  div.row-fluid.header {
    margin-bottom: 30px;
  }
  div.span12.field-box label {
    padding-top: 4px;
  }
</style>
