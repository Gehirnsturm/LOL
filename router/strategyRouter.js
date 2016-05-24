var strategyRouter = express.Router();
//restful接口规范
strategyRouter.get("/admin",strategyControl.admin);
strategyRouter.get("/strategy",strategyControl.strategyList);
strategyRouter.get("/strategy/:sid",strategyControl.previews);
strategyRouter.post("/strategy",strategyControl.strategyAdd);
strategyRouter.delete("/strategy/:sid",strategyControl.strategyDel); 
module.exports = strategyRouter;