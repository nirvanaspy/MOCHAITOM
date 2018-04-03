<template>
  <div>
    <div class="container-fluid">
      <div id="pad-wrapper">
        <div class="row-fluid header">
          <a class="header-wrapper">
            <span class="text">扫描</span>
            <i class="icon icon-headphones"></i>
          </a>
          <div class="span10 pull-right scan-input">
            <div>
              <label>文件名</label>
              <input class="search" type="text" placeholder="搜索.." v-model="searchQuery"/>
            </div>
          </div>

        </div>
        <div class="row-fluid form-wrapper">
          <div class="span12" style="margin-top: -34px;">

            <div class="drag-content span12">
              <div class="span3" style="height: 480px;">
                <!--<div>
                  &lt;!&ndash;  <input class="search" type="text" placeholder="搜索设备.." v-model="searchQuery" @change="change"/> &ndash;&gt;
                  <h3>扫描</h3>

                </div>

                <br/>-->
                <div class="row-fluid table devcompchose">
                  <div class="span3" style="margin-left: 7px;margin-top: 10px;">
                    部署设计
                  </div>
                  <div class="span8" id="scan-selection">
                    <!--  <select class="span12" v-model="selected" style="height: 26px; margin-top: 5px; "
                              @change="changeDeployPlan">
                        &lt;!&ndash; v-model="selected" &ndash;&gt;
                        <option id="myoptions" v-for="deployplan in deployplanInfos" v-bind:value="deployplan.id">
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
                  <table class="table table-hover" style="margin-top:10px;">
                    <thead style="border-top:none;">
                    <tr>
                      <th>
                        设备(IP)/软件名
                      </th>

                      <th>
                        软件状态
                      </th>

                      <th>
                        设备状态
                      </th>

                    </tr>
                    </thead>
                  </table>

                  <div id="areaTree"
                       style="margin-left: -1px; height: 370px; overflow-y: auto;margin-top: -16px;white-space:pre;">
                    <div class="tree-box">
                      <div class="zTreeDemoBackground left">
                        <ul id="treeDemo" class="ztree" style="white-space: nowrap;">
                        </ul>
                      </div>
                    </div>
                  </div>

                </div>


              </div>

              <div class="span9" style="height: 480px;border-left: 2px solid rgb(117, 185, 230);">
                <!--<div style="margin-bottom: -5px;margin-left: -40px;">

                  <label style="float:left">文件名：</label>
                  <input class="search" type="text" placeholder="搜索.." v-model="searchQuery"
                         style="float:left;width:160px;height:19px"/>

                </div>

                <br/>-->


                <!--<div style="height: 400px;overflow: auto;margin-top: 25px;">-->
                <div class="row-fluid table devcompchose">
                  <table class="table table-hover" id="table_value" style="margin-left: 1px">
                    <thead>
                    <tr>

                      <th class="span2 wrap">
                        文件名
                      </th>
                      <th class="span2">
                        <span class="line"></span>路径
                      </th>
                      <th class="span2">
                        <span class="line"></span>文件类型
                      </th>
                      <th class="span2">
                        <span class="line"></span>修改日期
                      </th>

                      <th class="span2">
                        <span class="line"></span>文件大小
                      </th>
                      <th class="span2">
                        <span class="line"></span>版本状态
                      </th>

                    </tr>
                    </thead>
                    <tbody>
                    <!-- row -->
                    <tr class="first" v-for="(component,index) in componentEntityA" :key="index" id="tabel_info">
                      <td style="display:none">{{component.id}}</td>
                      <td class="span2 wrap" style="cursor: pointer;">
                        <div class="wrap" :title="component.name">
                          {{component.name}}
                        </div>
                      </td>
                      <td class="span2 wrap" style="cursor: pointer;">
                        <div class="wrap" :title="component.path">
                          {{component.path}}
                        </div>
                      </td>
                      <td class="span2">
                        {{component.type}}
                      </td>
                      <td class="span2">
                        {{component.createTime}}
                      </td>
                      <td class="span2">
                        {{component.displaySize}}
                      </td>
                      <td class="span2">
                        {{component.state}}
                      </td>

                    </tr>
                    <!-- row -->

                    </tbody>
                  </table>
                </div>
                <!--</div>-->

              </div>


            </div>

            <br/>
            <!-- icon-bolt 快速-->
            <!-- icon-circle-blank 完整 -->
            <div class="btn-group" style="margin-top: 20px;">
              <button class="btn-glow" style="width:130px" @click="scanAll()"><i class="icon-circle-blank"></i>完整扫描
              </button>
              <button class="btn-glow" style="width:130px" @click="scanQuick1()"><i class="icon-bolt"></i>快速扫描
              </button>


            </div>

            <div class="btn-group pull-right" style="margin-top: 20px;">
              <button class="btn-glow success" style="width:130px"><i class="icon-cloud-upload"></i>上传
              </button>

            </div>

          </div>
        </div>

      </div>
    </div>

    <div class="modal fade" id="modal-select">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="formReset">
              <span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">请填写后缀名：</h4>
          </div>
          <div class="modal-body" style="width: 530px;">
            <!-- form start -->
            <form class="form-horizontal">
              <div style="margin-top: 23px;">
                <span>后缀名:</span>
                <input type="text" id="input-extensions" style="height:20px">(例如:exe,txt)
              </div>

              <br/>

              <!-- <div style="margin-top: 17px;">
                <span>路径:</span>
                <input type="text" id="input-path" style="margin-left: 12px;height:25px">
              </div> -->

              <!--<div style="margin-left: 148px;margin-top: 22px;">
                <button type="submit" class="btn-glow primary" @click="scanQuick">确认</button>
                <button type="submit" class="btn-glow primary" @click="formReset">取消</button>
              </div>-->

              <div class="pull-right">
                <button type="submit" class="btn-flat danger" @click="scanQuick">确认</button>
                <button type="submit" class="btn-flat primary" @click="formReset">取消</button>
              </div>


            </form>

          </div>
        </div>
      </div>
    </div>
  </div>

</template>


