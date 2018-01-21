<template>
	<div>
		<div id="areaTree">
	        <div class="tree-box">
	            <div class="zTreeDemoBackground left">
	                <ul id="treeDemo" class="ztree"></ul>
	            </div>
	        </div>
	    </div>

	    <hr/>
	    <div>{{components}}</div>
	    <hr/>

	    <div><!-- {{components.$get(0)}} --></div>

	</div>
    
</template>



<script>
/* eslint-disable */

  var relativePath="";
  function getCurrentRoot(treeNode){
    if(treeNode.getParentNode()!=null){
      var parentNode = treeNode.getParentNode();
      relativePath=treeNode.getParentNode().name+"/"+relativePath+treeNode.name;
      return getCurrentRoot(parentNode);
    }else{
      return treeNode.id;
    }
  }


export default {
    name: 'areaTree',
    components:{
    },
    data() {
        return {
            setting: {
                view: {
                    addHoverDom: this.addHoverDom,
                    removeHoverDom: this.removeHoverDom,
                    selectedMulti: this.true
                },
                edit: {
                    enable: true,
                },
                data: {
                    simpleData: {
                        enable: true
                    }
                },
                callback: {
                    beforeDrag: this.beforeDrag,
                    beforeEditName: this.beforeEditName,
                    beforeRemove: this.beforeRemove,
                    beforeRename: this.beforeRename,
                    onRemove: this.onRemove,
                    onRename: this.onRename
                }
            },
            zNodes:[  { name:"父节点1 - 展开", open:true,
                children: [
                    { name:"父节点11 - 折叠",
                        children: [
                            { name:"叶子节点111"},
                            { name:"叶子节点112"},
                            { name:"叶子节点113"},
                            { name:"叶子节点114"}
                        ]},
                    { name:"父节点12 - 折叠",
                        children: [
                            { name:"叶子节点121"},
                            { name:"叶子节点122"},
                            { name:"叶子节点123"},
                            { name:"叶子节点124"}
                        ]},
                    { name:"父节点13 - 没有子节点", isParent:true}
                ]},
	            { name:"父节点2 - 折叠",
	                children: [
	                    { name:"父节点21 - 展开", open:true,
	                        children: [
	                            { name:"叶子节点211"},
	                            { name:"叶子节点212"},
	                            { name:"叶子节点213"},
	                            { name:"叶子节点214"}
	                        ]},
	                    { name:"父节点22 - 折叠",
	                        children: [
	                            { name:"叶子节点221"},
	                            { name:"叶子节点222"},
	                            { name:"叶子节点223"},
	                            { name:"叶子节点224"}
	                        ]},
	                    { name:"父节点23 - 折叠",
	                        children: [
	                            { name:"叶子节点231"},
	                            { name:"叶子节点232"},
	                            { name:"叶子节点233"},
	                            { name:"叶子节点234"}
	                        ]}
	                ]},
	            { name:"父节点3 - 没有子节点", isParent:true}
        	],
        	components:[]
    	}
    },
    created(){
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
    methods:{
        beforeDrag: function(treeId, treeNodes) {
            return false;
    },
       beforeEditName: function (treeId, treeNode) {
         var className= $("dark");
             className = (className === "dark" ? "":"dark");
        this.showLog("[ "+this.getTime()+" beforeEditName ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
        var zTree = $.fn.zTree.getZTreeObj("treeDemo");
        zTree.selectNode(treeNode);
        setTimeout(function() {
            if (confirm("进入节点 -- " + treeNode.name + " 的编辑状态吗？")) {
                setTimeout(function() {
                    zTree.editName(treeNode);
                }, 0);
            }
        }, 0);
        return false;
    },
       beforeRemove: function (treeId, treeNode) {
           var className= $("dark");
           className = (className === "dark" ? "":"dark");
           this.showLog("[ "+this.getTime()+" beforeRemove ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
           var zTree = $.fn.zTree.getZTreeObj("treeDemo");
           zTree.selectNode(treeNode);
           return confirm("确认删除 节点 -- " + treeNode.name + " 吗？");
        },
        onRemove: function (e, treeId, treeNode) {
            this.showLog("[ "+this.getTime()+" onRemove ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
        },
         beforeRename:function(treeId, treeNode, newName, isCancel) {
           var className= $("dark");
            className = (className === "dark" ? "":"dark");
             this.showLog((isCancel ? "<span style='color:red'>":"") + "[ "+this.getTime()+" beforeRename ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name + (isCancel ? "</span>":""));
            if (newName.length == 0) {
                setTimeout(function() {
                    var zTree = $.fn.zTree.getZTreeObj("treeDemo");
                    zTree.cancelEditName();
                    alert("节点名称不能为空.");
                }, 0);
                return false;
            }
            return true;
        },
        onRename:function(e, treeId, treeNode, isCancel) {
            this.showLog((isCancel ? "<span style='color:red'>":"") + "[ "+this.getTime9()+" onRename ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name + (isCancel ? "</span>":""));
        },
        showRemoveBtn:function (treeId, treeNode) {
            return !treeNode.isFirstNode;
        },
        showRenameBtn:function (treeId, treeNode) {
            return !treeNode.isLastNode;
        },
       showLog:function (str) {
           var className= $("dark");
           var log=$("dark");
            if (!log) log = $("#log");
            log.append("<li class='"+className+"'>"+str+"</li>");
            if(log.children("li").length > 8) {
                log.get(0).removeChild(log.children("li")[0]);
            }
        },
        getTime:function()  {
            var now= new Date(),
                h=now.getHours(),
                m=now.getMinutes(),
                s=now.getSeconds(),
                ms=now.getMilliseconds();
            return (h+":"+m+":"+s+ " " +ms);
        },

        addHoverDom: function(treeId, treeNode) {

            var newCount = $("1");
            var sObj = $("#" + treeNode.tId + "_span");
            if (treeNode.editNameFlag || $("#addBtn_"+treeNode.tId).length>0) return;
          var addStr = "<span class='button add' id='addBtn_" + treeNode.tId + "' title='add node' onfocus='this.blur();'></span>";
           sObj.after(addStr);
            var btn = $("#addBtn_"+treeNode.tId);
            if (btn) btn.bind("click", function(){
                relativePath="";
                getCurrentRoot(treeNode);
              //alert(relativePath);

            });
        },
        removeHoverDom:function (treeId, treeNode) {
            $("#addBtn_"+treeNode.tId).unbind().remove();
        },
         selectAll:function() {
            var zTree = $.fn.zTree.getZTreeObj("treeDemo");
            zTree.setting.edit.editNameSelectAll =  $("#selectAll").attr("checked");
        }
    },
    mounted(){
        $.fn.zTree.init($("#treeDemo"), this.setting, this.zNodes);

    }
}
</script>
