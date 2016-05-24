var registerControl = function (){}
registerControl.prototype.adminAdd = function( req,res,next ){
	var ep = new EventProxy();
	dataSource.getConn( ep );
	registerModule.adminAdd(ep,[ req.body.aname,req.body.email,req.body.password ]);
	ep.on("success",function( data ){
		if( data.insertId ){
			res.json( config.info.suc ).end();
		}else{
			res.json(config.error.adminAdderr).end();
		}
	});
	ep.fail(function( err ){
		next(err);
	});
}
module.exports=function(){
	return new registerControl();
}
