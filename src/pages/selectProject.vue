<template>
	<div>

	   <div class="row-fluid login-wrapper">
	        <a href="#">
	            <img class="logo" src="img/logo-white.png" />
	        </a> 

	       <!--  <div class="span4 box choosePro">
	           <div class="content-wrap project-panel">
	           	头
	           	<p class="project-header">
	           		<span class="project-title">
	           			选择工程
	           		</span>
	           		<h6>选择工程</h6>
	           	</p>
	               
	               内容
	               <div class="project-body">
	               	<div class="addPro" id="todo-list-example">
	               		增加pproject的输入框
	       						    <input class="addInput"
	       							    v-model="newTodoText"
	       							    v-on:keyup.enter="addNewTodo"
	       							    placeholder="Add a project"
	       						    >
	       
	       						    <div>
	       						    	<table class="table table-hover" id="table_value">
	       			                        <thead>
	       			                        <tr>
	       			                        	<th></th>
	       			                            <th class="span4 sortable">
	       			                               工程名
	       			                            </th>
	       			                            <th>操作</th>
	       			                            
	       
	       			                        </tr>
	       			                        </thead>
	       			                        <tbody>
	       			                        row
	       			                        <tr class="first" v-for="(todo, index) in todos" :key="index">
	       			                        	<td style="display:none" id="id">{{todo.id}}</td>
	       			                        	<td>
	       			                        		<input type="checkbox">
	       			                        	</td>
	       			                            <td>
	       			                               {{todo.title}} 
	       			                            </td>
	       			                            <td>
	       			                            	<input type="button" class="btn-flat primary" value="移除" @click="deleteDevice($event)"/>
	       			                            </td>
	       			                            
	       			                        </tr>
	       
	       			                        
	       			                        </tbody>
	       			                    </table>
	       						    </div>
	       						    
	       						  <ul class="ulPro">
	       						  	<label class="labelPro label2">
	       						  		<li class="liPro"
	       						  							      is="todo-item"
	       						  							      v-for="(todo, index) in todos"
	       						  							      v-bind:key="todo.id"
	       						  							      v-bind:title="todo.title"
	       						  							      v-on:remove="todos.splice(index, 1)"
	       						  							    >
	       						  							    	<span>{{todo.title}}</span>
	       						  								</li>
	       						  	</label>
	       						    
	       						  </ul>
	       						</div>
	               </div>
	       
	               
	       
	               <a class="btn-glow primary login" href="index.html">进入系统</a>
	           </div>
	       </div> -->

	       <div id ="your_pros" class="span4 box">
	       		<div class="boxed-group">
	       			<!-- 按钮 -->
	       			<div class="boxed-group-action">
	       			    <router-link to="/addProject" class="btn-flat success pull-right">
                            <span>&#43;</span>
                            新增
                        </router-link>
	       				<!-- <a class="btn-flat success new-product" href="#">+ Add project</a> -->
	       			</div>
	       			<h3>
	       				Your projects
	       				<span class="Counter">7</span>
	       			</h3>

	       			<div class="">
	       				<div class="filter-pros filter-bar">
	       					<input class="form-control input-sm input-block search" type="text" placeholder="Find a project.."/>
	       				</div>

	       				<div class="list">
		       				<ul class="mini-repo-list" id="ulId" data-filterable-for="your-repos-filter" data-filterable-type="substring" style="background-color: #fafbfc;">
		       				   <li class="pubic fork" v-for="project in projectInfo">
			       				    <router-link to="/main" class="mini-repo-list-item"> 
			       				    <!-- <router-link :to='{name:"main",params:{id:project.id}}'> -->
			       				    	<span id="spanId" :name='project.id'>{{project.name}}</span> 
			       				    </router-link>
		       				    </li>
		       					<!-- <li class="pubic fork" v-for="project in projectInfo">
		       						<router-link to="/main">
		       								       				    	<span class="repo-and-owner css-truncate-target" title=""><span class="repo">{{project.name}}</span></span>
		       								       				    </router-link>
		       							       				    </li> -->

		       				</ul>

	       				</div>
	       				
	       			</div>

	       			
	       		</div>
	       </div>

	        <div class="span4 no-account">
	            <p>Don't have an account?</p>
	            <a href="signup.html">Sign up</a>
	        </div>
	    </div>
	</div>
</template>

