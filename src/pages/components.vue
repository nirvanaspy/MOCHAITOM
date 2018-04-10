<template>
  <!-- main container -->
  <div id="components">
    <div class="container-fluid">
      <div id="pad-wrapper" class="users-list">
        <div class="row-fluid header">
          <a class="header-wrapper">
            <span class="text">组件</span>
            <i class="icon icon-cogs"></i>
          </a>
          <div class="span10 pull-right components-input">

            <input class="search" type="text" placeholder="组件名称.." v-model="searchQuery" style="margin-right: 150px;"/>

            <router-link to="/addComponent1" class="btn-flat success pull-right" style="float: right;">
              <span>&#43;</span>
              新增
            </router-link>

            <el-upload style="float: right;"
                       class="upload-demo"
                       action=""
                       :file-list="fileList"
                       :httpRequest="uploadCom"
                       :show-file-list="false"
                       multiple>
              <el-button class="icon-cloud-download" size="small" type="primary"
                         style="height: 35px;width: 70px;margin-right: 10px;"
                         >
                <span>&nbsp;</span>
                导入
              </el-button>

            </el-upload>

          <!--  <el-button class="pull-right hitoryClass" id="history" type="danger" @click="showHistory">
              <i class="icon-beaker" style="margin-right: 0;"></i>
              历史组件
            </el-button>
            &lt;!&ndash;style="float: right;margin-right: 10px;height: 33.5px;padding: 9px 20px;"&ndash;&gt;
            <el-button class="pull-right nowClass" id="now" type="warning" @click="showNow">
              <i class="icon-bell" style="margin-right: 0;"></i>
              现有组件
            </el-button>-->
            <span class="pull-right hitoryClass" id="history" type="danger"
                  @click="showHistory">
                  <i class="icon-beaker" style="margin-right: 0;"></i>
                  历史组件
                </span>
            <span class="pull-right nowClass" id="now" type="warning" @click="showNow">
                  <i class="icon-bell" style="margin-right: 0;"></i>
                  现有组件
            </span>

            <!--<input type="button" class="btn-flat  info pull-right icon-beaker" style="float: right;margin-right: 10px;height: 20px;padding: 9px 20px;" value="查看历史" @click="showHistory"/>-->

            <!--<router-link to="" class="btn-flat info pull-right icon-beaker" style="float: right;margin-right: 10px;text-decoration:none;" @click="showHistory">
              <span></span>
              查看历史
            </router-link>-->


          </div>
        </div>

        <!-- Users table -->
        <div class="row-fluid table tabletable">
          <table class="table table-hover" id="table_value">
            <thead>
            <tr>
              <th class="span2 sortable">
                组件名称
              </th>
              <th class="span2 sortable">
                <span class="line"></span>版本
              </th>
              <th class="span2">
                <span class="line"></span>大小
              </th>
              <th class="span3 sortable">
                <span class="line"></span>相对路径
              </th>
              <th class="span3">
                <span class="line"></span>描述
              </th>
              <th class="span4">
                <span class="line"></span>操作
              </th>

            </tr>
            </thead>
            <tbody>
            <!-- row -->
            <tr class="first" v-for="(component,index) in componentsA" :id="component.id">
              <td style="display:none">{{component.id}}</td>
              <td>
                {{component.name}}
              </td>
              <td>
                {{component.version}}
              </td>
              <td>
                {{component.displaySize}}
              </td>
              <td>
                {{component.deployPath}}
              </td>
              <td class="description">
                {{component.description}}
              </td>

              <td style="width:304px" v-if="!component.deleted">
                <ul class="ulactions">
                  <li>
                    <router-link :to='{name:"modifyComponent1",params:{id:component.id}}'>
                      <input type="button" class="btn-flat success" value="修改"/>
                    </router-link>
                  </li>
                  <li>
                    <input type="button" class="btn-flat danger" value="删除" @click="deleteComp($event)"/>
                  </li>
                  <li>
                    <a @click="exportLink($event)">
                      <input type="button" class="btn-flat primary" value="导出" :id="component.id"/>
                    </a>

                  </li>
                  <li class="last">
                    <input type="button" class="btn-flat gray" value="复制"
                           @click="copyComp($event)"
                    />
                    <!--:disabled="{'disabled':copyBtnState === false}"-->
                  </li>
                </ul>
              </td>

              <td style="width:304px" v-else>

                <el-alert
                  title="此组件已删除"
                  type="error"
                  :closable="false"
                  show-icon
                  style="width: 225px;"
                >
                </el-alert>

              </td>
            </tr>

            </tbody>
          </table>
        </div>

      </div>
    </div>
    <!-- <hr/>
        <div>
            {{components}}
        </div> -->
  </div>
