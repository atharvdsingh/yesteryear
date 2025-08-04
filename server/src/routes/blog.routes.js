import { Router } from "express";
import {checkJwt} from "../middlewares/auth.middleware.js"
import { CreateBlog } from "../controllers/blog.controllers.js";
import {getAllBlog} from "../controllers/blog.controllers.js"

const router=Router()
router.route('/createblog').post(checkJwt,CreateBlog)
router.route('/getallblog').post(checkJwt,getAllBlog)
export default router