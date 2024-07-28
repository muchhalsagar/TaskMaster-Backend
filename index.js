const express = require('express');
const app = express();
const { dbConnection } = require('./config/dbConnection');
const TaskRoutes = require('./routes/task');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

dbConnection();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', TaskRoutes);

app.get('/', async (req, res) => {
    res.send('Hello World....');
}).listen(process.env.PORT, () => {
    console.log(`App running on : http://localhost:${process.env.PORT}`);
});