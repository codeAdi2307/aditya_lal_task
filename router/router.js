import express from 'express';
import { createTask,editTask,viewAllTask,viewSingleTask,deleteTask } from '../controller/user.cont.js';
import { userSignUp,userSignIn } from '../controller/login.cont.js';
import { adminJwtVerify } from '../middleware/jwt.midlwre.js';


const router = express.Router();

router.post('/tasks',adminJwtVerify,createTask );

router.get('/tasks',adminJwtVerify, viewAllTask);

router.get('/tasks/:id',adminJwtVerify,viewSingleTask );

router.put('/tasks/:id',adminJwtVerify, editTask);

router.delete('/tasks/:id',adminJwtVerify, deleteTask);

router.post('/signin',userSignIn );

router.post('/signup',userSignUp );

export default router;