    <template>
    <div>
        <div class="container-fluid">
                <div id="pad-wrapper" class="users-list span12">
                       
                        <div style="float:left;" class="span3">
                                <div>
                               <!--  <input class="search" type="text" placeholder="搜索设备.." v-model="searchQuery" @change="change"/> -->
                                <h3>扫描</h3>
                       
                                </div>
                                    
                                <br/> 
                                    <div class="row-fluid table drag-content" style="width:220px">
                                        <select v-model="selected" style="height: 26px;width: 199px; margin-top: 5px; margin-left: 9px;" @change="changeDeployPlan">
                                                    <!-- v-model="selected" -->
                                                    <option v-for="deployplan in deployplanInfos" v-bind:value="deployplan.id">
                                                        {{ deployplan.name }}
                                                    </option>
                                                </select>
                                        <table class="table table-hover">
                                            <thead>
                                            <tr>
                                                <th>
                                                   设备/软件名
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

                                        <div id="areaTree" style="margin-left: 15px;">
                                            <div class="tree-box">
                                                <div class="zTreeDemoBackground left">
                                                    <ul id="treeDemo" class="ztree">
                                                    </ul>
                                                </div>
                                            </div>
                                         </div>

                                    </div>

                                    <div class="btn-group">
                                        <button class="btn-glow"  @click="scanAll()"><i class="icon-wrench"></i>全盘扫描</button>  
                                        <button class="btn-glow"  @click="scanQuick()"><i class="icon-wrench"></i>快速扫描</button>  

                                    </div>
                        </div>

                        <div style="float:right" class="span8">   
                        <div style="margin-bottom: -5px;margin-left: -40px;">            
                            <label style="float:left">查找:</label>
                            <label style="float:left">文件名</label>
                            <input type="text" style="float:left;width:100px;height:15px" class="input-large"/>

                                <!-- <span>Selected: {{ selected }}</span> -->
                            
                            <label style="float:left">后缀名</label>
                              <select v-model="selected" style="float:left" @change="changeExtension">
                                  <option v-for="extension in extensions" v-bind:value="extension.value">
                                    {{ extension.text }}
                                  </option>
                            </select>
                                <!-- <span>Selected: {{ selected }}</span> -->
                           
                           <!--  <label style="float:left">日期</label>
                           <input type="text" style="float:left;width:94px;height:15px"  class="input-large datepicker" data-date-format="yyyy-mm-dd"/>
                           <label style="float:left">到</label>
                           <input type="text" style="float:left;width:94px;height:15px"  class="input-large datepicker" data-date-format="yyyy-mm-dd"/> -->
                      
                            <label style="float:left">设备状态</label>
                                <select v-model="selected" @change="changeState">
                                    <option v-for="state in states" v-bind:value="state.value">
                                    {{ state.text }}
                                    </option>
                                </select>
                            </div>

                            <br/>


                            <div class="drag-content" style="margin-left: -40px;">
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
                                    <tr class="first" v-for="(component,index) in componentEntity" :key="index" id="tabel_info">
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

                            <br/>
                              
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

let deployPlanDetailEntities;
let deployplanZtreeId;

let zNodes=[];
let setting={};