<script>
  /* eslint-disable */
  var relativePath = "";

  function getCurrentRoot(treeNode) {
    if (treeNode.getParentNode() != null) {
      var parentNode = treeNode.getParentNode();
      relativePath =
        treeNode.getParentNode().name + "/" + relativePath + treeNode.name;
      return getCurrentRoot(parentNode);
    } else {
      return treeNode.id;
    }
  }

  let deviceNodeId;
  let deployPlanId;
  let deviceId;
  let componentNodeId;//以上为点击树显示时所用变量

  let deviceAllId;
  let deployAllId;//扫描时用的变量

  let deviceName; //扫描的设备名

  let deployPlanDetailEntities;
  let deployplanZtreeId;

  let zNodes = [];
  let setting = {};

  let childrenInfo = [];//所有文件的信息

  let zTree;
  let zTreeDblFlag = false;//为true时，代表扫描结束，双击显示的为扫描之后的信息
  let tempZtree = [];//存放扫描之后的树节点信息

  export default {
    name: "areaTree",
    components: {},
    /* eslint-disable */
    data() {
      return {
        searchQuery: '',
        componentEntity: [],

        selected: "",

        deployplanInfos: [],
      };
    },
    created() {

      var projectId = this.getCookie('projectId');
      let username = this.getCookie('username');
      let password = this.getCookie('password');

      $("#modal-select").modal('hide');
      layer.closeAll('loading');

      //日历
      this.$nextTick(function () {
        $(document).ready(function () {
          $(".datepicker")
            .datepicker()
            .on("changeDate", function (ev) {
              $(this).datepicker("hide");
            });
        });
      });

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

      formReset: function () {
        $("input").val('');
        $("#modal-select").modal('hide');
      },

      //截取路径生成树，例如：从路径中的某个节点与他父节点之下的节点比较
      handleInfo: function (item, path, idCom, idFlag) {
        if (item == null)
          return;

        if (item.hasOwnProperty("children")) {
          //循环当前父节点下的子节点，与将要插入的比较
          //如果有相等的，则返回该子节点，如果没有，则将节点添加到树上并返回该节点。
          let flag;
          for (let i = 0; i < item.children.length; i++) {
            flag = true;
            if (item.children[i].name == path) {
              item = item.children[i];
              flag = false;
              return item;
            }
          }

          if (flag) {
            item.children.push({"name": path, "id": idCom});
            item = item.children[item.children.length - 1];
            return item;
          }

        } else {
          if (idFlag == true) {
            item.children = [];
            item.children.push({"name": path, "id": idCom});
            item = item.children[0];
            return item;
          }
          item.children = [];
          item.children.push({"name": path});
          item = item.children[0];
          return item;
        }

      },

      //下拉框选择部署，显示树
      changeDeployPlan: function () {

        let username = this.getCookie('username');
        let password = this.getCookie('password');

        zNodes.length = 0;
        // deployplanZtreeId = this.selected
        deployplanZtreeId = this.selected.id;

        setting = {
          view: {
            dblClickExpand: false,
          },
          edit: {
            enable: true,
            showRenameBtn: false,
            showRemoveBtn: false
          },
          data: {
            simpleData: {
              enable: true
            }
          },
          callback: {

            onClick: this.zTreeOnClick,
            onDblClick: this.zTreeOnDblClick
          },
          check: {                                 //树上加CheckBox
            autoCheckTrigger: false,
            chkboxType: {"Y": "ps", "N": "ps"},
            chkStyle: "checkbox",
            enable: true
          }
        };


        this.$axios.get(this.getIP() + 'deploymentdesigns/' + deployplanZtreeId + '/deploymentdesigndetails', {
          //设置头
          headers: {
            "content-type": "application/x-www-form-urlencoded"
          },
          auth: {
            username: username,
            password: password
          }
        }).then(res => {

          let item;

          deployPlanDetailEntities = res.data.data;

          for (let j = 0; j < deployPlanDetailEntities.length; j++) {

            let deviceNode = {};//设备
            let componentNode = {};//组件

            deviceNode.id = deployPlanDetailEntities[j].deviceEntity.id;
            deviceNode.state = deployPlanDetailEntities[j].deviceEntity.online;

            componentNode.id = deployPlanDetailEntities[j].componentEntity.id;
            componentNode.name = deployPlanDetailEntities[j].componentEntity.name;
            componentNode.deviceId = deployPlanDetailEntities[j].deviceEntity.id;
            componentNode.componentNodeInfo = deployPlanDetailEntities[j].componentEntity.componentDetailEntities;
            componentNode.state = "--";


            //生成树，只包括设备和组件
            if (zNodes.length > 0) {
              let flag = true;
              all:
                for (let k = 0; k < zNodes.length; k++) {

                  if (zNodes[k].id == deviceNode.id) {

                    for (let l = 0; l < zNodes[k].children.length; l++) {
                      if (zNodes[k].children[l].id == componentNode.id) {
                        flag = false;
                        break all;

                      }
                    }

                    zNodes[k].children.push(componentNode);

                    flag = false;
                    break;
                  }
                }

              if (flag) {

                if (deployPlanDetailEntities[j].deviceEntity.online == false) {
                  deployPlanDetailEntities[j].deviceEntity.online = "离线";
                } else {
                  deployPlanDetailEntities[j].deviceEntity.online = "在线";

                }
                deviceNode.name =
                  deployPlanDetailEntities[j].deviceEntity.name + "(" +
                  deployPlanDetailEntities[j].deviceEntity.ip + ")" + "" + deployPlanDetailEntities[j].deviceEntity.online;

                var ary = deviceNode.name.split(")");
                deviceNode.name = deviceNode.name.replace(')', ')           ');

                deviceNode.deployPlanId = deployplanZtreeId;

                deviceNode.nocheck = true;                 //去掉设备后的CheckBox

                let children = [];
                children.push(componentNode);
                deviceNode.children = children;
                zNodes.push(deviceNode);
              }

            } else {
              if (deployPlanDetailEntities[j].deviceEntity.online == false) {
                deployPlanDetailEntities[j].deviceEntity.online = "离线";
              } else {
                deployPlanDetailEntities[j].deviceEntity.online = "在线";
              }

              deviceNode.name =
                deployPlanDetailEntities[j].deviceEntity.name + "(" +
                deployPlanDetailEntities[j].deviceEntity.ip + ")" + "" + deployPlanDetailEntities[j].deviceEntity.online;

              var ary = deviceNode.name.split(")");
              deviceNode.name = deviceNode.name.replace(')', ')           ');
              deviceNode.deployPlanId = deployplanZtreeId;

              deviceNode.nocheck = true;                   //去掉设备后的CheckBox

              let children = [];
              children.push(componentNode);
              deviceNode.children = children;

              zNodes.push(deviceNode);

            }
          }


          for (let j = 0; j < zNodes.length; j++) {
            for (let l = 0; l < zNodes[j].children.length; l++) {
              //对比时，是路径节点与根节点下的孩子节点比较
              let componentFile = zNodes[j].children[l].componentNodeInfo;//组件

              for (let m = 0; m < componentFile.length; m++) {
                childrenInfo.push(componentFile[m]);//存放所有的文件信息

                let item = zNodes[j].children[l];//组件作为判断开始的父节点

                let path = (componentFile[m].path).split('/');
                let idCom = componentFile[m].id;

                for (let i = 1; i < path.length; i++) {
                  let idFlag;
                  if (i == path.length - 1) {
                    idFlag = true;//最后一个即为单个的文件
                  }
                  item = this.$options.methods.handleInfo(item, path[i], idCom, idFlag);
                }
              }
            }
          }

          $.fn.zTree.init($("#treeDemo"), setting, zNodes);

        }).catch(err => {
          console.log(err);
        });

      },

      //双击动作
      zTreeOnDblClick: function (e, treeId, treeNode) {
        let username = this.getCookie('username');
        let password = this.getCookie('password');

        deviceNodeId = '';
        deployPlanId = '';
        componentNodeId = '';

        deviceId = '';

        this.componentEntity = [];//表格数据

        zTree = $.fn.zTree.getZTreeObj("treeDemo");
        zTree.expandNode(treeNode);

        if (zTreeDblFlag) {//扫描之后的数据显示

          if (zTree.getSelectedNodes()[0].deviceId) {
            componentNodeId = zTree.getSelectedNodes()[0].id;
            this.$axios.get(this.getIP() + "components/" + componentNodeId, {
              headers: {
                "content-type": "application/x-www-form-urlencoded"
              },
              auth: {
                username: username,
                password: password
              }
            }).then(res => {
              for (let i = 0; i < res.data.data.componentDetailEntities.length; i++) {
                for (let j = 0; j < tempZtree.length; j++) {//扫描之后的数据信息
                  if (res.data.data.componentDetailEntities[i].id == tempZtree[j].id) {
                    res.data.data.componentDetailEntities[i] = tempZtree[j];
                  }
                }
                this.componentEntity.push(res.data.data.componentDetailEntities[i]);

                //size
                /*for (let j = 0; j < this.componentEntity.length; j++) {
                  this.componentEntity[j].size = ((this.componentEntity[j].size) / 1024 / 1024).toFixed(5);
                }*/

              }
              ;

            }).catch(err => {

            });
          } else if (zTree.getSelectedNodes()[0].deployPlanId) {
            deviceNodeId = zTree.getSelectedNodes()[0].id;
            deployPlanId = zTree.getSelectedNodes()[0].deployPlanId;
            this.$axios.get(this.getIP() + "deploymentdesigns/" + deployPlanId + "/deploymentdesigndetails/devices/" + deviceNodeId, {
              headers: {
                "content-type": "application/x-www-form-urlencoded"
              },
              auth: {
                username: username,
                password: password
              }
            }).then(res => {
              for (let i = 0; i < res.data.data.length; i++) {
                for (let j = 0; j < res.data.data[i].componentEntity.componentDetailEntities.length; j++) {
                  for (let k = 0; k < tempZtree.length; k++) {
                    if (res.data.data[i].componentEntity.componentDetailEntities[j].id == tempZtree[k].id) {
                      res.data.data[i].componentEntity.componentDetailEntities[j] = tempZtree[k];
                    }
                  }
                  this.componentEntity.push(res.data.data[i].componentEntity.componentDetailEntities[j]);
                }
              }

              //size
              /*for (let j = 0; j < this.componentEntity.length; j++) {
                this.componentEntity[j].size = ((this.componentEntity[j].size) / 1024 / 1024).toFixed(5);
              }*/
            }).catch(err => {

            });

          } else if (zTree.getSelectedNodes()[0].hasOwnProperty("children")) {
            for (let i = 0; i < zTree.getSelectedNodes()[0].children.length; i++) {
              if (zTree.getSelectedNodes()[0].children[i].hasOwnProperty("children") == false) {
                for (let j = 0; j < childrenInfo.length; j++) {
                  if (childrenInfo[j].id == zTree.getSelectedNodes()[0].children[i].id) {
                    zTree.getSelectedNodes()[0].children[i] = childrenInfo[j];
                    this.componentEntity.push(childrenInfo[j]);
                    break;
                  }
                }
              }
            }

            //size
            /*for (let j = 0; j < this.componentEntity.length; j++) {
              this.componentEntity[j].size = ((this.componentEntity[j].size) / 1024 / 1024).toFixed(5);
            }*/

          } else if (zTree.getSelectedNodes()[0].hasOwnProperty("children") == false) {

            for (let j = 0; j < childrenInfo.length; j++) {
              if (childrenInfo[j].id == zTree.getSelectedNodes()[0].id) {
                this.componentEntity.push(childrenInfo[j]);

                break;
              }
            }

            //size
            /*for (let j = 0; j < this.componentEntity.length; j++) {
              this.componentEntity[j].size = ((this.componentEntity[j].size) / 1024 / 1024).toFixed(5);
            }*/
          }
        } else {//没有扫描之前的数据显示

          this.componentEntity.splice(0, this.componentEntity.length);

          if (zTree.getSelectedNodes()[0].deviceId) {//有deviceId字段，说明是组件
            componentNodeId = zTree.getSelectedNodes()[0].id;

            this.$axios.get(this.getIP() + "components/" + componentNodeId, {
              headers: {
                "content-type": "application/x-www-form-urlencoded"
              },
              auth: {
                username: username,
                password: password
              }
            }).then(res => {

              for (let i = 0; i < res.data.data.componentDetailEntities.length; i++) {
                res.data.data.componentDetailEntities[i].state = "--";
                this.componentEntity.push(res.data.data.componentDetailEntities[i]);
              }

              //size
              /*for (let j = 0; j < this.componentEntity.length; j++) {
                this.componentEntity[j].size = ((this.componentEntity[j].size) / 1024 / 1024).toFixed(5);
              }*/

            }).catch(err => {

            });
          } else if (zTree.getSelectedNodes()[0].deployPlanId) {//有deployPlanId字段，说明是设备
            deviceNodeId = zTree.getSelectedNodes()[0].id;
            deployPlanId = zTree.getSelectedNodes()[0].deployPlanId;
            this.$axios
              .get(this.getIP() + "deploymentdesigns/" + deployPlanId + "/deploymentdesigndetails/devices/" + deviceNodeId, {
                headers: {
                  "content-type": "application/x-www-form-urlencoded"
                },
                auth: {
                  username: username,
                  password: password
                }
              }).then(res => {

              for (let i = 0; i < res.data.data.length; i++) {
                for (let j = 0; j < res.data.data[i].componentEntity.componentDetailEntities.length; j++) {
                  res.data.data[i].componentEntity.componentDetailEntities[j].state = "--";
                  this.componentEntity.push(res.data.data[i].componentEntity.componentDetailEntities[j]);

                }
              }

              //size
              /*for (let j = 0; j < this.componentEntity.length; j++) {
                this.componentEntity[j].size = ((this.componentEntity[j].size) / 1024 / 1024).toFixed(5);
              }*/

            }).catch(err => {
            });
          } else if (zTree.getSelectedNodes()[0].hasOwnProperty("children")) {//除设备和组件之外的文件夹

            this.componentEntity.splice(0, this.componentEntity.length);

            for (let i = 0; i < zTree.getSelectedNodes()[0].children.length; i++) {
              if (zTree.getSelectedNodes()[0].children[i].hasOwnProperty("children") == false) {
                for (let j = 0; j < childrenInfo.length; j++) {
                  if (childrenInfo[j].id == zTree.getSelectedNodes()[0].children[i].id) {
                    zTree.getSelectedNodes()[0].children[i] = childrenInfo[j];
                    this.componentEntity.push(childrenInfo[j]);
                    break;
                  }
                }
              }
            }

            //size
            /*for (let j = 0; j < this.componentEntity.length; j++) {
              this.componentEntity[j].size = ((this.componentEntity[j].size) / 1024 / 1024).toFixed(5);
            }*/

          } else if (zTree.getSelectedNodes()[0].hasOwnProperty("children") == false) {//没有孩子的单个文件

            this.componentEntity.splice(0, this.componentEntity.length);

            for (let j = 0; j < childrenInfo.length; j++) {
              if (childrenInfo[j].id == zTree.getSelectedNodes()[0].id) {
                this.componentEntity.push(childrenInfo[j]);
                break;
              }
            }

            //size
            /*for (let j = 0; j < this.componentEntity.length; j++) {
              this.componentEntity[j].size = ((this.componentEntity[j].size) / 1024 / 1024).toFixed(5);
            }*/
          }

        }
      },

      zTreeOnClick: function (e, treeId, treeNode) {
        zTree = $.fn.zTree.getZTreeObj("treeDemo");

        console.log(zTree.getSelectedNodes());
        console.log(zTree.getSelectedNodes()[0].deviceId);
        if (zTree.getSelectedNodes()[0].deployPlanId) {
          deviceAllId = zTree.getSelectedNodes()[0].id;
          deployAllId = zTree.getSelectedNodes()[0].deployPlanId;

          deviceName = zTree.getSelectedNodes()[0].name;

          console.log(deviceName);
        }else{
          deviceName = "";
        }
        /*if (zTree.getSelectedNodes()[0].deviceId) {
        } else if (zTree.getSelectedNodes()[0].deployPlanId) {
          deviceAllId = zTree.getSelectedNodes()[0].id;
          deployAllId = zTree.getSelectedNodes()[0].deployPlanId;

          deviceName = zTree.getSelectedNodes()[0].name;

          console.log(deviceName);


        }*/
      },

      scanAll: function () {
        let username = this.getCookie('username');
        let password = this.getCookie('password');


        if (zTree.getSelectedNodes()[0].state == false) {//设备不在线，无法扫描
          layer.msg("设备离线！");
        }
        else if (deviceName == "") {
          layer.msg("请选择设备！");
        }
        else {
           console.log(deviceAllId);
           console.log(deployAllId);

          layer.load();

          this.$axios.get(
            this.getIP() + "deploymentdesigns/" +
            deployAllId +
            "/devices/" +
            deviceAllId + "/scan" + "?extensions",
            {
              //设置头
              headers: {
                "content-type": "application/x-www-form-urlencoded"
              },
              auth: {
                username: username,
                password: password
              }
            }).then(res => {
            layer.closeAll('loading');

            //连续扫描，组件后面的软件状态会保留每次的结果，所以下次扫描后，先把上次的结果去掉
            for (let i = 0; i < zNodes.length; i++) {
              for (let j = 0; j < zNodes[i].children.length; j++) {
                var regex = /\(/g;
                var str = zNodes[i].children[j].name;
                if (regex.test(str)) {
                  let zname = zNodes[i].children[j].name.split('(');
                  zNodes[i].children[j].name = zname[0];
                }
              }
            }

            let correct = [];
            let unknown = [];
            let modifyed = [];
            let miss = [];
            //上面四个数组存放扫描后的文件，排序使用

            if (res.data.data.length > 0) {
              for (let i = 0; i < res.data.data.length; i++) {
                if (res.data.data[i].correctComponentFiles.length > 0) {
                  for (let j = 0; j < res.data.data[i].correctComponentFiles.length; j++) {

                    for (let k = 0; k < this.componentEntity.length; k++) {

                      if (res.data.data[i].correctComponentFiles[j].id == this.componentEntity[k].id) {
                        this.componentEntity[k].state = '√';

                        correct.push(this.componentEntity[k]);

                        break;
                      }
                    }
                  }
                }
                ;

                if (res.data.data[i].unknownFiles.length > 0) {
                  for (let j = 0; j < res.data.data[i].unknownFiles.length; j++) {

                    for (let k = 0; k < this.componentEntity.length; k++) {

                      if (res.data.data[i].unknownFiles[j].id == this.componentEntity[k].id) {
                        this.componentEntity[k].state = '?';

                        unknown.push(this.componentEntity[k]);
                        break;

                      }

                    }

                  }
                }
                ;

                if (res.data.data[i].modifyedComponentFiles.length > 0) {
                  for (let j = 0; j < res.data.data[i].modifyedComponentFiles.length; j++) {

                    for (let k = 0; k < this.componentEntity.length; k++) {

                      if (res.data.data[i].modifyedComponentFiles[j].id == this.componentEntity[k].id) {
                        this.componentEntity[k].state = '×';
                        modifyed.push(this.componentEntity[k]);
                        break;
                      }

                    }

                  }

                }
                ;
              }
              ;

              for (let k = 0; k < this.componentEntity.length; k++) {

                if (this.componentEntity[k].state == "--") {

                  this.componentEntity[k].state = "!";
                  miss.push(this.componentEntity[k]);
                }
                ;

              }
              ;

              //表格数据排序
              this.componentEntity.splice(0, this.componentEntity.length);
              for (let i = 0; i < unknown.length; i++) {
                this.componentEntity.push(unknown[i]);
                tempZtree.push(unknown[i]);
              }

              for (let i = 0; i < modifyed.length; i++) {
                this.componentEntity.push(modifyed[i]);
                tempZtree.push(modifyed[i]);
              }

              for (let i = 0; i < miss.length; i++) {
                this.componentEntity.push(miss[i]);
                tempZtree.push(miss[i]);
              }

              for (let i = 0; i < correct.length; i++) {
                this.componentEntity.push(correct[i]);
                tempZtree.push(correct[i]);
              }


            }
            ;


            //扫描完后，添加软件状态
            for (let i = 0; i < zNodes.length; i++) {
              if (zNodes[i].id == zTree.getSelectedNodes()[0].id) {
                for (let j = 0; j < zNodes[i].children.length; j++) {

                  for (let k = 0; k < res.data.data.length; k++) {
                    if (zNodes[i].children[j].id == res.data.data[k].componentId) {
                      if (res.data.data[k].hasCorrectComponentFiles == true && res.data.data[k].hasModifyedComponentFiles == false && res.data.data[k].hasUnknownFiles == false && res.data.data[k].hasMissingFile == false) {
                        zNodes[i].children[j].name = zNodes[i].children[j].name + "(" + "√" + ")";
                        zNodes[i].children[j].name = zNodes[i].children[j].name.replace('(', '           (');
                      } else if (res.data.data[k].hasModifyedComponentFiles == true && res.data.data[k].hasUnknownFiles == false && res.data.data[k].hasMissingFile == false) {
                        zNodes[i].children[j].name = zNodes[i].children[j].name + "(" + "×" + ")";
                        zNodes[i].children[j].name = zNodes[i].children[j].name.replace('(', '           (');
                      } else if (res.data.data[k].hasModifyedComponentFiles == false && res.data.data[k].hasUnknownFiles == true && res.data.data[k].hasMissingFile == false) {
                        zNodes[i].children[j].name = zNodes[i].children[j].name + "(" + "?" + ")";
                        zNodes[i].children[j].name = zNodes[i].children[j].name.replace('(', '           (');
                      } else if (res.data.data[k].hasModifyedComponentFiles == false && res.data.data[k].hasUnknownFiles == false && res.data.data[k].hasMissingFile == true) {
                        zNodes[i].children[j].name = zNodes[i].children[j].name + "(" + "!" + ")";
                        zNodes[i].children[j].name = zNodes[i].children[j].name.replace('(', '           (');
                      } else if (res.data.data[k].hasModifyedComponentFiles == true && res.data.data[k].hasUnknownFiles == true && res.data.data[k].hasMissingFile == false) {
                        zNodes[i].children[j].name = zNodes[i].children[j].name + "(" + "×," + "?" + ")";
                        zNodes[i].children[j].name = zNodes[i].children[j].name.replace('(', '           (');
                      } else if (res.data.data[k].hasModifyedComponentFiles == true && res.data.data[k].hasUnknownFiles == false && res.data.data[k].hasMissingFile == true) {
                        zNodes[i].children[j].name = zNodes[i].children[j].name + "(" + "×," + "!" + ")";
                        zNodes[i].children[j].name = zNodes[i].children[j].name.replace('(', '           (');
                      } else if (res.data.data[k].hasModifyedComponentFiles == false && res.data.data[k].hasUnknownFiles == true && res.data.data[k].hasMissingFile == true) {
                        zNodes[i].children[j].name = zNodes[i].children[j].name + "(" + "?," + "!" + ")";
                        zNodes[i].children[j].name = zNodes[i].children[j].name.replace('(', '           (');
                      } else if (res.data.data[k].hasModifyedComponentFiles == true && res.data.data[k].hasUnknownFiles == true && res.data.data[k].hasMissingFile == true) {
                        zNodes[i].children[j].name = zNodes[i].children[j].name + "(" + "×," + "?," + "!" + ")";
                        zNodes[i].children[j].name = zNodes[i].children[j].name.replace('(', '           (');
                      }

                    }
                  }
                }
              }
            }


            $.fn.zTree.init($("#treeDemo"), setting, zNodes);

            zTreeDblFlag = true;//代表扫描结束，树的双击事件信息显示由此判断

            layer.msg("扫描结束");

            //扫描之后更新存放文件信息的数组childrenInfo
            for (let i = 0; i < tempZtree.length; i++) {
              for (let j = 0; j < childrenInfo.length; j++) {
                if (childrenInfo[j].id == tempZtree[i].id) {
                  childrenInfo[j] = tempZtree[i];
                }
              }
            }

          }).catch(err => {
            console.log(err);
            layer.msg("完整扫描异常");
            layer.closeAll('loading');


          });


        }
      },
      //扫描弹框的实现
      scanQuick1: function () {
        if (zTree.getSelectedNodes()[0].state == false) {
          layer.msg("设备离线！");
        } else {
          $("#modal-select").modal('show');

          if (this.getCookie('extensions')) {//防止乱码
            document.getElementById("input-extensions").value = decodeURIComponent(this.getCookie('extensions'));
          }

          let temp = [];
          //快速扫描,扫描某种后缀的文件
          for (let i = 0; i < childrenInfo.length; i++) {
            if (childrenInfo[i].type == document.getElementById("input-extensions").value) {
              temp.push(childrenInfo[i]);
            }
          }

          for (let j = 0; j < temp.length; j++) {
            childrenInfo.splice(0, childrenInfo.length);
            childrenInfo.push(temp[j]);
          }
        }

      },

      //快速扫描
      scanQuick(event) {
        let username = this.getCookie('username');
        let password = this.getCookie('password');

        $("#modal-select").modal('hide');
        layer.load();

        let extensions = document.getElementById("input-extensions").value;
        let expireDays = 1000 * 60 * 60 * 24 * 15;
        this.setCookie('extensions', extensions, expireDays);

        //表格显示所选后缀名文件
        let temp = [];
        for (let i = 0; i < this.componentEntity.length; i++) {
          if (this.componentEntity[i].type == extensions) {
            temp.push(this.componentEntity[i]);
          }
        }
        this.componentEntity.splice(0, this.componentEntity.length);
        this.componentEntity = temp;


        //防止多次扫描软件状态叠加
        for (let i = 0; i < zNodes.length; i++) {
          for (let j = 0; j < zNodes[i].children.length; j++) {
            var regex = /\(/g;
            var str = zNodes[i].children[j].name;
            if (regex.test(str)) {
              let zname = zNodes[i].children[j].name.split('(');
              zNodes[i].children[j].name = zname[0];
            }
          }
        }


        this.$axios
          .get(this.getIP() +
            "deploymentdesigns/" +
            deployAllId +
            "/devices/" +
            deviceAllId + "/scan" + "?extensions=" + extensions,
            {
              //设置头
              headers: {
                "content-type": "application/x-www-form-urlencoded"
              },
              auth: {
                username: username,
                password: password
              }
            }).then(res => {

          let correct = [];
          let unknown = [];
          let modifyed = [];
          let miss = [];


          //快速扫描后，更新表格数据
          if (res.data.data.length > 0) {
            for (let i = 0; i < res.data.data.length; i++) {

              for (let j = 0; j < res.data.data[i].correctComponentFiles.length; j++) {

                for (let k = 0; k < this.componentEntity.length; k++) {

                  if (res.data.data[i].correctComponentFiles[j].id == this.componentEntity[k].id) {
                    this.componentEntity[k].state = '√';
                    correct.push(this.componentEntity[k]);
                    break;
                  }

                }

              }

              for (let j = 0; j < res.data.data[i].unknownFiles.length; j++) {

                for (let k = 0; k < this.componentEntity.length; k++) {

                  if (res.data.data[i].unknownFiles[j].id == this.componentEntity[k].id) {
                    this.componentEntity[k].state = '?';
                    unknown.push(this.componentEntity[k]);
                    break;

                  }
                }
              }

              for (let j = 0; j < res.data.data[i].modifyedComponentFiles.length; j++) {

                for (let k = 0; k < this.componentEntity.length; k++) {

                  if (res.data.data[i].modifyedComponentFiles[j].id == this.componentEntity[k].id) {
                    this.componentEntity[k].state = '×';
                    modifyed.push(this.componentEntity[k]);
                    break;
                  }
                }
              }

              for (let k = 0; k < this.componentEntity.length; k++) {

                if (this.componentEntity[k].state == "--") {

                  this.componentEntity[k].state = "!";
                  miss.push(this.componentEntity[k]);
                }
              }

              //表格排序
              this.componentEntity.splice(0, this.componentEntity.length);
              for (let i = 0; i < unknown.length; i++) {
                this.componentEntity.push(unknown[i]);
                tempZtree.push(unknown[i]);
              }

              for (let i = 0; i < modifyed.length; i++) {
                this.componentEntity.push(modifyed[i]);
                tempZtree.push(modifyed[i]);
              }

              for (let i = 0; i < miss.length; i++) {
                this.componentEntity.push(miss[i]);
                tempZtree.push(miss[i]);
              }

              for (let i = 0; i < correct.length; i++) {
                this.componentEntity.push(correct[i]);
                tempZtree.push(correct[i]);
              }

            }
          }


          //扫描完后添加软件状态
          for (let i = 0; i < zNodes.length; i++) {
            for (let j = 0; j < zNodes[i].children.length; j++) {
              for (let k = 0; k < res.data.data.length; k++) {
                if (zNodes[i].children[j].id == res.data.data[k].componentId) {
                  if (res.data.data[k].hasCorrectComponentFiles == true && res.data.data[k].hasModifyedComponentFiles == false && res.data.data[k].hasUnknownFiles == false && res.data.data[k].hasMissingFile == false) {
                    zNodes[i].children[j].name = zNodes[i].children[j].name + "(" + "√" + ")";
                    zNodes[i].children[j].name = zNodes[i].children[j].name.replace('(', '           (');
                  } else if (res.data.data[k].hasModifyedComponentFiles == true && res.data.data[k].hasUnknownFiles == false && res.data.data[k].hasMissingFile == false) {
                    zNodes[i].children[j].name = zNodes[i].children[j].name + "(" + "×" + ")";
                    zNodes[i].children[j].name = zNodes[i].children[j].name.replace('(', '           (');
                  } else if (res.data.data[k].hasModifyedComponentFiles == false && res.data.data[k].hasUnknownFiles == true && res.data.data[k].hasMissingFile == false) {
                    zNodes[i].children[j].name = zNodes[i].children[j].name + "(" + "?" + ")";
                    zNodes[i].children[j].name = zNodes[i].children[j].name.replace('(', '           (');
                  } else if (res.data.data[k].hasModifyedComponentFiles == false && res.data.data[k].hasUnknownFiles == false && res.data.data[k].hasMissingFile == true) {
                    zNodes[i].children[j].name = zNodes[i].children[j].name + "(" + "!" + ")";
                    zNodes[i].children[j].name = zNodes[i].children[j].name.replace('(', '           (');
                  } else if (res.data.data[k].hasModifyedComponentFiles == true && res.data.data[k].hasUnknownFiles == true && res.data.data[k].hasMissingFile == false) {
                    zNodes[i].children[j].name = zNodes[i].children[j].name + "(" + "×," + "?" + ")";
                    zNodes[i].children[j].name = zNodes[i].children[j].name.replace('(', '           (');
                  } else if (res.data.data[k].hasModifyedComponentFiles == true && res.data.data[k].hasUnknownFiles == false && res.data.data[k].hasMissingFile == true) {
                    zNodes[i].children[j].name = zNodes[i].children[j].name + "(" + "×," + "!" + ")";
                    zNodes[i].children[j].name = zNodes[i].children[j].name.replace('(', '           (');
                  } else if (res.data.data[k].hasModifyedComponentFiles == false && res.data.data[k].hasUnknownFiles == true && res.data.data[k].hasMissingFile == true) {
                    zNodes[i].children[j].name = zNodes[i].children[j].name + "(" + "?," + "!" + ")";
                    zNodes[i].children[j].name = zNodes[i].children[j].name.replace('(', '           (');
                  } else if (res.data.data[k].hasModifyedComponentFiles == true && res.data.data[k].hasUnknownFiles == true && res.data.data[k].hasMissingFile == true) {
                    zNodes[i].children[j].name = zNodes[i].children[j].name + "(" + "×," + "?," + "!" + ")";
                    zNodes[i].children[j].name = zNodes[i].children[j].name.replace('(', '           (');
                  }
                }
              }
            }
          }

          $.fn.zTree.init($("#treeDemo"), setting, zNodes);


          layer.closeAll('loading');
          zTreeDblFlag = true;


          layer.msg("扫描结束");


          for (let i = 0; i < tempZtree.length; i++) {
            for (let j = 0; j < childrenInfo.length; j++) {
              if (childrenInfo[j].id == tempZtree[i].id) {
                childrenInfo[j] = tempZtree[i];
              }
            }
          }

        }).catch(err => {
          console.log(err);

          layer.closeAll('loading');
          layer.msg("快速扫描异常");

        });
      },

      directQuick: function () {
        let username = this.getCookie('username');
        let password = this.getCookie('password');

        let extensions = decodeURIComponent(this.getCookie('extensions'));
        if (zTree.getSelectedNodes()[0].state == false) {
          layer.msg("设备离线！");
        } else {
          if (this.getCookie('extensions')) {
            layer.load();
            //表格显示所选后缀名文件
            let temp = [];
            for (let i = 0; i < this.componentEntity.length; i++) {
              if (this.componentEntity[i].type == extensions) {
                temp.push(this.componentEntity[i]);
              }
            }
            this.componentEntity.splice(0, this.componentEntity.length);
            this.componentEntity = temp;

            //防止多次扫描软件状态叠加
            for (let i = 0; i < zNodes.length; i++) {
              for (let j = 0; j < zNodes[i].children.length; j++) {
                var regex = /\(/g;
                var str = zNodes[i].children[j].name;
                if (regex.test(str)) {
                  let zname = zNodes[i].children[j].name.split('(');
                  zNodes[i].children[j].name = zname[0];
                }
              }
            }

            this.$axios
              .get(this.getIP() +
                "deploymentdesigns/" +
                deployAllId +
                "/devices/" +
                deviceAllId + "/scan" + "?extensions=" + extensions,
                {
                  //设置头
                  headers: {
                    "content-type": "application/x-www-form-urlencoded"
                  },
                  auth: {
                    username: username,
                    password: password
                  }
                }).then(res => {

              let correct = [];
              let unknown = [];
              let modifyed = [];
              let miss = [];

              //快速扫描后，更新表格数据
              if (res.data.data.length > 0) {
                for (let i = 0; i < res.data.data.length; i++) {

                  for (let j = 0; j < res.data.data[i].correctComponentFiles.length; j++) {

                    for (let k = 0; k < this.componentEntity.length; k++) {

                      if (res.data.data[i].correctComponentFiles[j].id == this.componentEntity[k].id) {
                        this.componentEntity[k].state = '√';
                        correct.push(this.componentEntity[k]);
                        break;
                      }

                    }

                  }

                  for (let j = 0; j < res.data.data[i].unknownFiles.length; j++) {

                    for (let k = 0; k < this.componentEntity.length; k++) {

                      if (res.data.data[i].unknownFiles[j].id == this.componentEntity[k].id) {
                        this.componentEntity[k].state = '?';
                        unknown.push(this.componentEntity[k]);
                        break;

                      }
                    }
                  }

                  for (let j = 0; j < res.data.data[i].modifyedComponentFiles.length; j++) {

                    for (let k = 0; k < this.componentEntity.length; k++) {

                      if (res.data.data[i].modifyedComponentFiles[j].id == this.componentEntity[k].id) {
                        this.componentEntity[k].state = '×';
                        modifyed.push(this.componentEntity[k]);
                        break;
                      }
                    }
                  }

                  for (let k = 0; k < this.componentEntity.length; k++) {

                    if (this.componentEntity[k].state == "--") {

                      this.componentEntity[k].state = "!";
                      miss.push(this.componentEntity[k]);
                    }
                  }

                  //表格排序
                  this.componentEntity.splice(0, this.componentEntity.length);
                  for (let i = 0; i < unknown.length; i++) {
                    this.componentEntity.push(unknown[i]);
                    tempZtree.push(unknown[i]);
                  }

                  for (let i = 0; i < modifyed.length; i++) {
                    this.componentEntity.push(modifyed[i]);
                    tempZtree.push(modifyed[i]);
                  }

                  for (let i = 0; i < miss.length; i++) {
                    this.componentEntity.push(miss[i]);
                    tempZtree.push(miss[i]);
                  }

                  for (let i = 0; i < correct.length; i++) {
                    this.componentEntity.push(correct[i]);
                    tempZtree.push(correct[i]);
                  }

                }
              }

              //扫描完后添加软件状态
              for (let i = 0; i < zNodes.length; i++) {
                for (let j = 0; j < zNodes[i].children.length; j++) {
                  for (let k = 0; k < res.data.data.length; k++) {
                    if (zNodes[i].children[j].id == res.data.data[k].componentId) {
                      if (res.data.data[k].hasCorrectComponentFiles == true && res.data.data[k].hasModifyedComponentFiles == false && res.data.data[k].hasUnknownFiles == false && res.data.data[k].hasMissingFile == false) {
                        zNodes[i].children[j].name = zNodes[i].children[j].name + "(" + "√" + ")";
                        zNodes[i].children[j].name = zNodes[i].children[j].name.replace('(', '           (');
                      } else if (res.data.data[k].hasModifyedComponentFiles == true && res.data.data[k].hasUnknownFiles == false && res.data.data[k].hasMissingFile == false) {
                        zNodes[i].children[j].name = zNodes[i].children[j].name + "(" + "×" + ")";
                        zNodes[i].children[j].name = zNodes[i].children[j].name.replace('(', '           (');
                      } else if (res.data.data[k].hasModifyedComponentFiles == false && res.data.data[k].hasUnknownFiles == true && res.data.data[k].hasMissingFile == false) {
                        zNodes[i].children[j].name = zNodes[i].children[j].name + "(" + "?" + ")";
                        zNodes[i].children[j].name = zNodes[i].children[j].name.replace('(', '           (');
                      } else if (res.data.data[k].hasModifyedComponentFiles == false && res.data.data[k].hasUnknownFiles == false && res.data.data[k].hasMissingFile == true) {
                        zNodes[i].children[j].name = zNodes[i].children[j].name + "(" + "!" + ")";
                        zNodes[i].children[j].name = zNodes[i].children[j].name.replace('(', '           (');
                      } else if (res.data.data[k].hasModifyedComponentFiles == true && res.data.data[k].hasUnknownFiles == true && res.data.data[k].hasMissingFile == false) {
                        zNodes[i].children[j].name = zNodes[i].children[j].name + "(" + "×," + "?" + ")";
                        zNodes[i].children[j].name = zNodes[i].children[j].name.replace('(', '           (');
                      } else if (res.data.data[k].hasModifyedComponentFiles == true && res.data.data[k].hasUnknownFiles == false && res.data.data[k].hasMissingFile == true) {
                        zNodes[i].children[j].name = zNodes[i].children[j].name + "(" + "×," + "!" + ")";
                        zNodes[i].children[j].name = zNodes[i].children[j].name.replace('(', '           (');
                      } else if (res.data.data[k].hasModifyedComponentFiles == false && res.data.data[k].hasUnknownFiles == true && res.data.data[k].hasMissingFile == true) {
                        zNodes[i].children[j].name = zNodes[i].children[j].name + "(" + "?," + "!" + ")";
                        zNodes[i].children[j].name = zNodes[i].children[j].name.replace('(', '           (');
                      } else if (res.data.data[k].hasModifyedComponentFiles == true && res.data.data[k].hasUnknownFiles == true && res.data.data[k].hasMissingFile == true) {
                        zNodes[i].children[j].name = zNodes[i].children[j].name + "(" + "×," + "?," + "!" + ")";
                        zNodes[i].children[j].name = zNodes[i].children[j].name.replace('(', '           (');
                      }
                    }
                  }
                }
              }

              $.fn.zTree.init($("#treeDemo"), setting, zNodes);

              layer.closeAll('loading');
              zTreeDblFlag = true;

              layer.msg("扫描结束");

              for (let i = 0; i < tempZtree.length; i++) {
                for (let j = 0; j < childrenInfo.length; j++) {
                  if (childrenInfo[j].id == tempZtree[i].id) {
                    childrenInfo[j] = tempZtree[i];
                  }
                }
              }

            }).catch(err => {
              console.log(err);

              layer.closeAll('loading');
              layer.msg("快速扫描异常");

            });
          }
        }

      }


    },
    computed: {
      //搜索框
      componentEntityA: function () {
        var self = this;
        return self.componentEntity.filter(function (item) {
          return item.name.toLowerCase().indexOf(self.searchQuery.toLowerCase()) !== -1;
        })
      }
    }

  }
  ;

</script>
<style type="text/css" scoped>

  .wrap {
    width: 150px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .devcompchose {
    height: 470px;
    overflow: auto;
  }

  .field-box {
    margin-bottom: 30px;
    margin-left: 0;
    float: left;
    width: 100%;
  }

  select {
    width: 105px;
    border-radius: 4px;
    color: #555555;
    height: 25px;
    font-size: 12px;
  }

  .row {
    margin-left: 211px;
  }

  button {
    height: 29px;
    width: 70px;
  }

  .drag-content {
    border: 2px solid rgba(204, 204, 204, 1);
    min-height: 400px;

  }

  label {
    font-size: 13px;
    line-height: 26px;
  }

  /* .modal {

     left: 57%;

     width: 414px;
   }*/

  .level0 {
    width: 275px;
    display: inline;
    overflow: hidden;
    white-space: pre-wrap;
    text-overflow: ellipsis;
    font-family: Verdana, Arial, Helvetica, AppleGothic, sans-serif;
    display: table;
  }

  .level1 {
    overflow: hidden;
    white-space: pre-wrap;
    text-overflow: ellipsis;
    font-family: Verdana, Arial, Helvetica, AppleGothic, sans-serif;
  }

  div#scan-selection.span8 {
    margin-top: 4px;
  }
</style>
