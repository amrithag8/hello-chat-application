const mongoose = require("mongoose");
const Chats = require("../models/chatModel");

exports.sentMessageHandler = async (req, res) => {
  const { receiverID, userID, message } = req.body;
  await Chats.create({ senderID: userID, receiverID, message });
  const getChats = await Chats.find({
    $or: [
      { senderID: receiverID, receiverID: userID },
      { senderID: userID, receiverID },
    ],
  });
  console.log("getChats");
  res.status(200).json(getChats);
};

exports.getAllChats = async (req, res) => {
  const allChats = await Chats.find({
    $or: [{ senderID: req.body.userID }, { receiverID: req.body.userID }],
  })
    .populate("senderID")
    .populate("receiverID")
    .sort({ createdAt: -1 }, { new: true });

  const userChats = new Map();
  let chatPartner;
  allChats.forEach((element) => {
    chatPartner =
      element.senderID._id.toString() === req.body.userID
        ? element.receiverID
        : element.senderID;

    if (!userChats.has(chatPartner._id.toString())) {
      userChats.set(chatPartner._id.toString(), {
        fullName: chatPartner.fullName,
        _id: chatPartner._id,
        lastMessage: element.message,
        lastMessageTime: element.createdAt,
      });
    }
  });

  const chatList = Array.from(userChats.values());

  res.status(200).json(chatList);
};

exports.getMessagesOfSelectedUser = async (req, res) => {
  console.log("other user", req.query.user);
  console.log("user", req.body.userID);
  const getChats = await Chats.find({
    $or: [
      { senderID: req.query.user, receiverID: req.body.userID },
      { senderID: req.body.userID, receiverID: req.query.user },
    ],
  });
  // console.log("getChats", getChats);

  res.status(200).json(getChats);
};

exports.deleteAllMessagesHandler = async (req, res) => {
  console.log("delet", req.body);
  const { deletedID, userID } = req?.body;
  await Chats.deleteMany({
    $or: [
      { senderID: userID, receiverID: deletedID },
      { senderID: deletedID, receiverID: userID },
    ],
  });

  const deletedData = await Chats.find({
    $or: [
      { senderID: userID, receiverID: deletedID },
      { senderID: deletedID, receiverID: userID },
    ],
  });

  console.log("deletedData", deletedData);
  res.status(200).json(deletedData);
};
