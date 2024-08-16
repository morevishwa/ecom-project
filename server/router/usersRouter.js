const express = require("express");
const encryptPassword = require("../middleware/encryptPassowrd");
const { userRegistration, userLogin, getAllUsers, getuserDetails } = require("../controllers/userController");
const isAuth = require("../middleware/auth");
// const userRegistration = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/register",encryptPassword,userRegistration)
userRouter.post("/login",userLogin)
userRouter.get("/",getAllUsers)
userRouter.get("/getuserdetails",isAuth,getuserDetails)
// encryptPassword
module.exports = userRouter