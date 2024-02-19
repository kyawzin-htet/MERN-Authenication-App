const mongoose = require('mongoose');
const {MongoMemoryServer} = require('mongodb-memory-server')
require('dotenv').config();

const conn = async()=>{
    const mongod = await MongoMemoryServer.create();
    const getUri = mongod.getUri();
    mongoose.set('strictQuery', true)
    const db = await mongoose.connect("mongodb+srv://mernauthapp:mernauthapp@emaily.bmu05.mongodb.net/mernauthapp?retryWrites=true&w=majority")
    // const db = await mongoose.connect(getUri);
    console.log("database connected")
    return db;
}
module.exports = conn;