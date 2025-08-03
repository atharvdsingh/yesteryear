import {Router} from 'express'
import { createAccount, loginuser } from '../controllers/user.controllers.js'

const router=Router()

router.route('/register').post(createAccount);
router.route('/login').post(loginuser)

export default router