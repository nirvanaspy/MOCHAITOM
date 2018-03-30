<template>
  <!-- main container -->
  <div>
    <div class="container-fluid">
      <div id="pad-wrapper" class="users-list">
        <div class="row-fluid header">
          <h3>部署</h3>
          <div class="span10 pull-right">

            <select v-model="selected" style="height: 26px;width: 233px; margin-top: 5px; margin-left: 7px;"
                    @change="changeDeployPlan">
              <!-- v-model="selected" -->
              <option v-for="deployplan in deployplanInfos" v-bind:value="deployplan.id">
                {{ deployplan.name }}
              </option>
            </select>

          </div>
        </div>

        <!-- Users table -->
        <div class="row-fluid table tabletable">
          <el-table
            :data="devices"
            style="width: 100%">
            <el-table-column
              type="selection">
            </el-table-column>
            <el-table-column
              prop="name"
              label="设备名称">
            </el-table-column>
            <el-table-column
              prop="ip"
              label="IP">
            </el-table-column>
            <el-table-column
              prop="deployPath"
              label="路径">
            </el-table-column>

            <el-table-column
              prop="online"
              label="状态"

              :filters="[{ text: '离线', value: '离线' }, { text: '在线', value: '在线' }]"
              :filter-method="filterTag"
              filter-placement="bottom-end">
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.online === 'false' ? 'primary' : 'success'"
                  close-transition>{{scope.row.online}}</el-tag>
              </template>


            </el-table-column>

            <el-table-column
              label="发送进度" >
              <template slot-scope="scope">
                <el-progress :text-inside="true" :stroke-width="18"
                             :percentage="scope.row.progress"></el-progress>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button class="btn-flat primary" style="color: white;"
                  size="mini"
                  @click="handleDeploy(scope.$index, scope.row)">部署
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>


<style>
</style>

<script>
  /* eslint-disable */
  export default {
    data() {
      return {
        devices: [],

        selected: "",
        deployplanId: '',    //所选择的部署设计的id
        deployplanInfos: []
      }
    },
    created() {
      let projectId = this.getCookie('projectId');
      let username = this.getCookie('username');
      let password = this.getCookie('password');

      this.$axios.get(this.getIP() + 'projects/' + projectId + '/devices', {
        //设置头
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        auth: {
          username: username,
          password: password
        }
      }).then(res => {
        this.devices = res.data.data
      }).catch(err => {
        console.log(err);
      });

      setInterval(() => {
        this.$axios.get(this.getIP() + 'projects/' + projectId + '/devices', {
          //设置头
          headers: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          auth: {
            username: username,
            password: password
          }
        }).then(res => {
          this.devices = res.data.data
        }).catch(err => {
          console.log(err);
        });
      }, 10 * 1000);


      //下拉框数据
      this.$axios.get(this.getIP() + "projects/" + projectId + "/deploymentdesigns", {
        //设置头
        headers: {
          "content-type": "application/x-www-form-urlencoded"
        },
        auth: {
          username: username,
          password: password
        }
      }).then(res => {

        for (let i = 0; i < res.data.data.length; i++) {
          this.deployplanInfos.push({
            id: res.data.data[i].id,
            name: res.data.data[i].name
          })
        }

      }).catch(err => {
        console.log(err);
      });
    },
    methods: {
      getDevice: function () {

      },

      //下拉框选择部署设计
      changeDeployPlan: function () {
        this.deployplanId = this.selected;

      },

      handleDeploy: function (index, row) {
        //debugger;
        let username = this.getCookie('username');
        let password = this.getCookie('password');

        if(this.deployplanId.length != 0){
          let msg = "您确定部署吗？";
          if (confirm(msg) == true) {
            //layer.load();

            let qs = require('qs');

            this.$axios.put(this.getIP() +"deploymentdesigns/" + this.deployplanId + "/devices/" + row.id + '/deploy',
              qs.stringify({

              }),{

                //设置头
                headers: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                auth: {
                  username: username,
                  password: password
                }
            }).then(res => {
              /*this.$notify({
                title: '部署成功',
                message: '部署成功',
                type: 'success'
              });*/
             // layer.closeAll('loading');
            })
            .catch(err => {
              console.log("提示---------");
              console.log(err.response.data.data);
              if(err.response.data.data.length != 0){
                /*if(err.response.data.data == "com.rengu.operationsoanagementsuite.Exception.CustomizeException: 目标磁盘不存在"){
                  layer.msg("目标磁盘不存在");
                }*/
                layer.msg(err.response.data.data);
              }

              /*let mess = err.data;
              let index = mess.indexOf(":");
              let mess2 = mess.splice(index+1,mess.length);
              console.log(mess2);
              layer.msg(mess2);*/
            })
          }else {
            return false;
          }

        }else{
          alert("请先选择部署设计！");
        }

      },

      filterTag(value, row) {
        return row.online === value;
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      }
    }
  }
</script>
<style>
  .tabletable{
    height: 400px;
    overflow-y: auto;
    margin-top: -35px;
  }
</style>
