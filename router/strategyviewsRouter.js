var strategyviewsRouter = express.Router();
strategyviewsRouter.get("/",strategyviewsControl.index);
strategyviewsRouter.get("/views/:sid",strategyviewsControl.previews);
module.exports = strategyviewsRouter;