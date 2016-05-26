var strategyModule = function(){}
strategyModule.prototype.adminList = function( ep ){
	ep.on("conn",function( conn ){
		var sql = "select * from admin";
		conn.query(sql,ep.done("success"));
		conn.release(); 
	});
}
strategyModule.prototype.strategyList = function( ep,data ){
	ep.on("conn",function( conn ){
		var sql = "select s.sid,stitle,pubdate,a.aname from strategy s left join admin a on s.author = a.aid where a.aid=?";
		conn.query(sql,data,ep.done("success"));
		conn.release(); 
	});
}
strategyModule.prototype.strategyAdd = function( ep,data ){
	ep.on("conn",function( conn ){
		var sql = "insert into strategy values(default,?,?,now(),?)";
		conn.query(sql,data,ep.done("success"));
		conn.release(); 
	});
}
strategyModule.prototype.strategyDel = function( ep,data ){
	ep.on("conn",function( conn ){
		var sql = "delete from strategy where sid = ?";
		conn.query(sql,data,ep.done("success"));
		conn.release(); 
	});
}
strategyModule.prototype.previews = function ( ep,data ){
	ep.on("conn",function( conn ){
		var sql = "select s.*,a.aname from strategy s,admin a where s.author = a.aid and sid = ?";
		conn.query(sql,data,ep.done("success"));
		conn.release();
	});
}
module.exports = function(){
	return new strategyModule();
}