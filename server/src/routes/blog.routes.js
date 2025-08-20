import { Router } from "express";
import {checkJwt} from "../middlewares/auth.middleware.js"
import { CreateBlog } from "../controllers/blog.controllers.js";
import {getAllBlog} from "../controllers/blog.controllers.js"

const router=Router()
router.route('/create-blog').post(checkJwt,CreateBlog)
router.route('/get-all-blog').post(checkJwt,getAllBlog)
export default router