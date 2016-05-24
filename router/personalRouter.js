var personalRouter = express.Router();
personalRouter.all("/personal",personalControl.index);
personalRouter.get("/collect",personalControl.collectList);
personalRouter.post("/collect",upload.single('upfile'),personalControl.collectAdd);  
personalRouter.delete("/collect/:cid",personalControl.collectDel); 
module.exports = personalRouter;