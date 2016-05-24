$(function(){		
	$('.type-list li').mouseover(function(){
		var liindex = $('.type-list li').index(this);
		$(this).addClass('active').siblings().removeClass('active');
		$('.main div.match').eq(liindex).fadeIn(150).siblings('div.match').hide();
	});
	//登录
	if( sessionStorage.getItem("username") ){
		$("#login").html(sessionStorage.getItem("username"));
		$("#login").attr("href","/admin/personal");
		$("#perlogin").attr("href","/admin/personal");
	}else{
		$("#login").html("账号登录");
	}
});
