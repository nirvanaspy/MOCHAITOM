<template>
    <!-- main container -->
    <div>
        <div class="container-fluid">
            <div id="pad-wrapper" class="users-list">
                <div class="row-fluid header">
                    <h3>部署</h3>
                    <div class="span10 pull-right">
                        <input class="search" type="text" placeholder="搜索设备.." v-model="searchQuery"/>


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
                                            <option />Name
                                            <option />Email
                                            <option />Number of orders
                                            <option />Signed up
                                            <option />Last seen
                                        </select>
                                        <select>
                                            <option />is equal to
                                            <option />is not equal to
                                            <option />is greater than
                                            <option />starts with
                                            <option />contains
                                        </select>
                                        <input type="text" />
                                        <a class="btn-flat small">Add filter</a>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>

                <!-- Users table -->
                <div class="row-fluid table">
                    <table class="table table-hover" type="expand">
                          <thead>
                              <tr>
                                  <th class="span3">
                                      <input type="checkbox"/>
                                      全选
                                  </th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr class="first">
                                  <td class="span3">
                                      <input type="checkbox" />
                                      指挥显控台
                                  </td>
                                  <td class="span3">
                                      <el-progress :text-inside="true" :stroke-width="18" :percentage="70"></el-progress> 
                                  </td>
                                  <td class="span3">
                                     预计时间 
                                  </td>
                                   <td class="span3">
                                    <ul class="ulactions">
                                    <li>
                                       <button class="btn-glow"  data-toggle="modal" @click="moveComp($event)">
                                           详情
                                        </button>
                                    </li>
                                     </ul>
                                  </td>
                                  <td class="span3">
                                     在线 
                                  </td>
                  
                              </tr>
                              <tr class="first">
                                  <td class="span3">
                                      <input type="checkbox" />
                                      情报显控台
                                  </td>
                                  <td class="span3">
                                      <el-progress :text-inside="true" :stroke-width="18" :percentage="30"></el-progress> 
                                  </td>
                                  <td class="span3">
                                     预计时间 
                                  </td>
                                  <td class="span3">
                                     <ul class="ulactions">
                                    <li>
                                        <button class="btn-glow"  data-toggle="modal" @click="moveComp($event)">
                                           详情
                                        </button>
                                     
                                    </li>
                                     </ul>
                                  </td>
                  
                                  <td class="span3">
                                     在线 
                                  </td>
                  
                              </tr>
                          </tbody>
                      </table>

                   

                </div>

                <div class="modal fade" id="modal-select">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" ng-click="reset()">
                                        <span aria-hidden="true">&times;</span></button>
                                    <h4 class="modal-title">详情</h4>
                                </div>
                                <div class="modal-body">
                                    <div style="float:left">
                                      <label style="width: 300px;">文件数量：7</label>
                                    </div>
                                    <div style="float:left">
                                      <label>文件大小：1.9G</label>
                                    </div>
                                    
                                    


                                     <div class="row-fluid table">
                    <table class="table table-hover" type="expand">
                         
                          <tbody>
                              <tr class="first">
                                  <td class="span3">
                                      <input type="checkbox" />
                                      指挥显控台
                                  </td>
                                  <td class="span3">
                                      <el-progress :text-inside="true" :stroke-width="18" :percentage="70"></el-progress> 
                                  </td>
                                  <td class="span3">
                                     预计时间 
                                  </td>
                                   <td class="span3">
                                    <ul class="ulactions">
                                    <li>
                                       <button class="btn-glow"  data-toggle="modal" @click="moveComp($event)">
                                           详情
                                        </button>
                                    </li>
                                     </ul>
                                  </td>
                                  <td class="span3">
                                     在线 
                                  </td>
                  
                              </tr>
                              <tr class="first">
                                  <td class="span3">
                                      <input type="checkbox" />
                                      情报显控台
                                  </td>
                                  <td class="span3">
                                      <el-progress :text-inside="true" :stroke-width="18" :percentage="30"></el-progress> 
                                  </td>
                                  <td class="span3">
                                     预计时间 
                                  </td>
                                  <td class="span3">
                                     <ul class="ulactions">
                                    <li>
                                        <button class="btn-glow"  data-toggle="modal" @click="moveComp($event)">
                                           详情
                                        </button>
                                     
                                    </li>
                                     </ul>
                                  </td>
                  
                                  <td class="span3">
                                     在线 
                                  </td>
                  
                              </tr>
                          </tbody>
                      </table>

                   

                </div>

                                </div>
                            </div>
                        </div>
                    </div>
                            </div>
                
            </div>
        </div>

    </div>
</template>




<style>
.ulactions{
    margin: 5px 0 0 0;
}

.ulactions li{
    display: inline;
}

 .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

<script>
/* eslint-disable */
export default{
data(){
  return{

    }
},
methods: {
  moveComp: function (event){

      $("#modal-select").modal('show');
    
    
  }
}
}
</script>

