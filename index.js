const connection = require("./Config/db")
require("dotenv").config()

const express = require("express")
const cors = require("cors")
const JobModel= require("./Models/job.models")


const app = express()
app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{
    res.send("Welcome HomePAge")
})

//GET JOB
app.get("/jobs", async(req,res)=>{
    const jobs = await JobModel.find()
    res.send(jobs)
    // app.use("/jobs",jobs)
})



//JOB POST
app.post("/admin", async(req,res)=>{
    const addjobs = new JobModel(req.body);
    await addjobs.save()
    res.send("added")
})




app.listen(process.env.PORT || 8080,async()=>{
    try {
        await connection;
        console.log("Database Connected")
    } catch (error) {
        console.log("Not able to connect with Database")
        console.log(error)
    }
    console.log(`Server started at ${process.env.PORT}`)
})