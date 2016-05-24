var loginControl = function(){};
loginControl.prototype.login = function( req,res,next ){
	var ep = new EventProxy();
	dataSource.getConn( ep );
	loginModule.login( ep,[req.body.username,req.body.password] );
	ep.on("success",function( rows ){
		req.session.admin = rows[0];
		if( rows.length ){
			res.json(rows[0]).end();
		}else{
			res.json(config.error.loginerr).end();
		}
	});
	ep.fail(function(err){
		next(err);
	});
}
loginControl.prototype.logout = function( req,res,next ){
	delete req.session.admin;
	res.redirect("/login.html");
}
module.exports=function(){
	return new loginControl();
}