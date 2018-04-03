<template>
  <div id="addUser">


    <div class="container-fluid">
      <div id="pad-wrapper" class="new-user">
        <div class="row-fluid header">
          <h3 class="header-wrapper-add">新增软件包</h3>
        </div>

        <div class="row-fluid form-wrapper">
          <!-- left column -->
          <div class="span10">
            <div class="container">
              <form class="new_user_form inline-input" id="myForm"/>
                <div class="span12 field-box">
                  <label>名称:</label>
                  <input class="span9" type="text" name="add-name"/>
                  <span class="muststar">*</span>
                </div>

                <div class="span12 field-box">
                  <label>版本:</label>
                  <input class="span9" type="text" name="add-version"/>
                  <span class="muststar">*</span>

                </div>

                <div class="span12 field-box">
                  <label>描述:</label>

                  <input class="span9" type="text" name="add-des"/>

                </div>

                <div class="span12 field-box">
                  <label>选择组件:</label>

                  <div class="span9 selcomps" style="margin-left: 0;">
                    <div class="table-wrapper" style="margin-top: 0;height: 250px; overflow: auto;">
                      <div class="row-fluid table">
                        <table class="table table-hover" id="table_value">
                          <thead>
                          <tr>
                            <th class="span4 sortable">
                              <input type="checkbox" />
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
                              <input type="checkbox" name="choosecomp" :id="component.id"/>
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

                <div class="span7 field-box actions" style="margin-top: 10px;">
                  <button type="submit" class="btn-flat primary" @click="addBaseline">新增</button>
                  <button type="submit" class="btn-flat danger" @click="formReset">取消</button>

                </div>

              <!--</form>-->
            </div>
          </div>


        </div>

      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  export default {
    data() {
      return {
        components:[],
        name: '',
        version: '',
        description: '',
        chboxValue: []   //选中的组件
      }
    },created(){
      let username = this.getCookie('username');
      let password = this.getCookie('password');

      var qs = require('qs');
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
        for (let j = 0; j < this.components.length; j++) {
          this.components[j].size = ((this.components[j].size) / 1024 / 1024).toFixed(5);
        }
      })
        .catch(err=>{
          console.log(err);
        })

    },
    methods: {
      addBaseline: function () {

        //debugger;
        this.name = $("input[name='add-name']").val();
        this.version = $("input[name='add-version']").val();
        this.description = $("input[name='add-des']").val();

        let SelectFalse = false; //用于判断是否被选择条件

        let CheckBox = $("input[name = 'choosecomp']");//得到所有的复选框


        for(let i = 0; i < CheckBox.length; i++){
          if(CheckBox[i].checked)//如果有1个被选中时
          {
            SelectFalse = true;
            this.chboxValue.push(CheckBox[i].id)//将被选择的值追加到
          }

        }

        console.log("下拉框-----------");
        console.log(this.chboxValue);

        if(this.name.length==0){
          layer.msg("请输入名称！");
        }else if(this.version.length==0){
          layer.msg("请输入版本号！");
        }else if(!SelectFalse){
          layer.msg("请至少选择一个组件！");
        }else {
          let username = this.getCookie('username');
          let password = this.getCookie('password');
          let qs = require('qs');

          let formData = new FormData();

          formData.append('name', this.name);
          formData.append('version', this.version);
          formData.append('description', this.description);
          formData.append('componentIds', this.chboxValue);

          this.$axios.post(this.getIP() + 'componentpackages', formData, {

            //设置头
            headers: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            auth: {
              username: username,
              password: password
            }
          }).then(res => {

            layer.msg('添加成功！');
            this.$router.replace({path: '/softpackage'})
          }).catch(err => {
            layer.msg('添加失败！');
          })

        }
      },

      formReset: function () {
        console.log(document.getElementById("myForm"));
        $("input").val('');
        this.$router.replace({path: '/softpackage'});
        /*document.getElementById("myForm").reset()*/
      }

    }
  }
</script>
<style>
  .muststar {
    margin-left: 10px;
    color: red;
  }

  .selcomps {
    margin: 0;
    padding: 3px 6px;
    border: 1px solid #cccccc;
    border-radius: 4px;
    height: 280px;
  }
  h3.header-wrapper-add {
    height:36px;
    padding:2px 6px;
    border-radius: 4px;
    line-height: 36px;
    text-align: center;
    font-size: 24px;
    background-color: #f56954;
    color:#fff;
  }
</style>
