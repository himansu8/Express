import express from 'express';
import { createTask } from '../controller/task.controller.js';
import authMiddleware from '../middlewares/auth/veriftToken.js';


const router = express.Router();

/*
description: create a single task
method :post
api_url: api/task
*/
router.post('/',authMiddleware, createTask);

/*
description: get a all task
method :get
api_url: api/task
*/
router.get('/',authMiddleware );


/*
description: get a single task
method :get
api_url: api/task/:taskid
*/
router.get('/:taskid',authMiddleware);


/*
description: update a single task
method :patch
api_url: api/task/:taskid
*/
router.patch('/:taskid',authMiddleware);

/*
description: delete a single task
method :delete
api_url: api/task/:taskid
*/
router.delete('/:taskid',authMiddleware);




export default router;