<script>
/* eslint-disable */
import Vue from 'vue'
let projectId = '';
/*alert(projectId);*/
let projectInfo = [];
/*const projectIdc = projectId;*/
Vue.component('todo-item', {
  template: '\
    <li>\
      {{ title }}\
      <button v-on:click="$emit(\'remove\')">X</button>\
    </li>\
  ',
  props: ['title']
})
export default{
data(){
	return {
		newTodoText: '',
		projectInfo:[],
	    todos: [
	      {
	        id: 1,
	        title: 'Do the dishes',
	      },
	      {
	        id: 2,
	        title: 'Take out the trash',
	      },
	      {
	        id: 3,
	        title: 'Mow the lawn'
	      }
	    ],
	    nextTodoId: 4
		}
},
created(){
	this.$axios.get('project/',{
                //设置头
                headers:{
                    'content-type':'application/x-www-form-urlencoded'
                },
                auth: {
                    username: 'admin',
                    password: 'admin'
                }
            }).then(res=>{
                this.projectInfo = res.data.data;
                $("html").css("background-image", "url('img/bgs/10.jpg')");
        //alert("hh");
		var ul = document.getElementById('ulId');
		console.log(ul);
		var lis = ul.getElementsByTagName('li');
		console.log(lis);
		var spans = ul.getElementsByTagName('span');
		console.log(spans);
		//alert(spans.length);
		for(var i=0;i<spans.length;i++){
			//alert("A");
			//var spansv = this.innerHTML;
		    spans[i].onclick = function(){
		    	//alert("B");
		        //alert(this.innerHTML);
		        console.log(this.innerHTML);
		        console.log(this.getAttribute('name'));
		        projectId = this.getAttribute('name');
		        console.log(projectId);
		        //将projectId的值存入cookie中
		        let expireDays = 1000 * 60 * 60 * 24 * 15;
      			Vue.prototype.setCookie('projectId', projectId, expireDays);
      			console.log(Vue.prototype.getCookie('projectId'));
		    }
		    
		    
		    //alert("C");
		}
            })
            .catch(err=>{
                console.log(err);
    });

},

mounted: function(){
	
},
methods: {
	addNewTodo: function () {
	  this.todos.push({
	    id: this.nextTodoId++,
	    title: this.newTodoText
	  })
	  this.newTodoText = ''
	}
}
}
	
</script>

