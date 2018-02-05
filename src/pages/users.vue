<template>
	<!-- main container -->
    <div>
        <div class="container-fluid">
            <div id="pad-wrapper" class="users-list">
                <div class="row-fluid header">
                    <h3>用户</h3>
                    <div class="span10 pull-right">
                        <input type="text" class="span5 search" placeholder="搜索用户..." />


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

                        <router-link to="/addUser" class="btn-flat success pull-right">
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
                                    用户名
                                </th>
                                <th class="span3 sortable">
                                    <span class="line"></span>密码
                                </th>
                                <th class="span3">
                                    <span class="line"></span>操作
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        <!-- row -->
                        <tr class="first" v-for="(user,index) in users" :id="user.id">
                                    <td style="display:none">{{user.id}}</td>
                                    <td>
                                        {{user.username}}
                                    </td>
                                    <td class="description">
                                        {{user.password}}
                                    </td>
                                    <td>
                                        <span class="label label-success">Active</span>
                                        <ul class="actions">
                                            <li>
                                                <router-link :to='{name:"modifyUser",params:{id:user.id}}'>
                                                    <input type="button" class="btn-flat primary" value="修改"/>
                                                </router-link>
                                            </li>
                                    <li>
                                        <input type="button" class="btn-flat primary" value="删除" @click="deleteUser($event)"/>
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
        <hr/>
        <!-- <div>
            {{users}}
        </div> -->
    </div>
</template>

<script>
    export default{
        /* eslint-disable */
        data(){
            return{
                users:[]
            }
        },created(){
            this.$axios.get(this.getIP() + 'users',{

                //设置头
                headers:{
                    'content-type':'application/x-www-form-urlencoded'
                },
                auth: {
                    username: 'admin',
                    password: 'admin'
                }
            }).then(res=>{
                this.users = res.data.data
            })
            .catch(err=>{
                console.log(err);
            })

        },
        methods:{
          deleteUser: function (event){
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
                        this.$axios.delete(this.getIP() + 'users/'+id,{

                            //设置头
                            headers:{
                                'content-type':'application/x-www-form-urlencoded'
                            },
                            auth: {
                                username: 'admin',
                                password: 'admin'
                            }
                        }).then(res=>{
                            layer.msg("删除成功");

                            var username = this.getCookie('username');
                            var password = this.getCookie('password');

                            this.$axios.get(this.getIP() + 'users',{

                                //设置头
                                headers:{
                                    'content-type':'application/x-www-form-urlencoded'
                                },
                                auth: {
                                    username: username,
                                    password: password
                                }
                            }).then(res=>{
                                this.users = res.data.data
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

        }
    }
</script>
<style>

</style>
