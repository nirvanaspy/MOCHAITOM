<template>
  <!-- main container -->
  <div id="newdeploy">
    <div class="container-fluid">
      <div id="pad-wrapper" class="users-list">
        <div class="row-fluid header">
          <a class="header-wrapper">
            <span class="text">部署</span>
            <i class="icon icon-magnet"></i>
          </a>
          <div class="span4 newdeploy-select" style="float: right;">
            <div class="span3">
              部署设计:
            </div>
            <div class="span9" style="float: right;">
             <!--<select class="span12" v-model="selected"
                      @change="changeDeployPlan">
                <option v-for="deployplan in deployplanInfos" v-bind:value="deployplan.id">
                  {{ deployplan.name }}
                </option>
              </select>-->
              <el-select v-model="selected" placeholder="请选择"
                         @change="changeDeployPlan"
                         value-key="id">
                <el-option
                  v-for="deployplan in deployplanInfos"
                  :key="deployplan.id"
                  :label="deployplan.name"
                  :value="deployplan">
                  {{ deployplan.name }}
                </el-option>
              </el-select>


            </div>
          </div>

        </div>

        <!-- Users table -->
        <div class="row-fluid table tabletable">
          <table class="table table-hover" id="table_value">
            <thead>
            <tr>
              <th class="span2 sortable">
                设备名
              </th>
              <th class="span3 sortable">
                <span class="line"></span>IP
              </th>
              <th class="span3 sortable">
                <span class="line"></span>路径
              </th>
              <th class="span2">
                <span class="line"></span>状态
              </th>
              <th class="span3">
                <span class="line"></span>发送进度
              </th>
              <th class="span2">
                <span class="line"></span>部署详情
              </th>
              <th class="span2">
                <span class="line"></span>操作
              </th>
            </tr>
            </thead>
            <tbody>
            <!-- row -->
            <tr class="first" v-for="device in devicesA" :id="device.id" v-if="!device.virtual">
              <td style="display:none">{{device.id}}</td>
              <td>{{device.name}}</td>
              <td>{{device.ip}}</td>
              <td>
                {{device.deployPath}}
              </td>
              <td>
                <span class="label label-primary" v-if="!device.online">离线</span>
                <span class="label label-success" v-else>在线</span>
              </td>
              <td>
                <el-progress :text-inside="true" :stroke-width="18"
                             :percentage="device.progress"></el-progress>
              </td>

              <td>
                <ul class="ulactions">
                  <li class="last">
                    <input type="button" class="btn-flat primary" value="查看" data-toggle="modal"
                           @click="deployDetails($event)"/>
                  </li>
                </ul>
              </td>

              <td v-if="!device.virtual">
                <ul class="ulactions">
                  <li class="last">
                    <input type="button" class="btn-flat primary" value="部署" :id="device.online"
                           @click="deployDevice($event)"/>
                  </li>
                </ul>
              </td>

            </tr>

            <!-- row -->

            </tbody>
          </table>
          <!--<hr/>
          {{devices}}-->
        </div>

      </div>
    </div>

    <div class="modal fade" id="modal-select">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="formReset">
              <span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">部署详情：</h4>
          </div>
          <div class="modal-body">
            <!-- form start -->
            <table class="table table-hover">
              <thead>
              <tr>
                <th class="span4 sortable">
                  组件名
                </th>
                <th class="span3 sortable">
                  <span class="line"></span>文件名
                </th>

                <th class="span2">
                  <span class="line"></span>状态
                </th>


              </tr>
              </thead>
              <tbody>
              <!-- row -->
              <tr class="first" v-for="deployDetail in deviceDeployDetail">
                <td>{{deployDetail.componentEntity.name}}</td>
                <td>
                  {{deployDetail.componentDetailEntity.name}}
                </td>
                <td>
                  <span class="label danger" v-if="!deployDetail.state">部署失败</span>
                  <span class="label label-success" v-else>部署成功</span>
                </td>


              </tr>


              </tbody>
            </table>


          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  /* eslint-disable */

  export default {
    data() {
      return {
        devices: [],
        searchQuery: '',
        devname: '',
        devip: '',

        selected: "",
        deployplanId: '',    //所选择的部署设计的id
        deployplanInfos: [],

        errorDetails: [],      //部署失败的文件
        completedDeatils: [],  //部署成功的文件
        deployDetailInfo: {},   //部署详情
        deployDetailInfo2: [],   //部署详情
        deviceDeployDetail: []  //某设备的部署详情
      }
    },
    created() {
      var projectId = this.getCookie('projectId');
      let username = this.getCookie('username');
      let password = this.getCookie('password');
      this.$axios.get(this.getIP() + 'projects/' + projectId + '/devices', {
        //设置头
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        auth: {
          username: username,
          password: password
        }
      }).then(res => {
        this.devices = res.data.data
      }).catch(err => {
        console.log(err);
      });

      setInterval(() => {
        this.$axios.get(this.getIP() + 'projects/' + projectId + '/devices', {
          //设置头
          headers: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          auth: {
            username: username,
            password: password
          }
        }).then(res => {
          this.devices = res.data.data
        }).catch(err => {
          console.log(err);
        });
      }, 10 * 1000);

      //下拉框数据
      this.$axios.get(this.getIP() + "projects/" + projectId + "/deploymentdesigns", {
        //设置头
        headers: {
          "content-type": "application/x-www-form-urlencoded"
        },
        auth: {
          username: username,
          password: password
        }
      }).then(res => {

        for (let i = 0; i < res.data.data.length; i++) {
          this.deployplanInfos.push({
            id: res.data.data[i].id,
            name: res.data.data[i].name
          })
        }

      }).catch(err => {
        console.log(err);
      });

    },
    methods: {
      //下拉框选择部署设计
      changeDeployPlan: function () {
        this.deployplanId = this.selected.id;
        //this.deployplanId = this.selected;

      },

      deployDevice: function (event) {
        //alert("A");
        let e = event || window.event;
        //alert("B");
        let target = e.target || e.srcElement;

        let username = this.getCookie('username');
        let password = this.getCookie('password');


        if (target.parentNode.parentNode.parentNode.tagName.toLowerCase() == "td") {
          //alert("C");
          var rowIndex = target.parentNode.parentNode.parentNode.parentNode.rowIndex;
          //alert(rowIndex);
          var id = document.getElementById("table_value").rows[rowIndex].cells[0].innerHTML;
          //alert(id);
          var qs = require('qs');

          let online = false;

          for (let i = 0; i < this.devices.length; i++) {
            if (this.devices[i].id == id) {
              online = this.devices[i].online;
              break;

            }
          }

          if (online) {
            if (this.deployplanId.length != 0) {
              let msg = "您确定部署吗？";
              if (confirm(msg) == true) {

                this.$axios.put(this.getIP() + 'deploymentdesigns/' + this.deployplanId + '/devices/' + id + '/deploy',
                  qs.stringify({}), {

                    //设置头
                    headers: {
                      'content-type': 'application/x-www-form-urlencoded'
                    },
                    auth: {
                      username: username,
                      password: password
                    }
                  })
                  .then(res => {
                    console.log("部署后信息-------");
                    console.log(res.data.data);

                    let resp = res.data.data;
                    /*if(resp.length != 0){
                      console.log("赋值---------");
                      console.log(resp);
                      for(let i=0;i<resp.length;i++){

                        if(resp[i].errorFileList.length != 0){
                          for(let x=0;x<resp[i].errorFileList.length;x++){
                            this.errorDetails.push(resp[i].errorFileList[x]);
                          }

                        }

                        if(resp[i].completedFileList != 0){
                          for(let y=0;y<resp[i].completedFileList.length;y++){
                            this.completedDeatils.push(resp[i].completedFileList[y]);
                          }
                        }

                      }
                    }

                    console.log("失败成功文件------");
                    console.log(this.errorDetails);
                    console.log(this.completedDeatils);

                    if(this.errorDetails.length != 0){
                      for (let i = 0; i < this.errorDetails.length; i++) {
                        this.errorDetails[i].state = false;
                      }
                    }

                    if(this.completedDeatils.length != 0){
                      for (let i = 0; i < this.completedDeatils.length; i++) {
                        this.completedDeatils[i].state = true;
                      }
                    }

                    console.log(this.completedDeatils);

                    this.deployDetailInfo.deviceId = '';
                    this.deployDetailInfo.deployPlanId = '';
                    this.deployDetailInfo.info = [];

                    this.deployDetailInfo.deviceId = id;
                    this.deployDetailInfo.deployPlanId = this.deployplanId;


                    console.log("失败文件------------");
                    console.log(this.errorDetails.length);
                    if(this.errorDetails.length != 0){
                      for(let j=0;j<this.errorDetails.length;j++){
                        this.deployDetailInfo.info.push(this.errorDetails[j]);
                      }
                      console.log("aaaaaaaaaaaaaaa");
                    }

                    if(this.completedDeatils.length != 0){
                      for(let k=0;k<this.completedDeatils.length;k++){
                        this.deployDetailInfo.info.push(this.completedDeatils[k]);
                      }

                    }


                    this.deployDetailInfo2.push(this.deployDetailInfo);


                    console.log("部署详情-------------");
                    console.log(this.deployDetailInfo);
                    console.log(this.deployDetailInfo2);*/

                  }).catch(err => {
                  console.log("提示---------");
                  console.log(err.response.data.data);
                  if(err.response.data.data.length != 0){

                    layer.msg(err.response.data.data);
                  }
                })

              } else {
                return false;
              }
            } else {
              alert("请先选择部署设计！");
            }
          } else {
            layer.msg("设备离线！");
          }
        }


      },

      formReset: function () {
        $("#input-path").val('');
        $("#modal-select").modal('hide');
      },

      deployDetails: function (event) {

        this.deviceDeployDetail.splice(0, this.deviceDeployDetail.length);    //清空某设备的部署详情数组
        this.errorDetails.splice(0, this.errorDetails.length);    //清空某设备的失败文件数组
        this.completedDeatils.splice(0, this.completedDeatils.length);    //清空某设备的成功文件数组

        let e = event || window.event;

        let target = e.target || e.srcElement;

        let ifexist = false;      //设备是否部署，false为未部署


        if (target.parentNode.parentNode.parentNode.tagName.toLowerCase() == "td") {
          let rowIndex = target.parentNode.parentNode.parentNode.parentNode.rowIndex;
          let id = document.getElementById("table_value").rows[rowIndex].cells[0].innerHTML;

          let i = 0;

          console.log("详情部署信息------------");
          console.log(id);
          console.log(this.devices);
          console.log(this.devices.length);

          if(this.devices.length > 0){
            for (i = 0; i < this.devices.length; i++) {      //循环结果数组，找到点击的设备对应的数据
              if (id == this.devices[i].id) {
                console.log(this.devices[i].id);
                console.log(this.devices[i].progress);
                if(this.devices[i].progress != 0){      //判断此设备是否已部署，进度不为0则已部署

                  if(this.devices[i].errorFileList.length != 0){                         //未成功文件存入失败详情数组
                    for(let x=0;x<this.devices[i].errorFileList.length;x++){
                      this.errorDetails.push(this.devices[i].errorFileList[x]);
                    }

                  }

                  if(this.devices[i].completedFileList != 0){                           //成功文件存入完成详情数组
                    for(let y=0;y<this.devices[i].completedFileList.length;y++){
                      this.completedDeatils.push(this.devices[i].completedFileList[y]);
                    }
                  }

                  ifexist = true;           //设备已部署
                  break;
                }
              }
            }
          }

          console.log("失败成功文件------");
          console.log(this.errorDetails);
          console.log(this.completedDeatils);

          if(this.errorDetails.length != 0){
            for (let i = 0; i < this.errorDetails.length; i++) {
              this.errorDetails[i].state = false;
            }
          }

          if(this.completedDeatils.length != 0){
            for (let i = 0; i < this.completedDeatils.length; i++) {
              this.completedDeatils[i].state = true;
            }
          }

          console.log(this.completedDeatils);

          this.deployDetailInfo.info = [];

          console.log("失败文件------------");
          console.log(this.errorDetails.length);
          if(this.errorDetails.length != 0){
            for(let j=0;j<this.errorDetails.length;j++){
              this.deployDetailInfo.info.push(this.errorDetails[j]);
            }
          }

          if(this.completedDeatils.length != 0){
            for(let k=0;k<this.completedDeatils.length;k++){
              this.deployDetailInfo.info.push(this.completedDeatils[k]);
            }

          }

          this.deployDetailInfo2.push(this.deployDetailInfo);

          console.log("部署详情-------------");
          console.log(this.deployDetailInfo);
          console.log(this.deployDetailInfo2);



          /*for (i = 0; i < this.deployDetailInfo2.length; i++) {
            console.log(this.deployDetailInfo2[i]);
            console.log(this.deployDetailInfo2[i].deviceId);
            if (id == this.deployDetailInfo2[i].deviceId) {

              ifexist = true;           //设备已部署
              break;
            }
          }*/
          console.log(ifexist);

          if (ifexist == true) {

            this.deviceDeployDetail = this.deployDetailInfo2[i].info;

            console.log("已部署的设备的信息-----------------");
            console.log(this.deviceDeployDetail);

            $("#modal-select").modal('show');

          } else {
            layer.msg("请先部署！");
          }

          console.log(this.deviceDeployDetail);
        }


      },

      deployDetails1: function (event) {

        this.deviceDeployDetail.splice(0, this.deviceDeployDetail.length);    //清空某设备的部署详情数组

        let e = event || window.event;

        let target = e.target || e.srcElement;

        let ifexist = false;      //设备是否部署，false为未部署


        if (target.parentNode.parentNode.parentNode.tagName.toLowerCase() == "td") {
          //alert("C");
          var rowIndex = target.parentNode.parentNode.parentNode.parentNode.rowIndex;
          //alert(rowIndex);
          var id = document.getElementById("table_value").rows[rowIndex].cells[0].innerHTML;
          //alert(id);
          var qs = require('qs');

          let i = 0;

          console.log("详情部署信息------------");
          console.log(id);
          console.log(this.deployDetailInfo2);
          console.log(this.deployDetailInfo2.length);
          for (i = 0; i < this.deployDetailInfo2.length; i++) {
            console.log(this.deployDetailInfo2[i]);
            console.log(this.deployDetailInfo2[i].deviceId);
            if (id == this.deployDetailInfo2[i].deviceId) {

              ifexist = true;           //设备已部署
              break;
            }
          }
          console.log(ifexist);

          if (ifexist == true) {

            this.deviceDeployDetail = this.deployDetailInfo2[i].info;

            console.log("已部署的设备的信息-----------------");
            console.log(this.deviceDeployDetail);

            $("#modal-select").modal('show');

          } else {
            layer.msg("请先部署！");
          }

          console.log(this.deviceDeployDetail);
        }


      },

      /*deployDetails2: function () {

        console.log($("input[id='input-path']").val());
        console.log(this.devname);
        console.log(this.devip);

        if ($("input[id='input-path']").val() != null) {

          let qs = require('qs');
          let projectId = this.getCookie('projectId');
          let username = this.getCookie('username');
          let password = this.getCookie('password');


          this.$axios.post(this.getIP() + 'projects/' + projectId + '/devices', qs.stringify({
            "name": this.devname,
            "ip": this.devip,
            "deployPath": $("input[id='input-path']").val()
          }), {

            //设置头
            headers: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            auth: {
              username: username,
              password: password
            }
          }).then(res => {
            //this.users = res.data.data
            //console.log(res);
            layer.msg('上报成功！');

            $("#modal-select").modal('hide');

            //成功后重新查询
            this.$axios.get(this.getIP() + 'projects/' + projectId + '/devices', {
              //设置头
              headers: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              auth: {
                username: username,
                password: password
              }
            }).then(res => {
              this.devices = res.data.data
            })
              .catch(err => {
                console.log(err);
              })
          })
            .catch(err => {
              layer.msg('上报失败！');
            })
        } else {
          layer.msg("请输入路径！");
        }
      }*/


    },
    computed: {
      devicesA: function () {
        var self = this;
        return self.devices.filter(function (item) {
          return item.name.toLowerCase().indexOf(self.searchQuery.toLowerCase()) !== -1;
        })

      }
    }
  }
</script>
<style>
  .label-danger, .badge-info {
    background-color: #b94a48;
  }

  .tabletable {
    height: 600px;
    overflow-y: auto;
    margin-top: -35px;
  }

  .ulactions {
    margin: 5px 0 0 0;
  }

  .ulactions li {
    display: inline;
  }
  @media (min-width: 1200px) {
    #newdeploy div.newdeploy-select {
      margin-right:-68px;
    }

  }
</style>
