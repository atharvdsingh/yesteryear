import {Router} from 'express'
import { createAccount, loginuser, logoutUser } from '../controllers/user.controllers.js'
import { checkJwt } from '../middlewares/auth.middleware.js';

const router=Router()

router.route('/register').post(createAccount);
router.route('/login').post(loginuser)
router.route('/logout').post(checkJwt,logoutUser)
export default router