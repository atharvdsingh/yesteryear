import {Router} from 'express'
import { createAccount } from '../controllers/user.controllers.js'

const router=Router()

router.route('/register').post(createAccount);

export default router