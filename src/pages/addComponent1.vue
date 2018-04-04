<template>
  <div id="addUser">
    <div class="container-fluid">
      <div id="pad-wrapper" class="new-user">
        <div class="row-fluid header">
          <h3 class="header-wrapper-add">创建新组件</h3>
        </div>
        <div class="row-fluid form-wrapper">
          <!-- left column -->
          <div class="span10 with-sidebar">
            <div class="container">
              <form class="new_user_form inline-input" enctype="multipart/form-data"/>
              <div class="span12 field-box">
                <label>组件名:</label>
                <input class="span9" type="text" name="add-name"/>
                <span class="muststar">*</span>
              </div>
              <div class="span12 field-box">
                <label>版本:</label>
                <input class="span9" type="text" name="add-version"/>
                <span class="muststar">*</span>
              </div>
              <div class="span12 field-box">
                <!--<label style="margin-left:-120px;">(如:/test/)</label>-->
                <label>相对路径:</label>
                <input class="span9" type="text" name="add-deployPath" placeholder="无路径时填入： / ； 有路径时如： /test/ "/>
                <span class="muststar">*</span>
                <!--<span>(如:/test/)</span>-->
              </div>
              <div class="span12 field-box">
                <label>描述信息:</label>
                <input class="span9" type="text" name="add-describle"/>
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

              <div class="span7 field-box actions">
                <button type="submit" class="btn-flat primary" @click="addComp($event)">创建</button>
                <button type="submit" class="btn-flat danger" @click="formReset">取消</button>
                <!-- <input type="button" class="btn-glow primary" value="添加组件" style="width: 100px;" @click="addComp($event)"/> -->
              </div>
            </div>
          </div>

          <!-- side right column -->
          <!--<div class="span2 form-sidebar pull-right">

            <h6>路径填写说明：</h6>
            <p>无路径时填入： / </p>
            <p>有路径时如： /test/ </p>

          </div>-->

        </div>
      </div>
    </div>


<!--    <hr/>
    <div>
      {{folders}}
    </div>
    <hr/>
    <div>
      {{files}}
    </div>
    <hr/>
    <div>
      {{allArr}}
    </div>-->
  </div>
</template>

<script>
  /* eslint-disable */
  import uploader from 'vue-simple-uploader'

  let folders = [];   //上传文件夹的数组
  let files = [];     //上传文件的数组
  let allArr = [];    //上传文件夹和文件的总数组
  let sv = null;
  let sv1 = [];
  let sv2 = '';


  export default {

    data: function () {
      return {
        name: '',
        version: '',
        size: '',
        deployPath: '',
        describle: '',
        folders: [],
        files: [],
        allArr: [],
        sv1: [],
        sv2: '',
        fileList2: [],

        fieList: [],    //上传的文件夹内容
        fieList2: [],    //上传的文件内容

        options: {
          // 可通过 https://github.com/simple-uploader/Uploader/tree/develop/samples/Node.js 示例启动服务
          //target: '//localhost:3000/upload',
          testChunks: false
        },
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

        autoStart: '',

        fileAll: []

      }
    },

    created(){
      this.autoStart = false;

      $(".uploader-file-actions").children(".uploader-file-pause").removeClass("uploader-file-pause");
      //this.$refs.uploader.uploader.on('uploadStart', this.uploadStart);
     },

    methods: {

      folderClear: function () {
        this.folders.splice(0, this.folders.length);   //清空文件夹

        this.allArr.splice(0, this.allArr.length);

        var sv12 = document.getElementById("fileupload");
        this.fieList2 = sv12.files;

        this.allArr.push(this.fieList2);

        /*for(let i=0;i<this.allArr.length;i++){
          for(let j=0;j<this.fieList.length;j++){
            if(this.allArr[i] == this.fieList[j]){
              this.allArr.splice(i,1);
              break;
            }
          }

        }*/

      },

      fileClear: function () {
        this.files.splice(0, this.files.length);   //清空文件夹

        this.allArr.splice(0, this.allArr.length);

        let sv11 = document.getElementById("folderupload");
        this.fieList = sv11.files;

        this.allArr.push(this.fieList);

      },


      addComp(event) {
        let username = this.getCookie('username');
        let password = this.getCookie('password');
        // alert("A");
        this.name = $("input[name='add-name']").val();
        this.version = $("input[name='add-version']").val();
        this.describle = $("input[name='add-describle']").val();
        this.deployPath = $("input[name='add-deployPath']").val();

        console.log(this.$refs.uploader.uploader.started);
        this.fileAll = this.$refs.uploader.uploader.files;

        let pattern = /^(\/([a-zA-Z]+))*\/$/;

        if(this.name.length==0){
          layer.msg("请输入组件名！");
        }else if(this.version.length==0){
          layer.msg("请输入版本！");
        }else if(this.deployPath.length==0){
          layer.msg("请输入路径！");
        }else if (!((this.deployPath).match(pattern))){
          layer.msg("路径格式不正确!");
        }else {
          //layer.load();
          event.preventDefault();
          let formData = new FormData();

          formData.append('name', this.name);
          formData.append('version', this.version);
          formData.append('deployPath', this.deployPath);
          //formData.append('size', this.size);
          formData.append('description', this.describle);

          formData.append('enctype', "multipart/form-data");

          //this.started = true;
          this.$refs.uploader.uploader.upload();

          //开始上传后去掉暂停和删除按钮
          $(".uploader-file-actions").children(".uploader-file-pause").removeClass("uploader-file-pause");
          $(".uploader-file-actions").children(".uploader-file-remove").removeClass("uploader-file-remove");



          for (var i = 0; i < this.fileAll.length; i++) {
            //判断数组里是文件夹还是文件
            formData.append('componentfiles', this.fileAll[i].file);

          }

          //formData.append('componentfile', this.allArr);
          console.log(this.fileAll.length);
          console.log(this.fileAll);

          let config = {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          };

          this.autoStart = true;
          console.log("是否开始-------------------");
          console.log(this.autoStart);
          console.log(this.statusText);
          console.log(this.started);

          this.$axios.post(this.getIP() + 'components', formData, {
            config,
            auth: {
              username: username,
              password: password
            }
          }).then(res => {

            //layer.closeAll('loading');

            this.$router.replace({path: '/components'})
          }).catch(err => {
            //layer.closeAll('loading');
            layer.msg("添加失败！");


          })
        }
      },

      formReset: function () {
        $("input").val('');
        this.$router.replace({path: '/components'});
      }

    },
    mounted () {
      this.$nextTick(() => {
        //this.autoStart = true;
        //window.uploader = this.$refs.uploader.uploader
        $(".uploader-file-actions").children(".uploader-file-pause").removeClass("uploader-file-pause");

      })
    }
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

  .upbtn2 {
    margin-top: 5px;
  }

  .addli {
    max-height: 90px;
    overflow: auto;
    width: 100%;
  }

  .addul {
    list-style-type: decimal;
  }

  .muststar {
    margin-left: 10px;
    color: red;
  }
  #addUser h3.header-wrapper-add {
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
    margin-bottom:30px;
  }
</style>
