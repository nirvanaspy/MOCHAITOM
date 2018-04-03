<template>
  <div id="addUser">
    <div class="container-fluid">
      <div id="pad-wrapper" class="new-user">
        <div class="row-fluid header">
          <h3 class="header-wrapper-modify">修改组件</h3>
        </div>

        <div class="row-fluid form-wrapper" style="margin-top:-27px">
          <!-- left column -->
          <div class="span9 with-sidebar">
            <div class="with-sidebar">
              <form class="new_user_form inline-input">
                <div class="span12 field-box">
                  <label>组件名:</label>
                  <input class="span9" type="text" id="add-name">
                  <span class="muststar">*</span>

                </div>

                <div class="span12 field-box">

                  <label>版本:</label>
                  <input class="span9" type="text" id="add-version"/>
                  <span class="muststar">*</span>
                </div>

                <div class="span12 field-box">

                  <label>相对路径:</label>
                  <input class="span9" type="text" id="add-deployPath" placeholder="无路径时填入： / ； 有路径时如： /test/ "/>
                  <span class="muststar">*</span>
                </div>

                <div class="span12 field-box">
                  <label>描述信息:</label>
                  <input class="span9" type="text" id="add-describle"/>
                </div>

                <div class="span12 field-box">
                  <label>上传文件:</label>
                  <div class="span9 uploadfile" style="margin-left: -1px;">
                    <div class=""
                         style="background: rgba(255, 255, 255, 0.65);height:50px;overflow-y:auto;width: 100%;">
                      <ul class="mini-repo-list" id="ulId" data-filterable-for="your-repos-filter"
                          data-filterable-type="substring" style="background: rgba(255, 255, 255, 0.65);">
                        <li class="pubic fork" v-for="folder in folderInfo">
                          <span>{{folder.name}}</span>
                        </li>
                      </ul>
                    </div>


                    <div class="upbtn">
                      <input type='file' id="folderupload" webkitdirectory @change="getFolder($event)">

                      <button class="btn-flat success" v-on:click="folderclick($event)">提交</button>
                    </div>

                    <div class="upbtn" style="float: none;">
                      <button type="submit" class="btn-flat danger" @click="folderClear">清空</button>
                    </div>

                    <div class=""
                         style="float: none;background: rgba(255, 255, 255, 0.65);height:50px;overflow-y:auto;width: 100%;">
                      <ul class="mini-repo-list" id="ulId" data-filterable-for="your-repos-filter"
                          data-filterable-type="substring" style="background: rgba(255, 255, 255, 0.65);">
                        <li class="pubic fork" v-for="file in fileInfo">
                          <span>{{file.name}}</span>
                        </li>
                      </ul>
                    </div>


                    <div class="upbtn">
                      <input type='file' id="fileupload" @change="getFile($event)">
                      <button class="btn-flat success" v-on:click="fileclick($event)">提交</button>
                    </div>

                    <div class="upbtn">
                      <button type="submit" class="btn-flat danger" @click="fileClear">清空</button>
                    </div>

                  </div>
                </div>


                <div class="span7 field-box actions" style="margin-top:-1px">
                  <button type="submit" class="btn-flat primary" @click="addComp($event)">修改</button>
                  <button type="submit" class="btn-flat danger" @click="formReset">取消</button>
                </div>
              </form>
            </div>
          </div>

          <div class="span3">
            <label>组件详细信息</label>
            <!--<div style="height: 390px; border-left: 1px solid rgba(0, 0, 0, 0.32);margin-left: 829px;"></div>-->
            <div class=""
                 style="width: 229px;height: 405px;overflow-y: auto;">


              <ul id="treeDemo" class="ztree" style=""></ul>
            </div>
          </div>


        </div>
      </div>
    </div>

  </div>
</template>

