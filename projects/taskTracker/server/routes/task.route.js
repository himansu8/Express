import express from 'express';
import { createTask } from '../controller/task.controller.js';
import authMiddleware from '../middlewares/auth/veriftToken.js';


const router = express.Router();


router.post('/',authMiddleware, createTask);


export default router;