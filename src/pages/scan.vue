    <template>
    <div>
        <div class="container-fluid">
                <div id="pad-wrapper" class="users-list span12">
                       
                        <div class="span3">
                                <div>
                               <!--  <input class="search" type="text" placeholder="搜索设备.." v-model="searchQuery" @change="change"/> -->
                                <h3>扫描</h3>
                       
                                </div>
                                    
                                <br/> 
                                    <div class="row-fluid table drag-content" style="width:258px;">
                                        <select v-model="selected" style="height: 26px;width: 233px; margin-top: 5px; margin-left: 7px;" @change="changeDeployPlan">
                                                    <!-- v-model="selected" -->
                                                    <option v-for="deployplan in deployplanInfos" v-bind:value="deployplan.id">
                                                        {{ deployplan.name }}
                                                    </option>
                                                </select>
                                        <table class="table table-hover">
                                            <thead>
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

                                        <div id="areaTree" style="margin-left: -1px; height: 335px; overflow: auto;margin-top: -33px;white-space:pre;">
                                            <div class="tree-box">
                                                <div class="zTreeDemoBackground left">
                                                    <ul id="treeDemo" class="ztree" style="white-space: nowrap;">
                                                    </ul>
                                                </div>
                                            </div>
                                         </div>

                                    </div>

                                    <div class="btn-group">
                                        <button class="btn-glow"  style="width:130px" @click="scanAll()"><i class="icon-wrench"></i>完整扫描</button>  
                                        <button class="btn-glow" style="width:130px" @click="scanQuick()"><i class="icon-wrench"></i>快速扫描</button>  

                                    </div>
                        </div>

                        <div class="span8">   
                            <div style="margin-bottom: -5px;margin-left: -40px;">            
<!--                               <label style="float:left">查找:</label>
                               -->
                              <label style="float:left">文件名：</label>
                              <input class="search" type="text" placeholder="搜索.." v-model="searchQuery" style="float:left;width:160px;height:19px"/>
                              <!-- <input type="text" style="float:left;width:100px;height:15px" class="input-large"/> -->

                                  <!-- <span>Selected: {{ selected }}</span> -->
                              
                             <!--  <label style="float:left">后缀名</label>
                               <select v-model="selectede" style="float:left" @change="changeExtension">
                                   <option v-for="extension in extensions" v-bind:value="extension.value">
                                     {{ extension.text }}
                                   </option>
                             </select>
                                                        
                                                     
                             <label style="float:left">设备状态</label>
                                 <select v-model="selecteds" @change="changeState">
                                     <option v-for="state in states" v-bind:value="state.value">
                                     {{ state.text }}
                                     </option>
                                 </select> -->
                              </div>

                              <br/>


                              <div class="drag-content" style="margin-left: -40px;height: 400px;overflow: auto;margin-top: 25px;">
                                <div class="row-fluid table">
                                  <table class="table table-hover" id="table_value">
                                      <thead>
                                      <tr>
                                         
                                          <th class="span4 sortable">
                                             文件名
                                          </th>
                                          <th class="span3 sortable">
                                              <span class="line"></span>路径
                                          </th>
                                          <th class="span3">
                                              <span class="line"></span>文件类型
                                          </th>
                                          <th class="span3">
                                              <span class="line"></span>修改日期
                                          </th>
                                         
                                          <th class="span3">
                                              <span class="line"></span>文件大小
                                          </th>
                                          <th class="span3">
                                              <span class="line"></span>版本状态
                                          </th>
                                      
                                      </tr>
                                      </thead>
                                      <tbody>
                                      <!-- row -->
                                      <tr class="first" v-for="(component,index) in componentEntityA" :key="index" id="tabel_info">
                                              <td style="display:none">{{component.id}}</td>
                                              <td>{{component.name}}</td>
                                              <td>
                                                  {{component.path}}
                                              </td>
                                              <td>
                                                 {{component.type}}
                                              </td>
                                              <td>
                                                  {{component.createTime}}
                                              </td>
                                              <td>
                                                 {{component.size}}
                                              </td>
                                              <td>
                                                 {{component.state}}
                                              </td>
                                  
                                          </tr>
                                      <!-- row -->

                                      </tbody>
                                  </table>
                             </div>
                            </div>
                              
                        </div>
  
                </div>
        </div>

         <div class="modal fade" id="modal-select">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-body" style="background-color: #0f00ff1a;">
                                    <!-- form start -->
                                    <form class="form-horizontal" style="">
                                        <div style="margin-top: 23px;margin-left: 30px;">
                                          <span>后缀名:</span>
                                          <input type="text" id="input-extensions"  style="height:20px">(例如:exe,txt)
                                        </div>

                                        <!-- <div style="margin-top: 17px;">
                                          <span>路径:</span>
                                          <input type="text" id="input-path" style="margin-left: 12px;height:25px">
                                        </div> -->

                                         <div style="margin-left: 148px;margin-top: 22px;">
                                            <button type="submit" class="btn-glow primary" @click="addInfo">确认</button>
                                            <button type="submit" class="btn-glow primary" @click="formReset">取消</button>
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

