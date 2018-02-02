<template>
	<!-- main container -->
	<div>
		<div class="container-fluid">
			<div id="pad-wrapper" class="users-list">
				<div class="row-fluid header">
					<h3>组件</h3>
					<div class="span10 pull-right">
						<input class="search" type="text" placeholder="搜索组件.."  v-model="searchQuery"/>


						<div class="ui-dropdown">
							<div class="head" data-toggle="tooltip" title="Click me!">
								Filter components
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

						<router-link to="/addComponent" class="btn-flat success pull-right">
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
								组件名称
							</th>
							<th class="span3 sortable">
								<span class="line"></span>版本
							</th>
							<th class="span3">
								<span class="line"></span>大小(MB)
							</th>
							<th class="span3 sortable">
                                <span class="line"></span>相对路径
                            </th>
							<th class="span3">
								<span class="line"></span>描述
							</th>
							<th class="span3">
								<span class="line"></span>操作
							</th>

						</tr>
						</thead>
						<tbody>
						<!-- row -->
						<tr class="first" v-for="(component,index) in componentsA" :id="component.id">
							<td style="display:none">{{component.id}}</td>
							<td>
								{{component.name}}
							</td>
							<td>
								{{component.version}}
							</td>
							<td>
								{{component.size}}
							</td>
							<td>
								{{component.deployPath}}
							</td>
							<td class="description">
								{{component.description}}
							</td>

							<td style="width:304px">
								<ul class="ulactions" >
									<li>
                                        <!-- <router-link to="/modifyComponent">
                                        	<input type="button" class="btn-glow primary" value="修改" @click="modifyComp($event)"/>
                                        </router-link> -->
                                        <router-link :to='{name:"modifyComponent",params:{id:component.id}}'>
                                        	<input type="button" class="btn-flat primary" value="修改"/>
                                        </router-link>
                                    </li>
                                    <li>
                                        <input type="button" class="btn-flat primary" value="删除" @click="deleteComp($event)"/>
                                    </li>
                                    <li>
                                        <input type="button" class="btn-flat primary" value="导出" @click="exportComp($event)"/>
                                    </li>
                                    <li class="last">
                                        <!-- <router-link to="/devices" @click="deleteDevice">删除</router-link>  -->
                                        <input type="button" class="btn-flat primary" value="复制" @click="copyComp($event)"/>
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
			{{components}}
		</div> -->
	</div>
</template>

<script>
export default{
        /* eslint-disable */
        data(){
            return{
                components:[],
                searchQuery: '',
            }
        },created(){
        	  let username = this.getCookie('username');
            let password = this.getCookie('password');

            this.$axios.get(this.getIP() +'components',{

                //设置头
                headers:{
                    'content-type':'application/x-www-form-urlencoded'
                },
                auth: {
                    username: username,
                    password: password
                }
            }).then(res=>{
                this.components = res.data.data;
                for (let j = 0; j < this.components.length; j++) {
                  this.components[j].size = ((this.components[j].size) / 1024 / 1024).toFixed(5);
                }
            })
            .catch(err=>{
                console.log(err);
            })

        },
        methods: {


            deleteComp: function (event){
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
	                    this.$axios.delete(this.getIP() +'components/'+id,{

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

				            this.$axios.get(this.getIP() +'components',{

				                //设置头
				                headers:{
				                    'content-type':'application/x-www-form-urlencoded'
				                },
				                auth: {
				                    username: username,
				                    password: password
				                }
				            }).then(res=>{
				                this.components = res.data.data
				            })
				            .catch(err=>{
				                console.log(err);
				            })
	                    }).catch(err=>{
                        layer.msg("删除失败！");
	                    })
	                }

		        } else {
		            return false;
		        }



            },


            exportComp: function (event){
                //alert("A");
                var e = event || window.event;
                //alert("B");
                var target = e.target || e.srcElement;
                if (target.parentNode.parentNode.parentNode.tagName.toLowerCase() == "td") {
                    //alert("C");
                    var rowIndex = target.parentNode.parentNode.parentNode.parentNode.rowIndex;
                   // alert(rowIndex);
                    var id = document.getElementById("table_value").rows[rowIndex].cells[0].innerHTML;
                   // alert(id);
                    var qs = require('qs');
                    this.$axios.get(this.getIP() +'components/export/'+id,{

                        //设置头
                        headers:{
                            'content-type':'application/x-www-form-urlencoded'
                        },
                        auth: {
                            username: 'admin',
                            password: 'admin'
                        }
                    }).then(res=>{
                        //this.users = res.data.data
                        //console.log(res);
                        layer.msg("导出成功！");
                        this.$router.replace({ path: '/components'})
                    }).catch(err=>{
                        layer.msg("导出失败！");
                    })
                }

            },

            copyComp: function (event){
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
                this.$axios.post(this.getIP() +'components/copy/'+id,
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
                    alert("复制成功");
                    this.$axios.get(this.getIP() +'components',{

		                //设置头
		                headers:{
		                    'content-type':'application/x-www-form-urlencoded'
		                },
		                auth: {
		                    username: 'admin',
		                    password: 'admin'
		                }
		            }).then(res=>{
		                this.components = res.data.data
		            })
		            .catch(err=>{
		                console.log(err);
		            })
                })
                .catch(err=>{

                    alert("复制失败！");
                })
            }
        },
		computed: {
		    componentsA: function () {
		        var self = this;
		        return self.components.filter(function (item) {
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
