const express=require("express");

const app=express();
const port =process.env.PORT || 3000;
app.use(express.json())
require("./db/connection")
const Student=require('./models/students')

app.get("/",(req,res)=>{
    res.send("hello from get ok this")
})
// app.post("/students",(req,res)=>{
//     console.log(req.body )
//     const user= new Student(req.body)
//    user.save().then(()=>{
   
//    }).catch((e)=>{
// res.status(400).send(e)
//    })
//     // res.send("Heloo from post  djewjdfgfc api")
// })

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