</template>

<script>
  export default {
    /* eslint-disable */
    data() {
      return {
        components: [],
        searchQuery: '',
        exportUrl: '',               //导出地址

        fileList: [],

        fileObj: []
      }
    },
    created() {


      let username = this.getCookie('username');
      let password = this.getCookie('password');

      var qs = require('qs');
      this.$axios.get(this.getIP() + 'components',

        {
          params: {  //get请求在第二个位置，post在第三个位置
            isShowHistory: false
          },
          //设置头
          headers: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          auth: {
            username: username,
            password: password
          }
        }).then(res => {
        this.components = res.data.data;
        /*for (let j = 0; j < this.components.length; j++) {
          this.components[j].size = ((this.components[j].size) / 1024 / 1024).toFixed(5);
        }*/
        /*for (let j = 0; j < this.components.length; j++) {
          this.components[j].size = this.components[j].size.toFixed(5);
        }*/
      })
        .catch(err => {
          console.log(err);
        })

    },
    methods: {
      showHistory: function(){
        let username = this.getCookie('username');
        let password = this.getCookie('password');

        this.$axios.get(this.getIP() + 'components',

          {
            params: {  //get请求在第二个位置，post在第三个位置
              isShowHistory: true
            },
            //设置头
            headers: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            auth: {
              username: username,
              password: password
            }
          }).then(res => {
          this.components = res.data.data;

            //隐藏历史按钮
            $("#history").attr("style","display:none;");

            $("#now").attr("style","display:block;");
          })
          .catch(err => {
            console.log(err);
          })
      },

      showNow: function(){
        let username = this.getCookie('username');
        let password = this.getCookie('password');

        this.$axios.get(this.getIP() + 'components',

          {
            params: {  //get请求在第二个位置，post在第三个位置
              isShowHistory: false
            },
            //设置头
            headers: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            auth: {
              username: username,
              password: password
            }
          }).then(res => {
          this.components = res.data.data;

          //隐藏历史按钮
          $("#now").attr("style","display:none;");

          $("#history").attr("style","display:block;");
        })
          .catch(err => {
            console.log(err);
          })
      },

      deleteComp: function (event) {
        //alert("A");
        var e = event || window.event;
        //alert("B");
        var target = e.target || e.srcElement;

        let username = this.getCookie('username');
        let password = this.getCookie('password');

        var msg = "您确定删除吗？";
        if (confirm(msg) == true) {

          if (target.parentNode.parentNode.parentNode.tagName.toLowerCase() == "td") {
            //alert("C");
            var rowIndex = target.parentNode.parentNode.parentNode.parentNode.rowIndex;
            //alert(rowIndex);
            var id = document.getElementById("table_value").rows[rowIndex].cells[0].innerHTML;
            //alert(id);
            var qs = require('qs');
            this.$axios.delete(this.getIP() + 'components/' + id, {

              //设置头
              headers: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              auth: {
                username: username,
                password: password
              }
            }).then(res => {
              layer.msg("删除成功");

              var username = this.getCookie('username');
              var password = this.getCookie('password');

              this.$axios.get(this.getIP() + 'components', {
                params: {  //get请求在第二个位置，post在第三个位置
                  isShowHistory: false
                },
                //设置头
                headers: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                auth: {
                  username: username,
                  password: password
                }
              }).then(res => {
                this.components = res.data.data
              })
                .catch(err => {
                  console.log(err);
                })
            }).catch(err => {
              layer.msg("删除失败！");
            })
          }

        } else {
          return false;
        }


      },

      exportLink: function (event) {
        let e = event || window.event;
        //alert("B");
        let target = e.target || e.srcElement;

        console.log(target);

        let id = target.id;
        this.exportUrl = this.getIP() + 'components/' + id + '/export';

        console.log(this.exportUrl);
        window.open(this.exportUrl);
      },

      /*submitUpload: function () {

        ///components/import           importComponents
        console.log(this.$refs);
        this.$refs.upload.submit();

      },*/


      uploadCom: function (file) {
      let username = this.getCookie('username');
      let password = this.getCookie('password');

      let formData = new FormData();

      console.log("导入组件文件----------");
      console.log(file);

      formData.append('importComponents', file.file);

      /*for (var i = 0; i < file.length; i++) {

        formData.append('importComponents', file[i].file);

        console.log(file[i].file);

      }*/


      this.$axios.post(this.getIP() + "components/import", formData,{
        //设置头
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        auth: {
          username: username,
          password: password
        }
      }).then(res => {
        layer.msg("导入成功！");

        //导入成功后再次查询
        this.$axios.get(this.getIP() + 'components',

          {
            params: {  //get请求在第二个位置，post在第三个位置
              isShowHistory: false
            },
            //设置头
            headers: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            auth: {
              username: username,
              password: password
            }
          }).then(res => {
          this.components = res.data.data;

        })
          .catch(err => {
            console.log(err);
          })
      })
        .catch(err => {
          console.log(err);
        })
    },

      copyComp: function (event) {
        /*this.copyBtnState = false;*/
       /* this.$refs.copyBtn.disabled = true;*/
        var e = event || window.event;

        var name;
        var version;

        var target = e.target || e.srcElement;

        var copyDeviceInfo = target.parentNode.parentNode.parentNode.parentNode;

        var id = copyDeviceInfo.id;
        console.log(copyDeviceInfo);
        console.log(id);

        var projectId = this.getCookie('projectId');
        var username = this.getCookie('username');
        var password = this.getCookie('password');

        var qs = require('qs');
        this.$axios.post(this.getIP() + 'components/' + id + '/copy',
          qs.stringify({
            "name": $("input[name='add-name']").val(),

          }), {
            /*params:{  //get请求在第二个位置，post在第三个位置
             ID:'c02da6e9-a334-4e41-b842-c59eb7d0d3f3'
             },*/
            //设置头
            headers: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            auth: {
              username: username,
              password: password
            }
          }).then(res => {
          layer.msg("复制成功");
          /*this.copyBtnState = true;*/
          /*this.$refs.copyBtn.disabled = false;*/
          this.$axios.get(this.getIP() + 'components', {
            params: {  //get请求在第二个位置，post在第三个位置
              isShowHistory: false
            },

            //设置头
            headers: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            auth: {
              username: username,
              password: password
            }
          }).then(res => {
            this.components = res.data.data;
          })
            .catch(err => {
              console.log(err);
            })
        })
          .catch(err => {

            layer.msg("复制失败！");
          })
      }
    },
    computed: {
      componentsA: function () {
        var self = this;
        return self.components.filter(function (item) {
          return item.name.toLowerCase().indexOf(self.searchQuery.toLowerCase()) !== -1;
        })
      }
    },
    watch: {
      componentsA() {
        this.componentsA = this.componentsA.sort(
          function(x,y){ return x['name'].localeCompare(y['name']) ;
          })
      }
    },
    mounted () {
      this.$nextTick(() => {
        //隐藏现有按钮
        $("#now").attr("style","display:none;");
      })
    }
  }
</script>
<style>
/*  .nowClass{
    float: right;
    margin-right: 10px;
    height: 33.5px;
    padding: 9px 20px;
  }

  .hitoryClass{
    float: right;
    margin-right: 10px;
    height: 33.5px;
    padding: 9px 20px;
  }*/
  #components #now{
    float: right;
    margin-right: 10px;
    height: 33.5px;
    padding: 9px 20px;
    background-color:#e6a23c;
    cursor:pointer;
    box-sizing:border-box;
    color:#fff;
    border-radius:4px;
  }
  #components #history{
    float: right;
    margin-right: 10px;
    height: 33.5px;
    padding: 7px 20px;
    background-color:#f56c6c;
    cursor:pointer;
    box-sizing:border-box;
    color:#fff;
    border-radius:4px;
  }
  #components span#now:hover{
    background-color:#ebb563;
  }
  #components span#history:hover{
    background-color:#f78989;
  }

  .tabletable {
    height: 600px;
    overflow-y: auto;
    margin-top: -35px;
  }

  .ulactions {
    margin: 5px 0 0 0;
  }

  .ulactions li {
    display: inline;
  }
</style>
