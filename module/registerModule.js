var registerModule = function(){}
registerModule.prototype.adminAdd = function( ep,data ){
	ep.on("conn",function( conn ){
		var sql = "insert into admin values(default,?,?,?,1,now())";
		conn.query(sql,data,ep.done("success"));
		conn.release(); 
	});
}
module.exports = function(){
	return new registerModule();
}