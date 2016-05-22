$(function(){		
	$('.type-list li').mouseover(function(){
		var liindex = $('.type-list li').index(this);
		$(this).addClass('active').siblings().removeClass('active');
		$('.main div.match').eq(liindex).fadeIn(150).siblings('div.match').hide();
	});
});
