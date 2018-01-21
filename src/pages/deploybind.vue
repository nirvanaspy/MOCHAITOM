<template>
    <!-- main container -->
    <div>
        <div class="container-fluid">
            <div id="pad-wrapper">

                <div class="row-fluid">
                    <div class="span12">
                        <div id="fuelux-wizard" class="wizard row-fluid">
                            <ul class="wizard-steps">
                            	<li data-target="#step1" class="active">
                                    <span class="step">1</span>
                                    <span class="title">选择部署 <br /> 设计</span>
                                </li>
                                <li data-target="#step2">
                                    <span class="step">2</span>
                                    <span class="title">部署</span>
                                </li>
                                <li data-target="#step3">
                                    <span class="step">3</span>
                                    <span class="title">选择 <br /> 路径</span>
                                </li>
                                <li data-target="#step4">
                                    <span class="step">4</span>
                                    <span class="title">提交</span>
                                </li>
                                <!-- <li data-target="#step4">
                                    <span class="step">4</span>
                                    <span class="title">再次 <br /> 部署</span>
                                </li> -->
                            </ul>
                        </div>
                        <div class="step-content">
                        	<div class="step-pane active" id="step1">
                                <div class="row-fluid form-wrapper">
                                    <div class="span8">
                                        <form />
                                        	<div>
                                        		<h3>请选择要操作的部署设计：</h3>
                                        	</div>
                                        	<br/>
                                            <div class="field-box" style="margin-top: 30px;">
                                                <label>部署设计:</label>
					                            <select v-model="selected" style="height:30px;" @change="changeDeployPlan">
					                            	<!-- v-model="selected" -->
					                                <option v-for="deployplan in deployplanInfos" v-bind:value="deployplan.id">
					                                    {{ deployplan.name }}
					                                </option>
					                            </select>

                                            </div>
                                            
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div class="step-pane" id="step2">
                                <div class="row-fluid form-wrapper">
                                    <div class="span11">

                                        <div class="drag-content span12"  style="min-height: 400px;">

                                        	

                                        	<div class="choice span5" style="min-height: 400px;">
                                        	 	<div class="tabbable" id="tabs-259071">
													<ul class="nav nav-tabs">
														<li class="active">
															<a href="#panel-173637" data-toggle="tab">设备</a>
														</li>
														<li>
															<a href="#panel-776434" data-toggle="tab">组件</a>
														</li>
													</ul>
													<div class="tab-content" style="margin-left: 2px;">
														<div class="tab-pane active" id="panel-173637">
															

															<div class="row-fluid table">
																<input class="search" type="text" placeholder="搜索设备.." v-model="searchQuery"/>
															<br/><br/>
											                    <table class="table table-hover" id="table_value">
											                        <thead>
											                        <tr>
											                            <th class="span4 sortable">
											                               设备名称
											                            </th>
											                            <th class="span3 sortable">
											                                <span class="line"></span>设备状态
											                            </th>
											                            <th class="span3 sortable">
											                            	移入
											                            </th>

											                        </tr>
											                        </thead>
											                        <tbody>
											                        <!-- row -->
											                        <tr class="first" v-for="(device,index) in devicesA" :key="index">
											                        	<td style="display:none" id="id">{{device.id}}</td>
											                            <td>
											                               <i class="icon-laptop"></i>&nbsp;{{device.name}} 
											                            </td>
											                            <td>    
											                               <span class="label label-primary" v-if="device.online == false">离线</span>
											                               <span class="label label-success" v-if="device.online == true">在线</span>
											                            </td>
											                            <td>
											                        		<div class="btn-group small" style="margin-right: 3px">
											                        			<button class="btn-glow" @click="moveDevice($event)">
											                        				<i class="icon-random"></i>
											                        			</button>
											                        		</div>
											                        		
											                        	</td>
											                        </tr>

											                        <!-- row -->
											                        <!-- <tr>
											                         	<td style="display:none" id="id">1001</td>
											                         	<td><i class="icon-laptop"></i>&nbsp;设备1</td>
											                         	<td>在线</td>
											                         	<td>
											                         		<div class="btn-group small" style="margin-right: 3px">
											                         			<button class="btn-glow" @click="move($event)">
											                         				<i class="icon-random"></i>
											                         			</button>
											                         		</div>
											                         		
											                         	</td>
											                         </tr> 
											                         <tr>
											                         	<td style="display:none" id="id">1002</td>
											                         	<td><i class="icon-laptop"></i>&nbsp;设备2</td>
											                         	<td>在线</td>
											                         	<td>
											                         		<div class="btn-group small" style="margin-right: 3px">
											                         			<button class="btn-glow" @click="move($event)">
											                         				<i class="icon-random"></i>
											                         			</button>
											                         		</div>
											                         		
											                         	</td>
											                         </tr> --> 

											                        </tbody>
											                    </table>
											                </div>

															<p>
																设备内容.
															</p>
														</div>
														<div class="tab-pane" id="panel-776434">
															

															<div class="row-fluid table">
																<input class="search" type="text" placeholder="搜索组件.."  v-model="searchQuery"/>
															<br/><br/>
											                    <table class="table table-hover" id="table_value2">
											                        <thead>
											                        <tr>
											                            <th class="span5 sortable">
											                               组件名称
											                            </th>
											                            <th class="span2 sortable">
											                                <span class="line"></span>大小(MB)
											                            </th>
											                            <th class="span2 sortable">
											                                <span class="line"></span>版本
											                            </th>
											                            <th class="span3 sortable">
											                            	移入
											                            </th>

											                        </tr>
											                        </thead>
											                        <tbody>
											                        <!-- <tr>
											                        	<td>
											                        		组件树
											                        		<ul id="treeDemo" class="ztree"></ul>
											                        	</td>
											                        	<td>1024</td>
											                        	<td>V1.2.1</td>
											                        </tr> -->
												                        <tr class="first" v-for="(component,index) in compsA" :key="index">
												                            <td style="display:none">{{component.id}}</td>
												                            <td>
												                               <i class="icon-folder-close-alt"></i>&nbsp;{{component.name}} 
												                            </td>
												                            <td>
												                               {{component.size}} 
												                            </td>
												                            <td>
												                               {{component.version}} 
												                            </td>
												                            <td>
											                        		<div class="btn-group small" style="margin-right: 3px">
											                        			<button class="btn-glow" @click="moveComp($event)">
											                        				<i class="icon-random"></i>
											                        			</button>
											                        		</div>
											                        		
											                        	</td>
												                           
												                        </tr>

											                        </tbody>
											                    </table>
											                </div>
															<p>
																组件内容.
															</p>
														</div>
													</div>
												</div>
                                        		<!-- <div class="devices">
                                        			<h4>设备</h4>
                                        			<br/>
                                        			<div class='select-device' draggable='true' @dragstart='drag($event)' v-for='device in devices'>{{device.name}}</div>
                                        		</div>
                                        		                                        	
                                        		<br/><br/>
                                        		<div class="component">
                                        			<h4>组件</h4>
                                        			<br/>
                                        			<div class='select-comp' draggable='true' @dragstart='drag($event)' v-for='component in comps'>{{component.name}}</div>
                                        		</div> -->
                                        	</div>
                                        	
                                        	<!-- 部署设计拖动区域 -->
                                        	<div class="move span7" id="moveContent" style="min-height: 400px;font-size: 25px;">
                                        		<div style="margin-top:20px;margin-left: 30%;">
                                        			<h3>部署设计</h3>
                                        		</div>
                                        		<div class="moveChild span4" v-for="(name,index) in nameArr" :key="index" style="margin-top: 40px;">
                                        			<i class="icon-laptop" style="margin-left: 10px;"></i>
                                        			<br/><br/>
                                        			{{name}}
                                        		</div>
                                        	</div> 										  
										</div>

                                    </div>
                                </div>
                            </div>
                            <div class="step-pane" id="step3">
                                <div class="row-fluid form-wrapper">
                                    <div class="span8">
                                        <form />
                                        	<div>
                                        		<h3>请填写路径：</h3>
                                        	</div>
                                        	<br/>
                                            <div class="field-box" style="margin-top: 30px;">
                                                <label>路径:</label>
                                                <input class="span8" type="text" id="path" name="deployPath" placeholder="路径"/>
                                            </div>
                                            
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div class="step-pane" id="step4">
                                <div class="row-fluid form-wrapper">
                                    <div class="span8">
                                        <form />
                                            <div class="alert alert-info" style="margin-top: 10%;">
				                                <i class="icon-exclamation-sign"></i>
				                                如确认无误，请提交您的部署方案(^_^)
				                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
     
                        </div>
                        <div class="wizard-actions">
                            <button type="button" disabled="" class="btn-glow primary btn-prev">
                                <i class="icon-chevron-left"></i> 上一步
                            </button>
                            <button type="button" class="btn-glow primary btn-next" data-last="Finish">
                                下一步 <i class="icon-chevron-right"></i>
                            </button>
                            <button type="button" class="btn-glow success btn-finish" @click="submit()">
                                提交
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

