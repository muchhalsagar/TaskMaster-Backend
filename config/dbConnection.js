const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        mongoose.connect(process.env.DB_URL,{  
            useNewUrlParser: true,
            useUnifiedTopology: true,  
        });
        console.log('Application connect with MongoDB...');
        return mongoose.connections;
    } catch (error) {
        console.log('Error in DB Connection : ', error);
    }
};

module.exports = { dbConnection };