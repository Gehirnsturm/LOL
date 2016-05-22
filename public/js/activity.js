$(function(){		
	$('.sub-ul li').click(function(){
		var liindex = $('.sub-ul li').index(this);
		$(this).addClass('active').siblings().removeClass('active');
		$('.main .act-list').eq(liindex).fadeIn(150).siblings('.act-list').hide();
	});
});
