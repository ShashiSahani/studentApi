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
    res.status(201).send(createUser);
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
        console.log("This is paaram result",name);
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
app.listen(port, () => {
  console.log(`Connection is setup ${port}`);
});
