app.controller('addstudentCtrl', function($scope,$state,$http,SweetAlert){

	//defining loader
	$scope.loading = () => {
		$scope.loader = true;
		$scope.newStudent = false;
	}

	$scope.notLoading = () => {
		$scope.loader = false;
		$scope.newStudent = true;
	}

	$scope.notLoading();

	//add student fucnction
	$scope.addStudent = (student) => {
		$scope.loading();
		$http.post('/api/students',student).then(
		(res) => {
			if(res.status == '200'){
				$scope.notLoading();
				$scope.student = {};
				SweetAlert.swal('Success',res.data.message,'success');
			}else{
				$scope.notLoading();
				SweetAlert.swal('Error',res.data.message,'error');
			}
		},
		(error) => {
			$scope.notLoading();
			SweetAlert.swal('Error','Check Internet Connection','error');
		});
	}
});

app.controller('viewstudentCtrl', function($scope,$state,$http,SweetAlert){

	//definining loader
	$scope.loading = () => {
		$scope.loader = true;
		$scope.viewStudent = false;
	}

	$scope.notLoading = () => {
		$scope.loader = false;
		$scope.viewStudent = true;
	}

	//view student function
	$scope.getStudents = () => {
		$scope.loading();
		$http.get('/api/students').then(
		(res) => {
			if (res){
				$scope.notLoading();
				$scope.students = res.data;
			}else{
				$scope.notLoading();
				SweetAlert.swal('Error','Couldnot Connect to Database');  
			}
		},
		(error) => {
			$scope.notLoading();
			SweetAlert.swal('Error','Check Internet Connection','error');
		});
	}
});

app.controller('updatestudentCtrl', function($scope,$state,$http,SweetAlert,$stateParams){
	//id from url
	var id = $stateParams.id;

	//defining loader
	$scope.loading = () => {
		$scope.loader = true;
		$scope.updateStudent = false;
	}

	$scope.notLoading = () => {
		$scope.loader = false;
		$scope.updateStudent = true;
	}	

	//to check if id is valid
	checkDb = (data,db) => {
		for(var i = 0; i < db.length; i++){
          if(db[i]._id === data){
          	return true
          }
		}
		return false;
	}
	$scope.checkValid = () => {
		$scope.loading();
		$http.get('/api/students').then(
		(res) => {
			if (res){
				$scope.allStudents = [];
				$scope.allStudents = res.data;
				if (checkDb(id,$scope.allStudents)){
					$http.get('/api/students/' + id).then(
					(res) => {
						if (res.status == '200') {
							$scope.notLoading();
							$scope.student = res.data;
							$scope.student.dateOfBirth = new Date($scope.student.dateOfBirth);
						}else{
							$scope.notLoading();
							SweetAlert.swal('Error','Please Enter a valid id','error');
							$state.go('view_student');
						}
					}, (err) => {
						$scope.notLoading();
						SweetAlert.swal('Error','Please Check Internet Connection','error');
						$state.go('view_student');
					})
					
				}else{
					$scope.notLoading();
					SweetAlert.swal('Error','Please Enter a valid id','error');
					$state.go('view_student');
				}
			}else{
				$scope.notLoading();
				SweetAlert.swal('Error','Couldnot Connect to Database');  
			}
		}, (err) => {
			$scope.notLoading();
			SweetAlert.swal('Error','Check Internet Connection','error');
		});
	}


	
	//delete function
	$scope.deleteStudent = (id) => {
		SweetAlert.swal({
		   title: "Are you sure?",
		   text: "Your will not be able to recover this record file!",
		   type: "warning",
		   showCancelButton: true,
		   confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
		   cancelButtonText: "No!",
		   closeOnConfirm: false,
		   closeOnCancel: false }, 
		(isConfirm) => { 
		   if (isConfirm) {
		   	$scope.loading();
		   	$http.delete('/api/students/' + id).then( 
			(res) => {
				if (res.data.status == 'success') {
					$scope.notLoading();
					SweetAlert.swal('Success',res.data.message,'success');
			      	$state.go('view_student');
				}
			}, (err) => {
				$scope.notLoading();
				SweetAlert.swal('Error','Please Check Internet Connection','error');
			});
		   } else {
		   	$scope.notLoading();
		      SweetAlert.swal("Cancelled", "Your record file is safe :)", "error");
		   }
		});
	}

	//update function
	$scope.saveStudent = (id,student) => {
		$scope.loading();
		$http.put('/api/students/' + id,student).then( 
		(res) => {
			if (res.data.status == 'success') {
				$scope.notLoading();
				SweetAlert.swal('Success',res.data.message,'success');
				$state.go('view_student');
			}
		}, (err) => {
			$scope.notLoading();
			SweetAlert.swal('Error','Please Check Internet Connection','error');
		});
	}
});