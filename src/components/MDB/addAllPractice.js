const connectDB = require('./connection');
const practiceModel = require('./practiceModel');
const data = require('../pdata.json');
connectDB('mongodb+srv://2005raheelkhan:2005@cluster0.c47vh.mongodb.net/');

const upload = async ()=>{
    await practiceModel.create(data)
    .then(()=>console.log("Successfully Uploaded"))
    .catch((err)=>console.log(err));
}
upload();