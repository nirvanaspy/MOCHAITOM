<template>
    <!-- main container -->
    <div>
        <div class="container-fluid">
            <div id="pad-wrapper">
            	<div class="row-fluid header">
                    <h3>设计</h3>
                    
                </div>

                <div class="row-fluid form-wrapper">
                    <div class="span12" style="margin-top: -30px;">

                        <div class="drag-content span12">

							<!-- 设备 -->
                        	<div class="span3"  style="height: 480px;">
                        		<div class="devcompfind">
                        			<input class="search" type="text" placeholder="搜索设备.." v-model="searchQuery"/>
                        		</div>
                        		
								<br/>

								<div class="row-fluid table devcompchose">
									
				                    <table class="table table-hover" id="table_value">
				                        <thead>
				                        <tr>
				                            <th class="span7 wrap">
				                               设备名称
				                            </th>
				                            <th class="span5 sortable">
				                                <span class="line"></span>设备状态
				                            </th>
				                            

				                        </tr>
				                        </thead>
				                        <tbody>
				                        <!-- row -->
				                        <tr class="first" v-for="(device,index) in devicesA" @click="deviceClick($event)" :id="device.id">
				                        	<td style="display:none" id="id">{{device.id}}</td>
				                            <td class="wrap">
				                            	<div class="wrap" :id="device.id" :title="device.name" >
				                            		<i class="icon-laptop"></i>&nbsp;
				                            		{{device.name}} ({{device.ip}})
				                            	</div>
				                            	
				                               
				                            </td>
				                            <td>    
				                               <span class="label label-primary" v-if="device.online == false">离线</span>
				                               <span class="label label-success" v-if="device.online == true">在线</span>
				                            </td>
				                        </tr>

				                        

				                        </tbody>
				                    </table>
				                </div>

                        	</div>

							<!-- 拖动区域 -->
                        	<div class="move span6" id="moveContent" style="height: 481px;margin-top: -1px;">
                        		<div style="margin-top:20px;margin-left: 35%;">
                        			<h3>部署设计</h3>
                        		</div>
                        		<div class="moveChild span4" v-for="(device,index) in devicecomps" :key="index" style="margin-top: 40px;text-align: center;">

									<div>
										<img src="img/files.png" style="height: 90px;"/>
									</div>
                        			
                        			<!-- <br/> -->
                        			<div>
                        				{{device.componentEntity.name}}
                        			</div>

                        			<div>
                        				{{device.componentEntity.version}}
                        			</div>
                        			
                        		</div>
                        	</div>

							<!-- 组件 -->
                        	<div class="span3"  style="height: 480px;margin-left: 8px;width:262px;">
                        		<div class="devcompfind">
                        			<input class="search" type="text" placeholder="搜索组件.."  v-model="searchQuery"/>
                        		</div>
                        		
								<br/>

								<div class="row-fluid table devcompchose">
									
				                    <table class="table table-hover" id="table_value2">
				                        <thead>
				                        <tr>
				                            <th class="span5 wrap" style="width: 80px;">
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
				                        
					                        <tr class="first" v-for="(component,index) in compsA" :id="component.id">
					                            <td style="display:none">{{component.id}}</td>
					                            <td class="wrap" style="width: 80px;">
					                            	<div class="wrap" :title="component.name" style="width: 80px;">
					                            		<i class="icon-folder-close-alt"></i>&nbsp;
					                            		{{component.name}} 
					                            	</div>
					                            	<!-- <div class="icon-folder-close-alt" style="float:left;">
					                            		{{component.name}} 
					                            	</div> -->
					                               
					                            </td>
					                            <td>
					                               {{component.size}} 
					                            </td>
					                            <td>
					                               {{component.version}} 
					                            </td>
					                            <td>
					                        		<div class="btn-group small" style="margin-right: 3px">
					                        			<button class="btn-glow icon-random" @click="moveComp($event)" value="aa">
					                        				<!-- <i class="icon-random"></i> -->
					                        			</button>
					                        		</div>
					                        		
					                        	</td>
					                           
					                        </tr>

				                        </tbody>
				                    </table>
				                </div>

                        	</div>

						

						<br/>
                        	
						
						</div>

                    </div>
                </div>

				
            </div>
        </div>


<div>
	设备上原有的组件：{{devicecomps}}

</div>

<!--<hr/>
 <div>
	部署设计：{{deployplans}}
