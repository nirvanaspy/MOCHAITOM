<template>
  <!-- main container -->
  <div>
    <div class="container-fluid">
      <div id="pad-wrapper" class="users-list">
        <div class="row-fluid header">
          <a class="header-wrapper">
            <span class="text">软件包</span>
            <i class="icon icon-briefcase"></i>
          </a>
          <div class="span10 pull-right">
            <input class="search" type="text" placeholder="搜索软件包.." v-model="searchQuery"/>

            <router-link to="/addSoftpackage" class="btn-flat success pull-right">
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
              <th class="span4 sortable">
                名称
              </th>
              <th class="span3 sortable">
                <span class="line"></span>版本
              </th>

              <th class="span3">
                <span class="line"></span>组件
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
            <tr class="first" v-for="baseline in baselinesA" :id="baseline.id">
              <td style="display:none">{{baseline.id}}</td>
              <td>{{baseline.name}}</td>
              <td>{{baseline.version}}</td>
              <td>

                    <!--<input type="button" class="btn-flat gray" value="组件详情" @mouseenter="enter($event)"/>-->
                    <popper trigger="click" :options="{placement: 'top'}">
                      <div class="popper">
                        <!--Popper Content-->
                        <div id="todo-list-example" class="addli" style="height: 200px;width: 200px;">
                          <ul class="addul">
                            <li v-for="(comp, index) in comps" :key="index">
                              {{comp.name}}
                            </li>
                          </ul>
                        </div>

                      </div>

                      <input type="button" class="btn-flat gray" value="组件详情" slot="reference" @click="enter($event)"/>

                    </popper>

              </td>

              <td class="description">
                {{baseline.description}}
              </td>
              <td>
                <ul class="ulactions">
                  <li>
                    <router-link :to='{name:"modifySoftpackage",params:{id:baseline.id}}'>
                      <input type="button" class="btn-flat success" value="修改"/>
                    </router-link>
                  </li>

                  <li class="last">
                    <input type="button" class="btn-flat danger" value="删除" @click="deleteBaseline($event)"/>
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
      {{baselines}}
    </div>-->

  </div>
</template>

<script>
  /* eslint-disable */
  import Popper from 'vue-popperjs';
  export default {
    components: {
      'popper': Popper
    },
    data() {
      return {
        baselines: [],
        searchQuery: '',
        devname: '',
        devip: '',
        comps: ''   //此基线下所包含的组件
      }
    }, created() {
      let projectId = this.getCookie('projectId');
      let username = this.getCookie('username');
      let password = this.getCookie('password');
      this.$axios.get(this.getIP() + 'componentpackages', {
        //设置头
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        auth: {
          username: username,
          password: password
        }
      }).then(res => {
        this.baselines = res.data.data
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
            //alert("C");
            let rowIndex = target.parentNode.parentNode.parentNode.parentNode.rowIndex;
            //alert(rowIndex);
            let id = document.getElementById("table_value").rows[rowIndex].cells[0].innerHTML;
            //alert(id);
            let qs = require('qs');
            this.$axios.delete(this.getIP() + 'componentpackages/' + id, {

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
              this.$axios.get(this.getIP() + 'componentpackages', {
                //设置头
                headers: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                auth: {
                  username: username,
                  password: password
                }
              }).then(res => {
                this.baselines = res.data.data
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

      enter: function (event) {
        let e = event || window.event;

        let target = e.target || e.srcElement;

        let compsInfo = target.parentNode.parentNode.parentNode;

        let id = compsInfo.id;
        console.log(compsInfo);
        console.log(id);

        let projectId = this.getCookie('projectId');
        let username = this.getCookie('username');
        let password = this.getCookie('password');

        let qs = require('qs');
        this.$axios.get(this.getIP() + 'componentpackages/' + id,{

            //设置头
            headers: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            auth: {
              username: username,
              password: password
            }
          }).then(res => {
              this.comps = res.data.data.componentEntities

          })
          .catch(err => {

            layer.msg("无信息！");
          })
      },

      formReset: function () {
        $("#input-path").val('');
        $("#modal-path").modal('hide');
      }


    },
    computed: {
      baselinesA: function () {
        let self = this;
        return self.baselines.filter(function (item) {
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

  .addli {
    height: 100px;
    width: 200px;
    max-height: 100px;
    overflow: auto;
  }

  .addul {
    text-align: left;
    list-style:decimal;
  }
</style>
