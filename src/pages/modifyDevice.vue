<template>
  <div id="addUser">

    <div class="container-fluid">
      <div id="pad-wrapper" class="new-user">
        <div class="row-fluid header">
          <h3>修改设备信息</h3>
        </div>

        <div class="row-fluid form-wrapper">
          <!-- left column -->
          <div class="span10 with-sidebar">
            <div class="container">
              <form class="new_user_form inline-input"/>


                  <div class="span12 field-box">
                    <label>设备名:</label>
                    <input class="span9" type="text" name="edit-name" :value="device.name"/>
                  </div>
                  
                  <div class="span12 field-box">
                    <label>IP:</label>
                    <input class="span9" type="text" name="edit-ip" :value="device.ip"/>
                  </div>

                  <div class="span12 field-box">
                    <label>路径:</label>
                    <input class="span9" type="text" name="edit-path" :value="device.path"/>
                  </div>
                  
                  <div class="span12 field-box">
                    <label>描述:</label>
                    <input class="span9" type="text" name="edit-des" :value="device.description"/>
                  </div>
                  
                  <div class="span7 field-box actions">
                    <input type="button" class="btn-glow primary" value="保存" style="width: 100px;" @click="modifyDevice"/>
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
export default{

        data(){
            return{
                device:[]
            }
        },
        created(){
            var deviceId = this.$route.params.id;  //所选择的部署设计的id
            console.log(deviceId);

            this.$axios.get('devices/' + deviceId,{
                //设置头
                headers:{
                    'content-type':'application/x-www-form-urlencoded'
                },
                auth: {
                    username: 'admin',
                    password: 'admin'
                }
            }).then(res=>{
                this.device = res.data.data
            })
            .catch(err=>{
                console.log(err);
            })

        },
        methods: {

            modifyDevice: function (){
                var deviceId = this.$route.params.id;

                var username = this.getCookie('username');
                var password = this.getCookie('password');

                var qs = require('qs');
                this.$axios.patch('devices/' + deviceId ,qs.stringify({

                    "name": $("input[name='edit-name']").val(),
                    "ip": $("input[name='edit-ip']").val(),
                    "path": $("input[name='edit-path']").val(),
                    "description": $("input[name='edit-des']").val()
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
                    this.$router.replace({ path: '/devices'})
                }).catch(err=>{
                    alert("修改失败！");
                })
            }
        }
    }
</script>
<style>

</style>