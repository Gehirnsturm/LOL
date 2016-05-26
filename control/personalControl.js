var personalControl = function (){}
personalControl.prototype.index = function( req,res,next ){
	res.render("personal.html",{user:req.session.admin});
}
personalControl.prototype.collectList = function( req,res,next ){
	var ep = new EventProxy();
	dataSource.getConn( ep );
	perCollectModule.collectList(ep,[req.session.admin.aid]);
	ep.on("success",function( data ){
		res.json(data).end();
	});
	ep.fail(function( err ){
		next(err);
	});
}
personalControl.prototype.collectAdd = function( req,res,next ){
	var ep = new EventProxy();
	ep.all("fileup","conn",function( filename,conn ){
		var url = "/upfile/" + filename;
		perCollectModule.collectAdd(ep,conn,[ req.body.imgname,url,req.body.imginfo,req.session.admin.aid ]);
	})
	util.upfile(ep,req.file);
	dataSource.getConn( ep );
	ep.on("success",function( data ){
		if( data.insertId ){
			res.json( config.info.suc ).end();
		}else{
			res.json(config.error.collectAdderr).end();
		}
	});
	ep.fail(function( err ){
		next(err);
	});
}
personalControl.prototype.collectDel = function( req,res,next ){
	var ep = new EventProxy();
	dataSource.getConn( ep );
	perCollectModule.collectDel(ep,[ req.params.cid ]);
	ep.on("success",function( data ){
		res.json( config.info.suc ).end();
	});
	ep.fail(function( err ){
		next(err);
	});
}
module.exports=function(){
	return new personalControl();
}
