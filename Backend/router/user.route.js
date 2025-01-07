import {signUP, Login, userCredits} from '../controller/user.controller.js'
import express from 'express';
import userAuth from '../middleware/auth.js';

const userRouter = express.Router()

userRouter.post('/signup', signUP)
userRouter.post('/login', Login)
userRouter.get('/credits',userAuth, userCredits)

export default userRouter

//localhost:4000/api/user/signup
//localhost:4000/api/user/login
//localhost:4000/api/user/credits