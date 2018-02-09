<template>
  <div id="addUser">


    <div class="container-fluid">
      <div id="pad-wrapper" class="new-user">
        <div class="row-fluid header">
          <h3>新增基线</h3>
        </div>

        <div class="row-fluid form-wrapper">
          <!-- left column -->
          <div class="span10 with-sidebar">
            <div class="container">
              <form id="myForm">
              <div class="span12 field-box">
                <label>名称:</label>
                <input class="span9" type="text" name="add-name"/>
                <span class="muststar">*</span>
              </div>

              <div class="span12 field-box">
                <label>版本:</label>
                <input class="span9" type="text" name="add-ip"/>
                <span class="muststar">*</span>

              </div>

              <div class="span12 field-box">
                <label>描述:</label>

                <input class="span9" type="text" name="add-des"/>

              </div>

              <div class="span12 field-box">
                  <label>选择组件:</label>

                  <div class="span9 selcomps" style="margin-left: 0;">
                    <div class="table-wrapper" style="margin-top: 0;">
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
                              <input type="checkbox" />
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
                <button type="submit" class="btn-glow primary">新增</button>
                <button type="submit" class="btn-glow primary">取消</button>

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
  export default {
    data() {
      return {
        components:[]
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
</style>
