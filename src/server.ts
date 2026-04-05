import { Request, Response } from "express";
import app from "./app";
import { connectDB } from "./config/db-connection";
import dns from "dns"

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const PORT = process.env.PORT || 8000;
app.get("/", (req:Request,res:Response)=>{
    res.send("Backend is running")
})
connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("Server is Running in port " + PORT)
    })
})
.catch((err)=>{
    console.log("error connecting to DB", err)
})