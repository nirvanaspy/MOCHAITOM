<template>
	<!-- main container -->
    <div>
        <div class="container-fluid">
            <div id="pad-wrapper" class="users-list">
                <div class="row-fluid header">
                    <h3>部署设计</h3>
                    <div class="span10 pull-right">
                        <input class="search" type="text" placeholder="部署设计名称.." v-model="searchQuery"/>

                        <div class="ui-dropdown">
                            <div class="head" data-toggle="tooltip" title="Click me!">
                                Filter users
                                <i class="arrow-down"></i>
                            </div>
                            <div class="dialog">
                                <div class="pointer">
                                    <div class="arrow"></div>
                                    <div class="arrow_border"></div>
                                </div>
                                <div class="body">
                                    <p class="title">
                                        Show users where:
                                    </p>
                                    <div class="form">
                                        <select>
                                            <option />Name
                                            <option />Email
                                            <option />Number of orders
                                            <option />Signed up
                                            <option />Last seen
                                        </select>
                                        <select>
                                            <option />is equal to
                                            <option />is not equal to
                                            <option />is greater than
                                            <option />starts with
                                            <option />contains
                                        </select>
                                        <input type="text" />
                                        <a class="btn-flat small">Add filter</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <router-link to="/addDeployPlan" class="btn-flat success pull-right">
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
                               名称
                            </th>
                            <th class="span3">
                                <span class="line"></span>描述
                            </th>
                            <th class="span3">
                                <span class="line"></span>绑定详情
                            </th>
                            <th class="span3">
                                <span class="line"></span>操作
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <!-- row -->
                        <tr class="first" v-for="(deployplan,index) in deployplansA" :key="index">
                            <td style="display:none">{{deployplan.id}}</td>
                            <td>
                                {{deployplan.name}}
                            </td>
                            <td class="description">
                                {{deployplan.description}}
                            </td>
                            <td>
                                <ul class="ulactions">
                                    <li>
                                        <router-link :to='{name:"deployplanDetail",params:{id:deployplan.id}}'>
                                            <input type="button" class="btn-flat primary" value="查看"/>
                                        </router-link>
                                    </li>
                                </ul>
                            </td>
                            <td>
                                <ul class="ulactions">
                                    <li>
                                        <router-link :to='{name:"deploybind",params:{id:deployplan.id}}'>
                                         <input type="button" class="btn-flat primary" value="设计"/>
                                        </router-link>
                                    </li>
                                    <li>
                                        <router-link :to='{name:"modifyDeploy",params:{id:deployplan.id}}'>
                                         <input type="button" class="btn-flat primary" value="修改"/>
                                        </router-link>
                                    </li>
                                    <li>
                                        <input type="button" class="btn-flat primary" value="删除" @click="deleteDeploy($event)"/>
                                    </li>
                                    <li class="last">
                                      <!--<input type="button" class="btn-flat primary" value="基线" @click="makeBaseline($event)"/>-->
                                      <input type="button" class="btn-flat info" data-toggle="modal" value="基线" @click="makeBaseline($event)"/>
                                    </li>
                                </ul>
                            </td>

                        </tr>
                        <!-- row -->

                        </tbody>
                    </table>
                </div>
                <div class="pagination pull-right">
                    <ul>
                        <li><a href="#">&#8249;</a></li>
                        <li><a class="active" href="#">1</a></li>
                        <li><a href="#">2</a></li>
                        <li><a href="#">3</a></li>
                        <li><a href="#">4</a></li>
                        <li><a href="#">5</a></li>
                        <li><a href="#">&#8250;</a></li>
                    </ul>
                </div>
                <!-- end users table -->

              <div class="modal fade" id="modal-name">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="formReset">
                        <span aria-hidden="true">&times;</span></button>
                      <h4 class="modal-title">请填写基线名称：</h4>
                    </div>
                    <div class="modal-body">
                      <!-- form start -->
                      <form class="form-horizontal"/>
                        <div style="margin-top: 23px;margin-left: 30px;">
                          <span>名称:</span>
                          <input type="text" id="input-name" name='input-name' style="height:20px">
                        </div>

                        <div class="pull-right" style="margin-left: 148px;margin-top: 22px;">
                          <button type="submit" class="btn-glow flat" @click="makeBaseline2">确认</button>
                          <button type="submit" class="btn-glow flat" @click="formReset">取消</button>
                        </div>
                      </form>

                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
        <!-- <hr/>
        <div>
            {{deployplans}}
        </div> -->
    </div>
