var perCollectModule = function(){}

perCollectModule.prototype.collectList = function( ep ){
	ep.on("conn",function( conn ){
		var sql = "select * from collect";
		conn.query(sql,ep.done("success"));
		conn.release(); 
	});
}

perCollectModule.prototype.collectAdd = function( ep,conn,data ){
		var sql = "insert into collect values(default,?,?,?,now(),?)";
		conn.query(sql,data,ep.done("success"));
		conn.release(); 
}

perCollectModule.prototype.collectDel = function( ep,data ){
	ep.on("conn",function( conn ){
		var sql = "delete from collect where cid = ?";
		conn.query(sql,data,ep.done("success"));
		conn.release(); 
	});
}

module.exports = function(){
	return new perCollectModule();
}