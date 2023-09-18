const mongoose = require('mongoose');

const dbConnect = async ()=>{
    try {
       const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log('DB connected Succesfully',conn.connection.host);
    } catch (error) {
        console.log('error', error)
    }
}

module.exports = dbConnect;