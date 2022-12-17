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
app.get("/jobs", async (req, res) => {
    const { page, limit, sort, filter } = req.query;
    console.log(page, limit, sort, filter);
    if (filter != undefined) {
      const Jobs = await JobModel.find({ role: filter })
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ postedAt: sort });
      res.send(Jobs);
    } else {
      const Jobs = await JobModel.find({})
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ postedAt: sort });
      res.send(Jobs);
    }
    // app.use("/jobs",jobs)
  });



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