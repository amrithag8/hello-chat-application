const mongoose=require("mongoose");
const {ObjectId}=mongoose.Schema.Types;

const chatSchema=mongoose.Schema({
    senderID:{
        type:ObjectId,
        ref:"User",
        required:true
    },
    receiverID:{
        type:ObjectId,
        ref:"User",
        required:true
    },
    message:{
        type:String,
        required:true
    },
    unRead:{type:Boolean}
},{
    timestamps:true
})

module.exports=mongoose.model("Chats",chatSchema );