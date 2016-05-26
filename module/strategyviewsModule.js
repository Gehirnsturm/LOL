var strategyviewsModule = function(){}
strategyviewsModule.prototype.strategyList = function( ep,data ){
	ep.on("conn",function( conn ){
		var sql = "select s.sid,stitle,pubdate,a.aname from strategy s left join admin a on s.author = a.aid";
		conn.query(sql,data,ep.done("success"));
		conn.release(); 
	});
}
strategyviewsModule.prototype.previews = function ( ep,data ){
	ep.on("conn",function( conn ){
		var sql = "select s.*,a.aname from strategy s,admin a where s.author = a.aid and sid = ?";
		conn.query(sql,data,ep.done("success"));
		conn.release();
	});
}
module.exports = function(){
	return new strategyviewsModule();
}