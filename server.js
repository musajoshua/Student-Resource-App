var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Student = require('./model/student');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

//mlab db defination
var url = "mongodb://students:abcd1234@ds143030.mlab.com:43030/students";
//connect to mongoose
mongoose.connect(url);
var db = mongoose.connection;

app.get('/', (req,res)=>{
	res.send('please use the /api/students');
});

//response object
var response = {};

//get students
app.get('/api/students', (req,res)=>{
	Student.getStudents((err,students)=>{
		if(err){
			throw err;
		}
		res.json(students);
	})
});

//get student by id
app.get('/api/students/:_id', (req,res)=>{
	var id = req.params._id;
	Student.getStudentById(id,(err,student)=>{
		if(err){
			throw err;
		}
		res.json(student);
	})
});

//add students
app.post('/api/students', (req,res)=>{
	var student = req.body;
	Student.addStudent(student, (err,students)=>{
		if(err){
			throw err;
		}
		if (students) {
			response.status = "success";
			response.message = "record successfully added";
		}else{
			response.status = "error";
			response.message = "record was not added";
		}
		res.json(response);
	})
});

//update students
app.put('/api/students/:_id', (req,res)=>{
	var id = req.params._id;
	var student = req.body;
	Student.updateStudent(id,student,{}, (err,students)=>{
		if(err){
			throw err;
		}
		if (students) {
			response.status = "success";
			response.message = "record successfully updated";
		}else{
			response.status = "error";
			response.message = "record was not updated";
		}
		res.json(response);
	})
});

//delete students
app.delete('/api/students/:_id', (req,res)=>{
	var id = req.params._id;
	Student.deleteStudent(id, (err,students)=>{
		if(err){
			throw err;
		}
		if (students) {
			response.status = "success";
			response.message = "successfully deleted";
		}else{
			response.status = "error";
			response.message = "record was not deleted";
		}
		res.json(response);
	})
})


app.listen(process.env.PORT || 3000);
console.log('app is running...')