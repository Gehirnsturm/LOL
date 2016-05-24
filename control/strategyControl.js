var strategyControl = function (){}
strategyControl.prototype.admin = function( req,res,next ){
	var ep = new EventProxy();
	dataSource.getConn( ep );
	strategyModule.adminList(ep);
	ep.on("success",function( data ){
		res.json(data);
	});
	ep.fail(function( err ){
		next(err);
	});
}
strategyControl.prototype.strategyList = function( req,res,next ){
	var ep = new EventProxy();
	dataSource.getConn( ep );
	strategyModule.strategyList(ep,[req.session.admin.aid]);
	ep.on("success",function( data ){
		res.json(data).end();
	});
	ep.fail(function( err ){
		next(err);
	});
}
strategyControl.prototype.strategyAdd = function( req,res,next ){
	var ep = new EventProxy();
	dataSource.getConn( ep );
	strategyModule.strategyAdd(ep,[ req.body.stitle,req.body.content,req.session.admin.aid ]);
	ep.on("success",function( data ){
		if( data.insertId ){
			res.json( config.info.suc ).end();
		}else{
			res.json(config.error.strategyAdderr).end();
		}
	});
	ep.fail(function( err ){
		next(err);
	});
}
strategyControl.prototype.strategyDel = function( req,res,next ){
	var ep = new EventProxy();
	dataSource.getConn( ep );
	strategyModule.strategyDel(ep,[ req.params.sid ]);
	ep.on("success",function( data ){
		res.json( config.info.suc ).end();
	});
	ep.fail(function( err ){
		next(err);
	});
}
strategyControl.prototype.previews = function( req,res,next ){
	var ep = new EventProxy();
	dataSource.getConn( ep );
	strategyModule.previews(ep,[req.params.sid]);
	ep.on("success",function( data ){
			res.json(data).end();
	});
	ep.fail(function( err ){
		next(err);
	});
}
module.exports=function(){
	return new strategyControl();
}
