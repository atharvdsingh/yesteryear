import {Router} from 'express'
import { createAccount, loginuser, logoutUser } from '../controllers/user.controllers.js'
import { checkJwt } from '../middlewares/auth.middleware.js';
import { CreateBlog } from '../controllers/blog.controllers.js';

const user=Router()

user.route('/register').post(createAccount);
user.route('/login').post(loginuser)
user.route('/logout').post(checkJwt,logoutUser)


export default user