<div>
	部署设计：{{deployplans}}
	<!-- planId: {{deployplanId[0].id}}   -->
</div>

<hr/>
<div>
	设备：{{devices}}
</div>

<hr/>
<div>
	设备名：{{deviceArr}}
</div>

<hr/>
<div>
	设备id：{{deviceIdArr}}
</div>

<hr/>
<div>
	组件名：{{compArr}}
</div>

<hr/>
<div>
	组件id：{{compIddArr}}
</div>

<hr/>
<div>
	所有名称：{{nameArr}}
</div>

<hr/>
<div>
	所有id：{{idAll}}
</div>

<hr/>
<div>
	{{deployplanId}}
	<!-- planId: {{deployplanId[0].id}}   -->
</div>

    </div>

</template>

<script>
/* eslint-disable */
let dom = null;
let deviceArr = [];   //设备名称
let deviceIdArr = [];       //设备的ID信息
let compArr = [];   //组件名称
let compIddArr = [];       //组件的ID信息
let nameArr = [];   //设备及组件的名称
let idAll = [];     //设备及组件的id
let deployplanId = '';
/*let projectId = "5a922835-a587-4dad-b3b7-bb5005ef4c99";*/
export default{
data(){
	return{
		selected: '',
		searchQuery: '',
		devices:[],
		comps:[],
		deviceArr:[],
		deviceIdArr:[],
		compArr:[],
		compIddArr:[],
		nameArr:[],
		idAll:[],
		deployplanId: '',
		deployplans:[],
		deployplanInfos: [
	        
	    ]
	  
    }
},created(){
	var projectId = this.getCookie('projectId');
    var username = this.getCookie('username');
    var password = this.getCookie('password');
	//获取设备
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
        this.devices = res.data.data;
    })
    .catch(err=>{
        console.log(err);
    });
	//获取组件
    this.$axios.get('components',{           
        //设置头
        headers:{
            'content-type':'application/x-www-form-urlencoded'
        },
        auth: {
            username: username,
            password: password
        }
    }).then(res=>{
        this.comps = res.data.data
    })
    .catch(err=>{
        console.log(err);
    });

    /*this.$axios.get('deployplan',{
    	params:{  //get请求在第二个位置，post在第三个位置
			ID:projectId
		},           
        //设置头
        headers:{
            'content-type':'application/x-www-form-urlencoded'
        },
        auth: {
            username: 'admin',
            password: 'admin'
        }
    }).then(res=>{
        this.deployplanId = res.data.data
    })
    .catch(err=>{
        console.log(err);
    });*/

	//获取部署设计的相关信息
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
            for (var i = 0; i < this.deployplans.length; i++) {
	            this.deployplanInfos.push({
			        id: this.deployplans[i].id,
			        name: this.deployplans[i].name
			    })
            }
            console.log(this.deployplans);
            //alert("xydp");

        })
        .catch(err => {
          console.log("hhh");
        });

},
mounted: function(){
	this.$nextTick(function () {
    	var $wizard = $('#fuelux-wizard'),
	        $btnPrev = $('.wizard-actions .btn-prev'),
	        $btnNext = $('.wizard-actions .btn-next'),
	        $btnFinish = $(".wizard-actions .btn-finish");

	    $wizard.wizard().on('finished', function(e) {
	        // wizard complete code
	    }).on("changed", function(e) {
	        var step = $wizard.wizard("selectedItem");
	        // reset states
	        $btnNext.removeAttr("disabled");
	        $btnPrev.removeAttr("disabled");
	        $btnNext.show();
	        $btnFinish.hide();

	        if (step.step === 1) {
	            $btnPrev.attr("disabled", "disabled");
	        } else if (step.step === 4) {
	            $btnNext.hide();
	            $btnFinish.show();
	        }
	    });

	    $btnPrev.on('click', function() {
	        $wizard.wizard('previous');
	    });
	    $btnNext.on('click', function() {
	        $wizard.wizard('next');
	    });


	    //树
	    var zTreeObj;
	   // zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）
		var setting = {};
	   // zTree 的数据属性，深入使用请参考 API 文档（zTreeNode 节点数据详解）
		var zNodes = [
	    {name:"test1", open:true, children:[
	    {name:"test1_1"}, {name:"test1_2"}]},
	    {name:"test2", open:true, children:[
	    {name:"test2_1"}, {name:"test2_2"}]}
	    ];
	    $(document).ready(function(){
	    	zTreeObj = $.fn.zTree.init($("#treeDemo"), setting, zNodes);
	    });
    })

},
methods: {
	drag:function(event){
		event=event||window.event;
		event.dataTransfer.effectAllowed = 'all';
		dom = event.currentTarget;
		//alert(dom);

	},
	drop:function(event){
		event=event||window.event;
	    event.preventDefault();
	    event.dataTransfer.dropEffect = "copy";
	    event.target.appendChild(dom);
	},
	allowDrop:function(event){
	  event.preventDefault();
	},
	moveDevice: function (event){
		var e = event || window.event;
		//var nameArr = [];
		var name;

	    var target = e.target || e.srcElement;
	    if (target.parentNode.parentNode.tagName.toLowerCase() == "td") {
	        var rowIndex = target.parentNode.parentNode.parentNode.rowIndex;
	        //alert(rowIndex);
	        
	        name = document.getElementById("table_value").rows[rowIndex].cells[1].innerHTML;
	        //alert(name);

	        id = document.getElementById("table_value").rows[rowIndex].cells[0].innerHTML;
	        //alert(id);

	        //alert(name);
	        
	        //alert(deviceArr);
	        deviceIdArr.push(id);
	        
	        deviceArr.push(name.substring(33));
	        nameArr.push(name.substring(33));
	        //$("#div2").remove(obj);
	        //$("#moveContent").append(name);
	    }
	    this.deviceIdArr = deviceIdArr;

	    this.deviceArr = deviceArr;
	    this.nameArr = nameArr;
	    //alert(deviceArr);
	},
	moveComp: function (event){
		var e = event || window.event;
		//var nameArr = [];
		var name;

	    var target = e.target || e.srcElement;
	    if (target.parentNode.parentNode.tagName.toLowerCase() == "td") {
	        var rowIndex = target.parentNode.parentNode.parentNode.rowIndex;
	        //alert(rowIndex);
	        
	        name = document.getElementById("table_value2").rows[rowIndex].cells[1].innerHTML;
	        //alert(name);

	        id = document.getElementById("table_value2").rows[rowIndex].cells[0].innerHTML;
	        //alert(id);

	        //alert(name);
	        
	        //alert(compArr);
	        compIddArr.push(id);

	        compArr.push(name.substring(43));
	        nameArr.push(name.substring(43));
	        //$("#div2").remove(obj);
	        //$("#moveContent").append(name);
	    }
	    this.compIddArr = compIddArr;

	    this.compArr = compArr;
	    this.nameArr = nameArr;
	    //alert(compArr);
	},
	submit: function (){
		//alert("hh");
	    var qs = require('qs');
	    var username = this.getCookie('username');
    	var password = this.getCookie('password');
	    //alert("yy");
	    //alert(deployplanId);
	    /*alert(this.deployplanId[0].id);
	    alert(deviceIdArr[0]);*/
	    this.$axios.put('deployplan/'+ deployplanId + "/devices/" + deviceIdArr[0] + "/components/" + compIddArr[0],qs.stringify({
	        "deployPath": $("input[name='deployPath']").val()
	    }),{
	        
	        //设置头
	        headers:{
	            'content-type':'application/x-www-form-urlencoded'
	        },
	        auth: {
	            username: username,
                password: password
	        }
	    }).then(res=>{
	        
	        this.$router.replace({ path: '/deployplan'})
	    })
        .catch(err=>{
            alert("提交失败！");
        })
	    /*this.$axios.put('deployplan/'+ this.deployplanId[0].id + "/devices/" + deviceIdArr[0] + "/components/" + compIddArr[0],qs.stringify({
	        "deployPath": $("input[name='deployPath']").val()
	    }),{
	        
	        //设置头
	        headers:{
	            'content-type':'application/x-www-form-urlencoded'
	        },
	        auth: {
	            username: 'admin',
	            password: 'admin'
	        }
	    }).then(res=>{
	        
	        this.$router.replace({ path: '/deploy'})
	    })
        .catch(err=>{
            alert("提交失败！");
        })*/
	},
	changeDeployPlan: function() {
     deployplanId = this.selected;
     //alert(deployplanId);

        
    }

},
computed: {  
    devicesA: function () {  
        var self = this;  
        return self.devices.filter(function (item) {  
            return item.name.toLowerCase().indexOf(self.searchQuery.toLowerCase()) !== -1;  
        })  
    },
    compsA: function () {  
        var self = this;  
        return self.comps.filter(function (item) {  
            return item.name.toLowerCase().indexOf(self.searchQuery.toLowerCase()) !== -1;  
        })  
    }  
} 
/*computed:{
    devices: function(){
    	var self = this
    	self.devices.filter(function (device){
    		var searchRegex = new RegExp(self.searchQuery, 'i')
			return device.isActive && (
				searchRegex.test(device.name) 
			)
    	})
        
        return arr;
    }
 }*/

}

