<template>
	<!-- main container -->
    <div>
        <div class="container-fluid">
            <div id="pad-wrapper" class="users-list">
                <div class="row-fluid header">
                  <h3 class="header-wrapper">绑定详情</h3>
                    <div class="span10 pull-right deployplan-input">
                        <input class="search" type="text" placeholder="搜索设备.." v-model="searchQuery"/>
                    </div>
                </div>

                <!-- Users table -->
                <div class="row-fluid table tabletable">
                    <table class="table table-hover" id="table_value">
                        <thead>
                        <tr>
                            <!-- <th class="span4 sortable">
                                部署设计名称
                             </th> -->
                            <th class="span3">
                                设备名称
                            </th>
                            <th class="span3">
                                <span class="line"></span>设备IP
                            </th>
                            <th class="span3">
                                <span class="line"></span>组件名称
                            </th>
                            <!--<th class="span3">
                                <span class="line"></span>路径
                            </th>-->
                        </tr>
                        </thead>
                        <tbody>
                        <!-- row -->
                        <tr class="first" v-for="(deployplanDetail,index) in deployPlanDetailEntitiesA" :key="index">
                            <td style="display:none">{{deployplanDetail.id}}</td>
                            <td>
                                {{deployplanDetail.deviceEntity.name}}
                            </td>

                            <td>
                                {{deployplanDetail.deviceEntity.ip}}
                            </td>

                            <td>
                                {{deployplanDetail.componentEntity.name}}
                            </td>

                            <!--<td class="description">
                                {{deployplanDetail.deployPath}}
                            </td>-->

                        </tr>
                        <!-- row -->

                        </tbody>
                    </table>
                </div>

            </div>
        </div>
        <!--<hr/>
        <div>
            {{deployPlanDetailEntities}}
        </div>-->
    </div>
</template>

<script>
/* eslint-disable */
/*let projectId = "5a922835-a587-4dad-b3b7-bb5005ef4c99";
let projectId = "2ec24245-0f8d-4db5-9d9b-1726ed727057";*/
export default{

    data(){
        return{
            deployplanDetails: [],
            deployPlanDetailEntities: [],
            searchQuery: ''
        }
    },
    created(){
        var deployplanId = this.$route.params.id;
        var projectId = this.getCookie('projectId');
        var username = this.getCookie('username');
        var password = this.getCookie('password');
        //alert(deployplanId);

        this.$axios.get(this.getIP() +'deploymentdesigns/' + deployplanId + '/deploymentdesigndetails',{
            //设置头
            headers:{
                'content-type':'application/x-www-form-urlencoded'
            },
            auth: {
                username: username,
                password: password
            }
        }).then(res=>{
            this.deployplanDetails = res.data.data;
            this.deployPlanDetailEntities = res.data.data;
            console.log(this.deployplanDetails);
            //alert(this.deployPlanDetailEntities.length);
        })
        .catch(err=>{
            console.log(err);
        })

    },
    computed: {
        deployPlanDetailEntitiesA: function () {
            var self = this;
            return self.deployPlanDetailEntities.filter(function (item) {
                return item.deviceEntity.name.toLowerCase().indexOf(self.searchQuery.toLowerCase()) !== -1;
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
  #pad-wrapper .header .span10.deployplan-input{
    margin-right:-100px;
  }
</style>
