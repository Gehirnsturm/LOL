-function($){
	$.validate = {};
	$.validate.isEmpty = function( str ){
		var reg = /^\S+$/;
		return reg.test(str);
	}
	$.validate.isEmail = function( str ){
		var reg = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
		return reg.test(str);
	}
	$.fn.alertMes = function( option ){
		var typeobj = { warning:"警告！",info:"提示！",success:"成功！",danger:"错误！" }
		if( !option.type || !typeobj[option.type] ){
			option.type = "info";
		}
		$(this).addClass("alert-"+option.type);
		$(this).find(".title").html(typeobj[option.type]);
		$(this).show("fast");
		$(this).find(".message").html(option.message);
		var that = $(this);
		$(this).find(".close").click(function(){
			that.hide("fast");
			that.removeClass("alert-"+option.type);
		});
		option.times = option.times || 2000;
		setTimeout(function(){
			that.hide("fast");
			that.removeClass("alert-"+option.type);
		},option.times);
	}
	$._ajax = function( option ){
		option.type = option.type || "post";
		option.dataType = option.dataType || "json";
		option.statusCode = {
			404 : function(){
				window.location.href = "/404.html";
			},
			500 : function(){
				window.location.href = "/500.html";
			}
		};
		return $.ajax( option ).always(function(){
			$.loadingend();
		});
	}
	$.loadingend = function(){
		$("#load").remove();
	}
	$.getCookie = function( name ){
		var cookie = document.cookie;
		console.log(cookie)
		var start = cookie.indexOf(name);
		if( start == -1 ){
			return "";
		}
		start = start + name.length +1;
		var end = cookie.indexOf(";",start);
		if(end == -1){
			return decodeURIComponent(cookie.slice(start));
		}else{
			return decodeURIComponent(cookie.slice(start,end));
		}
	}
}($)
















