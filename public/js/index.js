
$(function(){
	//轮播图开始
	var count = 0;
	var imgsLength = $("#imgs img").length;
	var times = null;
	times = setInterval(function(){
		count++;
		demo(count)
		if(  count ==5 ){
			count = 0;
		}
	},2000);
	$("#rbox span").each(function( i,val ){
		var ii = i+1;
		$("#rbox span:nth-child(" + ii + ")").hover(
			function(){
				clearInterval(times);
				demo( ii );
			},
			function(){
				var itwo = ii;
				if( itwo ==5 ){
					itwo = 0;
				}
				times = setInterval(function(){
					itwo++;
					demo(itwo)
					if( itwo ==5 ){
						itwo = 0;
					}
				},2000);
		});
	});
	
	function demo( num ){
		for( var i=1; i<=imgsLength; i++ ){
			$("#imgs img:nth-child(" + i + ")").css("z-index",1);
			$("#rbox span:nth-child(" + i + ")").css("background","#000");
		}
		$("#imgs img:nth-child(" + num + ")").css("z-index",5);
		$("#rbox span:nth-child(" + num + ")").css("background","#EC3200");
	}
	//轮播图结束
	//news开始
	$("#news-title li").each(function( i,val ){
		$("#news-title li:nth-child(" + (i+1) + ")").hover(
		function(){
			$("#news-list ul").each(function(i){
				$(this).hide();
				$("#news-title span:nth-child("+(i+1)+")").css({background:"#222633",border:"1px solid #191C28",color:"#767F9D"});
			});
			$("#news-list ul:nth-child(" + (i+1) + ")").show();
			$(this).find("span").css({background:"#2B3140",border:"1px solid #2B3140",color:"#fff"});
		},
		function(){
		});
	});
	//news结束
	//box开始
	$("#boxtitle li").each(function( i ){
		$("#boxtitle li:nth-child(" + (i+1) + ")").hover(
		function(){
			$(".main-match .box-list").each(function( i ){
				$(this).hide();
				$("#boxtitle li:nth-child(" + (i+1) + ")").attr("class","boxlist");
			});
			$(this).attr("class","boxlisthover");
			$(".main-match .box-list:nth-child(" + (i+2) + ")").show();
		},
		function(){
		});
		
	});
	//box结束
	//近期赛程开始
	$("#sc-content .sc-table:nth-child(1)").show();
	$("#sctitle li").each(function( i ){
		$("#sctitle li:nth-child("+(i+1)+")").hover(function(){
			$("#sc-content .sc-table").each(function( i ){
				$(this).hide();
				$("#sctitle li:nth-child("+(i+1)+")").attr("class","boxlist");
			});
			$("#sc-content .sc-table:nth-child("+(i+1)+")").show();
			$(this).attr("class","boxlisthover");
		},function(){});
	});
	$("#sc-content .sc-score").each(function( i ){
		$("#sc-content .sc-score .score-span:nth-child("+(i+1)+")").hover(function(){
			$(this).find("i").attr("class","i-hide");
		},function(){});
	});
	//近期赛程结束
	//本周免费英雄开始
	var a=new sHover("sHoverItem","sIntro");
	a.set({
	 	slideSpeed:5,
	 	opacityChange:true,
	 	opacity:80
	});
	//本周免费英雄结束
	//登录
	if( sessionStorage.getItem("username") ){
		$("#login").html(sessionStorage.getItem("username"));
		$("#login").attr("href","/admin/personal");
		$("#perlogin").attr("href","/admin/personal");
	}else{
		$("#login").html("账号登录");
	}
})










