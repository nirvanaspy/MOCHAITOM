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
            <div class="container">
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
                      <uploader :autoStart="autoStart"
                                :file-status-text="statusText"
                                :started="started"
                                ref="uploader"
                                class="span12 uploader-example">
                        <uploader-unsupport></uploader-unsupport>
                        <uploader-drop>
                          <p>拖拽文件到此处或</p>
                          <uploader-btn>选择文件</uploader-btn>
                          <uploader-btn :directory="true">选择文件夹</uploader-btn>
                        </uploader-drop>
                        <uploader-list></uploader-list>
                      </uploader>
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
                 style="width: 230px;height: 410px;overflow-y: auto;">


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
        allClearData: [],           //需要清空的内容的id数组

        fileAll: [],                //文件夹及文件的集合

        attrs: {
          accept: 'image/*'
        },
        statusText: {
          success: '成功了',
          error: '出错了',
          uploading: '上传中',
          paused: '暂停中',
          waiting: '等待中'
        },

        started: false,

        autoStart: ''

      }
    },
    created() {
      this.autoStart = false;      //取消自动上传


      let username = this.getCookie('username');
      let password = this.getCookie('password');

      let compId = this.$route.params.id;

      this.$axios.get(this.getIP() + 'components/' + compId, {

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


      addComp(event) {
        let username = this.getCookie('username');
        let password = this.getCookie('password');

        this.name = $("input[id='add-name']").val();
        this.version = $("input[id='add-version']").val();
        this.describle = $("input[id='add-describle']").val();
        this.deployPath = $("input[id='add-deployPath']").val();

        this.fileAll = this.$refs.uploader.uploader.files;

        let pattern = /^(\/([a-zA-Z]+))*\/$/;


        if (this.name.length == 0) {
          layer.msg("请输入组件名！");
        } else if (this.version.length == 0) {
          layer.msg("请输入版本！");
        } else if (this.deployPath.length == 0) {
          layer.msg("请输入路径！");
        } else if (!((this.deployPath).match(pattern))){
          layer.msg("路径格式不正确!");
        } else {
          //layer.load();
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

          this.$refs.uploader.uploader.upload();

          //开始上传后去掉暂停和删除按钮
          $(".uploader-file-actions").children(".uploader-file-pause").removeClass("uploader-file-pause");
          $(".uploader-file-actions").children(".uploader-file-remove").removeClass("uploader-file-remove");

          for (var i = 0; i < this.fileAll.length; i++) {
            //判断数组里是文件夹还是文件
            formData.append('componentfiles', this.fileAll[i].file);

          }

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

            layer.closeAll('loading');
            layer.msg("修改成功!");


            this.$router.replace({path: '/components'})
          }).catch(err => {

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
  .uploader-example {
    width: 880px;
    padding: 15px;
    /*margin: 40px auto 0;*/
    font-size: 12px;
    /* box-shadow: 0 0 10px rgba(0, 0, 0, .4);*/
  }
  .uploader-example .uploader-btn {
    margin-right: 4px;
  }
  .uploader-example .uploader-list {
    max-height: 300px;
    overflow: auto;
    overflow-x: hidden;
    overflow-y: auto;
  }

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
    margin-bottom:80px;
  }
  #addUser div.span7.field-box.actions {
    padding-right: 64px;
  }
</style>
