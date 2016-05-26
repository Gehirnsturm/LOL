//全局路径 和 系统模块
global.rootpath = __dirname;
global.fs = require("fs");

//引入第三方包
var bodyParser = require('body-parser');
var session = require('express-session');
var ejs = require('ejs');
global.express = require('express');
global.mysql = require('mysql');
global.EventProxy = require('eventproxy');
var log4js = require('log4js');   //日志
log4js.configure("config/log4j.json");
global.log = log4js.getLogger("logInfo");
var multer  = require('multer');
global.upload = multer({ dest: 'temps/' });

//引入自定义包
global.util = require("./util/util.js");
global.config = util.loadConfig();

//加载模型
global.dataSource = require("./module/dataSource.js")();
global.loginModule = require("./module/loginModule.js")();
global.registerModule = require("./module/registerModule.js")();
global.perCollectModule = require("./module/perCollectModule.js")();
global.strategyModule = require("./module/strategyModule.js")(); 
global.strategyviewsModule = require("./module/strategyviewsModule.js")();

//加载控制器
global.loginControl = require("./control/loginControl.js")();
global.registerControl = require("./control/registerControl.js")();
global.personalControl = require("./control/personalControl.js")();
global.strategyControl = require("./control/strategyControl.js")();  
global.strategyviewsControl = require("./control/strategyviewsControl.js")();

//加载路由
global.loginRouter = require("./router/loginRouter.js");
global.registerRouter = require("./router/registerRouter.js");
global.personalRouter = require("./router/personalRouter.js");
global.strategyRouter = require("./router/strategyRouter.js"); 
global.strategyviewsRouter = require("./router/strategyviewsRouter.js");

//创建服务器
var app = express();

//配置body解析
app.use(bodyParser.urlencoded({ extended: true }));

// 设置session
app.use(session({
  secret: '^_^', 
  resave: false,
  saveUninitialized: true, 
  rolling: true,
  cookie: { maxAge : 1000*60*30 }
}));

//设置express的模板引擎
app.set("views","./views");
app.set('view engine', 'html');
app.engine('.html', ejs.__express);
ejs.delimiter = "$";

//登录路由
app.use("admin/favicon.ico",util.favicon);
app.use("/login",loginRouter);
app.use("/register",registerRouter);
app.use("/admin",util.checkLogin,personalRouter);
app.use("/strategy",strategyRouter);
app.use("/strategyviews",strategyviewsRouter);

//配置静态服务器
app.use(express.static('public'));

//配置404错误 
app.use(function( req,res,next ){
	if( req.xhr ){
		res.status(404).end();
	}else{
		res.status(404).redirect('/404.html');
	}
});
//500服务器错误
app.use(function(err,req,res,next) {
  console.error(err.stack);
    log.error(err.stack);
  if( req.xhr ) {
		res.status(500).end();
	} else {
		res.status(500).redirect("/500.html");
	}
});

//设置错误守护
process.on("uncaughtException",function( err ){
	log.error(err.stack);
	console.error(err.stack);
});

app.listen(80,function(){
	console.log("服务器已开启");
});