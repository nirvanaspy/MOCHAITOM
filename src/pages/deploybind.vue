<template>
  <!-- main container -->
  <div>
    <div class="container-fluid">
      <div id="pad-wrapper">
        <div class="row-fluid header">
          <a class="header-wrapper">
            <span class="text">设计</span>
            <i class="icon icon-sitemap"></i>
          </a>
          <div class="span10 pull-right">
            <button type="button" class="btn-flat primary icon-magic pull-right" @click="submit()">
              保存
            </button>
            <button type="button" class="btn-flat default icon-check pull-right" @click="paste()">
              粘贴
            </button>
            <button type="button" class="btn-flat default icon-print pull-right" style="margin-right: 5px;"
                    @click="copy()">
              复制
            </button>
          </div>
        </div>
        <div class="row-fluid form-wrapper">
          <div class="span12" style="margin-top: -30px;">
            <div class="drag-content span12">
              <!-- 设备 -->
              <div class="span3" style="height: 480px;">
                <div class="row-fluid table devcompchose">

                  <div class="devcompfind">
                    <input class="search" type="text" placeholder="设备名称.." style="width: 90%;"
                           v-model="searchQueryDev"/>
                  </div>
                  <br/>
                  <table class="table table-hover" id="table_value" style="margin-top:-17px;">
                    <thead>
                    <tr>
                      <th class="span7 wrap">
                        设备名称
                      </th>
                      <th class="span5 sortable">
                        <span class="line"></span>状态
                      </th>
                    </tr>
                    </thead>
                    <tbody>
                    <!-- row -->
                    <tr class="first" style="cursor: pointer;" v-for="(device,index) in devicesA"
                        @click="deviceClick($event)" :id="device.id" v-if="!device.virtual">
                      <td style="display:none" id="id">{{device.id}}</td>
                      <td class="wrap">
                        <div class="wrap" :id="device.id" :title="device.name">
                          <i class="icon-laptop"></i>&nbsp;
                          {{device.name}}
                          <br/>
                          &nbsp; &nbsp; &nbsp; ({{device.ip}})
                        </div>


                      </td>
                      <td>
                        <span class="label label-primary" v-if="!device.online">离线</span>
                        <span class="label label-success" v-else>在线</span>
                      </td>
                    </tr>


                    </tbody>
                  </table>
                </div>

              </div>

              <!-- 拖动区域 -->
              <div class="move span6" id="moveContent" style="height: 481px;margin-top: -1px;overflow: auto;">
                <div v-if="leftClick">
                  <div style="margin-top:20px;text-align: center;">
                    <h3 class="newdeploybind">部署设计</h3>
                    <br/>
                    <h2 class="devicename">{{deviceName}}</h2>
                  </div>
                  <div class="moveChild span4" v-for="(device,index) in devicecomps" :key="index"
                       style="margin-top: 40px;text-align: center;margin-left: -5px;"
                       @click="selectMoveChild(device)"
                  >

                    <div>
                      <img src="../../img/files.png" style="height: 90px;"/>
                    </div>

                    <!-- <br/> -->
                    <div>
                      {{device.componentEntity.name}}
                    </div>

                    <div>
                      {{device.componentEntity.version}}
                    </div>

                  </div>

                </div>

                <div v-else>
                  <div style="margin-top:20px;text-align: center;">
                    <h3 class="newdeploybind">部署设计</h3>
                    <br/>
                    <h2 class="devicename" v-show="compName">{{compName}}</h2>
                  </div>
                  <div class="moveChild span4" v-for="(comp,index) in compdevices" :key="index"
                       style="margin-top: 40px;text-align: center;margin-left: -5px;">

                    <div>
                      <img src="../../img/computers.jpg" style="height: 80px;"/>
                    </div>

                    <!-- <br/> -->
                    <div>
                      {{comp.deviceEntity.name}}
                    </div>

                    <div>
                      {{comp.deviceEntity.ip}}
                    </div>

                  </div>

                </div>

              </div>

              <!-- 组件 -->
              <div class="span3" id="deploydetail" style="height:480px;">

                <div class="row-fluid table devcompchose">
                  <div class="devcompfind">
                    <input class="search" type="text" placeholder="组件名称.." style="width: 90%;"
                           v-model="searchQueryComp"/>
                  </div>
                  <table class="table table-hover" id="table_value2" style="margin-top:3px;">
                    <thead>
                    <tr>
                      <th class="span3 wrap2">
                        组件名称
                      </th>
                      <th class="span3 sortable">
                        <span class="line"></span>大小
                      </th>
                      <th class="span2 sortable">
                        <span class="line"></span>版本
                      </th>
                      <th class="span2 sortable">
                        <span class="line"></span>移入
                      </th>
                      <th class="span2 sortable">
                        <span class="line"></span>删除
                      </th>

                    </tr>
                    </thead>
                    <tbody>

                    <tr class="first" style="cursor: pointer;" v-for="(component,index) in compsA"
                        :id="component.id"
                        v-if="!component.deleted"
                        :class="{'isBinded': component.isBind === true}"
                    >
                      <td style="display:none">{{component.id}}</td>

                      <td class="wrap2" @click="compClick($event)" :id="component.id">
                        <div class="wrap2" :id="component.id" :title="component.name">
                          <i class="icon-folder-close-alt"></i>&nbsp;
                          {{component.name}}
                        </div>

                      </td>
                      <td class="wrap2" @click="compClick($event)" :id="component.id">
                        <div class="wrap2" :id="component.id" :title="component.displaySize">
                          {{component.displaySize}}
                        </div>
                      </td>
                      <td @click="compClick($event)" :id="component.id">
                        <div :id="component.id">
                          {{component.version}}
                        </div>
                      </td>

                      <td>
                        <div class="btn-group small" style="margin-right: 3px">
                          <button class="btn-glow icon-reply moveInOut" @click="moveComp($event)" value="aa">
                            <!-- <i class="icon-random"></i> -->
                            <!--:class="{'btn-color': component.selected === true}"-->
                          </button>
                        </div>

                      </td>
                      <td v-if="component.isBind">
                        <div class="btn-group small" style="margin-right: 3px;">

                          <button class="btn-glow icon-trash moveInOut"
                                  @click="moveoutComp($event)">

                          </button>
                        </div>

                      </td>
                      <td v-else>
                        <div class="btn-group small" style="margin-right: 3px">
                          <button class="btn-glow icon-trash moveInOut" @click="moveoutComp($event)">
                          </button>

                        </div>

                      </td>

                    </tr>
                    <tr class="first historyComponents" style="cursor: pointer;" v-for="(component,index) in compsA"
                        :id="component.id"
                        v-if="component.deleted"
                        :class="{'isBinded': component.isBind === true}"
                    >
                      <td style="display:none">{{component.id}}</td>

                      <td class="wrap2" @click="compClick($event)" :id="component.id">
                        <div class="wrap2" :id="component.id" :title="component.name">
                          <i class="icon-folder-close-alt"></i>&nbsp;
                          {{component.name}}
                        </div>

                      </td>
                      <td class="wrap2" @click="compClick($event)" :id="component.id">
                        <div class="wrap2" :id="component.id" :title="component.displaySize">
                          {{component.displaySize}}
                        </div>
                      </td>
                      <td @click="compClick($event)" :id="component.id">
                        <div :id="component.id">
                          {{component.version}}
                        </div>
                      </td>

                      <td>
                        <div class="btn-group small" style="margin-right: 3px">
                          <button class="btn-glow icon-info-sign moveInOut"  @click="bindDisabled" value="aa">
                            <!-- <i class="icon-random"></i> -->
                            <!--:class="{'btn-color': component.selected === true}"-->
                          </button>
                        </div>

                      </td>
                      <!--<td>
                        <div class="btn-group small" style="margin-right: 3px">
                          <button class="btn-glow icon-trash moveInOut" @click="moveoutComp($event)">

                          </button>
                        </div>

                      </td>-->

                      <td v-if="component.isBind">
                        <div class="btn-group small" style="margin-right: 3px;">

                          <button class="btn-glow icon-trash moveInOut"
                                  @click="moveoutComp($event)">

                          </button>
                        </div>

                      </td>
                      <td v-else>
                        <div class="btn-group small" style="margin-right: 3px">
                          <button class="btn-glow icon-trash moveInOut" @click="moveoutComp($event)">
                          </button>

                        </div>

                      </td>

                    </tr>

                    </tbody>
                  </table>
                </div>

              </div>


              <br/>


            </div>

          </div>
        </div>


      </div>
    </div>


    <!--<div>
        设备上的原有的组件：{{compdevices}}

    </div>-->

    <!--<hr/>
     <div>
        部署设计：{{deployplans}}
    </div>

    <hr/>
    <div>
        设备：{{devices}}
    </div>-->

    <!-- <hr/>
     <div>
       设备名：{{deviceArr}}
     </div>-->

    <!-- <hr/>

    <hr/>
    <div>
        {{deployplanId}}
    </div>  -->

  </div>

