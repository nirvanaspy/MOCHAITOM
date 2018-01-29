<template>
    <div id="addUser">


        <div class="container-fluid">
            <div id="pad-wrapper" class="new-user">
                <div class="row-fluid header">
                    <h3>修改组件</h3>
                </div>

                <div class="row-fluid form-wrapper">
                    <!-- left column -->
                    <div class="span10">
                        <div class="">
                            <form class="new_user_form inline-input" />
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

                                    <label>路径:</label>
                                    <input class="span9" type="text" id="add-deployPath"/>
                                    <span class="muststar">*</span>
                                </div>

                                <div class="span12 field-box">
                                    <label>描述信息:</label>
                                    <input class="span9" type="text" id="add-describle"/>
                                </div>

                                <div class="span12 field-box">
                                    <label>上传文件:</label>
                                    <div class="span9 uploadfile" style="margin-left: -1px;">
                                        <div id="todo-list-example" class="addli">
                                            <ul class="addul">
                                                <li v-for="(folder, index) in folders" :key="index">
                                                    {{folder}}
                                                </li>
                                            </ul>
                                        </div>

                                        <div class="upbtn">
                                            <input type='file' name="folderin" id="folderupload" webkitdirectory  @change="getFolder($event)">
                                                <!-- <input type='file' name="folderin" id="folderupload" webkitdirectory > -->
                                                <!-- <input type='file' name="file"> -->
                                                <button v-on:click="folderclick($event)">upload</button>
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
                                                <input type='file' name="filein" id="fileupload"  @change="getFile($event)">
                                                <button v-on:click="fileclick($event)">upload</button>
                                        </div>

                                    </div>
                                </div>


                                 <div class="span12 field-box" style="width: 229px;margin-left: 847px;margin-top: -344px;height: 317px;overflow-y: auto;">

                                     <ul id="treeDemo" class="ztree" style=""></ul>
                                </div>

                           <!--      <div style="display: inline;style=&quot;overflow: hidden; white-space: nowrap; text-overflow: ellipsis;width:100px;&quot;;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;width:100px;">叶子节点111</div> -->

                                <div class="span7 field-box actions">
                                    <button type="submit" class="btn-glow primary" @click="addComp($event)">修改</button>
                                    <button type="submit" class="btn-glow primary" @click="formReset">取消</button>
                                    <!-- <input type="button" class="btn-glow primary" value="添加组件" style="width: 100px;" @click="addComp($event)"/> -->
                                </div>
                            </form>
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


