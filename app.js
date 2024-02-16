const express=require("express");

const app=express();
const port =process.env.PORT || 3000;
app.use(express.json())
require("./db/connection")
const Student=require('./models/students')

// app.get("/",(req,res)=>{
//     res.send("hello from get ok this")
// })

app.get("/", async(req,res)=>{
    try {
        const students=await Student.find();
        res.status(200).send(students)
    } catch (error) {
     res.status(500).send(error)   
    }
})
//create post request
app.post("/students",async(req,res)=>{
    try {
        const user=new Student(req.body)
        const createUser=await user.save();
        res.status(201).send(createUser)
    } catch (error) {
        res.status(400).send(error)
    }
})

app.listen(port,()=>{
    console.log(`Connection is setup ${port}`)
})