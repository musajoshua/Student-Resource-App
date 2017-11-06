var app = angular.module('studentApp',['ui.router','oitozero.ngSweetAlert']);

app.config(["$stateProvider","$urlRouterProvider" ,function($stateProvider, $urlRouterProvider){

	$urlRouterProvider.otherwise('/add_student');

	$stateProvider.
	//add student
	state('add_student' ,{
		url : '/add_student',
		templateUrl : 'views/add_student.html',
		controller : 'addstudentCtrl'
	}).
	//view student
	state('view_student' ,{
		url : '/view_student',
		templateUrl : 'views/view_student.html',
		controller : 'viewstudentCtrl'
	}).
	//update student
	state('update_student' ,{
		url : '/update_student/:id',
		templateUrl : 'views/update_student.html',
		controller : 'updatestudentCtrl'
	});

}]);