let childrenInfo=[];//所有文件的信息
let tableInfo=[];//表格显示的信息，用于后缀名选择操作

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
     
      deployplanInfos: [
            
        ],

      extensions: [
        { text: "全部", value: "all" },
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
      states: [{ text: "全部" }, { text: "在线" }, { text: "离线" }]
    };
  },
  created() {

    var projectId = this.getCookie('projectId');
    var username = this.getCookie('username');
    var password = this.getCookie('password');

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


     changeState: function() {
       //alert(this.selected);

    },
    
     handleInfo:function(item,path){
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
                item.children.push({"name":path});
                item=item.children[item.children.length-1];
                return item;
            }
            
        }else{
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
            addHoverDom: this.addHoverDom,
            removeHoverDom: this.removeHoverDom,
            selectedMulti: this.true
          },
          edit: {
            enable: true
          },
          data: {
            simpleData: {
              enable: true
            }
          },
          callback: {
            beforeDrag: this.beforeDrag,
            beforeEditName: this.beforeEditName,
            beforeRemove: this.beforeRemove,
            beforeRename: this.beforeRename,
            onRemove: this.onRemove,
            onRename: this.onRename,
            onClick: this.zTreeOnClick
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
                    deviceNode.name =
                    deployPlanDetailEntities[j].deviceEntity.name +
                    deployPlanDetailEntities[j].deviceEntity.ip;

                   deviceNode.deployPlanId = deployplanZtreeId;
                  
                   let children = [];
                   children.push(componentNode);
                   deviceNode.children = children;
                   zNodes.push(deviceNode);
                }
               
            }else{
            
             deviceNode.name =
              deployPlanDetailEntities[j].deviceEntity.name +
              deployPlanDetailEntities[j].deviceEntity.ip;

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

                for(let i=1;i<path.length;i++){
                  item=this.$options.methods.handleInfo(item,path[i]);
                }  

              }
          }

    };
   
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
         
            if(mytable.rows[i].cells[3].innerText!=this.selected){

              oldInfo.push(mytable.rows[i].innerText);
              
              document.getElementById('table_value').deleteRow(i);

              i--;
            }   
          }
        }  
        console.log(oldInfo); 
  },



    zTreeOnClick: function(e, treeId, treeNode) {


      deviceNodeId='';
      deployPlanId='';
      componentNodeId='';
      deviceId='';

      this.componentEntity = [];
      let zTree = $.fn.zTree.getZTreeObj("treeDemo");
     
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
                      if(childrenInfo[j].name==zTree.getSelectedNodes()[0].children[i].name){
                          zTree.getSelectedNodes()[0].children[i]=childrenInfo[j];
                          this.componentEntity.push(childrenInfo[j]);

                          break;
                      }
                  }
              }
          }  
      }else if(zTree.getSelectedNodes()[0].hasOwnProperty("children")==false){
          
          for(let j=0;j<childrenInfo.length;j++){
              if(childrenInfo[j].name==zTree.getSelectedNodes()[0].name){
                this.componentEntity.push(childrenInfo[j]);

                break;
              }
          }
      } 
    },


    scanAll: function() {
  
      this.$axios
        .get(
          "deployplan/" +
            "scan/" +
            deployPlanId +
            "/devices/" +
            deviceNodeId,
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
                 
                      break;
                      
                }

               }
                
            } 
          };
     
          }

          
            for(let k=0;k<this.componentEntity.length;k++){

                if(this.componentEntity[k].state=="--"){

                    this.componentEntity[k].state="不存在";
                }
            }
        
        }).catch(err => {
          console.log(err);
         
        });
    },

    scanQuick: function() {
 

      this.$axios
        .get(
          "deployplan/" +
            "scan/" +
            deployPlanId +
            "/devices/" +
            deviceId +
            "/components/" +
            componentNodeId,
          {
            //设置头
            headers: {
              "content-type": "application/x-www-form-urlencoded"
            },
            auth: {
              username: "admin",
              password: "admin"
            }
          }
        )
        .then(res => {
          this.scanComponent = res.data.data;

            for(let i=0;i<res.data.data.length;i++){

            for(let j=0;j<res.data.data[i].correctComponentFiles.length;j++){

               for(let k=0;k<this.componentEntity.length;k++){

                 if(res.data.data[i].correctComponentFiles[j].id==this.componentEntity[k].id){
                       this.componentEntity.state='√';

                }

               }
                
            } 
          };
          for(let i=0;i<res.data.data.length;i++){

            for(let j=0;j<res.data.data[i].modifyedComponentFiles.length;j++){

               for(let k=0;k<this.componentEntity.length;k++){

                if(res.data.data[i].modifyedComponentFiles[j].id==this.componentEntity[k].id){
                      this.componentEntity.state='×';
                }

               }
                
            } 
          };
          for(let i=0;i<res.data.data.length;i++){

            for(let j=0;j<res.data.data[i].unknownFiles.length;j++){

               for(let k=0;k<this.componentEntity.length;k++){

                 if(res.data.data[i].unknownFiles[j].id==this.componentEntity[k].id){
                      this.componentEntity.state='?';
                }

               }
                
            } 
          }
        })
        .catch(err => {
          console.log(err);
      
        });
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
      this.showLog(
        "[ " +
          this.getTime() +
          " onRemove ]&nbsp;&nbsp;&nbsp;&nbsp; " +
          treeNode.name
      );
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
  width: 110px;
}

.drag-content {
    border: 2px solid rgba(204, 204, 204, 1);
    height: 350px;
    width: 736px;
    overflow: auto;
}

label {
  font-size: 13px;
  line-height: 26px;
}
</style>