/*Vue.component('todo-item', {
  template: `
            <li v-on:click="$emit('click')">
                {{ text }}
            </li>`,
            props: ['text']
})*/
let treeInfo=[];
export default {

        data(){
            return {
                name:'',
                version:'',
                size: '',
                deployPath: '',
                describle: '',
                components:[],
                folders: [

                ],
                files: [

                ],
                allArr: [

                ],
                sv1: [],
                sv2: '',
                fileList2:[],
                
            }
        },created(){

            this.$axios.get('components/'+this.$route.params.id,{
                
                //设置头
                headers:{
                    'content-type':'application/x-www-form-urlencoded'
                },
                auth: {
                    username: 'admin',
                    password: 'admin'
                }
            }).then(res=>{
                //this.components = res.data.data;

                document.getElementById("add-name").value=res.data.data.name; 
                document.getElementById("add-version").value=res.data.data.version; 
                document.getElementById("add-deployPath").value=res.data.data.deployPath; 
                document.getElementById("add-describle").value=res.data.data.describle; 


                //对比时，是路径节点与根节点下的孩子节点比较
                let componentFile=res.data.data.componentFileEntities;//组件
               
                let zNodes=[];
                let item;
                for(let m=0;m<componentFile.length;m++){

                    treeInfo.push(componentFile[m]);//放所有文件信息，用于树点击id的选择
                    console.log(componentFile[m]);

                    item=res.data.data;
                    console.log(item);

                    let path=(componentFile[m].path).split('/');

                    for(let i=1;i<path.length;i++){
                        item=this.$options.methods.handleInfo(item,path[i]);
                        console.log(item);
                   }
                };

                zNodes.push(res.data.data);

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
            .catch(err=>{
                console.log(err);
            });

        },

        methods: {
            zTreeOnClick: function(e, treeId, treeNode) {

                let zTree = $.fn.zTree.getZTreeObj("treeDemo");
                let id;

                for(let i=0;i<treeInfo.length;i++){
                    if(treeInfo[i].name==zTree.getSelectedNodes()[0].name){
                        id=treeInfo[i].id;
                        break;
                    }
                }


                
                console.log();

               // tree.refresh();  
                //tree.reAsyncChildNodes(null, "refresh"); 

            },
            getFolder(event) {
                //debugger;
                this.sv1 = event.target.files;
                //console.log(this.sv1.length);
                console.log("hhhh");
                console.log(this.sv1);

                this.sv1 = $("input[name='file']").val();
                if(this.sv1.length != 0){
                    this.folders.push(this.sv1);

                    this.allArr.push(this.sv1);
                    var obj = document.getElementById('fileupload') ;
                    obj.outerHTML=obj.outerHTML;
                }else{
                    //alert("请选择文件夹");
                    layer.msg("请选择文件夹");
                }
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

                var sv11 = document.getElementById("folderupload");
                var fieList = sv11.files;
                /*alert(fileList);
                alert(fileList.length);*/

                if(fieList.length != 0){
                    //this.sv1.push(this.sv1.files);
                    /*for(var s1=0; s1<this.sv1.length;s1++){
                        this.folders.push(this.sv1);
                        this.allArr.push(this.sv1);
                    }*/
                    var foldersNum = fieList.length + "个文件";
                    this.folders.push(foldersNum);
                    this.allArr.push(fieList);
                    console.log(fieList);

                    console.log(Object.prototype.toString.call(fieList));
                    /*console.log(Object.prototype.toString.call(this.sv1) == "[object FileList]");
                    console.log(Object.prototype.toString.call(this.sv1) == FileList);*/

                    console.log(this.folders);
                    console.log(this.allArr);

                    //alert(fieList);
                    var obj = document.getElementById('folderupload') ;
                    //alert("ffff");
                    obj.outerHTML=obj.outerHTML;
                    //alert("vvvv");
                    //alert(fieList);
                    //this.getFolder(event);
                }else{
                    layer.msg("请选择文件夹");

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

                if(fieList2.length != 0){

                    this.files.push(fieList2[0].name);
                    this.allArr.push(fieList2);
                    //console.log(fieList);

                    /*console.log(Object.prototype.toString.call(fieList));*/
                    //console.log(typeof(this.sv1));

                    console.log(this.files);
                    console.log(this.allArr);

                    //alert(fieList2);
                    var obj = document.getElementById('fileupload') ;

                    obj.outerHTML=obj.outerHTML;
                }else{
                    //alert("请选择文件");
                    layer.msg("请选择文件夹");

                }
            },

            addComp(event) {

                layer.load();
                event.preventDefault();
                let formData = new FormData();

                this.name = $("input[id='add-name']").val();
                this.version = $("input[id='add-version']").val();
                this.describle = $("input[id='add-describle']").val();
                this.deployPath = $("input[id='add-deployPath']").val();

                //alert(this.deployPath);

                formData.append('name', this.name);
                formData.append('version', this.version);
                formData.append('deployPath', this.deployPath);
                //formData.append('size', this.size);
                formData.append('describle', this.describle);

                formData.append('enctype', "multipart/form-data");

                for(var i=0;i<this.allArr.length;i++){
                    //判断数组里是文件夹还是文件
                    for(var j=0;j<this.allArr[i].length;j++){
                            formData.append('componentfile', this.allArr[i][j]);
                        }
                    /*if(Object.prototype.toString.call(this.allArr[i]) == "[object FileList]"){

                        for(var j=0;j<this.allArr[i].length;j++){
                            formData.append('componentfile', this.allArr[i][j]);
                        }
                    }else{
                        formData.append('componentfile', this.allArr[i]);
                    }*/

                    //formData.append('componentfile', this.allArr[i]);
                    //formData.append("componentfile",fileList[i]);

                }

                //formData.append('componentfile', this.allArr);
                //console.log(this.allArr.length);
                //console.log(this.allArr);

                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }

                this.$axios.post('components', formData, {
                    config,
                    auth: {
                        username: 'admin',
                        password: 'admin'
                    }
                }).then(res=>{
                        //this.users = res.data.data
                        //console.log(res);
                        //alert("添加成功");
                        layer.closeAll('loading');
                        layer.msg("修改成功!");


                        this.$router.replace({ path: '/components'})
                    }).catch(err=>{
                       // alert("添加失败！");
                        layer.msg("修改失败！");
                        layer.closeAll('loading');
                })
            },

            formReset: function(){
                $("input").val('');
                this.$router.replace({ path: '/components'})

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

        },
        
}

</script>
<style>
    .uploadfile{
        border: 1px solid #cccccc;
        border-radius: 4px;
        min-height: 250px;

    }

    .upbtn{
        margin-top: 5px;
    }

    .addli{

        max-height: 90px;
        overflow: auto;
    }

    .addul{
        list-style-type: decimal;
    }

    .muststar{
        margin-left: 10px;
        color: red;
    }
</style>
