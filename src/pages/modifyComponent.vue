<template>
    <div id="addUser">


        <div class="container-fluid">
            <div id="pad-wrapper" class="new-user">
                <div class="row-fluid header">
                    <h3>修改组件</h3>
                </div>

                <div class="row-fluid form-wrapper" style="margin-top:-27px">
                    <!-- left column -->
                    <div class="span10 ">
                        <div class="with-sidebar">
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
                                        <div class="" style="background: rgba(255, 255, 255, 0.65);height:50px;overflow-y:auto">
                                            <ul class="mini-repo-list" id="ulId" data-filterable-for="your-repos-filter" data-filterable-type="substring" style="background: rgba(255, 255, 255, 0.65);">
                                                <li class="pubic fork" v-for="folder in folderInfo">
                                                    <span>{{folder.name}}</span>     
                                                </li>
                                            </ul>
                                        </div>


                                        <div class="upbtn">
                                            <input type='file' name="folderin" id="folderupload" webkitdirectory  @change="getFolder($event)">
                                                
                                                <button v-on:click="folderclick($event)">提交</button>
                                        </div>

                                        <div class="" style="background: rgba(255, 255, 255, 0.65);height:50px;overflow-y:auto">
                                            <ul class="mini-repo-list" id="ulId" data-filterable-for="your-repos-filter" data-filterable-type="substring" style="background: rgba(255, 255, 255, 0.65);">
                                                <li class="pubic fork" v-for="file in fileInfo">
                                                    <span>{{file.name}}</span>     
                                                </li>
                                            </ul>
                                        </div>


                                        <div class="upbtn">
                                                <input type='file' name="filein" id="fileupload"  @change="getFile($event)">
                                                <button v-on:click="fileclick($event)">提交</button>
                                        </div>

                                    </div>
                                </div>

                                <div style="height: 313px; border-left: 1px solid rgba(0, 0, 0, 0.32);margin-left: 829px;"></div>
                                 <div class="span12 field-box with-sidebar " style="width: 229px;margin-left: 847px;margin-top: -432px;height: 317px;overflow-y: auto;">
                                    <span>组件详细信息</span>

                                     <ul id="treeDemo" class="ztree" style=""></ul>
                                </div>

                       

                                <div class="span7 field-box actions" style="margin-top:-1px">
                                    <button type="submit" class="btn-glow primary" @click="addComp($event)">修改</button>
                                    <button type="submit" class="btn-glow primary" @click="formReset">取消</button>
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
                fileInfo:[],
                folderInfo:[],
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
                document.getElementById("add-describle").value=res.data.data.description; 

                //对比时，是路径节点与根节点下的孩子节点比较
                let componentFile=res.data.data.componentFileEntities;//组件


                let zNodes=[];
                let item;
                for(let m=0;m<componentFile.length;m++){

                    treeInfo.push(componentFile[m]);//放所有文件信息，用于树点击id的选择

                    item=res.data.data;

                    let path=(componentFile[m].path).split('/');

                    for(let i=1;i<path.length;i++){
                        item=this.$options.methods.handleInfo(item,path[i]);
                   }
                };

                

                zNodes.push(res.data.data);

                console.log(zNodes);

                let forderTemp=[];

                for(let i=0;i<res.data.data.componentFileEntities.length;i++){
                     let info=res.data.data.componentFileEntities[i].path.split('/');

                     if(info.length>2){
                     
                        if(forderTemp.length>0){
                            let flag=true;

                            for(let j=0;j<forderTemp.length;j++){
                                if(forderTemp[j].name==info[1]){
                                    flag=false;
                                }
                            }

                            if(flag){
                                let info2={};
                                info2.name=info[1];
                                forderTemp.push(info2);
                            }
                           
                        }else{
                            let info2={};
                            info2.name=info[1];
                            forderTemp.push(info2);
                        }

                     }else{
                        this.fileInfo.push(res.data.data.componentFileEntities[i]);
                     }
                }

                console.log(forderTemp);

                for(let i=0;i<forderTemp.length;i++){
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

               // tree.refresh();  
            //tree.reAsyncChildNodes(null, "refresh"); 

            },
            getFolder(event) {
                //debugger;
                this.sv1 = event.target.files;
          
                //this.sv1 = $("input[name='file']").val();

                if(this.sv1.length != 0){
                    //this.folders.push(this.sv1);

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
                console.log("#######");
                console.log(this.sv2);
            },

            folderclick(event) {
                //this.sv1 = event.target.files[0];;

                var sv11 = document.getElementById("folderupload");
                var fieList = sv11.files;

                if(fieList.length != 0){
                    
                    var foldersNum = fieList.length + "个文件";
                    let foldersInfo=[];

                    for(let i=0;i<fieList.length;i++){
                        let path=fieList[i].webkitRelativePath.split('/');
                        
                        if(foldersInfo.length>0){
                            for(let j=0;j<foldersInfo.length;j++){

                                if(foldersInfo[j].name==path[0]){
                                    break;
                                }else{
                                    let info2={};
                                    info2.name=path[0];
                                    foldersInfo.push(info2);
                                }
                            }
                        }else{
                            let info2={};
                            info2.name=path[0];
                            foldersInfo.push(info2);
                        } 
                    }

                    console.log(foldersInfo);
                    if(foldersInfo.length>0){
                        for(let j=0;j<foldersInfo.length;j++){
                            this.folderInfo.push(foldersInfo[j]);
                        }
                    }

                    
                    this.folders.push(foldersNum);
                    this.allArr.push(fieList);


                    var obj = document.getElementById('folderupload') ;
                    obj.outerHTML=obj.outerHTML;
                  
                }else{
                    layer.msg("请选择文件夹");

                }
            },

            fileclick(event) {
                event.preventDefault();

                var sv12 = document.getElementById("fileupload");
                var fieList2 = sv12.files;
                console.log(fieList2[0]);

                if(fieList2.length != 0){
                    let files=[];

                    files.push({"name":fieList2[0].name});
                    this.fileInfo.push(files[0]);

                    this.allArr.push(fieList2);

                    var obj = document.getElementById('fileupload') ;

                    obj.outerHTML=obj.outerHTML;
                }else{
                    layer.msg("请选择文件");

                }
            },

            addComp(event) {

                

                this.name = $("input[id='add-name']").val();
                this.version = $("input[id='add-version']").val();
                this.describle = $("input[id='add-describle']").val();
                this.deployPath = $("input[id='add-deployPath']").val();


                if(this.name.length==0){
                    layer.msg("请输入组件名！");
                }else if(this.version.length==0){
                    layer.msg("请输入版本！");
                }else if(this.deployPath.length==0){
                    layer.msg("请输入路径！");
                }else{
                    layer.load();
                    event.preventDefault();
                    let formData = new FormData();

                    console.log(this.allArr);

                    formData.append('name', this.name);
                    formData.append('version', this.version);
                    formData.append('deployPath', this.deployPath);
                    //formData.append('size', this.size);
                    formData.append('description', this.describle);

                    formData.append('enctype', "multipart/form-data");

                    for(var i=0;i<this.allArr.length;i++){
                        //判断数组里是文件夹还是文件
                        for(var j=0;j<this.allArr[i].length;j++){
                                formData.append('componentfile', this.allArr[i][j]);
                            }
                        
                    }

                    console.log(formData);

                    //formData.append('componentfile', this.allArr);
                    //console.log(this.allArr.length);
                    //console.log(this.allArr);

                    let config = {
                        headers: {
                            //'Content-Type': 'multipart/form-data'
                             'content-type':'application/x-www-form-urlencoded'
                        }
                    }

                    this.$axios.post('components/' + this.$route.params.id +'/update', formData, {
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

                }

                
               
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
