<template>
  <!-- main container -->
  <div>
    <div class="container-fluid">
      <div id="pad-wrapper" class="users-list">
        <div class="row-fluid header">
          <h3>基线</h3>
          <div class="span10 pull-right">
            <input class="search" type="text" placeholder="搜索基线.." v-model="searchQuery"/>

            <router-link to="/addBaseline" class="btn-flat success pull-right">
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
                  <li class="last">
                    <input type="button" class="btn-flat primary" value="删除"/>
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
        <div class="pagination pull-right">
          <ul>
            <li><a href="#">&#8249;</a></li>
            <li><a class="active" href="#">1</a></li>
            <li><a href="#">2</a></li>
            <li><a href="#">3</a></li>
            <li><a href="#">4</a></li>
            <li><a href="#">5</a></li>
            <li><a href="#">&#8250;</a></li>
          </ul>
        </div>
        <!-- end users table -->
      </div>
    </div>


    <hr/>
    <div>
      {{snapshots}}
    </div>

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
  .ulactions {
    margin: 5px 0 0 0;
  }

  .ulactions li {
    display: inline;
  }

</style>
