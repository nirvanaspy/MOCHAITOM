<template>
  <!-- main container -->
  <div>
    <div class="container-fluid">
      <div id="pad-wrapper" class="users-list">
        <div class="row-fluid header">
          <a class="header-wrapper">
            <span class="text">基线</span>
            <i class="icon icon-tasks"></i>
          </a>
          <div class="span10 pull-right baseline-input">
            <input class="search" type="text" placeholder="搜索基线.." v-model="searchQuery"/>
          </div>
        </div>

        <!-- Users table -->
        <div class="row-fluid table tabletable">
          <table class="table table-hover" id="table_value">
            <thead>
            <tr>
              <th class="span4 sortable">
                名称
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
            <tr class="first" v-for="snapshot in snapshotsA" :id="snapshot.id">
              <td style="display:none">{{snapshot.id}}</td>
              <td>{{snapshot.name}}</td>
              <td class="description">
                {{snapshot.description}}
              </td>
              <td>
                <ul class="ulactions">
                  <li style="margin-right: 50px">
                    <input type="button" class="btn-flat danger" value="删除" @click="deleteBaseline($event)"/>
                  </li>

                  <li class="last">
                    <input type="button" class="btn-flat primary" value="部署" @click="deployBaseline($event)"/>
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


    <!--<hr/>
    <div>
      {{snapshots}}
    </div>-->

  </div>
</template>

<script>
  /* eslint-disable */

  export default {
    data() {
      return {
        snapshots: [],
        searchQuery: ''
      }
    }, created() {
      let projectId = this.getCookie('projectId');
      let username = this.getCookie('username');
      let password = this.getCookie('password');
      this.$axios.get(this.getIP() + '/deploymentdesignsnapshots', {
        //设置头
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        auth: {
          username: username,
          password: password
        }
      }).then(res => {
        this.snapshots = res.data.data
      })
        .catch(err => {
          console.log(err);
        })

    },
    methods: {
      deleteBaseline: function (event) {
        //alert("A");
        let e = event || window.event;
        //alert("B");
        let target = e.target || e.srcElement;

        let username = this.getCookie('username');
        let password = this.getCookie('password');

        let msg = "您确定删除吗？";
        if (confirm(msg) == true) {

          if (target.parentNode.parentNode.parentNode.tagName.toLowerCase() == "td") {
            let rowIndex = target.parentNode.parentNode.parentNode.parentNode.rowIndex;
            let id = document.getElementById("table_value").rows[rowIndex].cells[0].innerHTML;

            this.$axios.delete(this.getIP() + 'deploymentdesignsnapshots/' + id, {

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
              let username = this.getCookie('username');
              let password = this.getCookie('password');
              this.$axios.get(this.getIP() + '/deploymentdesignsnapshots', {
                //设置头
                headers: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                auth: {
                  username: username,
                  password: password
                }
              }).then(res => {
                this.snapshots = res.data.data
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

      deployBaseline: function (event) {
        //alert("A");
        let e = event || window.event;
        //alert("B");
        let target = e.target || e.srcElement;

        let username = this.getCookie('username');
        let password = this.getCookie('password');

        let msg = "您确定部署吗？";
        if (confirm(msg) == true) {

          if (target.parentNode.parentNode.parentNode.tagName.toLowerCase() == "td") {
            //alert("C");
            let rowIndex = target.parentNode.parentNode.parentNode.parentNode.rowIndex;
            //alert(rowIndex);
            let id = document.getElementById("table_value").rows[rowIndex].cells[0].innerHTML;
            //alert(id);
            let qs = require('qs');

            this.$axios.put(this.getIP() + 'deploymentdesignsnapshots/' + id + '/deploy',
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
              layer.msg("部署成功");

            }).catch(err => {
              layer.msg("部署失败！");
            })
          }

        } else {
          return false;
        }


      }

    },
    computed: {
      snapshotsA: function () {
        let self = this;
        return self.snapshots.filter(function (item) {
          return item.name.toLowerCase().indexOf(self.searchQuery.toLowerCase()) !== -1;
        })

      }
    }
  }
</script>
<style>
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
