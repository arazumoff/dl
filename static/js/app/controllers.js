angular.module('myApp.controllers', [])
.controller('IndexCtrl', ['$scope', 'lists', function($scope, lists) {
	$scope.lists = lists;
}])
.controller('AddListCtrl', ['$scope', '$state', 'List', function($scope, $state, List) {
	$scope.cancel = function(){
		
	}
	$scope.add = function(){
		var item = new List();
		item.name = $scope.title;
		item.tasks = [];
		item.$save({}, function(obj){
			$state.go('view', {id: obj.id});
		});
	}
}])
.controller('ViewListCtrl', ['$scope', 'list', 'Task', function($scope, list, Task) {
	$scope.list = list;
	$scope.form = {};
	$scope.tasks = list.tasks;
	$scope.show_form = false;
	$scope.isVisible = false;
	$scope.dateOptions = {
		'year-format': "'yy'",
		'starting-day': 1
	};
	$scope.removeTask = function(index, task){
		Task.delete({id:task.id}, function(){
			$scope.list.tasks.splice(index, 1);
		});
	}
	$scope.open = function($event) {
	    $event.preventDefault();
	    $event.stopPropagation();

	    $scope.opened = true;
	  };
	$scope.openForm = function(){
		$scope.show_form = true;
		$scope.isNew = true;
	}
	$scope.cancelTask = function(){
		$scope.show_form = false;
	}
	$scope.addTask = function(form){
		var task = new Task();
		task.list = list.resource_uri;
		task.title = $scope.form.title;
		task.$save({}, function(n){
			$scope.list.tasks.push(n);
			$scope.form = {};
		});
	}
}])
.controller('EditTaskCtrl', ['$scope', '$state', 'task', 'list', 'Task', function($scope, $state, task, list, Task) {
	$scope.form = task;
	$scope.dateOptions = {
		'year-format': "'yy'",
		'starting-day': 1
	};
	$scope.open = function($event) {
	    $event.preventDefault();
	    $event.stopPropagation();

	    $scope.opened = true;
	};
	$scope.updateTask = function(){
		task.$save({}, function(u, res){
			console.log('yes');
			$state.go('view', {id:list});
		});
	}
}]);