$(function(){		
	$('.sub-ul li').click(function(){
		var liindex = $('.sub-ul li').index(this);
		$(this).addClass('active').siblings().removeClass('active');
		$('.main .act-list').eq(liindex).fadeIn(150).siblings('.act-list').hide();
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
