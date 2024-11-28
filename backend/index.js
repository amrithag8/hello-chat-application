const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const connectDb = require("./config/db");
const userRoute = require("./routes/userRoute");
const chatsRoute=require("./routes/chatsRoute");
const { createServer } = require("http");
const server = createServer(app);


const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

connectDb();
app.use(cors());
app.use(express.json());
app.use("/", userRoute);
app.use("/messages",chatsRoute );
let users = [];


// Add logged in users to users array
const addusers = (userID, socketID) => {
  !users.some((user) => userID === user.userID) &&
    users.push({ userID, socketID });
};


// remove logged out users from users array
const removeUser = (socketID) => {
  users.filter((user) => {
    return user.socketID !== socketID;
  });
};


const getUsers = (receiverID) => {
  return users.find((user) => user.userID === receiverID);
};


io.on("connection", (socket) => {
  console.log("a user connected", socket.id);


  // add a new user by calling addUsers fn
  socket.on("userID", (data) => {
    const { userID } = data;
    addusers(userID, socket.id);
    
    io.emit("all users", users);
  });



  socket.on("disconnect", () => {
    console.log("user disconnected");
    removeUser(socket.id);
    io.emit("all users", users);
  });


socket.on("send_msg", (data)=>{
    console.log("send msg data");
    const{message, senderID, receiverID}=data;
    const receiver=getUsers(receiverID);
    console.log("send msg data",data);
    console.log("receiver",receiver);
    io.to(receiver?.socketID).emit("receive_msg", {senderID, receiverID, message});
})

});







const PORT = 3000;
server.listen(PORT, () => {
  try {
    console.log(`server running on http://localhost:${PORT}`);
  } catch (error) {
    console.log("error", error);
  }
});