</template>

<script>
  /* eslint-disable */
  let dom = null;
  let deviceArr = [];   //设备名称
  let deviceIdArr = [];       //设备的ID信息
  let compArr1 = {};   //组件名称
  let compArr = [];
  let compIddArr = [];       //组件的ID信息
  let nameArr = [];   //设备及组件的名称
  let idAll = [];     //设备及组件的id
  let deployplanId = ''; //下拉框所选中的部署设计的id
  let deviceId = '';  //下拉框所选中的设备的id

  let diveceCHIp = ''; //左侧表格中点击的设备的ip
  //let deviceCHId = '';  //左侧表格中点击的设备的id

  let diveceIdPass = [];  //要传给后台的设备的id数组
  let compsIdPass = [];  //要传给后台的组件的id数组

  export default {
    data() {
      return {
        selected: '',
        selectedDev: '',
        searchQueryDev: '',   //设备搜索框
        searchQueryComp: '',  //组件搜索框
        devices: [],          //左侧表格查询出来的设备的信息
        comps: [],            //左侧表格查询出来的组件的信息
        comps1: [],
        deviceArr: [],        //移动的设备的信息
        deviceIdArr: [],
        compArr: [],
        compIddArr: [],       //左侧表格中的点击的设备的组件的id数组
        nameArr: [],
        idAll: [],
        deployplanId: '',
        deviceId: '',
        deployplans: [],
        deployplanInfos: [],    //部署设计信息
        devcomps: [],  //设备上绑定的组件

        compdevices: [], //组件所在的设备

        devicecomps: [],  //设备上原有的组件

        componentEntity: [],   //组件的id

        deviceEntity: [],      //新加入的组件的设备的id

        diveceIdPass: [],    //要传给后台的设备的id数组
        compsIdPass: [],       //要传给后台的组件的id数组

        deviceName: '',        //显示在拖动区域的设备的名称

        compName: '',          //显示在拖动区域的组件的名称

        deviceCHId: '',         //左侧表格中点击的设备的id

        compCHId: '',           //右侧表格中点击的组件的id

        detailIds: [],          //要删除的绑定的id

        devcompInfo: [],         //存在cookie中的复制的信息

        copyValue: [],           //复制的内容

        compIddCopyArr: [],       //复制的内容的组件的id

        compIddPasteArr: [],        //粘贴的内容的组件的id

        leftClick: ''             //是否点击的是左侧表格的设备，true则是


      }
    },
    created() {
      var projectId = this.getCookie('projectId');
      var username = this.getCookie('username');
      var password = this.getCookie('password');

      var compArr = [];
      //获取设备
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
        this.devices = res.data.data;
      })
        .catch(err => {
          console.log(err);
        });

      //获取组件
      this.$axios.get(this.getIP() + 'components', {
        params: {  //get请求在第二个位置，post在第三个位置
          /*isShowHistory: false*/
          isShowHistory: true
        },
        //设置头
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        auth: {
          username: username,
          password: password
        }
      }).then(res => {

        this.comps = res.data.data;

        /*this.findIndex(this.comps,this.devicecomps)*/
        for (var j = 0; j < this.comps.length; j++) {
          this.comps[j].isBind = "";
          this.comps[j].isBind = "false";
        }


      })
        .catch(err => {
          console.log(err);
        });


      //获取部署设计的相关信息
      this.$axios.get(this.getIP() + 'projects/' + projectId + '/deploymentdesigns', {
        //设置头
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        auth: {
          username: username,
          password: password
        }
      }).then(res => {
        this.deployplans = res.data.data;
        console.log(this.deployplans);
        for (var i = 0; i < this.deployplans.length; i++) {
          this.deployplanInfos.push({
            id: this.deployplans[i].id,
            name: this.deployplans[i].name
          })
        }
        console.log(this.deployplans);
        //alert("xydp");

      })
        .catch(err => {
          console.log("hhh");
        });
      /*    let compsArray = this.comps;
          let devicecompsArray = this.devicecomps;
          for(var i = 0;i < compsArray.length; i++) {
            for (var j = 0; j<devicecompsArray.length; j++) {
              if (devicecompsArray[j].id === compsArray[j].id) {
                compsArray[i].selected = true
              }
            }
          }*/

    },
    methods: {
      /*findIndex(A,B) {
        A.findIndex((item) => {
          if (item.id === B.id) {
            item.getElementsByTagName('td').style.color = "blue"
          }
        })
      },*/
      bindDisabled: function () {
        layer.msg("历史组件无法绑定！")
      },
      drag: function (event) {
        event = event || window.event;
        event.dataTransfer.effectAllowed = 'all';
        dom = event.currentTarget;
        //alert(dom);

      },
      drop: function (event) {
        event = event || window.event;
        event.preventDefault();
        event.dataTransfer.dropEffect = "copy";
        event.target.appendChild(dom);
      },
      allowDrop: function (event) {
        event.preventDefault();
      },

      deviceClick: function (event) {      //设备点击事件
        this.leftClick = true;
        let e = event || window.event;
        let target = e.target || e.srcElement;

        let username = this.getCookie('username');
        let password = this.getCookie('password');

        console.log(target);
        console.log(target.id);
        this.deviceCHId = target.id;     //左侧表格所点击的设备的id

        //根据设备的id得到设备的 名称
        for (let i = 0; i < this.devices.length; i++) {
          if (this.deviceCHId == this.devices[i].id) {
            this.deviceName = this.devices[i].name;
            break;
          }

        }

        let deployPlanId = this.$route.params.id;  //所选择的部署设计的id
        //alert(compId);
        console.log(deployPlanId);

        this.$axios.get(this.getIP() + 'deploymentdesigns/' + deployPlanId + '/deploymentdesigndetails/devices/' + this.deviceCHId, {
          //设置头
          headers: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          auth: {
            username: username,
            password: password
          }
        }).then(res => {
          this.devicecomps = res.data.data;

          //点击后重新获取组件
          //this.comps.splice(0,this.comps.length);

          //判断是否绑定 初始化
          for(var j=0;j<this.comps.length;j++){
            this.comps[j].isBind = false;
          }

          //为是否绑定赋值
          for(var i=0;i<this.devicecomps.length;i++){
            for(var j=0;j<this.comps.length;j++){
              if(this.devicecomps[i].componentEntity.id == this.comps[j].id){//判断id是否相等
                this.comps[j].isBind = true;
                break;
              }
            }
          }

        })
          .catch(err => {
            console.log(err);
          })



      },

      compClick: function (event) {      //设备点击事件
        this.leftClick = false;
        this.deviceName = '';      //将点击的设备名称置为空
        let e = event || window.event;
        let target = e.target || e.srcElement;

        let username = this.getCookie('username');
        let password = this.getCookie('password');

        console.log(target);
        console.log(target.id);
        this.compCHId = target.id;     //右侧表格所点击的组件的id
        console.log(this.compCHId);

        //根据组件的id得到组件的 名称
        for (let i = 0; i < this.comps.length; i++) {
          if (this.compCHId == this.comps[i].id) {
            this.compName = this.comps[i].name;
            break;
          }

        }

        let deployPlanId = this.$route.params.id;  //所选择的部署设计的id
        //alert(compId);
        console.log(deployPlanId);

        this.$axios.get(this.getIP() + 'deploymentdesigns/' + deployPlanId + '/deploymentdesigndetails/components/' + this.compCHId, {
          //设置头
          headers: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          auth: {
            username: username,
            password: password
          }
        }).then(res => {
          this.compdevices = res.data.data
        })
          .catch(err => {
            console.log(err);
          })

      },

      moveComp: function (event) {   //移动组件

        var e = event || window.event;

        var name;
        var version;

        var target = e.target || e.srcElement;

        //debugger;

        //console.log(target.parentNode.parentNode.parentNode);

        var comptrInfo = target.parentNode.parentNode.parentNode;

        var id = comptrInfo.id;            //要移动的组件的id

        var flag = false;                  //组件是否已存在的标志,false为不存在

        var deviceIdPa = '';                    //要传给后台的组件的id

        this.deviceEntity.push({
          id: this.deviceCHId            //将此设备的id存入组件所在的设备的id数组中
        });

        console.log(this.deviceEntity);

        //console.log(id);


        /*if(this.devicecomps.length > 0){*/  //判断是否已选择设备
        console.log("拖动区域的设备名--------------");
        console.log(this.deviceName);
        if (this.deviceName.length != 0) {    //判断是否已选择设备,即看拖动区域是否有设备名
          if (this.devicecomps.length > 0) {    //判断此设备上是否有原有的绑定组件
            this.compIddArr.splice(0, this.compIddArr.length);   //清空数组
            for (var i = 0; i < this.devicecomps.length; i++) {  //在查询出来的设备的原有组件数组中添加移入的组件

              /*
                     判断要添加的组件的id在原有数组中是否已存在
                        存在：提示组件已存在
                        不存在：将此组件加入此数组中*/

              //查询出此设备下的组件，并将这些组件添加到一个组件id的数组里去。
              this.compIddArr.push(this.devicecomps[i].componentEntity.id);

              //deviceIdPa = this.devicecomps[i].deviceEntity.id;         //此设备的id

              /*this.deviceEntity.push({
                        id: this.devicecomps[i].deviceEntity.id               //将设备的id存入组件所在的设备的id数组中
                    });
*/
            }
          } else {
            this.compIddArr.length = 0;
          }


          console.log("组件的id------------");
          console.log(this.compIddArr);
          if (this.compIddArr.length != 0) {    //判断设备下的组件数组是否存在
            for (var j = 0; j < this.compIddArr.length; j++) {   //遍历组件的id数组，看此组件是否已绑定到设备
              if (id == this.compIddArr[j]) {  //组件已存在
                flag = true;             //组件存在则将标记改为true，并退出
                layer.msg("组件已存在");
                return;
              } else {

                flag = false;

              }
            }
          } else {
            flag = false;
          }


          if (!flag) {  //如果不存在
            for (var k = 0; k < this.comps.length; k++) {  //遍历右侧组件的数组，找到与此id相等的组件，获取需要的信息
              //根据id获取组件的名称和版本
              if (id == this.comps[k].id) {
                /*name = this.compIddArr[k].name;
                          version = this.compIddArr[k].version;*/

                this.componentEntity = this.comps[k];
                /*console.log("要插入的组件信息--------");
                          console.log(this.componentEntity);*/

                /*this.componentEntity.push({  //将此组件的名称id加到组件数组中
                              name : name,
                              version : version
                          });*/
              } else {
                this.componentEntity.length = 0;
              }

            }

            console.log("添加");
            //console.log(this.componentEntity);

            this.devicecomps.push({
              componentEntity: this.componentEntity,     //将组件数组作为属性加入到设备中去
              deviceEntity: this.deviceEntity
            });


            console.log("传给后台的设备和组件的id数组--------------------");
            //将此设备的id加入要传给后台的设备的id数组
            //this.diveceIdPass.push(deviceIdPa);
            this.diveceIdPass.push(this.deviceCHId);
            console.log(this.diveceIdPass);
            //将此组件的id加入要传给后台的组件的id数组
            this.compsIdPass.push(this.componentEntity.id);
            console.log(this.compsIdPass);

          }


        } else {
          layer.msg("请先选择设备");
        }

        console.log("---------------------");


      },

      moveoutComp: function (event) {   //移除组件

        var e = event || window.event;

        var name;
        var version;

        var target = e.target || e.srcElement;

        //debugger;

        //console.log(target.parentNode.parentNode.parentNode);

        var compdeleteInfo = target.parentNode.parentNode.parentNode;

        var idDel = compdeleteInfo.id;            //要删除的组件的id

        var flagDel = false;                  //绑定关系是否已存在的标志,false为不存在

        var deviceIdPa = '';                    //要传给后台的组件的id

        this.deviceEntity.push({
          id: this.deviceCHId            //将此设备的id存入组件所在的设备的id数组中
        });

        console.log(this.deviceEntity);

        //console.log(id);

        console.log("拖动区域的设备名--------------");
        console.log(this.deviceName);
        if (this.deviceName.length != 0) {    //判断是否已选择设备,即看拖动区域是否有设备名

          if (this.devicecomps.length > 0) {    //判断此设备上是否有原有的绑定组件
            console.log(this.devicecomps);
            for (let i = 0; i < this.devicecomps.length; i++) {

              if (idDel == this.devicecomps[i].componentEntity.id) {  //在移动区域找到此组件，再判断是否是已绑定组件
                flagDel = true;
                if (typeof(this.devicecomps[i].id) == "undefined") {   //获取绑定的id，若不存在，则此组件只是在前端移入还未绑定
                  //alert("hhhh");
                  this.devicecomps.splice(i, 1);      //从移动区域删除自己加上的数组

                  let deviceIndex = this.diveceIdPass.indexOf(this.deviceCHId);
                  let compIndex = this.compsIdPass.indexOf(this.componentEntity.id);
                  //var compIndex2 = this.compIddArr.indexOf(this.componentEntity.id);


                  //从传给后台的绑定数组中删除此设备和组件信息
                  console.log("与绑定相关-----------");
                  this.diveceIdPass.splice(deviceIndex, 1);
                  console.log(this.diveceIdPass);

                  this.compsIdPass.splice(compIndex, 1);
                  console.log(this.compsIdPass);

                  /*this.compIddArr.splice(compIndex2,1);
                              console.log(this.compIddArr);*/


                } else {    //此设备是已经绑定的了，则将绑定的id获取到，传给后台

                  //this.detailIds.push(this.devicecomps[i].id);

                  console.log("要传给后台的删除的绑定的关系------------------");
                  console.log(this.devicecomps[i].id);


                  let qs = require('qs');
                  let username = this.getCookie('username');
                  let password = this.getCookie('password');

                  flagDel = true;
                  let msg = "您确定删除吗？";
                  if (confirm(msg) == true) {
                    this.$axios.delete(this.getIP() + 'deploymentdesigns/deploymentdesigndetails/' + this.devicecomps[i].id,
                      {
                        //设置头
                        headers: {
                          'content-type': 'application/x-www-form-urlencoded'
                        },
                        auth: {
                          username: username,
                          password: password
                        }
                      }).then(res => {
                      layer.msg("删除成功!");
                      this.devicecomps.splice(i, 1);
                      return;
                    })
                      .catch(err => {
                        layer.msg("删除失败！");
                        return;
                      })
                  } else {
                    return false;
                  }


                }
                return;
              } else {
                flagDel = false;  //此组件未绑定到设备上
              }
            }

            if (!flagDel) {
              layer.msg("此组件未绑定到设备上");
            }
          } else {
            this.compIddArr.length = 0;
            layer.msg("此设备还未绑定组件,不能删除！");
          }


        } else {
          layer.msg("请先选择设备");
        }

        console.log("---------------------");


      },

      submit: function () {
        //alert("hh");
        var qs = require('qs');
        var username = this.getCookie('username');
        var password = this.getCookie('password');

        var deployPlanId = this.$route.params.id;  //所选择的部署设计的id
        console.log("所选择的部署设计的id-----------------");
        console.log(deployPlanId);

        /*var deviceIds = {};
          var componentIds = {};

          deviceIds = this.diveceIdPass;*/

        if (this.diveceIdPass.length != 0) {   //是否有要绑定的数据
          let formData = new FormData();
          formData.append('deviceIds', this.diveceIdPass);
          formData.append('componentIds', this.compsIdPass);

          this.$axios.post(this.getIP() + 'deploymentdesigns/' + deployPlanId + "/deploymentdesigndetails", formData,

            {

              //设置头
              headers: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              auth: {
                username: username,
                password: password
              }
            }).then(res => {
            layer.msg("保存成功");
            this.$router.replace({path: '/deployplan'})
          })
            .catch(err => {
              layer.msg("保存失败！");
            })
        } else {
          layer.msg("无绑定信息");
        }


      },

      copy: function () {
        if (this.deviceName.length != 0) {    //判断是否已选择设备,即看拖动区域是否有设备名
          this.copyValue.splice(0, this.copyValue.length);    //清空复制内容的数组

          if (this.devicecomps.length > 0) {    //判断此设备上是否有原有的绑定组件
            this.compIddCopyArr.splice(0, this.compIddCopyArr.length);   //清空数组
            for (var i = 0; i < this.devicecomps.length; i++) {  //在查询出来的设备的原有组件数组中添加移入的组件

              this.compIddCopyArr.push(this.devicecomps[i].componentEntity.id);

            }
          } else {
            this.compIddCopyArr.length = 0;
          }

          console.log("组件的id------------");
          if (this.compIddCopyArr.length != 0) {
            this.copyValue = this.compIddCopyArr;
            console.log(this.copyValue);

            layer.msg('复制成功！');
          } else {
            layer.msg("无组件可以复制！");
          }


        } else {
          layer.msg("请先选择设备");
        }

      },

      paste: function () {
        var compIndex;    //重复的文件下标

        this.deviceEntity.push({
          id: this.deviceCHId            //将此设备的id存入组件所在的设备的id数组中
        });


        if (this.deviceName.length != 0) {    //判断是否已选择设备,即看拖动区域是否有设备名

          if (this.devicecomps.length > 0) {    //判断此设备上是否有原有的绑定组件
            this.compIddPasteArr.splice(0, this.compIddPasteArr.length);   //清空数组
            for (let i = 0; i < this.devicecomps.length; i++) {  //在查询出来的设备的原有组件数组中添加移入的组件

              this.compIddPasteArr.push(this.devicecomps[i].componentEntity.id);

            }
          } else {
            this.compIddPasteArr.length = 0;
          }

          console.log("粘贴组件的id------------");
          console.log(this.compIddPasteArr);


          if (this.copyValue.length != 0) {    //判断复制数组中是否有数据

            var msg = "您确定粘贴吗？";
            if (confirm(msg) == true) {
              console.log("找相同前-----------");
              console.log(this.devicecomps);
              console.log(this.copyValue);


              let res1 = this.compIddPasteArr.filter((x) => {
                return this.copyValue.includes(x)
              })

              if (res1.length != 0) {  //判断是否有同名文件存在
                console.log("有" + res1.length + "个文件已存在---------");
                var msg1 = "有" + res1.length + "个文件已存在,是否跳过？";
                if (confirm(msg1) == true) {  //是否跳过
                  //从复制的文件中删除已存在的
                  for (var x = 0; x < res1.length; x++) {
                    compIndex = this.copyValue.indexOf(res1[x]);
                    this.copyValue.splice(compIndex, 1);

                  }

                  //将删除后的所有内容加入区域数组中
                  for (var i = 0; i < this.copyValue.length; i++) {   //将所有复制内容加入区域数组中

                    for (var k = 0; k < this.comps.length; k++) {  //遍历右侧组件的数组，找到与此id相等的组件，获取需要的信息
                      //根据id获取组件的名称和版本
                      if (this.copyValue[i] == this.comps[k].id) {

                        this.componentEntity = this.comps[k];

                      }
                    }

                    this.devicecomps.push({
                      componentEntity: this.componentEntity,     //将组件数组作为属性加入到设备中去
                      deviceEntity: this.deviceEntity
                    });

                    console.log("粘贴--传给后台的设备和组件的id数组------------------");
                    //将此设备的id加入要传给后台的设备的id数组
                    //this.diveceIdPass.push(deviceIdPa);
                    this.diveceIdPass.push(this.deviceCHId);
                    console.log(this.diveceIdPass);
                    //将此组件的id加入要传给后台的组件的id数组
                    this.compsIdPass.push(this.componentEntity.id);
                    console.log(this.compsIdPass);
                  }


                } else {   //不跳过
                  //从复制的文件中删除已存在的
                  for (let x = 0; x < res1.length; x++) {
                    compIndex = this.copyValue.indexOf(res1[x]);
                    this.copyValue.splice(compIndex, 1);

                  }

                  //将删除后的所有内容加入区域数组中
                  for (let i = 0; i < this.copyValue.length; i++) {   //将所有复制内容加入区域数组中

                    for (let k = 0; k < this.comps.length; k++) {  //遍历右侧组件的数组，找到与此id相等的组件，获取需要的信息
                      //根据id获取组件的名称和版本
                      if (this.copyValue[i] == this.comps[k].id) {

                        this.componentEntity = this.comps[k];

                      }
                    }

                    this.devicecomps.push({
                      componentEntity: this.componentEntity,     //将组件数组作为属性加入到设备中去
                      deviceEntity: this.deviceEntity
                    });

                    console.log("粘贴--传给后台的设备和组件的id数组------------------");
                    //将此设备的id加入要传给后台的设备的id数组
                    //this.diveceIdPass.push(deviceIdPa);
                    this.diveceIdPass.push(this.deviceCHId);
                    console.log(this.diveceIdPass);
                    //将此组件的id加入要传给后台的组件的id数组
                    this.compsIdPass.push(this.componentEntity.id);
                    console.log(this.compsIdPass);
                  }
                }
              } else {   //无同名文件,直接将所有的组件添加进区域遍历的数组中


                for (let i = 0; i < this.copyValue.length; i++) {   //将所有复制内容加入区域数组中

                  for (let k = 0; k < this.comps.length; k++) {  //遍历右侧组件的数组，找到与此id相等的组件，获取需要的信息
                    //根据id获取组件的名称和版本
                    if (this.copyValue[i] == this.comps[k].id) {

                      this.componentEntity = this.comps[k];

                    }
                  }

                  this.devicecomps.push({
                    componentEntity: this.componentEntity,     //将组件数组作为属性加入到设备中去
                    deviceEntity: this.deviceEntity
                  });

                  console.log("粘贴--传给后台的设备和组件的id数组------------------");
                  //将此设备的id加入要传给后台的设备的id数组
                  //this.diveceIdPass.push(deviceIdPa);
                  this.diveceIdPass.push(this.deviceCHId);
                  console.log(this.diveceIdPass);
                  //将此组件的id加入要传给后台的组件的id数组
                  this.compsIdPass.push(this.componentEntity.id);
                  console.log(this.compsIdPass);
                }


              }


              console.log(res1);
            } else {
              return false;
            }


          } else {
            layer.msg("请先复制");
          }

        } else {
          layer.msg("请先选择设备");
        }


      },

      changeDevice: function () {
        deviceId = this.selectedDev;
        //alert(deviceId);

      },
      changeDeployPlan: function () {
        deployplanId = this.selected;
        //alert(deployplanId);

      },
      selectMoveChild: function (targets) {
        targets.selected = true;
      }

    },
    computed: {
      devicesA: function () {
        let self = this;
        return self.devices.filter(function (item) {
          return item.name.toLowerCase().indexOf(self.searchQueryDev.toLowerCase()) !== -1;
        })
      },
      compsA: function () {
        let self = this;
        console.log(this.comps)
        return self.comps.filter(function (item) {
          return item.name.toLowerCase().indexOf(self.searchQueryComp.toLowerCase()) !== -1;
        })
      }
    }

  }