//let projectId = "edf55612-86ab-4dc3-a505-8c418a7e75c3";

let deviceNodeId;
let deployPlanId;
let deviceId;
let componentNodeId;

let componentQuickId;
let deviceAllId;
let deployAllId;

let deployPlanDetailEntities;
let deployplanZtreeId;

let zNodes=[];
let setting={};

let childrenInfo=[];//所有文件的信息
let tableInfo=[];//表格显示的信息，用于后缀名选择操作

let nodes=[];//文件

export default {
  name: "areaTree",
  components: {},
  /* eslint-disable */
  data() {
    return {
      searchQuery: '',
      componentEntity: [],

      currentPage: 0,
      pages: [],
      jumpPage: 0,  

      components: [],
      entity:[],

      scanDevice: [],
      scanComponent: [],

      selected: "",
      selecteds:"",
      selectede:"",

      testInfo:[],
     
      deployplanInfos: [
            
        ],

      extensions: [
        { text: "exe", value: "exe" },
        { text: "xml", value: "xml" },
        { text: "dll", value: "dll" },
        { text: "ini", value: "ini" },
        { text: "docx", value: "docx" },
        { text: "chm", value: "chm" },
        { text: "sql", value: "sql" },
        { text: "txt", value: "txt" },
        { text: "PDF", value: "PDF" },
        { text: "pdf", value: "pdf" },
        { text: "doc", value: "doc" },
    
      ],
      states: [{ text: "在线" }, { text: "离线" }]
    };
  },
  created() {

    var projectId = this.getCookie('projectId');
    var username = this.getCookie('username');
    var password = this.getCookie('password');

    $("#modal-select").modal('hide');

    this.$nextTick(function() {
      $(document).ready(function() {
        $(".datepicker")
          .datepicker()
          .on("changeDate", function(ev) {
            $(this).datepicker("hide");
          });
      });
    });

    this.$axios.get("project/" + projectId + "/deployplan", {
        //设置头
        headers: {
          "content-type": "application/x-www-form-urlencoded"
        },
        auth: {
            username: "admin",
            password: "admin"
          }
      }).then(res => {
        this.entity=res.data.data;


        for (var i = 0; i < res.data.data.length; i++) {
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


      addInfo(event) {

          layer.load();

          let extensions=document.getElementById("input-extensions").value;
          //let path=document.getElementById("input-path").value;

          $("#modal-select").modal('hide');

          let expireDays = 1000 * 60 * 60 * 24 * 15;
          this.setCookie('extensions', extensions, expireDays);
          //this.setCookie('path', path, expireDays);


          let temp=[];
          for(let i=0;i<this.componentEntity.length;i++){
              if(this.componentEntity[i].type==extensions){
                  temp.push(this.componentEntity[i]);
              }
          }

          
          this.componentEntity.splice(0,this.componentEntity.length);
          this.componentEntity=temp;


          for(let i=0;i<zNodes.length;i++){
              for(let j=0;j<zNodes[i].children.length;j++){
                  var regex=/\(/g;
                  var str=zNodes[i].children[j].name;
                  if(regex.test(str)){
                      //alert("$$$");
                      let zname=zNodes[i].children[j].name.split('(');
                      zNodes[i].children[j].name=zname[0];
                  }
              }
          }

          layer.load();
          this.$axios
            .get(
              "deployplan/" +
                "scan/" +
                deployAllId +
                "/devices/" +
                deviceAllId+"?extensions="+extensions,
              {
                //设置头
                headers: {
                  "content-type": "application/x-www-form-urlencoded"
                },
                auth: {
                  username: "admin",
                  password: "admin"
                }
              }).then(res => {
              this.scanDevice = res.data.data;

              if(res.data.data.length>0){
                for(let i=0;i<res.data.data.length;i++){

                  for(let j=0;j<res.data.data[i].correctComponentFiles.length;j++){
                    
                     for(let k=0;k<this.componentEntity.length;k++){

                       if(res.data.data[i].correctComponentFiles[j].id==this.componentEntity[k].id){
                             this.componentEntity[k].state='√';
                             this.componentEntity[k].age='4';
                      
                             break;
                      }

                     }
                      
                  } 
                };
               
                for(let i=0;i<res.data.data.length;i++){

                  for(let j=0;j<res.data.data[i].unknownFiles.length;j++){

                     for(let k=0;k<this.componentEntity.length;k++){
                     
                       if(res.data.data[i].unknownFiles[j].id==this.componentEntity[k].id){
                            this.componentEntity[k].state='?';
                            this.componentEntity[k].age='2';
                            break;
                            
                      }

                    }
                      
                  } 
                };

                 for(let i=0;i<res.data.data.length;i++){

                  for(let j=0;j<res.data.data[i].modifyedComponentFiles.length;j++){

                     for(let k=0;k<this.componentEntity.length;k++){

                      if(res.data.data[i].modifyedComponentFiles[j].id==this.componentEntity[k].id){
                            this.componentEntity[k].state='×';
                            this.componentEntity[k].age='3';
                            break;
                      }

                     }
                      
                  } 
                };
         
              };

                for(let k=0;k<this.componentEntity.length;k++){

                    if(this.componentEntity[k].state=="--"){

                        this.componentEntity[k].state="!";
                        this.componentEntity[k].age='1';
                    }
                };


                 for(let i=0;i<zNodes.length;i++){
                    for(let j=0;j<zNodes[i].children.length;j++){

                          for(let k=0;k<res.data.data.length;k++){
                              if(zNodes[i].children[j].id==res.data.data[k].componentId){
                                  if(res.data.data[k].hasCorrectComponentFiles==true&&res.data.data[k].hasModifyedComponentFiles==false&&res.data.data[k].hasUnknownFiles==false&&res.data.data[k].hasMissingFile==false){
                                      zNodes[i].children[j].name=zNodes[i].children[j].name+"("+"√"+")";
                                      zNodes[i].children[j].name = zNodes[i].children[j].name.replace('(', '           (');
                                  }else if(res.data.data[k].hasModifyedComponentFiles==true&&res.data.data[k].hasUnknownFiles==false&&res.data.data[k].hasMissingFile==false){
                                      zNodes[i].children[j].name=zNodes[i].children[j].name+"("+"×"+")";
                                      zNodes[i].children[j].name = zNodes[i].children[j].name.replace('(', '           (');
                                  }else if(res.data.data[k].hasModifyedComponentFiles==false&&res.data.data[k].hasUnknownFiles==true&&res.data.data[k].hasMissingFile==false){
                                      zNodes[i].children[j].name=zNodes[i].children[j].name+"("+"?"+")";
                                      zNodes[i].children[j].name = zNodes[i].children[j].name.replace('(', '           (');
                                  }else if(res.data.data[k].hasModifyedComponentFiles==false&&res.data.data[k].hasUnknownFiles==false&&res.data.data[k].hasMissingFile==true){
                                      zNodes[i].children[j].name=zNodes[i].children[j].name+"("+"!"+")";
                                      zNodes[i].children[j].name = zNodes[i].children[j].name.replace('(', '           (');
                                  }else if(res.data.data[k].hasModifyedComponentFiles==true&&res.data.data[k].hasUnknownFiles==true&&res.data.data[k].hasMissingFile==false){
                                      zNodes[i].children[j].name=zNodes[i].children[j].name+"("+"×,"+"?"+")";
                                      zNodes[i].children[j].name = zNodes[i].children[j].name.replace('(', '           (');
                                  }else if(res.data.data[k].hasModifyedComponentFiles==true&&res.data.data[k].hasUnknownFiles==false&&res.data.data[k].hasMissingFile==true){
                                      zNodes[i].children[j].name=zNodes[i].children[j].name+"("+"×,"+"!"+")";
                                      zNodes[i].children[j].name = zNodes[i].children[j].name.replace('(', '           (');
                                  }else if(res.data.data[k].hasModifyedComponentFiles==false&&res.data.data[k].hasUnknownFiles==true&&res.data.data[k].hasMissingFile==true){
                                      zNodes[i].children[j].name=zNodes[i].children[j].name+"("+"?,"+"!"+")";
                                      zNodes[i].children[j].name = zNodes[i].children[j].name.replace('(', '           (');
                                  }else if(res.data.data[k].hasModifyedComponentFiles==true&&res.data.data[k].hasUnknownFiles==true&&res.data.data[k].hasMissingFile==true){
                                      zNodes[i].children[j].name=zNodes[i].children[j].name+"("+"×,"+"?,"+"!"+")";
                                      zNodes[i].children[j].name = zNodes[i].children[j].name.replace('(', '           (');
                                  }

                              }
                          }
                    }
                }

                $.fn.zTree.init($("#treeDemo"), setting, zNodes);


                layer.closeAll('loading');
            
            }).catch(err => {
              console.log(err);

              layer.closeAll('loading');
              layer.msg("快速扫描异常");
             
            });

      },

      mySort:function(arr){
                
          for(var x=0; x<arr.length-1; x++){
              for(var y=x+1; y<arr.length; y++){
                        
               //按照年龄数值排序，并转成整数。
                if(parseInt(arr[x].cells[1].innerHTML)>parseInt(arr[y].cells[1].innerHTML)){
                    var temp = arr[x];
                    arr[x] = arr[y];
                    arr[y] = temp;
                    arr[x].swapNode(arr[y]);
                }
              }
                        
          }
      },

      
      showState:function(node){
        let nodesX=[];
        console.log(node);
        for(let j=0;j<node.length;j++){
          
          if(node[j].hasOwnProperty("children")){
              for(let i=0;i<node[j].children.length;i++){
                  if(!node[j].children[i].hasOwnProperty("children")){
                      nodes.push(node[j].children[i]);
                  }else{
                      
                      nodesX.push(node[j].children[i]);

                  }
              }
          }
        }
         return nodesX;
      },


      formReset: function(){
          $("input").val('');
          $("#modal-select").modal('hide');
      },


     changeState: function() {
       //alert(this.selected);

      },
    
     handleInfo:function(item,path,idCom,idFlag){
        if(item==null)
            return ;

        if(item.hasOwnProperty("children")){
            let flag;
            for(let i=0;i<item.children.length;i++){
                flag=true;
                if(item.children[i].name==path){
                    item=item.children[i];
                    flag=false;
                    return item;
                }        
            }

            if(flag){
                item.children.push({"name":path,"id":idCom});
                item=item.children[item.children.length-1];
                return item;
            }
            
        }else{
            if(idFlag==true){
                item.children=[];
                item.children.push({"name":path,"id":idCom});
                item=item.children[0];
                return item;
            }
            item.children=[];
            item.children.push({"name":path});
            item=item.children[0];
            return item;
        }

     },
    
    changeDeployPlan: function() {

      zNodes.length=0;
      deployplanZtreeId = this.selected;

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
          }
        };


      this.$axios.get('deployplan/' + deployplanZtreeId, {
        //设置头
        headers: {
          "content-type": "application/x-www-form-urlencoded"
        },
        auth: {
            username: "admin",
            password: "admin"
          }
      }).then(res => {

          let item;

         deployPlanDetailEntities=res.data.data.deployPlanDetailEntities;

         for (let j = 0;j < deployPlanDetailEntities.length;j++) {
           
            
            let deviceNode = {};
            let componentNode = {};

            deviceNode.id =deployPlanDetailEntities[j].deviceEntity.id;
            
            componentNode.id =
              deployPlanDetailEntities[j].componentEntity.id;
            componentNode.name =
              deployPlanDetailEntities[j].componentEntity.name;
            componentNode.deviceId =
              deployPlanDetailEntities[j].deviceEntity.id; 
          
            componentNode.componentNodeInfo=deployPlanDetailEntities[j].componentEntity.componentFileEntities;

            componentNode.age=0;
         

            componentNode.state = "--";

            if(zNodes.length>0){
              let temp={};
              let flag=true;
              all:
              for(let k=0;k<zNodes.length;k++){

                 if(zNodes[k].id==deviceNode.id){

                    for(let l=0;l<zNodes[k].children.length;l++){
                       if(zNodes[k].children[l].id==componentNode.id){
                       flag=false;
                       break all;

                       }

                    }

                    zNodes[k].children.push(componentNode);

                    flag=false;
                    break;
                 }  
              }

                if(flag){

                    if(deployPlanDetailEntities[j].deviceEntity.online==false){
                        deployPlanDetailEntities[j].deviceEntity.online="离线";
                    }else{
                        deployPlanDetailEntities[j].deviceEntity.online="在线";

                    }
                    deviceNode.name =
                    deployPlanDetailEntities[j].deviceEntity.name +"("+
                    deployPlanDetailEntities[j].deviceEntity.ip+")"+""+deployPlanDetailEntities[j].deviceEntity.online;

                    var ary=deviceNode.name.split(")");
                    deviceNode.name = deviceNode.name.replace(')', ')           '); 

                   

                   deviceNode.deployPlanId = deployplanZtreeId;
                  
                   let children = [];
                   children.push(componentNode);
                   deviceNode.children = children;
                   zNodes.push(deviceNode);
                }
               
            }else{
             if(deployPlanDetailEntities[j].deviceEntity.online==false){
                        deployPlanDetailEntities[j].deviceEntity.online="离线";
                    }else{
                        deployPlanDetailEntities[j].deviceEntity.online="在线";

                    }
               deviceNode.name =
              deployPlanDetailEntities[j].deviceEntity.name +"("+
              deployPlanDetailEntities[j].deviceEntity.ip+")"+""+deployPlanDetailEntities[j].deviceEntity.online;

              var ary=deviceNode.name.split(")");
              deviceNode.name = deviceNode.name.replace(')', ')           '); 

              //console.log(ary.join(" "));


             deviceNode.deployPlanId = deployplanZtreeId;
            
             let children = [];
             children.push(componentNode);
             deviceNode.children = children;

             zNodes.push(deviceNode);
            
            }
         } 

          for(let j=0;j<zNodes.length;j++){
            for(let l=0;l<zNodes[j].children.length;l++){
              //对比时，是路径节点与根节点下的孩子节点比较
              let componentFile=zNodes[j].children[l].componentNodeInfo;//组件
              
              for(let m=0;m<componentFile.length;m++){
                childrenInfo.push(componentFile[m]);

                let item=zNodes[j].children[l];

                let path=(componentFile[m].path).split('/');
                let idCom=componentFile[m].id;

                for(let i=1;i<path.length;i++){
                  let idFlag;
                  if(i==path.length-1){
                      idFlag=true;
                  }
                  item=this.$options.methods.handleInfo(item,path[i],idCom,idFlag);
                }  
              }
            }
          }

           $.fn.zTree.init($("#treeDemo"), setting, zNodes);
          
      }).catch(err => {
        console.log(err);
      });

    },
        
    changeExtension: function() {

        let oldInfo=[];

        
        let mytable = document.getElementById("table_value");

        if(mytable.rows.length>0){
            for(var i=1,rows=mytable.rows.length; i<rows; i++){
                oldInfo.push(mytable.rows[i].innerText);
            }
        console.log(oldInfo); 

          for(var i=1,rows=mytable.rows.length; i<rows; i++){
            if(mytable.rows[i].cells[3].innerText!=this.selectede){

              document.getElementById('table_value').deleteRow(i);

                i=i-1;
                if(i==mytable.rows.length-1){
                  break;
                }
            }   
          }
        } 

    },
   

    zTreeOnDblClick: function(e, treeId, treeNode) {
      deviceNodeId='';
      deployPlanId='';
      componentNodeId='';
      deviceId='';

      this.componentEntity = [];
      let zTree = $.fn.zTree.getZTreeObj("treeDemo");
      zTree.expandNode(treeNode);
     
      if(zTree.getSelectedNodes()[0].deviceId){
          componentNodeId=zTree.getSelectedNodes()[0].id;
      
          this.$axios.get("components/" + componentNodeId, {
          headers: {
            "content-type": "application/x-www-form-urlencoded"
          },
          auth: {
            username: "admin",
            password: "admin"
          }
        }).then(res => {
          
          for (let i = 0; i < res.data.data.componentFileEntities.length; i++) {
              res.data.data.componentFileEntities[i].state="--";
              this.componentEntity.push(res.data.data.componentFileEntities[i]);
          };

        }).catch(err => {
        
        });
      }else if(zTree.getSelectedNodes()[0].deployPlanId){
          deviceNodeId = zTree.getSelectedNodes()[0].id;
          deployPlanId = zTree.getSelectedNodes()[0].deployPlanId;
          this.$axios
        .get("deployplan/" + deployPlanId + "/devices/" + deviceNodeId, {
          headers: {
            "content-type": "application/x-www-form-urlencoded"
          },
          auth: {
            username: "admin",
            password: "admin"
          }
        }).then(res => {
        
          for (let i = 0; i < res.data.data.length; i++) {
            for (
              let j = 0;
              j < res.data.data[i].componentEntity.componentFileEntities.length;
              j++
            ) {

              res.data.data[i].componentEntity.componentFileEntities[j].state="--";
              
              this.componentEntity.push(
                res.data.data[i].componentEntity.componentFileEntities[j]);
            
              }
            }
        
        }).catch(err => {
     
        });
      }else if(zTree.getSelectedNodes()[0].hasOwnProperty("children")){
          for(let i=0;i<zTree.getSelectedNodes()[0].children.length;i++){
              if(zTree.getSelectedNodes()[0].children[i].hasOwnProperty("children")==false){
                  for(let j=0;j<childrenInfo.length;j++){
                      if(childrenInfo[j].id==zTree.getSelectedNodes()[0].children[i].id){
                          zTree.getSelectedNodes()[0].children[i]=childrenInfo[j];
                          this.componentEntity.push(childrenInfo[j]);

                          break;
                      }
                  }
              }
          }  
      }else if(zTree.getSelectedNodes()[0].hasOwnProperty("children")==false){
          
          for(let j=0;j<childrenInfo.length;j++){
              if(childrenInfo[j].id==zTree.getSelectedNodes()[0].id){
                this.componentEntity.push(childrenInfo[j]);

                break;
              }
          }
      };


    },

    zTreeOnClick:function(e, treeId, treeNode){

      let zTree = $.fn.zTree.getZTreeObj("treeDemo");
       console.log(zTree.getSelectedNodes()[0]);
      if(zTree.getSelectedNodes()[0].deviceId){
          componentQuickId=zTree.getSelectedNodes()[0].id;
      }else if(zTree.getSelectedNodes()[0].deployPlanId){
          deviceAllId = zTree.getSelectedNodes()[0].id;
          deployAllId = zTree.getSelectedNodes()[0].deployPlanId;
      }

    },

    scanAll: function() {
      layer.load();

      this.$axios.get(
          "deployplan/" +
            "scan/" +
            deployAllId +
            "/devices/" +
            deviceAllId+"?extensions",
          {
            //设置头
            headers: {
              "content-type": "application/x-www-form-urlencoded"
            },
            auth: {
              username: "admin",
              password: "admin"
            }
          }).then(res => {
          this.scanDevice = res.data.data;

           for(let i=0;i<zNodes.length;i++){
              for(let j=0;j<zNodes[i].children.length;j++){
                  var regex=/\(/g;
                  var str=zNodes[i].children[j].name;
                  if(regex.test(str)){
                      //alert("$$$");
                      let zname=zNodes[i].children[j].name.split('(');
                      zNodes[i].children[j].name=zname[0];
                  }
              }
          }
          

          if(res.data.data.length>0){
            for(let i=0;i<res.data.data.length;i++){

              for(let j=0;j<res.data.data[i].correctComponentFiles.length;j++){
                
                 for(let k=0;k<this.componentEntity.length;k++){

                   if(res.data.data[i].correctComponentFiles[j].id==this.componentEntity[k].id){
                         this.componentEntity[k].state='√';
                         this.componentEntity[k].age=4;
                  
                         break;
                  }

                 }
                  
              } 
            };
           
            for(let i=0;i<res.data.data.length;i++){

              for(let j=0;j<res.data.data[i].unknownFiles.length;j++){

                 for(let k=0;k<this.componentEntity.length;k++){
                 
                   if(res.data.data[i].unknownFiles[j].id==this.componentEntity[k].id){
                        this.componentEntity[k].state='?';
                        this.componentEntity[k].age=1;
                        break;
                        
                  }

                 }
                  
              } 
            };

             for(let i=0;i<res.data.data.length;i++){

              for(let j=0;j<res.data.data[i].modifyedComponentFiles.length;j++){

                 for(let k=0;k<this.componentEntity.length;k++){

                  if(res.data.data[i].modifyedComponentFiles[j].id==this.componentEntity[k].id){
                        this.componentEntity[k].state='×';
                        this.componentEntity[k].age=2;
                        break;
                  }

                 }
                  
              } 
            };
     
          };

          
            for(let k=0;k<this.componentEntity.length;k++){

                if(this.componentEntity[k].state=="--"){

                    this.componentEntity[k].state="!";
                     this.componentEntity[k].age=1;
                }
            };
          
            for(let i=0;i<zNodes.length;i++){
                    for(let j=0;j<zNodes[i].children.length;j++){

                          for(let k=0;k<res.data.data.length;k++){
                              
                              if(zNodes[i].children[j].id==res.data.data[k].componentId){
                         
                                  if(res.data.data[k].hasCorrectComponentFiles==true&&res.data.data[k].hasModifyedComponentFiles==false&&res.data.data[k].hasUnknownFiles==false&&res.data.data[k].hasMissingFile==false){
                                      zNodes[i].children[j].name=zNodes[i].children[j].name+"("+"√"+")";
                                      zNodes[i].children[j].name = zNodes[i].children[j].name.replace('(', '           (');
                                  }else if(res.data.data[k].hasModifyedComponentFiles==true&&res.data.data[k].hasUnknownFiles==false&&res.data.data[k].hasMissingFile==false){
                                      zNodes[i].children[j].name=zNodes[i].children[j].name+"("+"×"+")";
                                      zNodes[i].children[j].name = zNodes[i].children[j].name.replace('(', '           (');
                                  }else if(res.data.data[k].hasModifyedComponentFiles==false&&res.data.data[k].hasUnknownFiles==true&&res.data.data[k].hasMissingFile==false){
                                      zNodes[i].children[j].name=zNodes[i].children[j].name+"("+"?"+")";
                                      zNodes[i].children[j].name = zNodes[i].children[j].name.replace('(', '           (');
                                  }else if(res.data.data[k].hasModifyedComponentFiles==false&&res.data.data[k].hasUnknownFiles==false&&res.data.data[k].hasMissingFile==true){
                                      zNodes[i].children[j].name=zNodes[i].children[j].name+"("+"!"+")";
                                      zNodes[i].children[j].name = zNodes[i].children[j].name.replace('(', '           (');
                                  }else if(res.data.data[k].hasModifyedComponentFiles==true&&res.data.data[k].hasUnknownFiles==true&&res.data.data[k].hasMissingFile==false){
                                      zNodes[i].children[j].name=zNodes[i].children[j].name+"("+"×,"+"?"+")";
                                      zNodes[i].children[j].name = zNodes[i].children[j].name.replace('(', '           (');
                                  }else if(res.data.data[k].hasModifyedComponentFiles==true&&res.data.data[k].hasUnknownFiles==false&&res.data.data[k].hasMissingFile==true){
                                      zNodes[i].children[j].name=zNodes[i].children[j].name+"("+"×,"+"!"+")";
                                      zNodes[i].children[j].name = zNodes[i].children[j].name.replace('(', '           (');
                                  }else if(res.data.data[k].hasModifyedComponentFiles==false&&res.data.data[k].hasUnknownFiles==true&&res.data.data[k].hasMissingFile==true){
                                      zNodes[i].children[j].name=zNodes[i].children[j].name+"("+"?,"+"!"+")";
                                      zNodes[i].children[j].name = zNodes[i].children[j].name.replace('(', '           (');
                                  }else if(res.data.data[k].hasModifyedComponentFiles==true&&res.data.data[k].hasUnknownFiles==true&&res.data.data[k].hasMissingFile==true){
                                      zNodes[i].children[j].name=zNodes[i].children[j].name+"("+"×,"+"?,"+"!"+")";
                                      zNodes[i].children[j].name = zNodes[i].children[j].name.replace('(', '           (');
                                  }

                              }
                          }
                    }
                }


                $.fn.zTree.init($("#treeDemo"), setting, zNodes);

                layer.closeAll('loading');
        
        }).catch(err => {
          console.log(err);
         
        });
      
    },


    scanQuick: function() {
 
      $("#modal-select").modal('show');
      if(this.getCookie('extensions')){
          document.getElementById("input-extensions").value=decodeURIComponent(this.getCookie('extensions'));
      }
    },

    beforeDrag: function(treeId, treeNodes) {
      return false;
    },

    beforeEditName: function(treeId, treeNode) {
      var className = $("dark");
      className = className === "dark" ? "" : "dark";
      this.showLog(
        "[ " +
          this.getTime() +
          " beforeEditName ]&nbsp;&nbsp;&nbsp;&nbsp; " +
          treeNode.name
      );
      var zTree = $.fn.zTree.getZTreeObj("treeDemo");
      zTree.selectNode(treeNode);
      setTimeout(function() {
        if (confirm("进入节点 -- " + treeNode.name + " 的编辑状态吗？")) {
          setTimeout(function() {
            zTree.editName(treeNode);
          }, 0);
        }
      }, 0);
      return false;
    },

    beforeRemove: function(treeId, treeNode) {
      var className = $("dark");
      className = className === "dark" ? "" : "dark";
      this.showLog(
        "[ " +
          this.getTime() +
          " beforeRemove ]&nbsp;&nbsp;&nbsp;&nbsp; " +
          treeNode.name
      );
      var zTree = $.fn.zTree.getZTreeObj("treeDemo");
      zTree.selectNode(treeNode);
      return confirm("确认删除 节点 -- " + treeNode.name + " 吗？");
    },
    onRemove: function(e, treeId, treeNode) {
     
    },

    beforeRename: function(treeId, treeNode, newName, isCancel) {
      var className = $("dark");
      className = className === "dark" ? "" : "dark";
      this.showLog(
        (isCancel ? "<span style='color:red'>" : "") +
          "[ " +
          this.getTime() +
          " beforeRename ]&nbsp;&nbsp;&nbsp;&nbsp; " +
          treeNode.name +
          (isCancel ? "</span>" : "")
      );
      if (newName.length == 0) {
        setTimeout(function() {
          var zTree = $.fn.zTree.getZTreeObj("treeDemo");
          zTree.cancelEditName();
          alert("节点名称不能为空.");
        }, 0);
        return false;
      }
      return true;
    },
    onRename: function(e, treeId, treeNode, isCancel) {
      this.showLog(
        (isCancel ? "<span style='color:red'>" : "") +
          "[ " +
          this.getTime9() +
          " onRename ]&nbsp;&nbsp;&nbsp;&nbsp; " +
          treeNode.name +
          (isCancel ? "</span>" : "")
      );
    },
    showRemoveBtn: function(treeId, treeNode) {
      return !treeNode.isFirstNode;
    },
    showRenameBtn: function(treeId, treeNode) {
      return !treeNode.isLastNode;
    }
  },
  computed: {  
        componentEntityA: function () {  
            var self = this;  
            return self.componentEntity.filter(function (item) {  
                return item.name.toLowerCase().indexOf(self.searchQuery.toLowerCase()) !== -1;  
            })  
        }  
    } 
};
</script>
     <style type="text/css">
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
    width: 736px;

}

label {
  font-size: 13px;
  line-height: 26px;
}

.modal {
  
    left: 57%;
  
    width: 414px;
}

.level0{
  width: 275px;
display: inline;
overflow: hidden;
white-space: pre-wrap;
text-overflow: ellipsis;
font-family: Verdana, Arial, Helvetica, AppleGothic, sans-serif;
display: table-cell;
}

.level1{
  overflow: hidden;
white-space: pre-wrap;
text-overflow: ellipsis;
font-family: Verdana, Arial, Helvetica, AppleGothic, sans-serif;
}

</style>