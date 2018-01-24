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
				<div class="row-fluid table">
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
								<span class="line"></span>大小
							</th> 
							<th class="span3 sortable">
                                <span class="line"></span>路径
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
						<tr class="first" v-for="(component,index) in componentsA" :key="index">
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
							
							<td>
								<ul class="ulactions">
									<li>
                                        <!-- <router-link to="/modifyComponent">
                                        	<input type="button" class="btn-glow primary" value="修改" @click="modifyComp($event)"/>
                                        </router-link> -->
                                        <router-link :to='{name:"modifyComponent",params:{id:component.id}}'>
                                        	<input type="button" class="btn-flat primary" value="修改"/>
                                        </router-link>
                                    </li>
                                    <li class="last">
                                        <input type="button" class="btn-flat primary" value="删除" @click="deleteComp($event)"/>
                                    </li>
                                    <li class="last">
                                        <input type="button" class="btn-flat primary" value="导出" @click="exportComp($event)"/>
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
            this.$axios.get('components',{
                
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

        },
        methods: {

            deleteComp: function (event){
                //alert("A");
                var e = event || window.event;
                //alert("B");
                var target = e.target || e.srcElement;
                if (target.parentNode.parentNode.parentNode.tagName.toLowerCase() == "td") {
                    //alert("C");
                    var rowIndex = target.parentNode.parentNode.parentNode.parentNode.rowIndex;
                    //alert(rowIndex);
                    var id = document.getElementById("table_value").rows[rowIndex].cells[0].innerHTML;
                    //alert(id);
                    var qs = require('qs');
                    this.$axios.delete('components/'+id,{

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
                        this.$router.replace({ path: '/components'})
                    }).catch(err=>{
                        alert("删除失败！");
                    })
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
                    this.$axios.get('components/export/'+id,{

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
                        this.$router.replace({ path: '/components'})
                    }).catch(err=>{
                        alert("导出失败！");
                    })
                }

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
.ulactions{
    margin: 5px 0 0 0;
}

.ulactions li{
    display: inline;
}
</style>
