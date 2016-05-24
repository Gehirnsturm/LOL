var registerRouter = express.Router();														 
registerRouter.post("/register",registerControl.adminAdd);
module.exports = registerRouter;