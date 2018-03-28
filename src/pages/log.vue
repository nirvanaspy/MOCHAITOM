<template>
  <!-- main container -->
  <div>
    <div class="container-fluid">
      <div id="pad-wrapper" class="users-list">
        <div class="row-fluid header">
          <a class="header-wrapper">
            <span class="text">日志</span>
            <i class="icon icon-edit"></i>
          </a>
          <!--<div class="span10 pull-right">
            <input class="search" type="text" placeholder="日志.." v-model="searchQuery"/>

          </div>-->

          <br/>
          <!--  搜索  -->
          <div class="span12 seaDiv" style="margin-left: 0;">
            <div style="max-height: 360px;overflow: auto;margin: 5px 0;">
              <div style="min-height: 40px;">
                <div class="span4 field-box">
                  <label style="float: left;padding: 5px;width: 70px;">设备IP:</label>
                  <input class="span8" type="text" id="search-deviceIP"/>
                </div>

                <div class="span4 field-box">
                  <label style="float: left;padding: 5px;">组件名:</label>
                  <input class="span8" type="text" id="search-compName"/>
                </div>

                <div class="span4 field-box">
                  <label style="float: left;padding: 5px;">文件大小:</label>
                  <input class="span8" type="text" id="search-compSize" disabled="disabled"/>
                </div>
              </div>

              <div style="margin-top: 5px;min-height: 40px;">
                <div class="span4 field-box">
                  <label style="float: left;padding: 5px;width: 70px;">部署状态:</label>
                  <!--<input class="span8" type="text" id="search-compState"/>-->
                  <!--<select v-model="selected" style="height: 26px;width: 233px; margin-top: 5px; margin-left: 7px;"
                          @change="changeDeployPlan">
                    &lt;!&ndash; v-model="selected" &ndash;&gt;
                    <option>
                    </option>
                  </select>-->

                  <select v-model="selected" class="span8" style="height: 30px;" id="select">
                    <option selected="selected"></option>
                    <option>部署成功</option>
                    <option>进行中</option>
                    <option>部署异常</option>

                  </select>
                </div>

                <div class="span5 field-box">
                  <el-date-picker style="width: 100%;"
                                  size="small"

                                  v-model="value4"
                                  type="datetimerange"
                                  :picker-options="pickerOptions2"
                                  range-separator="至"
                                  start-placeholder="开始日期"
                                  end-placeholder="结束日期"
                                  align="right"

                  >
                  </el-date-picker>
                </div>

                <div class="span3 pull-right">
                  <input type="button" class="span10 btn-flat primary" value="搜索" style="margin-left: 0;margin-top:0;"
                         @click="searchAll"/>
                </div>

              </div>
            </div>

          </div>
        </div>


        <!-- Users table -->
        <div class="row-fluid table tabletable" style="margin-top: -20px;">
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
      {{value4}}
    </div>
    <hr/>
    <div>
      {{startTimeTemp}}
    </div>-->
  </div>
</template>

<script>
  export default {
    /* eslint-disable */
    data() {
      return {
        logs: [],
        searchQuery: '',
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value4: '',
        startTime: '',         //日期开始时间
        startTimeTemp: '',     //查询时 日期开始时间戳
        endTime: '',           //日期结束时间
        endTimeTemp: '',       //查询时 日期结束时间戳
        compName: '',         //查询时组件名
        deviceIP: '',          //查询时设备IP
        compSize: '',          //查询时大小
        compState: '',         //查询时状态
        selected: ""

      }
    },
    created() {
      let username = this.getCookie('username');
      let password = this.getCookie('password');

      this.$axios.get(this.getIP() + 'deploylogs', {

        //设置头
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        auth: {
          username: username,
          password: password
        }
      }).then(res => {
        this.logs = res.data.data
      })
        .catch(err => {
          console.log(err);
        })

    },
    methods: {
      searchAll: function () {
        this.startTime = this.value4[0];
        this.endTime = this.value4[1];

        this.startTimeTemp = Math.floor(new Date(this.startTime).getTime() / 1000);
        this.endTimeTemp = Math.floor(new Date(this.endTime).getTime() / 1000);

        let start = parseInt(this.startTimeTemp);
        let end = parseInt(this.endTimeTemp);

        console.log(typeof(this.startTimeTemp));
        console.log(this.startTimeTemp);

        //  /deploylogs

        let username = this.getCookie('username');
        let password = this.getCookie('password');

        this.deviceIP = $("input[id='search-deviceIP']").val();
        this.compName = $("input[id='search-compName']").val();
        this.compSize = $("input[id='search-compSize']").val();
        //this.compState = $("input[id='search-compState']").val();
        let state = this.selected;

        if (state.length > 0) {
          if (state == "部署异常") {
            this.compState = 0;
          } else if (state == "进行中") {
            this.compState = 1;
          } else if (state == "部署成功") {
            this.compState = 2;
          }
        }

        let formData = new FormData();

        let searchObj = {};


        if (this.deviceIP.length != 0) {
          formData.append('ip', this.deviceIP);
          searchObj.ip = this.deviceIP;
        }

        if (this.compName.length != 0 || this.compSize.length != 0) {
          //searchObj.componentEntity = {};
          if (this.compName.length != 0) {
            formData.append('componentEntity.name', this.compName);
            searchObj.componentName = this.compName;
          }
          if (this.compSize.length != 0) {
            formData.append('componentEntity.size', this.compSize);
            searchObj.componentEntity.size = this.compSize;
          }
        }

        if (this.compState.length != 0) {
          formData.append('state', this.compState);
          searchObj.state = this.compState;
        }
        console.log(this.value4.length);
        if (this.value4.length != 0) {
          formData.append('createTime', this.startTimeTemp);
          formData.append('finishTime', this.endTimeTemp);

          //searchObj.createTime = this.startTimeTemp;
          searchObj.startTime = new Date(this.startTime).getTime();
          searchObj.endTime = new Date(this.endTime).getTime();
        }

        console.log(searchObj);
        this.$axios.get(this.getIP() + 'deploylogs', {

          params: searchObj,
          //设置头
          headers: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          auth: {
            username: username,
            password: password
          }
        }).then(res => {
          this.logs = res.data.data;

        })
        .catch(err => {

        })

      }

    }

  }
</script>
<style>
  .tabletable {
    height: 500px;
    overflow-y: auto;
    margin-top: -35px;
  }

  .label-danger, .badge-info {
    background-color: #b94a48;
  }

  .seaDiv {
    border: 1px solid lightgrey;
    min-height: 100px;

    border-radius: 3px;
    margin-top: 25px;
    margin-left: 0;
    padding: 10px;
  }
</style>
