const express = require('express');
const router = express.Router();
const taskController = require('../controller/task');

router.post('/task', taskController.createTask);
router.get('/task', taskController.getAllTasks);
router.get('/task/:id', taskController.getTaskById);
router.get('/getTaskByStatus/:status', taskController.getTaskByStatus);
router.get('/countTaskByStatus/:status/:term?', taskController.countTaskByStatus);
router.delete('/deleteTaskById/:id', taskController.deleteTaskById);
router.put('/updateTaskById/:id', taskController.updateTaskById);
router.put('/updateStatusById/:id', taskController.updateStatusById);
router.get('/search', taskController.searchTasks);

module.exports = router;