</div> 

<hr/>
<div>
	设备：{{devices}}
</div>-->

<hr/>
<div>
	设备名：{{deviceArr}}
</div>

<!-- <hr/>

<hr/>
<div>
	{{deployplanId}}
</div>  -->

    </div>

</template>

<script>
/* eslint-disable */
let dom = null;
let deviceArr = [];   //设备名称
let deviceIdArr = [];       //设备的ID信息
let compArr1 = {};   //组件名称
let compArr = [];
let compIddArr = [];       //组件的ID信息
let nameArr = [];   //设备及组件的名称
let idAll = [];     //设备及组件的id
let deployplanId = ''; //下拉框所选中的部署设计的id
let deviceId = '';  //下拉框所选中的设备的id

let diveceCHIp = ''; //左侧表格中点击的设备的ip
let deviceCHId = '';  //左侧表格中点击的设备的id

let diveceIdPass = '';  //要传给后台的设备的id数组
let compsIdPass = '';  //要传给后台的组件的id数组

export default{
data(){
	return{
		selected: '',
		selectedDev: '',
		searchQuery: '',
		devices:[],          //左侧表格查询出来的设备的信息
		comps:[],            //左侧表格查询出来的组件的信息
		deviceArr:[],        //移动的设备的信息
		deviceIdArr:[],
		compArr:[],
		compIddArr:[],       //左侧表格中的点击的设备的组件的id数组
		nameArr:[],
		idAll:[],
		deployplanId: '',
		deviceId: '',
		deployplans:[],
		deployplanInfos: [],    //部署设计信息
	    devcomps: [],  //设备上绑定的组件

	    devicecomps: [],  //设备上原有的组件

	    componentEntity: [],   //组件的id

	    diveceIdPass: [],    //要传给后台的设备的id数组
	    compsIdPass:[]       //要传给后台的组件的id数组
	  
    }
},created(){
	var projectId = this.getCookie('projectId');
    var username = this.getCookie('username');
    var password = this.getCookie('password');

    var compArr = [];
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

    deviceClick: function(event){
    	var e = event || window.event;
	    var target = e.target || e.srcElement;

	    var username = this.getCookie('username');
        var password = this.getCookie('password');

		console.log(target);
		console.log(target.id);
	    deviceCHId = target.id;     //左侧表格所点击的设备的id

	    var deployPlanId = this.$route.params.id;  //所选择的部署设计的id
        //alert(compId);
        console.log(deployPlanId); 

        this.$axios.get('deployplan/'+deployPlanId+'/devices/'+deviceCHId,{
            //设置头
            headers:{
                'content-type':'application/x-www-form-urlencoded'
            },
            auth: {
                username: username,
                password: password
            }
        }).then(res=>{
            this.devicecomps = res.data.data
        })
        .catch(err=>{
            console.log(err);
        })
	    
    },

	moveComp: function (event){   //移动组件
			
		var e = event || window.event;

		var name;
		var version;

	    var target = e.target || e.srcElement;

	    //debugger;

	    //console.log(target.parentNode.parentNode.parentNode);

	    var comptrInfo = target.parentNode.parentNode.parentNode;

		var id = comptrInfo.id;            //要移动的组件的id

		var flag = false;                  //组件是否已存在的标志,false为不存在

		var deviceIdPa = '';                    //要传给后台的组件的id

		//console.log(id);

		//console.log(this.devicecomps);
		//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!因为后添加了组件进设备，但并没有传给后台，所以根据id查不出来，可能哈市要根据名称和版本查。
		if(this.devicecomps.length > 0){  //判断是否已选择设备
			for(var i=0;i<this.devicecomps.length;i++){  //在查询出来的设备的原有组件数组中添加移入的组件
        	
        		/*
        		 判断要添加的组件的id在原有数组中是否已存在
        		    存在：提示组件已存在
        		    不存在：将此组件加入此数组中*/

        		//查询出此设备下的组件，并将这些组件添加到一个组件id的数组里去。
        		this.compIddArr.push(this.devicecomps[i].componentEntity.id);

        		deviceIdPa = this.devicecomps[i].deviceEntity.id;

        	}

        	console.log("组件的id------------");
        	console.log(this.compIddArr);
        	for(var j=0;j<this.compIddArr.length;j++){   //遍历组件的id数组，看此组件是否已绑定到设备
        		if(id == this.compIddArr[j]){  //组件已存在
        			flag = true;             //组件存在则将标记改为true，并退出
	    			alert("组件已存在");
	    			return;
	    		}else{

	    			flag = false;
	    			
	    		}
	        }

	        if(!flag){  //如果不存在
	        	for(var k=0;k<this.comps.length;k++){  //遍历右侧组件的数组，找到与此id相等的组件，获取需要的信息
    				//根据id获取组件的名称和版本
    				if(id == this.comps[k].id){
    					/*name = this.compIddArr[k].name;
    					version = this.compIddArr[k].version;*/

    					this.componentEntity = this.comps[k];
    					/*console.log("要插入的组件信息--------");
    					console.log(this.componentEntity);*/

    					/*this.componentEntity.push({  //将此组件的名称id加到组件数组中
	    					name : name,
	    					version : version
	    				});*/
    				}else{
    					this.componentEntity.length = 0;
    				}
	
    			}

    			console.log("添加");
    			//console.log(this.componentEntity);

    			this.devicecomps.push({  //将组件数组作为属性加入到设备中去
					componentEntity: this.componentEntity
				});


    			console.log("传给后台的设备和组件的id数组--------------------");
    			//将此设备的id加入要传给后台的设备的id数组
    			this.diveceIdPass.push(deviceIdPa);
    			console.log(this.diveceIdPass);
    			//将此组件的id加入要传给后台的组件的id数组
    			this.compsIdPass.push(this.componentEntity.id);
    			console.log(this.compsIdPass);

	        }
	        
	    			
	        //判断要添加的组件数组是否存在，  存在则不添加，否则添加
	        /*if(this.componentEntity.length > 0){
	        	this.devicecomps.push({  //将组件数组作为属性加入到设备中去
					componentEntity: this.componentEntity
				});
	        }*/
			
        	
		}else{
			alert("请先选择设备");
		}
        
	    console.log("---------------------");

		
	},
	moveSure: function(){
		//debugger;
		deviceId = this.selectedDev;  //所选择的设备的id
		//alert(deviceId);

		var deviceName = '';
		console.log(this.compArr);
		console.log(compArr);
		//遍历设备数组，找到id相同的，获取其name的值
		//debugger;
		for(var i=0;i<this.deviceArr.length;i++){
			if(deviceId == this.deviceArr[i].id){
				deviceName = this.deviceArr[i].name;
				this.deviceArr[i].comppp = [];
				//this.deviceArr[i].comppp = compArr;

				for(var j=0;j<this.compArr.length;j++){
					this.deviceArr[i].comppp.push(this.compArr[j]);
				}
				
			}

			/*for(var j=0;j<this.deviceArr[i].comppp.length;j++){
				console.log(this.deviceArr[i].comppp[j].name);
			}*/
		}




		//alert(deviceName);

		//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!第二次添加会有问题，不是在组件里再加组件。
		//将设备的id、名称和组件加入设备数组中
		this.devcomps.push({   
			id: deviceId,  //设备的id
			name: deviceName,  //设备的名称
	        devcompBinds:compArr
		})


console.log("---------------------------");
		console.log(deviceArr);
		console.log(this.deviceArr);
		$("#modal-select").modal('hide');

		/*this.deviceArr['devcomps'] = compArr*/
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
	   
	},
	changeDevice: function() {
    	deviceId = this.selectedDev;
     	//alert(deviceId);
        
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

}

</script>
<style>

	.wrap{  
		width: 150px;   
		white-space: nowrap;
		text-overflow: ellipsis;  
		overflow: hidden;  
	} 


	.devcompfind{
	    margin-top: 5px;
	    margin-left: 2px;
	}

	.drag-content {
	    border: 2px solid rgba(204, 204, 204, 1);
	    min-height: 481px;
	    overflow: auto;
	}
	.choice {
	    /* border-right: 2px solid rgba(204, 204, 204, 1); */

	}
	.move{
		border: 1px solid rgba(204, 204, 204, 1);
		min-height: 350px;
	}

	.addli{
        max-height: 90px;
        overflow: auto;
        border: 1px solid lightgrey;
        width: 110px;
    }

    .bindul{
		list-style-type: decimal;
    }

    .bindDevName{
    	margin-left: 30%;
    } 

	.devcompchose{
		height: 410px;
		overflow: auto;
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
