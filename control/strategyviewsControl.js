var strategyviewsControl = function (){}
strategyviewsControl.prototype.index = function( req,res,next ){
	var ep = new EventProxy();
	dataSource.getConn( ep );
	strategyviewsModule.strategyList(ep);
	ep.on("success",function( data ){
		res.send(res.render("strategy.html",{stragegys:data}));
	});
	ep.fail(function( err ){
		next(err);
	});
}
strategyviewsControl.prototype.previews = function( req,res,next ){
	var ep = new EventProxy();
	dataSource.getConn( ep );
	strategyviewsModule.previews(ep,[req.params.sid]);
	ep.on("success",function( data ){
			res.json(data).end();
	});
	ep.fail(function( err ){
		next(err);
	});
}
module.exports=function(){
	return new strategyviewsControl();
}