</template>

<script>
/* eslint-disable */

export default{

    data(){
        return{
            deployplans:[],
            searchQuery: '',
            depid: ''          //所选择的部署设计的id
        }
    },
    created(){
        var projectId = this.getCookie('projectId');
        var username = this.getCookie('username');
        var password = this.getCookie('password');

        this.$axios.get(this.getIP() +'projects/'+projectId+'/deploymentdesigns',{
            //设置头
            headers:{
                'content-type':'application/x-www-form-urlencoded'
            },
            auth: {
                username: username,
                password: password
            }
        }).then(res=>{
            this.deployplans = res.data.data;
            console.log(this.deployplans);
        })
        .catch(err=>{
            console.log(err);
        })

    },
    methods: {
        deleteDeploy: function (event){
              //alert("A");
              var e = event || window.event;
              //alert("B");
              var target = e.target || e.srcElement;

              var comptrInfo = target.parentNode.parentNode.parentNode;

              var id = comptrInfo.id;

              var msg = "您确定删除吗？";
              if (confirm(msg) == true) {

                  if (target.parentNode.parentNode.parentNode.tagName.toLowerCase() == "td") {
                      //alert("C");
                      var rowIndex = target.parentNode.parentNode.parentNode.parentNode.rowIndex;
                      //alert(rowIndex);
                      var id = document.getElementById("table_value").rows[rowIndex].cells[0].innerHTML;
                      //alert(id);
                      var qs = require('qs');
                      this.$axios.delete(this.getIP() +'deploymentdesigns/'+id,{

                          //设置头
                          headers:{
                              'content-type':'application/x-www-form-urlencoded'
                          },
                          auth: {
                              username: 'admin',
                              password: 'admin'
                          }
                      }).then(res=>{

                          layer.msg("删除成功！");

                          //删除完再次查询
                          var projectId = this.getCookie('projectId');
                          var username = this.getCookie('username');
                          var password = this.getCookie('password');

                          this.$axios.get(this.getIP() +'projects/'+projectId+'/deploymentdesigns',{
                              //设置头
                              headers:{
                                  'content-type':'application/x-www-form-urlencoded'
                              },
                              auth: {
                                  username: username,
                                  password: password
                              }
                          }).then(res=>{
                              this.deployplans = res.data.data;
                              console.log(this.deployplans);
                          })
                          .catch(err=>{
                              console.log(err);
                          })

                      }).catch(err=>{
                        layer.msg("删除失败！");
                      })
                  }

              } else {
                  return false;
              }


            },

        makeBaseline: function (event) {
          let e = event || window.event;

          let target = e.target || e.srcElement;

          if (target.parentNode.parentNode.parentNode.tagName.toLowerCase() == "td") {
            //alert("C");
            let rowIndex = target.parentNode.parentNode.parentNode.parentNode.rowIndex;
            //alert(rowIndex);
            this.depid = document.getElementById("table_value").rows[rowIndex].cells[0].innerHTML;
            //alert(id);

          }
          $("#modal-name").modal('show');

        },

        makeBaseline2: function (){

          /*let msg = "您确定建立基线吗？";
          if (confirm(msg) == true) {*/

            let qs = require('qs');

            this.$axios.post(this.getIP() +'deploymentdesigns/'+this.depid+'/deploymentdesignsnapshots',qs.stringify({
              "name": $("input[name='input-name']").val()
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

              layer.msg("基线建立成功！");
              $("#modal-name").modal('hide');

              this.$router.replace({path: '/baseline'})

            }).catch(err=>{
              layer.msg("基线建立失败！");
              $("#modal-name").modal('hide');
            })

          /*} else {
            return false;
          }*/

        },

        formReset: function () {
          $("#input-name").val('');
          $("#modal-name").modal('hide');
        }

    },
    computed: {
      deployplansA: function () {
        let self = this;
        return self.deployplans.filter(function (item) {
          return item.name.toLowerCase().indexOf(self.searchQuery.toLowerCase()) !== -1;
        })

      }
    }
}
</script>
<style>
  .tabletable{
    height: 400px;
    overflow-y: auto;
    margin-top: -35px;
  }

.ulactions{
    margin: 5px 0 0 0;
}

.ulactions li{
    display: inline;
}
</style>
