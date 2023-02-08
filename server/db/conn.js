const mongoose = require('mongoose');
const {MongoMemoryServer} = require('mongodb-memory-server')
require('dotenv').config();

const conn = async()=>{
    const mongod = await MongoMemoryServer.create();
    const getUri = mongod.getUri();
    mongoose.set('strictQuery', true)
    const db = await mongoose.connect(process.env.MONGO_DB_URL)
    // const db = await mongoose.connect(getUri);
    console.log("database connected")
    return db;
}
module.exports = conn;