
//create shecma
const mongoose=require('mongoose');

const validator=require('validator');



const studendSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
    },
    email:{
        type:String,
        unique:[true,"Email id Already present"],
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email")
            }
        }
    },
    phone:{
        type:Number,
      
        required:true,
        unique:true,

    },
    address:{
        type:String,
        require:true
    }
})


const Student= new mongoose.model("Student",studendSchema);

module.exports=Student;