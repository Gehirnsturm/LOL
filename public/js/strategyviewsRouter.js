$(function(){
	var router = new Router({
	    container: '#strategyContent',
	    enterTimeout : 200,
	    leaveTimeout : 200
	});
	
	var previews = {
		url : "/views/:sid",
		ajaxData : function(){
			var that = this;
			return $._ajax({
				url  : "/strategyviews/views/" + that.params.sid,
				type : "get"
			}).done(function( data ){
				that.data = data;
			});
		},
		render : function(){
			return ejs.render($("#strategyviews").html(),{s:this.data[0]});
		}
	}
	/*我的攻略结束*/
	
	//默认页面
	var home = {
		url : "/",
		render : function(){
			return $("#strategydef").html();
		}
	}
	router.push(previews)
		  .push(home)
		  .setDefault('/').init();
});