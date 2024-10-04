const connectDB = require('./connection');
const contestModel = require('./contestModel');
const data = require('../data.json');
connectDB('mongodb+srv://2005raheelkhan:2005@cluster0.c47vh.mongodb.net/');


const upload = async ()=>{
    await contestModel.create(data)
    .then(()=>console.log("Successfully Uploaded"))
    .catch((err)=>console.log(err));
}
upload();