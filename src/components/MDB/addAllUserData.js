const connectDB = require('./connection');
const userDataModel = require('./userDataModel');
const data = require('../../login/client/data/userData.json');
connectDB('mongodb+srv://2005raheelkhan:2005@cluster0.rtfng.mongodb.net/');

const upload = async ()=>{
    await userDataModel.create(data)
    .then(()=>console.log("Successfully Uploaded"))
    .catch((err)=>console.log(err));
}
upload();