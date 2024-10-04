const connectDB = require('./connection');
const userDataModel = require('./userModel');
const data = require('../../login/client/data/users.json');
connectDB('mongodb+srv://2005raheelkhan:2005@cluster0.c47vh.mongodb.net/');

const upload = async ()=>{
    await userDataModel.create(data)
    .then(()=>console.log("Successfully Uploaded"))
    .catch((err)=>console.log(err));
}
upload();