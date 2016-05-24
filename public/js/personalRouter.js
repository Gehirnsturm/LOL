$(function(){
	var router = new Router({
	    container: '#myTabContent',
	    enterTimeout : 200,
	    leaveTimeout : 200
	});
	/*个人信息开始*/
	var perInfo = {
		url : "/perInfo",
		render : function(){
			return $("#perInfo").html();
		}
	}
	/*个人信息结束*/
	/*我的攻略开始*/
	var perstrategy = {
		url : "/perstrategy",
		render : function(){
			return $("#perstrategy").html();
		}
	}
	var perstrategy = {
		url : "/perstrategy",
		ajaxData : function(){
			var that = this;
			return $._ajax({
				url  : "/strategy/strategy",
				type : "get"
			}).done(function( data ){
				that.data = data;
			});
		},
		render : function(){
			return ejs.render($("#perstrategy").html(),{strategy:this.data});
		}
	}
	var perstrategyAdd = {
		url : "/perstrategyAdd",
		render : function(){
			return ejs.render($("#perstrategyAdd").html());
		},
		bind : function(){
			var t = $(this);
			t.find("#editor").wysiwyg();
			t.find("#sub").click(function(){
				var stitle = t.find("#stitle").val();
				var content = t.find("#editor").html();
				if( $.validate.isEmpty(stitle) == false ){
					return t.find(".alert").alertMes({message:"新闻标题不能为空"});
				}
				$._ajax({
					url : "/strategy/strategy",
					type : "post",
					data : {"stitle":stitle,"content":content}
				}).done(function( obj ){
					if( obj.code ){
						location.href = "/admin/personal#/perstrategy";
					}else{
						$(this).find(".alert").alertMes({type:"danger",message:obj.msg});
					}
				});
			});
		}
	}
	var perstrategyDel = {
		url : "/perstrategyDel/:sid",
		ajaxData : function(){
			var t = this;
			$._ajax({
				url  : "/strategy/strategy/" + t.params.sid,
				type : "delete"
			}).done(function(){
				location.href = "/admin/personal#/perstrategy";
			});
			return false;
		}
	}
	var previews = {
		url : "/previews/:sid",
		ajaxData : function(){
			var that = this;
			return $._ajax({
				url  : "/strategy/strategy/" + that.params.sid,
				type : "get"
			}).done(function( data ){
				that.data = data;
			});
		},
		render : function(){
			return ejs.render($("#perstrategypreviews").html(),{s:this.data[0]});
		}
	}
	/*我的攻略结束*/
	/*我的收藏开始*/
	var collectList = {
		 url : "/collectList",
		 className : "collectList",
		 ajaxData : function(){
		 	var that = this;
		 	return $._ajax({
		 		url  : "/admin/collect",
		 		type : "get"
		 	}).done(function( data ){
		 		that.data = data;
		 	});
		 },
		 //绑定感应鼠标方向插件
		 bind : function(){
		 	var a=new sHover("sHoverItem","sIntro");
			a.set({
			 	slideSpeed:5,
			 	opacityChange:true,
			 	opacity:80
			});
		 },
		 render : function(){
		 	return ejs.render($("#collectList").html(),{collects:this.data});
		 }
	}
	var collectAdd = {
		url : "/collectAdd",
		render : function(){
			return $("#collectAdd").html();
		},
		bind : function(){
			var t = $(this);
			$(this).find("#sub").click(function(){
				var imgname = t.find("#imgname").val();
				var imginfo = t.find("#imginfo").val();
				var imgpath = t.find("#imgpath").val();
				var data = new FormData();
				data.append("imgname",imgname);
				data.append("imginfo",imginfo);
				data.append("upfile",t.find("#imgpath").get(0).files[0]);
				$._ajax({
					url : "/admin/collect",
					data: data,
					cache: false,  
			        contentType: false,  
			        processData: false
				}).done(function( obj ){
					if( obj.code ){
						location.href = "/admin/personal#/collectList";
					}else{
						$(this).find(".alert").alertMes({type:"danger",message:obj.msg});
					}
				});
				
			});
			t.find("#imgpath").change(function(){
				var file = this.files[0];
				if( file.type.indexOf("image") == -1 ){
					$(this).val("");
					t.find(".alert").alertMes({type:"danger",message:"只能上传图片格式"});
					return;
				}
//				if( file.size >(1024*512) ){
//					$(this).val("");
//					t.find(".alert").alertMes({type:"danger",message:"只能上传小于512K的图片"});
//					return;
//				}
				var fr = new FileReader();
				fr.readAsDataURL(file); 
				fr.onload = function(){
					$("#showimg").attr("src",fr.result);
					$("#showimg").attr("style","height:175px;margin-top: 5px;");
				}
			});
		}
	}
	var collectDel = {
		url : "/collectDel/:cid",
		ajaxData : function(){
			var t = this;
			$._ajax({
				url  : "/admin/collect/" + t.params.cid,
				type : "delete"
			}).done(function(){
				location.href = "/admin/personal#/collectList";
			});
			return false;
		}
	}
	/*我的收藏结束*/
	//默认页面
	var home = {
		url : "/",
		render : function(){
			return $("#perInfo").html();
		}
	}
	router.push(perInfo)
		  .push(perstrategy)
		  .push(perstrategyAdd)
		  .push(perstrategyDel)
		  .push(previews)
		  .push(collectList)
		  .push(collectAdd)
		  .push(collectDel)
		  .push(home)
		  .setDefault('/').init();
});