<template>
	<!-- main container -->
    <div>
        <div class="container-fluid">
            <div id="pad-wrapper" class="users-list">
                <div class="row-fluid header">
                    <a class="header-wrapper">
                      <span class="text">用户</span>
                      <i class="icon icon-group"></i>
                    </a>
                    <div class="span10 pull-right">
                      <input class="search" type="text" placeholder="用户名.." v-model="searchQuery"/>

                        <router-link to="/addUser" class="btn-flat success pull-right">
                            <span>&#43;</span>
                            新增
                        </router-link>
                        <!-- <router-link to="/xy1">
                            <i class="icon-home"></i>
                            <span>XY1</span>
                        </router-link> -->
                    </div>
                </div>

                <!-- Users table -->
                <div class="row-fluid table tabletable">
                    <table class="table table-hover" id="table_value">
                        <thead>
                            <tr>
                                <th class="span4 sortable">
                                    用户名
                                </th>
                                <!--<th class="span3 sortable">
                                    <span class="line"></span>密码
                                </th>-->
                                <th class="span3">
                                    <span class="line"></span>操作
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        <!-- row -->

                        <!-- 普通用户 -->
                        <tr class="first" v-if="users.length==0">
                          <td style="display:none">{{self.id}}</td>
                          <td>
                            {{self.username}}
                          </td>

                          <td>

                            <ul class="ulactions">

                              <li>
                                <router-link :to='{name:"modifyPasswordSelf",params:{id:self.id}}'>
                                  <input type="button" class="btn-flat primary" value="修改"/>
                                </router-link>
                              </li>

                              <li>
                                <input type="button" class="btn-flat danger" value="删除" @click="deleteUser($event)" disabled="disabled"/>
                              </li>

                            </ul>
                          </td>
                        </tr>

                        <!-- 管理员 -->
                        <tr class="first" v-for="(user,index) in usersA" :id="user.id" v-else>
                          <td style="display:none">{{user.id}}</td>
                          <td>
                            {{user.username}}
                          </td>

                          <td>

                            <ul class="ulactions">
                              <li v-if="user.username != 'admin'">
                                <router-link :to='{name:"modifyPasswordAdmin",params:{id:user.id}}'>
                                  <input type="button" class="btn-flat primary" value="修改"/>
                                </router-link>
                              </li>
                              <!--<li v-else>
                                <router-link :to='{name:"modifyPasswordAdmin",params:{id:user.id}}'>
                                  <input type="button" class="disabled-btn btn-flat gray" value="修改" disabled="disabled"/>
                                </router-link>
                              </li>-->
                              <li v-else>
                                <!--<el-alert class="admin-warning"
                                  :closable="false"
                                  title="管理员用户"
                                  type="error">
                                </el-alert>-->
                                <span class="admin-warning" id="adminWarning">
                                管理员用户
                                </span>
                              </li>

                              <li v-if="user.username != 'admin'">
                                <input type="button" class="btn-flat danger" value="删除" @click="deleteUser($event)"/>
                              </li>
                              <!--<li v-else>
                                <input type="button" class="disabled-btn btn-flat gray" value="删除" @click="deleteUser($event)" disabled="disabled"/>
                              </li>-->

                            </ul>
                          </td>
                        </tr>


                        <!-- row -->

                        </tbody>
                    </table>
                </div>

            </div>
        </div>
       <!-- <hr/>
        <div>
            {{users}}
        </div>
      <div>
        {{self}}
      </div>-->
    </div>
</template>

<script>
    export default{
        /* eslint-disable */
        data(){
            return{
                users:[],
                searchQuery: '',
                username: '',
                self:[]
            }
        },created(){
            this.username = this.getCookie('username');
            let password = this.getCookie('password');
            let userId = this.getCookie('userId');

            //this.users.push({userWho: this.username});
            //this.users.userWho == this.username;
        console.log(this.users.length);

            if(this.username == "admin"){  //管理员
              //alert("管理员");
              this.$axios.get(this.getIP() + 'admin/users',{

                //设置头
                headers:{
                  'content-type':'application/x-www-form-urlencoded'
                },
                auth: {
                  username: this.username,
                  password: password
                }
              }).then(res=>{
                this.users = res.data.data
              })
              .catch(err=>{
                console.log(err);
              })
            }else{    //普通用户
              console.log(this.users.length);
              //alert("普通用户");
              this.$axios.get(this.getIP() + 'users/' + userId,{

                //设置头
                headers:{
                  'content-type':'application/x-www-form-urlencoded'
                },
                auth: {
                  username: this.username,
                  password: password
                }
              }).then(res=>{
                this.self = res.data.data
              })
                .catch(err=>{
                  console.log(err);
                })

            }
        },
        methods:{
          deleteUser: function (event){

                var e = event || window.event;

                var target = e.target || e.srcElement;

                var msg = "您确定删除吗？";

                let username = this.getCookie('username');
                let password = this.getCookie('password');

                if (confirm(msg) == true) {

                    if (target.parentNode.parentNode.parentNode.tagName.toLowerCase() == "td") {
                        //alert("C");
                        var rowIndex = target.parentNode.parentNode.parentNode.parentNode.rowIndex;
                        //alert(rowIndex);
                        var id = document.getElementById("table_value").rows[rowIndex].cells[0].innerHTML;
                        //alert(id);
                        var qs = require('qs');
                        this.$axios.delete(this.getIP() + 'admin/users/'+id,{

                            //设置头
                            headers:{
                                'content-type':'application/x-www-form-urlencoded'
                            },
                            auth: {
                              username: username,
                              password: password
                            }
                        }).then(res=>{
                            layer.msg("删除成功");

                            this.$axios.get(this.getIP() + 'admin/users',{

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
                        }).catch(err=>{
                            alert("删除失败！");
                        })
                    }

                } else {
                    return false;
                }

            },

        },
        computed: {

          usersA: function () {
            //let username = this.getCookie('username');

            if(this.username == "admin"){
              let self = this;
              return self.users.filter(function (item) {
                return item.username.toLowerCase().indexOf(self.searchQuery.toLowerCase()) !== -1;
              })
            }

          }
        }
    }
</script>
<style>
  .ulactions{
    margin: 5px 0 0 0;
  }
 /* div.el-alert.admin-warning {
    width:114px ;
    margin-left:-1px;
    background-color: #ffe9e9;
  }*/
  span#adminWarning{
    display:inline-block;
    box-sizing:border-box;
    width:114px;
    margin-left:-1px;
    height:36px;
    line-height:36px;
    border-radius:4px;
    background-color: #ffe9e9;
    color:#f56c6c;
    text-align:center;
  }

  .ulactions li{
    display: inline;
  }
  input.disabled-btn:hover{
    color:rgb(177, 177, 177)
  }
</style>
