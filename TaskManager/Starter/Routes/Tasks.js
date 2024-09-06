const express = require('express');
const router = express.Router();

const{ getalltasks, Createtask, GetSingletask, Updatetask, Deletetask} = require('../Controllers/tasks') 



router.route('/').get(getalltasks).post(Createtask)
router.route('/:id').get(GetSingletask).patch(Updatetask).delete(Deletetask)
module.exports =router;