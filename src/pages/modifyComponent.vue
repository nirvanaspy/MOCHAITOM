<template>
    <div id="addUser">
        <!-- settings changer -->

        <div class="container-fluid">
            <div id="pad-wrapper" class="new-user">
                <div class="row-fluid header">
                    <h3>修改组件</h3>
                </div>

                <div class="row-fluid form-wrapper">
                    <!-- left column -->
                    <div class="span10 with-sidebar">
                        <div class="container">
                            <form class="new_user_form inline-input" />
                                <div v-for="(comp,index) in components" :key="index">
                                    <div class="span12 field-box">
                                    <label>组件名:</label>
                                    <input class="span9" type="text" name="edit-name" :value="comp.name"/>
                                    </div>
                                    
                                    <div class="span12 field-box">
                                      <label>版本:</label>
                                      <input class="span9" type="text" name="edit-version" :value="comp.version"/>
                                    </div>
                                    <div class="span12 field-box">
                                      <label>大小:</label>
                                      <input class="span9" type="text" name="edit-size" :value="comp.size"/>
                                    </div>
                                    
                                    <div class="span12 field-box">
                                      <label>描述:</label>
                                      <input class="span9" type="text" name="edit-des" :value="comp.description"/>
                                    </div>
                                    
                                    <div class="span7 field-box actions">
                                        <input type="button" class="btn-glow primary" value="保存" style="width: 100px;" @click="editComp"/>
                                    </div>
                                </div>  
                            </form>
                        </div>
                    </div>


                </div>
            </div>
        </div>

        <hr/>
        <div>
            {{components}}
        </div>

        <hr/>
        <div>
            {{components.data}}
        </div>
    </div>
</template>

<script>
    export default{
        /* eslint-disable */
        data(){
            return{
                components:[]
            }
        },created(){
            var compId = this.$route.params.id;
            //alert(compId);
            console.log(compId);
            this.$axios.get('components/' + compId,{
                
                //设置头
                headers:{
                    'content-type':'application/x-www-form-urlencoded'
                },
                auth: {
                    username: 'admin',
                    password: 'admin'
                }
            }).then(res=>{
                this.components = res.data;
                console.log(this.components);
            })
            .catch(err=>{
                console.log(err);
            })

        },
        
        methods: {
            editComp: function (){
                var id = $("input[name='edit-id']").val();
                //alert(id);
                var qs = require('qs');
                this.$axios.patch('devices/'+id ,qs.stringify({
                    "id": $("input[name='edit-id']").val(),
                    "name": $("input[name='edit-name']").val(),
                    "ip": $("input[name='edit-ip']").val(),
                    "description": $("input[name='edit-des']").val()
                }),{
                    /*params:{  //get请求在第二个位置，post在第三个位置
                     ID: $("input[name='edit-id']").val()
                    },*/
                    //设置头
                    headers:{
                        'content-type':'application/x-www-form-urlencoded'
                    },
                    auth: {
                        username: 'admin',
                        password: 'admin'
                    }
                }).then(res=>{
                    //this.users = res.data.data
                    //console.log(res);
                    this.$router.replace({ path: '/devices'})
                }).catch(err=>{
                    alert("请重新输入用户名！");
                })
            }
        }/*,
        mounted(){
            let sendData = {
                token:this.token,
                id:this,data_id
            }
        }*/
    }
</script>
<style>

</style>
