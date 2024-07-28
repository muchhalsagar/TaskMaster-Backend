const Task = require('../model/task.model');


/******************************************************
 * @task
 * @route http://localhost:5000/api/task
 * @description API for create a new task
 * @returns Test Message and task object
 ******************************************************/
exports.createTask = async (req, res) => {
    try {
        const { title, description, status } = req.body;
        if (!title || !status || !description) {
            return res.status(400).json({ message: 'All fields are required...' });
        }
        const existsTask = await Task.findOne({ title });
        if (existsTask) {
            return res.status(400).json({ message: 'Task already exists in DB' });
        }
        const newTask = new Task({
            title,
            status,
            description,
            date: new Date(),
        });
        const task = await newTask.save();
        res.status(201).json({ message: 'New Task Added Successfully...', task });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


/******************************************************
 * @task
 * @route http://localhost:5000/api/task
 * @description API for get all tasks
 * @returns Task object
 ******************************************************/
exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json({ message: 'View All Tasks...', tasks });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/******************************************************
 * @task
 * @route http://localhost:5000/api/task/:id
 * @description API for get specific task
 * @returns Task object
 ******************************************************/
exports.getTaskById = async (req, res) => {
    try {
        const id = req.params.id;
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'View Single Task...', task });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};  

/******************************************************
 * @getTaskByStatus
 * @route http://localhost:5000/api/getTaskByStatus/:status
 * @description API for get task by status
 * @returns Task object
 ******************************************************/
exports.getTaskByStatus = async (req, res) => {
    try {
        const status = req.params.status;
        const tasks = await Task.find({ status });
        res.status(200).json({ message: 'View Tasks By Status...', tasks });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/******************************************************
 * @countTaskByStatus
 * @route http://localhost:5000/api/countTaskByStatus/:status
 * @description API for count task by status
 * @returns Task object
 ******************************************************/
exports.countTaskByStatus = async (req, res) => {
    try {
        const status = req.params.status;
        const term = req.params.term || '';
        const count = await Task.countDocuments({
            status,
            title: { $regex: term, $options: 'i' },
        });
        res.status(200).json({ message: `Total ${status} tasks`, count });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/******************************************************
 * @deleteTaskById
 * @route http://localhost:5000/api/deleteTaskById/:id
 * @description API for delete a task by id
 * @returns Message for delete
 ******************************************************/
exports.deleteTaskById = async (req, res) => {
    try {
        const id = req.params.id;
        const task = await Task.findByIdAndDelete(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully', task });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/******************************************************
 * @updateTaskById
 * @route http://localhost:5000/api/updateTaskById/:id
 * @description API for update a task by id
 * @returns Message for update
 ******************************************************/
exports.updateTaskById = async (req, res) => {
    try {
        const id = req.params.id;
        const { title, status, description, date } = req.body;
        if (!title || !status || !description || !date) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const task = await Task.findByIdAndUpdate(
            id,
            { $set: { title, status, description, date } },
            { new: true }
        );
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task updated successfully', task });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/******************************************************
 * @updateStatusById
 * @route http://localhost:5000/api/updateStatusById/:id
 * @description API for update a Status by id
 * @returns Message for update Status
 ******************************************************/
exports.updateStatusById = async (req, res) => {
    try {
        const id = req.params.id;
        const { status } = req.body;
        if (!status) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const task = await Task.findByIdAndUpdate(
            id,
            { $set: { status } },
            { new: true }
        );
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Status updated successfully', task });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


/********************************************** 
*@search
*@route http://localhost:5000/api/task/search
*@Description API for Search Task By Title
*@return Task object
**********************************************/
exports.searchTasks = async (req, res) => {
    const term = req.query.term || '';
    try {
        const tasks = await Task.find({
            title: { $regex: term, $options: 'i' },
        });
        res.status(200).json({ message: 'View Task:', tasks });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};