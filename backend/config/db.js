const mongoose=require("mongoose");

const conectDb=async()=>{
    try
    {const connection=await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected");
} catch(error){
    console.log("Error connecting to database:", error);
}
}


module.exports=conectDb;