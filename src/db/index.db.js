const mongoose = require('mongoose');
const { DB_NAME } = require('../constants');

async function connectDB() {
   try{
    await mongoose.connect(
        `${process.env.MONGODB_URI}/${DB_NAME}`
    )
    console.log("Database Connected ")
   }catch(err){
    console.error("Database Connection Failed: ", err.message);
    console.error(err.stack);
   }
}