<style>
	*{
		box-sizing: border-box;
	}
	.boxed-group {
	    position: relative;
	    margin-bottom: 20px;
	    border-radius: 3px;
	}
	.boxed-group-action {
	    position: relative;
	    z-index: 2;
	    float: right;
	    margin: 5px 10px 0 0;
	}
	.boxed-group > h3, .boxed-group .heading {
	    display: block;
	    padding: 16px 10px 16px;
	    margin-top: -26px;
	    font-size: 14px;
	    line-height: 17px;
	    background-color: #f6f8fa;
	    border: 1px solid rgba(27,31,35,0.15);
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: rgba(27, 31, 35, 0.15);
	    border-bottom: 0;
	    border-radius: 3px 3px 0 0;
	    border-bottom: 1px solid #e5e5e5;
	}
	h3 {
	    font-weight: 600;
	}
	.boxed-group .Counter {
	    color: #fff;
	    background-color: rgba(47,54,61,0.5);
	}
	.Counter {
	    display: inline-block;
	    padding: 2px 5px;
	    font-size: 12px;
	    font-weight: 600;
	    line-height: 1;
	    color: #586069;
	    background-color: rgba(27,31,35,0.08);
	    border-radius: 20px;
	}
	.boxed-group.flush .boxed-group-inner {
	    padding: 0;
	}
	.boxed-group-inner {
	    padding: 10px;
	    color: #586069;
	    background: #fff;
	    border: 1px solid #d1d5da;
	    border-bottom-right-radius: 3px;
	    border-bottom-left-radius: 3px;
	}
	.filter-bar::after {
	    display: table;
	    clear: both;
	    content: "";
	}
	.filter-bar::before {
	    display: table;
	    content: "";
	}
	
	.filter-pros {
	    padding-bottom: 0;
	}
	.list{
	padding: 10px;
    padding-bottom: 10px;
	padding-bottom: 10px;
	background-color: #fafbfc;
	border-bottom: 1px solid #e5e5e5;
	}
	.filter-bar {
	    padding: 24px;
	    padding-bottom: 10px;
	    background-color: #fafbfc;
	    text-align: center;
	}
	.input-block {
	    display: block;
	    width: 100%;
	}
	.input-sm {
	    min-height: 28px;
	    padding-top: 3px;
	    padding-bottom: 3px;
	    font-size: 12px;
	    line-height: 20px;
	}
	.form-control, .form-select {
	    min-height: 34px;
	    padding: 6px 8px;
        padding-top: 6px;
        padding-bottom: 6px;
	    font-size: 14px;
	    line-height: 20px;
	    color: #24292e;
	    vertical-align: middle;
	    background-color: #fff;
	    background-repeat: no-repeat;
	    background-position: right 8px center;
	    border: 1px solid #d1d5da;
	    border-radius: 3px;
	    outline: none;
	    box-shadow: inset 0 1px 2px rgba(27,31,35,0.075);
	}
	input{
		font-family: inherit;
		overflow: visible;
		font: inherit;
		margin: 0;
	}
	.choosePro{
		font-size: 14px;
	}
	.project-panel {
	    border: 1px solid #ebeef5;
	    border-radius: 4px;
	    overflow: hidden;
	    background: #fff;
	    display: inline-block;
	    vertical-align: middle;
	    width: 200px;
	    box-sizing: border-box;
	    position: relative;
	}
	.project-header{
		height: 40px;
	    line-height: 40px;
	    background: #f5f7fa;
	    margin: 0;
	    padding-left: 15px;
	    border-bottom: 1px solid #ebeef5;
	    box-sizing: border-box;
	    color: #000;
	}
	.project-title{
		font-size: 18px;
	    color: #303133;
	    font-weight: 700;
	}
	.project-body{
		height: 260px;
	}
	.addPro{
		text-align: center;
	    margin: 15px;
	    box-sizing: border-box;
	    display: block;
	    width: auto;
	    height: 100%;
	}
	.addPro .addInput{
		height: 32px;
	    width: 100%;
	    font-size: 12px;
	    display: inline-block;
	    box-sizing: border-box;
	    border-radius: 16px;
	    padding-right: 10px;
	    padding-left: 30px;
	}
	.addInput{
		-webkit-appearance: none;
	    background-color: #fff;
	    background-image: none;
	    border: 1px solid #dcdfe6;
	    color: #606266;
	    line-height: 1;
	    outline: none;
	    padding: 0 15px;
	    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
	}
	.ulPro{
		margin: 0;
		padding-top: 0;
	    padding: 6px 0;
	    list-style: none;
	    height: 194px;
	    overflow: auto;
	    box-sizing: border-box;
	    text-align: left;
	}
	.labelPro{
		height: 30px;
	    line-height: 30px;
	    padding-left: 15px;
	    display: block;
	}
	.labelPro.label2{
		color: #606266;
	}
	.label2 {
	    color: #606266;
	    font-weight: 500;
	    font-size: 14px;
	    position: relative;
	    cursor: pointer;
	    display: inline-block;
	    white-space: nowrap;
	    user-select: none;
	}
	.liPro{
		width: 100%;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	    display: block;
	    box-sizing: border-box;
	    padding-left: 24px;
	    line-height: 30px;
	    white-space: nowrap;
	}
	.btn-flat, .btn-flat.default {
	    line-height: 10px;
	    padding: 7px 12px;
	}
	.login-wrapper .box .content-wrap {
	    width: 86%;
	    margin: -5px auto;
	}
	.login-wrapper .box {
   
    	background: rgb(255, 255, 255);
    }
	.mini-repo-list {
    list-style: none;
    }
    .mini-repo-list>:first-child .mini-repo-list-item {
    border-top: 0;
    }
    ul, ol {
    padding: 0;
    margin: 0 0 10px 0px;
    background-color: #fff;
    }
    li {
    display: list-item;
    text-align: -webkit-match-parent;
    line-height: 30px;
    }
    .mini-repo-list-item .repo {
    font-weight: 600;
    }
    a {
    color: #0366d6;
    text-decoration: none;
    background-color: transparent;
    }
    a.mini-repo-list-item.css-truncate {
    position: relative;
    display: block;
    padding: 6px 64px 6px 30px;
    font-size: 14px;
    border-top: 1px solid #d1d5da;
    }
.btn-flat.success {
    background: #96bf48;
    margin: 12px;
    border: 1px solid #7ea13d;
    text-shadow: 1px 1px 0px rgba(0,0,0,0.3);
    font-weight: 600;
}
</style>