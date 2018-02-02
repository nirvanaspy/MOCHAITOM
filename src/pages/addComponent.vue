<template>
  <div id="addUser">


    <div class="container-fluid">
      <div id="pad-wrapper" class="new-user">
        <div class="row-fluid header">
          <h3>创建一个新组件</h3>
        </div>

        <div class="row-fluid form-wrapper">
          <!-- left column -->
          <div class="span10 with-sidebar">
            <div class="container">
              <form class="new_user_form inline-input"/>
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
                <input class="span9" type="text" name="add-deployPath"/>
                <span class="muststar">*</span>
                <span>(如:/test/)</span>
              </div>

              <div class="span12 field-box">
                <label>描述信息:</label>
                <input class="span9" type="text" name="add-describle"/>
              </div>

              <div class="span12 field-box">
                <label>上传文件:</label>
                <div class="span9 uploadfile" style="margin-left: -1px;">
                  <!-- <ul id="example-1">
                      <li v-for="(index,item) in items">
                          {{ item.message }}
                      </li>
                  </ul> -->
                  <!-- 列表1  文件夹 -->
                  <div id="todo-list-example" class="addli">
                    <ul class="addul">
                      <li v-for="(folder, index) in folders" :key="index">
                        {{folder}}
                      </li>
                    </ul>
                  </div>

                  <div class="upbtn">
                    <input type='file' name="folderin" id="folderupload" webkitdirectory @change="getFolder($event)">
                    <!-- <input type='file' name="folderin" id="folderupload" webkitdirectory > -->
                    <!-- <input type='file' name="file"> -->
                    <button v-on:click="folderclick($event)">提交</button>
                    <!-- <button v-on:click="folderclick">upload</button> -->
                  </div>

                  <!-- 列表2 文件 -->
                  <div id="todo-list-example" class="addli">
                    <ul class="addul">
                      <li v-for="(file, index) in files" :key="index">
                        {{file}}
                      </li>
                      <!-- <li is="todo-item" v-for="(file, index) in files"  v-text="sv2"></li> -->
                    </ul>
                  </div>

                  <div class="upbtn">
                    <input type='file' name="filein" id="fileupload" @change="getFile($event)">
                    <button v-on:click="fileclick($event)">提交</button>
                  </div>
                </div>
              </div>

              <div class="span7 field-box actions">
                <button type="submit" class="btn-glow primary" @click="addComp($event)">创建</button>
                <button type="submit" class="btn-glow primary" @click="formReset">取消</button>
                <!-- <input type="button" class="btn-glow primary" value="添加组件" style="width: 100px;" @click="addComp($event)"/> -->
              </div>
              </form>
            </div>
          </div>


        </div>
      </div>
    </div>


    <hr/>
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
  /*Vue.component('todo-item', {
    template: `
              <li v-on:click="$emit('click')">
                  {{ text }}
              </li>`,
              props: ['text']
  })*/

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
        fileList2: []
      }
    },
    methods: {
      getFolder(event) {
        //debugger;
        //this.sv1 = event.target.files;
        //console.log(this.sv1.length);
        console.log("hhhh");
        //console.log(this.sv1);

       /* this.sv1 = $("input[name='file']").val();
        if (this.sv1.length != 0) {
          this.folders.push(this.sv1);

          this.allArr.push(this.sv1);
          var obj = document.getElementById('fileupload');
          obj.outerHTML = obj.outerHTML;
        } else {
          alert("请选择文件夹");
        }*/
      },
      getFile(event) {
        this.sv2 = event.target.files[0];
        //console.log(this.sv2.length);
        console.log(this.sv2);
      },
      folderclick(event) {
        //alert(this.sv);
        //this.sv1 = event.target.files[0];;
        event.preventDefault();
        //alert(this.sv1);
        //alert(this.sv1.name);
        //alert(this.sv1.webkitRelativePath);
        //alert("xy");
        //this.sv1 = event.target.files;

        console.log("文件夹------------------")
        let sv11 = document.getElementById("folderupload");
        console.log(sv11);
        let fieList = sv11.files;
        let folderPath = fieList[0].webkitRelativePath; //拿到第一个文件的路径
        let index = folderPath.indexOf("/");
        let foldername = folderPath.substring(0,index);
        //console.log(foldername);
        /*alert(fileList);
        alert(fileList.length);*/

        if (fieList.length != 0) {

          this.folders.push(foldername);
          this.allArr.push(fieList);
          console.log(fieList);

          console.log(Object.prototype.toString.call(fieList));
          /*console.log(Object.prototype.toString.call(this.sv1) == "[object FileList]");
          console.log(Object.prototype.toString.call(this.sv1) == FileList);*/

          console.log(this.folders);
          console.log(this.allArr);

          //alert(fieList);
          var obj = document.getElementById('folderupload');
          //alert("ffff");
          obj.outerHTML = obj.outerHTML;
          //alert("vvvv");
          //alert(fieList);
          //this.getFolder(event);
        } else {
          alert("请选择文件夹");
        }

        /*if(this.sv1.length != 0){*/
        //this.sv1.push(this.sv1.files);
        /*for(var s1=0; s1<this.sv1.length;s1++){
            this.folders.push(this.sv1);
            this.allArr.push(this.sv1);
        }*/
        /*var foldersNum = this.sv1.length + "个文件";
        this.folders.push(foldersNum);
        this.allArr.push(this.sv1);
        console.log(this.sv1);

        console.log(Object.prototype.toString.call(this.sv1));
        console.log(Object.prototype.toString.call(this.sv1) == "[object FileList]");
        console.log(Object.prototype.toString.call(this.sv1) == FileList);
        //console.log(typeof(this.sv1));

        console.log(this.folders);
        console.log(this.allArr);

       // alert(this.sv1);
        var obj = document.getElementById('folderupload') ;
       // alert("ffff");
        obj.outerHTML=obj.outerHTML;
       // alert("vvvv");
       // alert(this.sv1);
        //this.getFolder(event);
    }else{
        alert("请选择文件夹");
    }*/


      },

      fileclick(event) {
        event.preventDefault();

        // alert("xy");

        var sv12 = document.getElementById("fileupload");
        var fieList2 = sv12.files;

        if (fieList2.length != 0) {

          this.files.push(fieList2[0].name);
          this.allArr.push(fieList2);
          //console.log(fieList);

          /*console.log(Object.prototype.toString.call(fieList));*/
          //console.log(typeof(this.sv1));

          console.log(this.files);
          console.log(this.allArr);

          //alert(fieList2);
          var obj = document.getElementById('fileupload');

          obj.outerHTML = obj.outerHTML;
        } else {
          alert("请选择文件");
        }
      },

      addComp(event) {
        // alert("A");
        this.name = $("input[name='add-name']").val();
        this.version = $("input[name='add-version']").val();
        this.describle = $("input[name='add-describle']").val();
        this.deployPath = $("input[name='add-deployPath']").val();

        if(this.name.length==0){
          layer.msg("请输入组件名！");
        }else if(this.version.length==0){
          layer.msg("请输入版本！");
        }else if(this.deployPath.length==0){
          layer.msg("请输入路径！");
        }else {
          layer.load();
          event.preventDefault();
          let formData = new FormData();

          formData.append('name', this.name);
          formData.append('version', this.version);
          formData.append('deployPath', this.deployPath);
          //formData.append('size', this.size);
          formData.append('description', this.describle);

          formData.append('enctype', "multipart/form-data");

          for (var i = 0; i < this.allArr.length; i++) {
            //判断数组里是文件夹还是文件
            for (var j = 0; j < this.allArr[i].length; j++) {
              formData.append('componentfile', this.allArr[i][j]);
            }

          }

          //formData.append('componentfile', this.allArr);
          console.log(this.allArr.length);
          console.log(this.allArr);

          let config = {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }

          this.$axios.post(this.getIP() + 'components', formData, {
            config,
            auth: {
              username: 'admin',
              password: 'admin'
            }
          }).then(res => {
            //this.users = res.data.data
            //console.log(res);
            //alert("添加成功");
            layer.closeAll('loading');

            this.$router.replace({path: '/components'})
          }).catch(err => {
            layer.closeAll('loading');
            alert("添加失败！");

          })
        }
      },

      formReset: function () {
        $("input").val('');
      }

    }
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
</style>
