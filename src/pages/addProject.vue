<template>
    <div id="addUser">
        


        <div class="container-fluid">
            <div id="pad-wrapper" class="new-user">
                <div class="row-fluid header">
                    <h3>创建项目</h3>
                </div>

                <div class="row-fluid form-wrapper">
                    <!-- left column -->
                    <div class="span10 with-sidebar">
                        <div class="container">
                            <form class="new_user_form inline-input" />
                            <div class="span12 field-box">
                                <label>项目名:</label>
                                <input class="span9" type="text" name="add-name"/>
                            </div>

                            <div class="span12 field-box">
                                <label>描述:</label>

                                <input class="span9" type="text" name="add-des"/>

                            </div>

                            <div class="span7 field-box actions">
                                <input type="button" class="btn-glow primary" value="创建" style="width: 100px;" @click="addUser"/>
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
let projectId = "5d0bccf0-1298-4be9-bcfa-2fc5571d9460";
    export default{

        data(){
            return{

            }
        },
        methods: {
            addUser: function (){
                var qs = require('qs');
                this.$axios.post('project/',qs.stringify({
                    "name": $("input[name='add-name']").val(),
                    "description": $("input[name='add-des']").val()
                }),{
                   
                    //设置头
                    headers:{
                        'content-type':'application/x-www-form-urlencoded'
                    },
                    auth: {
                        username: 'admin',
                        password: 'admin'
                    }
                }).then(res=>{

                    this.$router.replace({ path: '/selectProject'})
                })
                    .catch(err=>{
                        alert("请重新输入！");
                    })
            }
        }
    }
</script>
<style>

</style>