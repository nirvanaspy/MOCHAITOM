<template>
  <!-- main container -->
  <div>
    <div class="container-fluid">
      <div id="pad-wrapper" class="users-list">
        <div class="row-fluid header">
          <a class="header-wrapper">
            <span class="text">设备</span>
            <i class="icon icon-laptop"></i>
          </a>
          <div class="span10 pull-right">
            <input class="search" type="text" placeholder="设备名称.." v-model="searchQuery"/>


            <router-link to="/addDevice" class="btn-flat success pull-right">
              <span>&#43;</span>
              新增
            </router-link>

          </div>
        </div>

        <!-- Users table -->
        <div class="row-fluid table tabletable">
          <table class="table table-hover" id="table_value">
            <thead>
            <tr>
              <th class="span3 sortable">
                设备名
              </th>
              <th class="span2 sortable">
                <span class="line"></span>IP
              </th>
              <th class="span3 sortable">
                <span class="line"></span>路径
              </th>
              <!--<th class="span2 sortable">
                <span class="line"></span>CPU
              </th>
              <th class="span2 sortable">
                <span class="line"></span>内存总大小
              </th>-->
              <th class="span2">
                <span class="line"></span>状态
              </th>
              <!--<th class="span3">
                <span class="line"></span>设备详情
              </th>-->
              <!--<th class="span3">
                <span class="line"></span>查看
              </th>-->

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
              <!--<td>
                &#45;&#45;
              </td>
              <td>
                &#45;&#45;
              </td>-->
              <td>
                <span class="label label-primary" v-if="!device.online">离线</span>
                <span class="label label-success" v-else>在线</span>
              </td>
              <!--<td class="description">
                {{device.description}}
              </td>-->

              <!--<td>
                <ul class="ulactions" v-if="!device.online">
                  <li>
                    <input type="button" class="btn-flat primary" value="进程" data-toggle="modal"
                           disabled="disabled"/>
                  </li>
                  <li class="last">
                    <input type="button" class="btn-flat primary" value="磁盘" data-toggle="modal"
                           disabled="disabled"/>
                  </li>
                </ul>
                <ul class="ulactions" v-else>
                  <li>
                    <input type="button" class="btn-flat primary" value="进程" data-toggle="modal"
                           @click="processDetails($event)"/>
                  </li>
                  <li class="last">
                    <input type="button" class="btn-flat primary" value="磁盘" data-toggle="modal"
                           @click="diskDetails($event)"/>
                  </li>
                </ul>
              </td>-->

              <td v-if="!device.virtual">
                <ul class="ulactions">
                  <li>
                    <router-link :to='{name:"modifyDevice",params:{id:device.id}}'>
                      <input type="button" class="btn-flat success" value="修改"/>
                    </router-link>
                  </li>
                  <li>
                    <!-- <router-link to="/devices" @click="deleteDevice">删除</router-link>  -->
                    <input type="button" class="btn-flat danger" value="删除" @click="deleteDevice($event)"/>
                  </li>
                  <li class="last">
                    <!-- <router-link to="/devices" @click="deleteDevice">删除</router-link>  -->
                    <input type="button" class="btn-flat gray" value="复制" @click="copyDevice($event)"/>
                  </li>
                </ul>
              </td>
              <td v-else>
                <ul class="ulactions">
                  <li class="last">
                    <input type="button" class="btn-flat danger" data-toggle="modal" @click="report($event)"
                           value="上报"/>
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

    <div class="modal fade" id="modal-select">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="formReset">
              <span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">请填写绝对路径：</h4>
          </div>
          <div class="modal-body">
            <!-- form start -->
            <form class="form-horizontal"/>
            <div style="margin-top: 23px;">
              <span>绝对路径:</span>
              <input type="text" id="input-path" name="input-path" style="height:20px">(例如:D:/test/)
            </div>

            <br/>
            <div class="pull-right">
              <button type="submit" class="btn-flat primary" @click="report2($event)">确认</button>
              <button type="submit" class="btn-flat danger" @click="formReset">取消</button>
            </div>

          </div>
        </div>
      </div>
    </div>


    <div class="modal fade" id="modal-process">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="formReset2">
              <span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">查看进程：</h4>
          </div>
          <div class="modal-body">

            <table class="table table-hover">
              <thead>
              <tr>
                <th class="span3 sortable">
                  Pid
                </th>
                <th class="span3 sortable">
                  <span class="line"></span>进程名
                </th>

              </tr>
              </thead>
              <tbody>
              <!-- row -->
              <tr class="first" v-for="process in taskprocess" :id="process.pid">
                <td style="display:none">{{process.pid}}</td>
                <td>{{process.pid}}</td>
                <td>{{process.name}}</td>

              </tr>

              <!-- row -->
              </tbody>
            </table>

          </div>
        </div>
      </div>
    </div>


    <div class="modal fade" id="modal-disk">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="formReset3">
              <span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">查看磁盘信息：</h4>
          </div>
          <div class="modal-body">
            <table class="table table-hover">
              <thead>
              <tr>
                <th class="span3 sortable">
                  磁盘
                </th>
                <th class="span3 sortable">
                  <span class="line"></span>大小（G）
                </th>
                <th class="span3 sortable">
                  <span class="line"></span>已用大小（G）
                </th>

              </tr>
              </thead>
              <tbody>
              <!-- row -->
              <tr class="first" v-for="disk in disks" :id="disk.id">
                <td style="display:none">{{disk.id}}</td>
                <td>{{disk.name}}</td>
                <td>{{disk.size}}</td>
                <td>{{disk.usedSize}}</td>

              </tr>

              <!-- row -->
              </tbody>
            </table>
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
        devices: [],
        searchQuery: '',
        devname: '',
        devip: '',
        taskprocess: [],
        disks: []
      }
    }, created() {
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
      })
        .catch(err => {
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

    },
    methods: {

      deleteDevice: function (event) {
        let username = this.getCookie('username');
        let password = this.getCookie('password');

        //alert("A");
        var e = event || window.event;
        //alert("B");
        var target = e.target || e.srcElement;

        var msg = "您确定删除吗？";
        if (confirm(msg) == true) {

          if (target.parentNode.parentNode.parentNode.tagName.toLowerCase() == "td") {
            //alert("C");
            var rowIndex = target.parentNode.parentNode.parentNode.parentNode.rowIndex;
            //alert(rowIndex);
            var id = document.getElementById("table_value").rows[rowIndex].cells[0].innerHTML;
            //alert(id);
            var qs = require('qs');
            this.$axios.delete(this.getIP() + 'devices/' + id, {

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

              //删除完再次查询
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

      copyDevice: function (event) {
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
        this.$axios.post(this.getIP() + 'devices/' + id + '/copy',
          qs.stringify({
            "name": $("input[name='add-name']").val(),

          }), {

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
          })
            .catch(err => {
              console.log(err);
            })
        })
          .catch(err => {

            layer.msg("复制失败！");
          })
      },

      processDetails: function (event) {
        //查看进程
        var username = this.getCookie('username');
        var password = this.getCookie('password');

        let e = event || window.event;

        let target = e.target || e.srcElement;

        if (target.parentNode.parentNode.parentNode.tagName.toLowerCase() == "td") {
          //alert("C");
          var rowIndex = target.parentNode.parentNode.parentNode.parentNode.rowIndex;
          //alert(rowIndex);
          var id = document.getElementById("table_value").rows[rowIndex].cells[0].innerHTML;
          //alert(id);

          $("#modal-process").modal('show');
          layer.load();
          this.$axios.get(this.getIP() + '/devices/' + id + '/tasks', {
            //设置头
            headers: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            auth: {
              username: username,
              password: password
            }
          }).then(res => {
            layer.closeAll('loading');
            this.taskprocess = res.data.data.taskInfoEntities
          })
            .catch(err => {
              layer.closeAll('loading');
              console.log(err);
              layer.msg("获取进程信息失败!")
            })
        }
      },

      diskDetails: function (event) {
        //查看磁盘
        var username = this.getCookie('username');
        var password = this.getCookie('password');

        let e = event || window.event;

        let target = e.target || e.srcElement;

        $("#modal-disk").modal('show');
        layer.load();
        if (target.parentNode.parentNode.parentNode.tagName.toLowerCase() == "td") {
          //alert("C");
          var rowIndex = target.parentNode.parentNode.parentNode.parentNode.rowIndex;
          //alert(rowIndex);
          var id = document.getElementById("table_value").rows[rowIndex].cells[0].innerHTML;
          //alert(id);
          this.$axios.get(this.getIP() + '/devices/' + id + '/disks', {
            //设置头
            headers: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            auth: {
              username: username,
              password: password
            }
          }).then(res => {
            layer.closeAll('loading');
            this.disks = res.data.data.diskInfoEntities
          })
            .catch(err => {
              layer.closeAll('loading');
              console.log(err);
              layer.msg("获取磁盘信息失败!")
            })
        }
      },

      formReset: function () {
        $("#input-path").val('');
        $("#modal-select").modal('hide');

      },

      formReset2: function () {
        $("#modal-process").modal('hide');
      },

      formReset3: function () {

        $("#modal-disk").modal('hide');
      },

      report: function (event) {

        let e = event || window.event;

        let target = e.target || e.srcElement;

        if (target.parentNode.parentNode.parentNode.tagName.toLowerCase() == "td") {
          let rowIndex = target.parentNode.parentNode.parentNode.parentNode.rowIndex;

          this.devname = document.getElementById("table_value").rows[rowIndex].cells[1].innerHTML;
          this.devip = document.getElementById("table_value").rows[rowIndex].cells[2].innerHTML;
          //alert(name);
          //alert(ip);
        }

        $("#modal-select").modal('show');


      },
      report2: function () {
        let pattern = /^([a-zA-Z]:(\\))([a-zA-Z]*)|(\/([a-zA-Z]+))*\/$/;

        let repPath = $("input[name='input-path']").val();

        if (repPath == null) {
          layer.msg("请输入路径！");

        } else if (!((repPath).match(pattern))) {
          layer.msg("路径格式不正确!");
        } else {

          let qs = require('qs');
          let projectId = this.getCookie('projectId');
          let username = this.getCookie('username');
          let password = this.getCookie('password');


          this.$axios.post(this.getIP() + 'projects/' + projectId + '/devices', qs.stringify({
            "name": this.devname,
            "ip": this.devip,
            "deployPath": $("input[id='input-path']").val()
          }), {

            //设置头
            headers: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            auth: {
              username: username,
              password: password
            }
          }).then(res => {
            //this.users = res.data.data
            //console.log(res);
            layer.msg('上报成功！');

            $("#modal-select").modal('hide');

            //成功后重新查询
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
            })
              .catch(err => {
                console.log(err);
              })
          })
            .catch(err => {
              layer.msg('上报失败！');
            })
        }
      }


    },
    computed: {
      devicesA: function () {
        let self = this;
        return self.devices.filter(function (item) {
          return item.name.toLowerCase().indexOf(self.searchQuery.toLowerCase()) !== -1;
        })

      }
    }
  }
</script>
<style scoped>
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

  #modal-disk h4 {
    height: 30px;
    line-height: 30px;
    padding:2px 0 2px 4px;
    display:inline-block;
    background-color: rgb(245, 105, 84);
    border-radius:4px;
    color:#fff;
  }

  #modal-disk .modal-body {
    padding-top: 0;
  }

  #modal-disk table thead {
    height: 30px;
    line-height: 30px;
    background-color: rgb(117, 185, 230);
  }

  #modal-disk table thead th {
    padding-bottom: 0;
    color:#fff;
    font-size: 14px;
  }
  #modal-disk table tr:nth-child(even){
    background: #f5fafc;
  }
  #modal-process h4{
    height: 30px;
    line-height: 30px;
    padding:2px 0 2px 4px;
    display:inline-block;
    background-color: rgb(245, 105, 84);
    border-radius:4px;
    color:#fff;
    /*background-color: #1c94c4;*/
  }
  #modal-process .modal-body {
    padding-top: 0;
  }

  #modal-process table thead {
    height: 30px;
    line-height: 30px;
    background-color: rgb(117, 185, 230);
  }

  #modal-process table thead th {
    padding-bottom: 0;
    color:#fff;
  }
  #modal-process table tr:nth-child(even){
    background: #f5fafc;
  }
</style>
