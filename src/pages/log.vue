<template>
  <!-- main container -->
  <div>
    <div class="container-fluid">
      <div id="pad-wrapper" class="users-list">
        <div class="row-fluid header">
          <h3>日志</h3>
          <div class="span10 pull-right">
            <input class="search" type="text" placeholder="日志.." v-model="searchQuery"/>

            <!--<router-link to="/addUser" class="btn-flat success pull-right">
              <span>&#43;</span>
              新增
            </router-link>-->

          </div>
        </div>

        <!-- Users table -->
        <div class="row-fluid table">
          <table class="table table-hover" id="table_value">
            <thead>
            <tr>
              <th class="span4 sortable">
                设备IP
              </th>
              <th class="span3 sortable">
                <span class="line"></span>组件名称
              </th>
              <th class="span3 sortable">
                <span class="line"></span>开始时间
              </th>
              <th class="span3 sortable">
                <span class="line"></span>结束时间
              </th>
              <th class="span3 sortable">
                <span class="line"></span>文件大小
              </th>
              <th class="span3 sortable">
                <span class="line"></span>部署状态
              </th>

            </tr>
            </thead>
            <tbody>

            <tr class="first" v-for="(log,index) in logs" :id="log.id">
              <td style="display:none">{{log.id}}</td>
              <td>
                {{log.ip}}
              </td>
              <td>
                {{log.componentEntity.name}}
              </td>

              <td>
                {{log.createTime}}
              </td>
              <td>
                {{log.finishTime}}
              </td>
              <td>
                {{log.componentEntity.displaySize}}
              </td>
              <!--<td>
                {{log.state}}
              </td>-->

              <td>
                <span class="label label-danger" v-if="log.state == 0">部署异常</span>
                <span class="label label-info" v-else-if="log.state == 1">部署进行中</span>
                <span class="label label-success" v-else-if="log.state == 2">部署完成</span>
              </td>

            </tr>

            </tbody>
          </table>
        </div>
      </div>

    </div>
    <!--<hr/>
    <div>
        {{logs}}
    </div>-->
  </div>
</template>

<script>
  export default{
    /* eslint-disable */
    data(){
      return{
        logs:[],
        searchQuery: ''
      }
    },created(){
      let username = this.getCookie('username');
      let password = this.getCookie('password');

      this.$axios.get(this.getIP() + 'deploylogs',{

        //设置头
        headers:{
          'content-type':'application/x-www-form-urlencoded'
        },
        auth: {
          username: username,
          password: password
        }
      }).then(res=>{
        this.logs = res.data.data
      })
        .catch(err=>{
          console.log(err);
        })

    },

    computed: {
      /*logsA: function () {
        let self = this;
        return self.logs.filter(function (item) {
          return item.username.toLowerCase().indexOf(self.searchQuery.toLowerCase()) !== -1;
        })

      }*/
    }
  }
</script>
<style>
  .label-danger, .badge-info {
    background-color: #b94a48;
  }
</style>
