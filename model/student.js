var mongoose = require('mongoose');

//student schema
studentSchema = mongoose.Schema({
	lastName : {
		type : String,
		required : true
	},
	firstName : {
		type : String,
		required : true
	},
	department : {
		type : String,
		required : true
	},	
	matricNo : {
		type : String,
		required : true
	},
	gender : {
		type : String,
		required : true
	},
	level : {
		type : Number,
		required : true
	},
	dateOfBirth : {
		type : String,
		required : true
	}
});

var Student = module.exports = mongoose.model('Students',studentSchema);

//get students
module.exports.getStudents = (callback,limit) => {
	Student.find(callback).limit(limit);
}

//get student by id
module.exports.getStudentById = (id,callback) => {
	Student.findById(id,callback);
}

//add students
module.exports.addStudent = (student,callback) => {
	Student.create(student,callback);
}

//update students
module.exports.updateStudent = (id,student,options,callback) => {
	var query = {_id : id};
	var update = student;
	Student.findOneAndUpdate(query,update,options,callback);
}

//delete students
module.exports.deleteStudent = (id,callback) => {
	var query = {_id : id};
	Student.remove(query,callback);
}
