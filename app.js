
//start the code nodemon app.js
const express = require("express");

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
require("./db/connection");
const Student = require("./models/students");

// app.get("/",(req,res)=>{
//     res.send("hello from get ok this")
// })

app.get("/", async (req, res) => {
  try {
    //find({}) method to retrive all the student from mongodb
    const students = await Student.find();
    res.status(200).send(students);
  } catch (error) {
    res.status(500).send(error);
  }
});
//create post request
app.post("/students", async (req, res) => {
  try {
    const student = new Student(req.body);
    const createUser = await student.save();
    res.status(201).send({message:"student created successfully!",createUser});
  } catch (error) {
    res.status(400).send(error);
  }
});
//geting user by id
// app.get("/students/:id", async (req, res) => {
//   try {
//     const _id = req.params.id;
//     const studentData = await Student.findById(_id);
//     console.log(studentData)
//     if (!studentData) {
//       return res.status(404).send();
//     } else {
//       res.status(200).send(studentData);
//     }
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });


//getting user by name

app.get("/students/:name",async(req,res)=>{
    try {
        const name=req.params.name;
        // console.log("This is paaram result",name);
      //findinf the student by name
        const studentData=await Student.findOne({name})
       console.log(studentData)
        if(!studentData){
            return res.status(400).send();
        }else{
            res.status(200).send(studentData)
        }
    } catch (error) {
        res.status(400).send(error)
    }
})

app.delete("/students/:id",async(req,res)=>{
    try {
        const student_id=req.params.id;
        console.log(student_id)
        const deleteStudent=await Student.findOneAndDelete(student_id)
        if(!deleteStudent){
            return res.status(404).send({error:"Student not found"})
        }
        res.status(200).send({message:"Studenet deleted successfully",deleteStudent})
        

    } catch (error) {
        res.status(400).send(error)
    }
})

//making patch request 
app.patch("/students/:id",async(req,res)=>{
  try {
    const _id=req.params.id;
    const updateStudent=await Student.findByIdAndUpdate(_id,req.body,{
      new :true
    })
    res.status(200).send({message:"Update student successfully!",updateStudent})
    console.log("Student updated Data",updateStudent)
  } catch (error) {
    res.status(400).send(error)
  }
})
app.listen(port, () => {
  console.log(`Connection is setup ${port}`);
});