</script>
<style scoped>

  .wrap {
    width: 150px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .wrap2 {
    width: 50px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .moveInOut{
    padding: 5px 7px;
  }

  .devcompfind {
    margin-top: 5px;
    margin-left: 2px;
  }

  .drag-content {
    border: 2px solid rgba(204, 204, 204, 1);
    min-height: 481px;
    overflow: auto;
  }

  .choice {
    /* border-right: 2px solid rgba(204, 204, 204, 1); */

  }

  .move {
    border: 1px solid rgba(204, 204, 204, 1);
    min-height: 350px;
  }

  .addli {
    max-height: 90px;
    overflow: auto;
    border: 1px solid lightgrey;
    width: 110px;
  }

  .bindul {
    list-style-type: decimal;
  }

  .bindDevName {
    margin-left: 30%;
  }

  .devcompchose {
    height: 450px;
    overflow: auto;
  }

  .select-device {
    background-color: #C4E1E1;
    display: inline-block;
    text-align: center;
    border-radius: 10px;
    margin: 10px;
    cursor: pointer;
    padding: 6px 20px;
    color: #4F4F4F;
  }

  .select-comp {
    background-color: #DEFFAC;
    display: inline-block;
    text-align: center;
    border-radius: 10px;
    margin: 10px;
    cursor: pointer;
    padding: 6px 20px;
    color: #4F4F4F;
  }

  .cursored {
    cursor: default;
  }

  .project-content, .people-content {
    margin: 30px 50px;
  }

  .people-content {
    margin-top: 30px;
  }

  .drag-div {
    border: 1px solid #5bc0de;
    padding: 10px;
    margin-bottom: 10px;
    width: 800px;
    cursor: pointer;
  }

  .select-project-item {
    display: inline-block;
    text-align: center;
    border-radius: 3px;
  }

  .drag-people-label {
    margin-bottom: 0;
    padding-right: 10px;
  }
  div#moveContent h3.newdeploybind {
    margin:-10px auto 0;
    height:40px;
    width:120px;
    line-height: 40px;
    border-radius: 4px;
    background-color: #75b9e6;
    color:#FFFFFF;
  }
  div#moveContent.move.span6 {
    margin-left: 0;
    border-color: #75b9e6;
    border-bottom: none;
  }
  div#deploydetail.span3{
    margin-left:0;
    width:28%;
  }
  .btn-color {
    color:blue;
  }
  @media screen and (max-width:1200px){
    div#deploydetail.span3 {
      margin-left: 4px;
      width: 27%;
    }
  }
  table#table_value2.table.table-hover thead tr th{
    text-align:left;
    background-color: #75b9e6;
    color:#fff;
  }
  .table th{
    padding-bottom:0;
  }
  .table th, .table td{
    padding:4px;
  }
  table th span.line{
    border-left:none;
  }
  h2.devicename{
    display: inline-block;
    margin: 0 auto;
    height:30px;
    line-height:30px;
    padding:2px 4px;
    border-radius:5px;
    background-color: #cccccc;
    color:#fff;
    font-size: 16px;
  }
  .historyComponents {
    background: #ffe9e9;
  }
  .historyComponents td {
  }
  tr.isBinded {
    background: #E6E6FA;
  }

</style>