</script>
<style>
	.drag-content {
	    border: 2px solid rgba(204, 204, 204, 1);
	    min-height: 350px;
	}
	.choice {
	    /* border-right: 2px solid rgba(204, 204, 204, 1); */

	}
	.move{
		border: 1px solid rgba(204, 204, 204, 1);
		min-height: 350px;
	}


	.select-device {
	  background-color: #C4E1E1;
	  display: inline-block;
	  text-align: center;
	  border-radius: 10px;
	  margin: 10px;
	  cursor:pointer;
	  padding: 6px 20px;
	  color: #4F4F4F;
	}
	.select-comp {
	  background-color: #DEFFAC;
	  display: inline-block;
	  text-align: center;
	  border-radius: 10px;
	  margin: 10px;
	  cursor:pointer;
	  padding: 6px 20px;
	  color: #4F4F4F;
	}

	 .cursored{
	  cursor: default;
	}
	.project-content,.people-content {
	    margin: 30px 50px;
	}
	.people-content {
	    margin-top: 30px;
	}
	.drag-div {
	    border: 1px solid #5bc0de;
	    padding:10px;
	    margin-bottom: 10px;
	    width: 800px;
	    cursor: pointer;
	}
	.select-project-item {
	    display: inline-block;
	    text-align: center;
	    border-radius: 3px;
	}
	.drag-people-label{
	  margin-bottom:0;
	  padding-right:10px;
	}
</style>
