<template>
  <div id="addUser">

    <div class="container-fluid">
      <div id="pad-wrapper" class="new-user">
        <div class="row-fluid header">
          <h3 class="header-wrapper-modify">修改软件包信息</h3>
        </div>

        <div class="row-fluid form-wrapper">
          <!-- left column -->
          <div class="span10">
            <div class="container">
              <form class="new_user_form inline-input">

                  <div class="span12 field-box">
                    <label>名称:</label>
                    <input class="span9" type="text" id="edit-name"/>
                    <span class="muststar">*</span>
                  </div>

                  <div class="span12 field-box">
                    <label>版本:</label>
                    <input class="span9" type="text" id="edit-version"/>
                    <span class="muststar">*</span>
                  </div>

                  <div class="span12 field-box">
                    <label>描述:</label>
                    <input class="span9" type="text" id="edit-des"/>
                  </div>

                  <div class="span12 field-box">
                    <label>选择组件:</label>

                    <div class="span9 selcomps table-modifysoftware" style="margin-left: 0;height: 260px;">
                      <div class="table-wrapper" style="margin-top: 0;height: 250px;overflow: auto;">
                        <div class="row-fluid table">
                          <table class="table table-hover" id="table_value">
                            <thead>
                            <tr>
                              <th class="span4 sortable">
                                <input type="checkbox"/>
                                组件名称
                              </th>
                              <th class="span3 sortable">
                                <span class="line"></span>版本
                              </th>
                              <th class="span3">
                                <span class="line"></span>大小(MB)
                              </th>
                              <th class="span3 sortable">
                                <span class="line"></span>相对路径
                              </th>
                              <th class="span3">
                                <span class="line"></span>描述
                              </th>

                            </tr>
                            </thead>
                            <tbody>
                            <!-- row -->
                            <tr class="first" v-for="(component,index) in components" :id="component.id">
                              <td style="display:none">{{component.id}}</td>
                              <td>
                                <input type="checkbox" key="choosecomp"  :id="component.id" v-if="component.checkFlag" checked="checked" @click="changeCheck"/>
                                <input type="checkbox" key="choosecomp"  :id="component.id" v-else/>
                                {{component.name}}
                              </td>
                              <td>
                                {{component.version}}
                              </td>
                              <td>
                                {{component.size}}
                              </td>
                              <td>
                                {{component.deployPath}}
                              </td>
                              <td class="description">
                                {{component.description}}
                              </td>

                            </tr>

                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>


                  </div>

                  <div class="modifySoftPackage span7 field-box actions">

                    <button type="submit" class="btn-flat primary" @click="modifySoftPackage">保存</button>
                    <!--<input type="button" class="btn-glow primary" value="保存" style="width: 100px;" @click="modifyDevice"/>-->
                    <button type="submit" class="btn-flat danger" @click="formReset">取消</button>
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
export default{

        data(){
            return{
              softPackages: [],
              components: [],
              checkedComp: [],           //已选组件
              checkFlag: '',             //是否选择的标志
              chboxValue: [],            //修改时已选中的值
              name: '',
              version: '',
              description: '',
            }
        },
        created(){
          let username = this.getCookie('username');
          let password = this.getCookie('password');


          let softPackageId = this.$route.params.id;  //所选择的部署设计的id

          this.$axios.get(this.getIP() + 'componentpackages/' + softPackageId,{
              //设置头
              headers:{
                  'content-type':'application/x-www-form-urlencoded'
              },
              auth: {
                  username: username,
                  password: password
              }
          }).then(res=>{
              this.softPackages = res.data.data;

              document.getElementById("edit-name").value = res.data.data.name;
              document.getElementById("edit-version").value = res.data.data.version;
              document.getElementById("edit-des").value = res.data.data.description;

              this.checkedComp.splice(0,this.checkedComp.length);

              console.log(this.softPackages.componentEntities);
              for(let i=0;i<this.softPackages.componentEntities.length;i++){
                this.checkedComp.push(this.softPackages.componentEntities[i].id);
              }

          })
          .catch(err=>{
              console.log(err);
          });

          //查询组件
          this.$axios.get(this.getIP() +'components',

            {
              params:{  //get请求在第二个位置，post在第三个位置
                isShowHistory:false
              },
              //设置头
              headers:{
                'content-type':'application/x-www-form-urlencoded'
              },
              auth: {
                username: username,
                password: password
              }
            }).then(res=>{
            this.components = res.data.data;

            console.log(this.components.length);

            for (let j = 0; j < this.components.length; j++) {
              this.components[j].size = ((this.components[j].size) / 1024 / 1024).toFixed(5);

              this.components[j].checkFlag = false;

              for(let k=0;k<this.checkedComp.length;k++){
                if(this.components[j].id == this.checkedComp[k]){
                  this.components[j].checkFlag = true;
                  break;
                }
              }

              console.log(this.components[j].checkFlag);
            }
          })
          .catch(err=>{
            console.log(err);
          })

        },
        methods: {
//$('#checkbox').attr('checked',true)  //将输入框的状态设置为checked
          modifySoftPackage: function (){
              let softPackageId = this.$route.params.id;

              let username = this.getCookie('username');
              let password = this.getCookie('password');

              let qs = require('qs');

              this.name = $("input[id='edit-name']").val();
              this.version = $("input[id='edit-version']").val();
              this.description = $("input[id='edit-des']").val();

              //debugger;
              let SelectFalse = false; //用于判断是否被选择条件
              let CheckBox = $("input[type = 'checkbox']");//得到所有的复选框
            //let CheckBox = document.getElementsByName("box")[0].getAttribute("key");

            this.chboxValue.splice(0,this.chboxValue.length);

              /*if(this.checkedComp.length != 0){  //判断在修改之前是否有已选组件
                SelectFalse = true;
              }*/

              for(let i = 0; i < CheckBox.length; i++){
                if(CheckBox[i].checked)//如果有1个被选中时
                {
                  SelectFalse = true;
                  this.chboxValue.push(CheckBox[i].id)//将被选择的值追加到
                }

              }

              console.log(this.chboxValue);


              if(this.name.length==0){
                layer.msg("请输入名称！");
              }else if(this.version.length==0){
                layer.msg("请输入版本号！");
              }else if(!SelectFalse){
                layer.msg("请至少选择一个组件！");
              }else {
                this.$axios.patch(this.getIP() + 'componentpackages/' + softPackageId ,qs.stringify({

                  "name": this.name,
                  "version": this.version,
                  "description": this.description,
                  'componentIds':  this.chboxValue
                },{arrayFormat: 'repeat'}),{

                  //设置头
                  headers:{
                    'content-type':'application/x-www-form-urlencoded'
                  },
                  auth: {
                    username: username,
                    password: password
                  }
                }).then(res=>{
                  layer.msg("保存成功！");
                  this.$router.replace({ path: '/softpackage'})
                }).catch(err=>{
                  alert("修改失败！");
                })
              }

            },

          changeCheck: function () {
            this.checkFlag = !this.checkFlag;
          },

          formReset: function(){
            $("input").val('');
            this.$router.replace({ path: '/softpackage'})

          }
        }
    }
</script>
<style>
  .muststar{
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
  #addUser .table-modifysoftware {
    border: 1px solid #75b9e6;
  }
  #addUser div.row-fluid.header {
    margin-bottom: 40px;
  }
  #addUser .span12 label {
    width:60px;
    padding: 4px 20px 0 0;
  }
  #addUser .modifySoftPackage {
    padding-right: 120px;
  }
</style>
