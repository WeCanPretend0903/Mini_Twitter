const mongoose = require("mongoose");
//const connect = mongoose.connect()
const connect = mongoose.connect("mongodb://localhost:27017/Login-Signin");

connect.then(() => {
    console.log("Database connected Succesfully");
})
.catch(()=>{
    console.log("Database cannot be connected", error);
});

const LoginSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

});

const collection = new mongoose.model("LSauth",LoginSchema);
module.exports = collection;