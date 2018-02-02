<template>
  <!-- main container -->
  <div>
    <div class="container-fluid">
      <div id="pad-wrapper" class="users-list">
        <div class="row-fluid header">
          <h3>部署</h3>
          <div class="span10 pull-right">
            <input class="search" type="text" placeholder="搜索部署信息.." v-model="searchQuery"/>
            <div class="ui-dropdown">
              <div class="head" data-toggle="tooltip" title="Click me!">
                Filter devices
                <i class="arrow-down"></i>
              </div>
              <div class="dialog">
                <div class="pointer">
                  <div class="arrow"></div>
                  <div class="arrow_border"></div>
                </div>
                <div class="body">
                  <p class="title">
                    Show users where:
                  </p>
                  <div class="form">
                    <select>
                      <option/>
                      Name
                      <option/>
                      Email
                      <option/>
                      Number of orders
                      <option/>
                      Signed up
                      <option/>
                      Last seen
                    </select>
                    <select>
                      <option/>
                      is equal to
                      <option/>
                      is not equal to
                      <option/>
                      is greater than
                      <option/>
                      starts with
                      <option/>
                      contains
                    </select>
                    <input type="text"/>
                    <a class="btn-flat small">Add filter</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Users table -->
        <div class="row-fluid table tabletable">
          <el-table
            :data="deploylogs"
            style="width: 100%">
            <el-table-column
              type="selection">
            </el-table-column>
            <el-table-column
              prop="deviceEntity.name"
              label="设备名称">
            </el-table-column>
            <el-table-column
              prop="deviceEntity.ip"
              label="设备地址">
            </el-table-column>
            <el-table-column
              prop="size"
              label="大小">
            </el-table-column>
            <el-table-column
              label="发送进度" >
              <template slot-scope="scope">
                <el-progress :text-inside="true" :stroke-width="18"
                             :percentage="(scope.row.finishedNums/scope.row.fileNums )*100"/>
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
        deploylogs: []
      }
    },
    created() {
      this.$axios.get(this.getIP() +'project/' + this.getCookie('projectId') + '/deploylog', {
        //设置头
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        auth: {
          username: this.getCookie('username'),
          password: this.getCookie('password')
        }
      }).then(res => {
        this.deploylogs = res.data.data;
        console.log(this.deployplans);
      })
        .catch(err => {
          console.log(err);
        })
    },
    methods: {
      handleDeploy: function (index, row) {
        this.$axios.get(this.getIP() +"deployplan/deploy/" + row.deployPlanEntity.id + "/devices/" + row.deviceEntity.id, {
          //设置头
          headers: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          auth: {
            username: this.getCookie('username'),
            password: this.getCookie('password')
          }
        }).then(res => {
          this.$notify({
            title: '部署成功',
            message: '这是一条成功的提示消息',
            type: 'success'
          });
        })
          .catch(err => {
            this.$notify.error({
              title: '部署错误',
              message: '这是一条错误的提示消息'
            });
          })
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
