const express=require("express");
const { sentMessageHandler, getAllChats, getMessagesOfSelectedUser, deleteAllMessagesHandler } = require("../controllers/chatsController");
const checkAuth = require("../middleware/auth");
const router=express.Router();



router.post("/send-message",checkAuth,sentMessageHandler );
router.get("/all-chats", checkAuth, getAllChats);
router.get("/", checkAuth, getMessagesOfSelectedUser);
router.delete("/deleteAllMessages", checkAuth, deleteAllMessagesHandler);




module.exports=router;