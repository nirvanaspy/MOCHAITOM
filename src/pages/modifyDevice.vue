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
              <div v-for="(device,index) in devices" :key="index">

                  <div class="span12 field-box">
                    <label></label>
                    <input class="span9" type="hidden" name="edit-id" :value="device.id"/>
                  </div>

                  <div class="span12 field-box">
                    <label>设备名:</label>
                    <input class="span9" type="text" name="edit-name" :value="device.name"/>
                  </div>
                  
                  <div class="span12 field-box">
                    <label>IP:</label>
                    <input class="span9" type="text" name="edit-ip" :value="device.ip"/>
                  </div>
                  
                  <div class="span12 field-box">
                    <label>描述:</label>
                    <input class="span9" type="text" name="edit-des" :value="device.description"/>
                  </div>
                  
                  <div class="span7 field-box actions">
                    <input type="button" class="btn-glow primary" value="保存" style="width: 100px;" @click="editDevice"/>
                  </div>  
              </div>  

              </form>
            </div>
          </div>

          <hr/>
          <div>
              {{devices}}
          </div>


        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import devices from '@/pages/devices'
export default{

        data(){
            return{
                devices:[]
            }
        },/*created(){
            this.$axios.get('devices',{
                //设置头
                headers:{
                    'content-type':'application/x-www-form-urlencoded'
                },
                auth: {
                    username: 'admin',
                    password: 'admin'
                }
            }).then(res=>{
                this.devices = res.data.data
            })
            .catch(err=>{
                console.log(err);
            })

        },*/
        methods: {

          modifyDevice: function (event){
                //alert("A");
                var e = event || window.event;
                //alert("B");
                var target = e.target || e.srcElement;
                if (target.parentNode.parentNode.parentNode.parentNode.tagName.toLowerCase() == "td") {
                    //alert("C");
                    var rowIndex = target.parentNode.parentNode.parentNode.parentNode.parentNode.rowIndex;
                    //alert(rowIndex);
                    var id = document.getElementById("table_value").rows[rowIndex].cells[0].innerHTML;
                    //alert(id);
                    var qs = require('qs');
                    this.$axios.get('devices/'+id,
                      {
                          //设置头
                          headers:{
                              'content-type':'application/x-www-form-urlencoded'
                          },
                          auth: {
                              username: 'admin',
                              password: 'admin'
                          }
                      }).then(res=>{
                          console.log(res);
                      })
                      .catch(err=>{
                          console.log(err);
                      })
                }
                
            },


            editDevice: function (){
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
        }
    }
</script>
<style>

</style>