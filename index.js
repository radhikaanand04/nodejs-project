const express = require('express');
const app = express();
app.use(express.json());
const Student = require('./models/students');

const dotenv = require('dotenv');
dotenv.config();

app.listen(3000,() => {
    console.log("Server running on port 3000");
});

app.get('/',(req,res) =>{
    res.send("This is a get method");
});

app.get('/api/students',async(req,res) =>{
    try{
      const student = await Student.find({});
      res.status(200).json(student);
    }
    catch(error){
      res.status(500).json({message : error.message});
    }
  });

  app.get('/api/students/:id',async(req,res) =>
    {
      try{
      const {id} = req.params;
      const student = await Student.findById(id);
      res.status(200).json(student);
      }
      catch(error){
        res.status(500).json({message:error.message});
      }
    });

app.post('/api/students',async(req,res) =>{
    try{
        const student = await Student.create(req.body);
        res.status(200).json(student);
    }
    catch(error){
        res.status(500).json({message : error.message});
    }
});

app.put('/api/students/:id',async(req,res) =>
  {
    try{
      const {id} = req.params;
      const student = await Student.findByIdAndUpdate(id,req.body);
      if(!student)
      {
        res.status(404).json({message:"Student not found in database"});
      }
      const updatedStudent = await Student.findById(id);
      res.status(200).json(updatedStudent);
    }
    catch(error){
      res.status(500).json({message : error.message});
    }
  });

  app.delete('/api/students/:id',async(req,res) =>
    {
      try{
        const {id} = req.params;
        const student = await Student.findByIdAndDelete(id);
        if(!student){
          return res.status(404).json({message:"Student not found"});
        }
        res.status(200).json({message : 'Student record deleted successfully'});
      }
      catch(error){
        res.status(500).json({message : error.message});
      }
    });
    

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_CONNECTION_STRING)
.then(() =>
{
    console.log("Mongodb connected");
})
.catch((err) =>
{
    console.log("Connection error",err);
})