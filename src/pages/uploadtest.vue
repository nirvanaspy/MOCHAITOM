<template>
    <div >
        <div>
            <form>
                <input type="text" value="" v-model="name" placeholder="请输入组件名"/>
                <input type="text" value="" v-model="version" placeholder="请输入版本"/>
                <!-- <input type="text" value="" v-model="age" placeholder="请输入年龄">  -->
                <!-- <input type="file" @change="getFile($event)">  -->

                <br/>
                <input type='file' name="folderin" id="folderupload1"  @change="getFile0($event)" webkitdirectory >

                <button @click="submitForm0($event)">提交0</button>


                <br/>
                <input type='file' name="folderin" id="folderupload2"  multiple="multiple" @change="getFile1($event)" webkitdirectory >

                <button @click="submitForm1($event)">提交List</button>


                <br/>
                <input type='file' name="folderin" id="folderupload3"  multiple="multiple" @change="getFile2($event)" webkitdirectory >
                <button @click="submitForm2($event)">提交数组</button>
            </form>
            <!-- <form action="" enctype="multipart/form-data">
                <input type='file' name="folderin" id="folderupload"  @change="getFile($event)" webkitdirectory >
                <input type='file' name="file">
                <button @click="addComp($event)">upload</button>
            </form> -->

        </div>
        <br/>

        <div class="span7 field-box actions">
            <input type="button" class="btn-flat primary" value="添加组件" style="width: 100px;" @click="addComp($event)"/>
        </div>
    </div>
</template>



<script>
/* eslint-disable */


    export default {

        data:function() {
            return {
                name:'',
                version:'',
                file: '',
                file0: [],
                files: [],
                files2: []
            }
        },
        methods: {
            getFile0(event) {
                //this.files0 = event.target.files;
                this.file0 = event.target.files[0];
                /*console.log(event.target.files.length);
                for(var i=0; i<event.target.files.length; i++){
                    this.files.push(event.target.files[i]);
                }*/
                //this.file = event.target.files;
                console.log(Object.prototype.toString.call(this.file0));
                console.log(this.file0.length);
                //console.log(this.file);
                console.log(this.file0);
            },
            getFile1(event) {
                this.files = event.target.files;
                //this.file = event.target.files[0];
                /*console.log(event.target.files.length);
                for(var i=0; i<event.target.files.length; i++){
                    this.files.push(event.target.files[i]);
                }*/
                //this.file = event.target.files;
                console.log(Object.prototype.toString.call(this.files));
                //console.log(this.file.length);
                //console.log(this.file);
                console.log(this.files);
            },
            getFile2(event) {
                //this.files2 = event.target.files;
                //this.file = event.target.files[0];
                console.log(event.target.files.length);
                for(var i=0; i<event.target.files.length; i++){
                    this.files2.push(event.target.files[i]);
                }
                //this.file = event.target.files;
                console.log(Object.prototype.toString.call(this.files2));
                //console.log(this.file.length);
                //console.log(this.file);
                console.log(this.files2);
            },
            submitForm0(event) {
                //alert("A");
                event.preventDefault();
                let formData = new FormData();

                //alert("hh0");
                formData.append('name', this.name);
                formData.append('version', this.version);
                formData.append('componentfile', this.file0);
                console.log(this.file0.length);

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
                }).then(function (res) {
                    if (res.status === 2000) {
                        /*这里做处理*/
                    }
                })
            },
            submitForm1(event) {
                //alert("A");
                event.preventDefault();
                let formData = new FormData();

                //alert("hh");
                formData.append('name', this.name);
                formData.append('version', this.version);
                formData.append('enctype', "multipart/form-data");
                for(var i=0;i<this.files.length;i++)
                {
                    formData.append('componentfile', this.files[i]);
                    //formData.append("componentfile",fileList[i]);

                }
                //formData.append('componentfile', this.files);
                console.log(this.files.length);
                console.log(this.files);

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
                }).then(function (res) {
                    if (res.status === 2000) {
                        /*这里做处理*/
                    }
                })
            },
            submitForm2(event) {
                //debugger;
                event.preventDefault();
                let formData = new FormData();

                var file22 = document.getElementById("folderupload3");
                console.log(file22);
                var fieList = file22.files;
                console.log(fieList);
                console.log(fieList.length);
                /*console.log(this.files2);
                console.log(this.files2.length);*/

                formData.append('name', this.name);
                formData.append('version', this.version);
                formData.append('enctype', "multipart/form-data");
                for(var i=0;i<fieList.length;i++)
                {
                    formData.append('componentfile', fieList[i]);
                    //formData.append("componentfile",fileList[i]);

                }
                console.log(this.files.length);

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
                }).then(function (res) {
                    if (res.status === 2000) {
                        /*这里做处理*/
                    }
                },()=>{
                    alert();
                })
            }
            /*folderclick: function (){
                    var qs = require('qs');
                    this.$axios.post('components',qs.stringify({
                            "componentfile": $("input[name='file']").val()
                        }),{

                        headers:{
                            'content-type':'multipart/form-data'
                        },
                        auth: {
                            username: 'admin',
                            password: 'admin'
                        }
                }).then(res=>{

                })
                .catch(err=>{
                    alert("失败！");
                })
            }*/

    }
}
</script>
