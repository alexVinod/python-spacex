const mongoose = require("mongoose");

const LoginSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String },
    location: { type: String },
});

const LoginModel = mongoose.model("login", LoginSchema);
module.exports = LoginModel;



/**
 {
    "username": "vinod",
    "password": "12345",
    "email": "vinod@gmail.com",
    "location": "Chennai"
}
 */