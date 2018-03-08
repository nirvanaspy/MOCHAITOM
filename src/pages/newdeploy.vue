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
          <table class="table table-hover" id="table_value">
            <thead>
            <tr>
              <th class="span4 sortable">
                设备名
              </th>
              <th class="span3 sortable">
                <span class="line"></span>IP
              </th>
              <th class="span3 sortable">
                <span class="line"></span>路径
              </th>
              <th class="span2">
                <span class="line"></span>状态
              </th>
              <th class="span3">
                <span class="line"></span>发送进度
              </th>

              <th class="span4">
                <span class="line"></span>操作
              </th>
            </tr>
            </thead>
            <tbody>
            <!-- row -->
            <tr class="first" v-for="device in devicesA" :id="device.id">
              <td style="display:none">{{device.id}}</td>
              <td>{{device.name}}</td>
              <td>{{device.ip}}</td>
              <td>
                {{device.deployPath}}
              </td>
              <td>
                <span class="label label-primary" v-if="!device.online">离线</span>
                <span class="label label-success" v-else>在线</span>
              </td>
              <td>
                <el-progress :text-inside="true" :stroke-width="18"
                             :percentage="device.progress"></el-progress>
              </td>
              <td v-if="!device.virtual">
                <ul class="ulactions">
                  <li class="last">
                    <input type="button" class="btn-flat primary" value="部署" :id="device.online"
                           @click="deployDevice($event)"/>
                  </li>
                </ul>
              </td>

            </tr>

            <!-- row -->

            </tbody>
          </table>
          <!--<hr/>
          {{devices}}-->
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
        devices: [],
        searchQuery: '',
        devname: '',
        devip: '',

        selected: "",
        deployplanId: '',    //所选择的部署设计的id
        deployplanInfos: []
      }
    }, created() {
      var projectId = this.getCookie('projectId');
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
      //下拉框选择部署设计
      changeDeployPlan: function () {
        this.deployplanId = this.selected;

      },

      deployDevice: function (event) {
        //alert("A");
        let e = event || window.event;
        //alert("B");
        let target = e.target || e.srcElement;

        let username = this.getCookie('username');
        let password = this.getCookie('password');


        if (target.parentNode.parentNode.parentNode.tagName.toLowerCase() == "td") {
          //alert("C");
          var rowIndex = target.parentNode.parentNode.parentNode.parentNode.rowIndex;
          //alert(rowIndex);
          var id = document.getElementById("table_value").rows[rowIndex].cells[0].innerHTML;
          //alert(id);
          var qs = require('qs');

          let online = false;

          for(let i=0;i<this.devices.length;i++){
            if(this.devices[i].id == id){
              online = this.devices[i].online;
              break;

            }
          }

          if (online) {
            if (this.deployplanId.length != 0) {
              let msg = "您确定部署吗？";
              if (confirm(msg) == true) {

                this.$axios.put(this.getIP() + 'deploymentdesigns/' + this.deployplanId + '/devices/' + id + '/deploy',
                  qs.stringify({}), {

                    //设置头
                    headers: {
                      'content-type': 'application/x-www-form-urlencoded'
                    },
                    auth: {
                      username: username,
                      password: password
                    }
                  }).then(res => {
                  /*layer.msg("部署成功");*/

                }).catch(err => {
                  layer.msg("部署失败！");
                })

              } else {
                return false;
              }
            } else {
              alert("请先选择部署设计！");
            }
          } else {
            layer.msg("设备离线！");
          }
        }


      }


    },
    computed: {
      devicesA: function () {
        var self = this;
        return self.devices.filter(function (item) {
          return item.name.toLowerCase().indexOf(self.searchQuery.toLowerCase()) !== -1;
        })

      }
    }
  }
</script>
<style>
  .tabletable {
    height: 400px;
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
