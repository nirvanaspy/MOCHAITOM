<template>
	<!-- main container -->
    <div>
        <div class="container-fluid">
            <div id="pad-wrapper" class="users-list">
                <div class="row-fluid header">
                    <h3>部署设计</h3>
                    <div class="span10 pull-right">
                        <input type="text" class="span5 search" placeholder="Type a user's name..." />


                        <div class="ui-dropdown">
                            <div class="head" data-toggle="tooltip" title="Click me!">
                                Filter users
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

                        <router-link to="/addDeployPlan" class="btn-flat success pull-right">
                            <span>&#43;</span>
                            新增
                        </router-link>
                        <!-- <router-link to="/xy1">
                            <i class="icon-home"></i>
                            <span>XY1</span>
                        </router-link> -->
                    </div>
                </div>

                <!-- Users table -->
                <div class="row-fluid table">
                    <table class="table table-hover" id="table_value">
                        <thead>
                        <tr>
                            <th class="span4 sortable">
                               名称
                            </th> 
                            <th class="span3">
                                <span class="line"></span>描述
                            </th>
                            <th class="span3">
                                <span class="line"></span>绑定详情
                            </th>
                            <th class="span3">
                                <span class="line"></span>操作
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <!-- row -->
                        <tr class="first" v-for="(deployplan,index) in deployplans" :key="index">
                            <td style="display:none">{{deployplan.id}}</td>
                            <td>
                                {{deployplan.name}}
                            </td>
                            <td class="description">
                                {{deployplan.description}}
                            </td>
                            <td>
                                <ul class="ulactions">
                                    <li>
                                        <router-link :to='{name:"deployplanDetail",params:{id:deployplan.id}}'>
                                            <input type="button" class="btn-flat primary" value="查看"/>
                                        </router-link>
                                    </li>
                                </ul>
                            </td>
                            <td>
                                <ul class="ulactions">
                                    <li>
                                        <router-link to="#">
                                         <input type="button" class="btn-flat primary" value="修改"/>
                                        </router-link>
                                    </li>
                                    <li class="last">
                                        <!-- <router-link to="/devices" @click="deleteDevice">删除</router-link>  -->
                                        <input type="button" class="btn-flat primary" value="删除"/>
                                    </li>
                                </ul>
                            </td>

                        </tr>
                        <!-- row -->

                        </tbody>
                    </table>
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
        <!-- <hr/>
        <div>
            {{deployplans}}
        </div> -->
    </div>
</template>

<script>
/* eslint-disable */
/*let projectId = "5a922835-a587-4dad-b3b7-bb5005ef4c99";*/
/*let projectId = "2ec24245-0f8d-4db5-9d9b-1726ed727057";*/

export default{
    
    data(){
        return{
            deployplans:[]
        }
    },
    created(){
        var projectId = this.getCookie('projectId');
        var username = this.getCookie('username');
        var password = this.getCookie('password');
        
        this.$axios.get('project/'+projectId+'/deployplan',{
            //设置头
            headers:{
                'content-type':'application/x-www-form-urlencoded'
            },
            auth: {
                username: username,
                password: password
            }
        }).then(res=>{
            this.deployplans = res.data.data;
            console.log(this.deployplans);
        })
        .catch(err=>{
            console.log(err);
        })

    }
}
</script>
<style>
.ulactions{
    margin: 5px 0 0 0;
}

.ulactions li{
    display: inline;
}
</style>
