<template>
    <!-- main container -->
    <div>
        <div class="container-fluid">
            <div id="pad-wrapper" class="users-list">
                <div class="row-fluid header">
                    <h3>设备</h3>
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
                            <th class="span4 sortable">
                               设备名
                            </th>
                            <th class="span3 sortable">
                                <span class="line"></span>IP
                            </th>
                            <th class="span3 sortable">
                                <span class="line"></span>路径
                            </th>
                            <th class="span3">
                                <span class="line"></span>设备详情
                            </th>
                            <th class="span3">
                                <span class="line"></span>操作
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <!-- row -->
                        <tr class="first" v-for="(device,index) in devicesA" :id="device.id">
                            <td style="display:none">{{device.id}}</td>
                            <td>
                                {{device.name}}
                            </td>
                            <td>
                               {{device.ip}}
                            </td>
                            <td>
                               {{device.path}}
                            </td>
                            <td class="description">
                                {{device.description}}
                            </td>
                            <td>
                                <ul class="ulactions">
                                    <li>

                                        <router-link :to='{name:"modifyDevice",params:{id:device.id}}'>
                                         <input type="button" class="btn-flat primary" value="修改"/>
                                        </router-link>
                                    </li>
                                    <li>
                                        <!-- <router-link to="/devices" @click="deleteDevice">删除</router-link>  -->
                                        <input type="button" class="btn-flat primary" value="删除" @click="deleteDevice($event)"/>
                                    </li>
                                    <li class="last">
                                        <!-- <router-link to="/devices" @click="deleteDevice">删除</router-link>  -->
                                        <input type="button" class="btn-flat primary" value="复制" @click="copyDevice($event)"/>
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
        <!--<hr/>
        <div>
            &lt;!&ndash; {{devices}} &ndash;&gt;
        </div>-->
    </div>
</template>

<script>
/* eslint-disable */

export default{
        data(){
            return{
                devices:[],
                searchQuery: ''
            }
        },created(){
            var projectId = this.getCookie('projectId');
            var username = this.getCookie('username');
            var password = this.getCookie('password');
            this.$axios.get('project/'+projectId+'/device',{
                //设置头
                headers:{
                    'content-type':'application/x-www-form-urlencoded'
                },
                auth: {
                    username: username,
                    password: password
                }
            }).then(res=>{
                this.devices = res.data.data
            })
            .catch(err=>{
                console.log(err);
            })

        },
        methods: {

            deleteDevice: function (event){
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
                        this.$axios.delete('devices/'+id,{

                            //设置头
                            headers:{
                                'content-type':'application/x-www-form-urlencoded'
                            },
                            auth: {
                                username: 'admin',
                                password: 'admin'
                            }
                        }).then(res=>{

                            //删除完再次查询
                            var projectId = this.getCookie('projectId');
                            var username = this.getCookie('username');
                            var password = this.getCookie('password');
                            this.$axios.get('project/'+projectId+'/device',{
                                //设置头
                                headers:{
                                    'content-type':'application/x-www-form-urlencoded'
                                },
                                auth: {
                                    username: username,
                                    password: password
                                }
                            }).then(res=>{
                                this.devices = res.data.data
                            })
                            .catch(err=>{
                                console.log(err);
                            })

                        }).catch(err=>{
                            alert("删除失败！");
                        })
                    }

                } else {
                    return false;
                }



            },

            copyDevice: function (event){
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
                this.$axios.post('devices/copy/'+id,
                qs.stringify({
                    "name": $("input[name='add-name']").val(),

                }),{
                    /*params:{  //get请求在第二个位置，post在第三个位置
                     ID:'c02da6e9-a334-4e41-b842-c59eb7d0d3f3'
                     },*/
                    //设置头
                    headers:{
                        'content-type':'application/x-www-form-urlencoded'
                    },
                    auth: {
                        username: username,
                        password: password
                    }
                }).then(res=>{
                    alert("拷贝成功");
                    this.$axios.get('project/'+projectId+'/device',{
                        //设置头
                        headers:{
                            'content-type':'application/x-www-form-urlencoded'
                        },
                        auth: {
                            username: username,
                            password: password
                        }
                    }).then(res=>{
                        this.devices = res.data.data
                    })
                    .catch(err=>{
                        console.log(err);
                    })
                })
                .catch(err=>{

                    alert("拷贝失败！");
                })
            }


        },
        computed: {
            devicesA: function () {
                var self = this;
                return self.devices.filter(function (item) {
                    return item.name.toLowerCase().indexOf(self.searchQuery.toLowerCase()) !== -1;
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

.ulactions{
    margin: 5px 0 0 0;
}

.ulactions li{
    display: inline;
}
</style>
