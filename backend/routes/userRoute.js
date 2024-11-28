const express=require("express");
const router=express.Router();

const { registerUser, userLogin, searchUser } = require("../controllers/userController");
const checkAuth = require("../middleware/auth");


router.post("/register-user", registerUser);
router.post("/login", userLogin);
router.get("/search-user",checkAuth ,searchUser);




module.exports=router;