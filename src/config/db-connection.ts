const {connect, disconnect} = require("mongoose");

async function connectDB(): Promise<void>{
    const mongoURL = process.env.MONGODB_URL_STRING;
    if(!mongoURL){
        throw new Error("MongoDB connection string is not defined in enviromental variable")
    }
    try{
        await connect(mongoURL);
        console.log("connected to MongoDB database")
    }
    catch(err){
        console.error("Failed to connect to MongoDB", err)
    }
}

async function disconnectDB(): Promise<void>{
    try{
        await disconnect()
    }
    catch(err){
        console.log(err);
        throw new Error("Failed to disconnect Database")
    }
}

export { connectDB, disconnectDB}