<script>
  /* eslint-disable */
  import Vue from 'vue'

  let folders = [];   //上传文件夹的数组
  let files = [];     //上传文件的数组
  let allArr = [];    //上传文件夹和文件的总数组
  let sv = null;
  let sv1 = [];
  let sv2 = '';


  let treeInfo = [];
  export default {

    data() {
      return {
        name: '',
        version: '',
        size: '',
        deployPath: '',
        describle: '',
        components: [],
        fileInfo: [],
        folderInfo: [],
        folders: [],
        files: [],
        allArr: [],
        sv1: [],
        sv2: '',
        fileList2: [],
        fieList: [],                //文件夹内容
        fieList2: [],               //文件内容
        folderClearData: [],        //文件夹需要清空的内容数组
        fileClearData: [],          //文件需要清空的内容数组
        allClearData: []            //需要清空的内容的id数组

      }
    }, created() {
      let username = this.getCookie('username');
      let password = this.getCookie('password');

      this.$axios.get(this.getIP() + 'components/' + this.$route.params.id, {

        //设置头
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        auth: {
          username: username,
          password: password
        }
      }).then(res => {
        //this.components = res.data.data;

        document.getElementById("add-name").value = res.data.data.name;
        document.getElementById("add-version").value = res.data.data.version;
        document.getElementById("add-deployPath").value = res.data.data.deployPath;
        document.getElementById("add-describle").value = res.data.data.description;

        //对比时，是路径节点与根节点下的孩子节点比较
        let componentFile = res.data.data.componentDetailEntities;//组件


        let zNodes = [];
        let item;
        for (let m = 0; m < componentFile.length; m++) {

          treeInfo.push(componentFile[m]);//放所有文件信息，用于树点击id的选择

          item = res.data.data;

          let path = (componentFile[m].path).split('/');

          for (let i = 1; i < path.length; i++) {
            item = this.$options.methods.handleInfo(item, path[i]);
          }
        }
        ;


        zNodes.push(res.data.data);

        console.log(zNodes);

        let forderTemp = [];

        for (let i = 0; i < res.data.data.componentDetailEntities.length; i++) {
          let info = res.data.data.componentDetailEntities[i].path.split('/');
          let clearId = res.data.data.componentDetailEntities[i].id;

          if (info.length > 2) {

            if (forderTemp.length > 0) {
              let flag = true;

              for (let j = 0; j < forderTemp.length; j++) {
                if (forderTemp[j].name == info[1]) {
                  flag = false;
                }
              }

              if (flag) {
                let info2 = {};
                info2.name = info[1];
                forderTemp.push(info2);
              }

            } else {
              let info2 = {};
              info2.name = info[1];
              forderTemp.push(info2);
            }


            this.folderClearData.push(clearId);
            console.log(this.folderClearData);
          } else {
            this.fileInfo.push(res.data.data.componentDetailEntities[i]);
            this.fileClearData.push(clearId);
          }
        }

        console.log(forderTemp);

        for (let i = 0; i < forderTemp.length; i++) {
          this.folderInfo.push(forderTemp[i]);
        }


        let setting = {
          view: {
            dblClickExpand: false,
            addHoverDom: this.addHoverDom,
            removeHoverDom: this.removeHoverDom,
            selectedMulti: this.true
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
            beforeDrag: this.beforeDrag,
            beforeEditName: this.beforeEditName,
            beforeRemove: this.beforeRemove,
            beforeRename: this.beforeRename,
            onRemove: this.onRemove,
            onRename: this.onRename,
            onClick: this.zTreeOnClick
          }
        };


        $.fn.zTree.init($("#treeDemo"), setting, zNodes);
      })
        .catch(err => {
          console.log(err);
        });

    },

    methods: {
      zTreeOnClick: function (e, treeId, treeNode) {

        let zTree = $.fn.zTree.getZTreeObj("treeDemo");
        let id;

        for (let i = 0; i < treeInfo.length; i++) {
          if (treeInfo[i].name == zTree.getSelectedNodes()[0].name) {
            id = treeInfo[i].id;
            break;
          }
        }

        // tree.refresh();
        //tree.reAsyncChildNodes(null, "refresh");

      },
      getFolder(event) {
        //debugger;
        this.sv1 = event.target.files;

        //this.sv1 = $("input[name='file']").val();

        if (this.sv1.length != 0) {
          //this.folders.push(this.sv1);

          this.allArr.push(this.sv1);
          var obj = document.getElementById('fileupload');
          obj.outerHTML = obj.outerHTML;
        } else {
          //alert("请选择文件夹");
          layer.msg("请选择文件夹");
        }
      },

      getFile(event) {
        this.sv2 = event.target.files[0];
        console.log("#######");
        console.log(this.sv2);
      },

      folderclick(event) {
        //this.sv1 = event.target.files[0];;

        var sv11 = document.getElementById("folderupload");
        this.fieList = sv11.files;

        if (this.fieList.length != 0) {

          var foldersNum = this.fieList.length + "个文件";
          let foldersInfo = [];

          for (let i = 0; i < this.fieList.length; i++) {
            let path = this.fieList[i].webkitRelativePath.split('/');

            if (foldersInfo.length > 0) {
              for (let j = 0; j < foldersInfo.length; j++) {

                if (foldersInfo[j].name == path[0]) {
                  break;
                } else {
                  let info2 = {};
                  info2.name = path[0];
                  foldersInfo.push(info2);
                }
              }
            } else {
              let info2 = {};
              info2.name = path[0];
              foldersInfo.push(info2);
            }
          }

          console.log(foldersInfo);
          if (foldersInfo.length > 0) {
            for (let j = 0; j < foldersInfo.length; j++) {
              this.folderInfo.push(foldersInfo[j]);
            }
          }


          this.folders.push(foldersNum);
          this.allArr.push(this.fieList);


          var obj = document.getElementById('folderupload');
          obj.outerHTML = obj.outerHTML;

        } else {
          layer.msg("请选择文件夹");

        }
      },

      fileclick(event) {
        event.preventDefault();

        var sv12 = document.getElementById("fileupload");
        this.fieList2 = sv12.files;
        console.log(this.fieList2[0]);

        if (this.fieList2.length != 0) {
          let files = [];

          files.push({"name": this.fieList2[0].name});
          this.fileInfo.push(files[0]);

          this.allArr.push(this.fieList2);

          var obj = document.getElementById('fileupload');

          obj.outerHTML = obj.outerHTML;
        } else {
          layer.msg("请选择文件");

        }
      },

      addComp(event) {
        let username = this.getCookie('username');
        let password = this.getCookie('password');

        this.name = $("input[id='add-name']").val();
        this.version = $("input[id='add-version']").val();
        this.describle = $("input[id='add-describle']").val();
        this.deployPath = $("input[id='add-deployPath']").val();


        if (this.name.length == 0) {
          layer.msg("请输入组件名！");
        } else if (this.version.length == 0) {
          layer.msg("请输入版本！");
        } else if (this.deployPath.length == 0) {
          layer.msg("请输入路径！");
        } else {
          layer.load();
          event.preventDefault();
          let formData = new FormData();

          console.log(this.allArr);

          formData.append('name', this.name);
          formData.append('version', this.version);
          formData.append('deployPath', this.deployPath);
          //formData.append('size', this.size);
          formData.append('description', this.describle);
          formData.append('removeIds', this.allClearData);

          formData.append('enctype', "multipart/form-data");

          for (var i = 0; i < this.allArr.length; i++) {
            //判断数组里是文件夹还是文件
            for (var j = 0; j < this.allArr[i].length; j++) {
              formData.append('componentfiles', this.allArr[i][j]);
            }

          }

          console.log(formData);

          //formData.append('componentfile', this.allArr);
          //console.log(this.allArr.length);
          //console.log(this.allArr);

          let config = {
            headers: {
              //'Content-Type': 'multipart/form-data'
              'content-type': 'application/x-www-form-urlencoded'
            }
          };

          this.$axios.post(this.getIP() + 'components/' + this.$route.params.id + '/update', formData, {
            config,
            auth: {
              username: username,
              password: password
            }
          }).then(res => {
            //this.users = res.data.data
            //console.log(res);
            //alert("添加成功");
            layer.closeAll('loading');
            layer.msg("修改成功!");


            this.$router.replace({path: '/components'})
          }).catch(err => {
            // alert("添加失败！");
            layer.msg("修改失败！");
            layer.closeAll('loading');
          })

        }


      },

      folderClear: function () {
        this.folderInfo.splice(0, this.folderInfo.length);   //清空文件夹

        for (let i = 0; i < this.folderClearData.length; i++) {
          this.allClearData.push(this.folderClearData[i]);
        }

        //console.log(this.allClearData);
      },

      fileClear: function () {
        this.fileInfo.splice(0, this.fileInfo.length);   //清空文件夹

        for (let i = 0; i < this.fileClearData.length; i++) {
          this.allClearData.push(this.fileClearData[i]);
        }

        //console.log(this.allClearData);
      },

      formReset: function () {
        $("input").val('');
        this.$router.replace({path: '/components'})

      },
      handleInfo: function (item, path) {
        if (item == null)
          return;

        if (item.hasOwnProperty("children")) {
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
            item.children.push({"name": path});
            item = item.children[item.children.length - 1];
            return item;
          }

        } else {
          item.children = [];
          item.children.push({"name": path});
          item = item.children[0];
          return item;
        }

      },

    },

  }

</script>
<style>
  .uploadfile {
    border: 1px solid #cccccc;
    border-radius: 4px;
    min-height: 250px;

  }

  .upbtn {
    margin-top: 5px;
    float: left;
    margin-right: 10px;
  }

  .addli {

    max-height: 90px;
    overflow: auto;
  }

  .addul {
    list-style-type: decimal;
  }

  .muststar {
    margin-left: 10px;
    color: red;
  }
  #addUser h3.header-wrapper-modify {
    height:36px;
    padding:2px 6px;
    border-radius: 4px;
    line-height: 36px;
    text-align: center;
    font-size: 24px;
    background-color: #f56954;
    color:#fff;
  }
  #addUser div.row-fluid.header {
    margin-bottom:40px;
  }
</style>
