angular.module('myApp', [
'ngResource',
'ui.router',
'ui.bootstrap',
'myApp.controllers',
'myApp.services',
'myApp.directives'
])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
	$stateProvider
		.state('index', {
			url: "",
			templateUrl: "/js/app/partials/index.html",
			controller:'IndexCtrl',
			resolve: {
				lists: function(List){
					var lst = List.query();
					return lst;
				}
			}
		})
	    .state('add', {
	    	url: "/add_list",
	    	templateUrl: "/js/app/partials/addList.html",
	    	controller: "AddListCtrl"
	    })
	    .state('view', {
	    	url: "/list/:id",
	    	templateUrl: "/js/app/partials/viewList.html",
	    	controller: 'ViewListCtrl',
	    	resolve: {
	    		list: function($stateParams, List){
		    		return List.query({id: $stateParams.id});
		    	}
	    	}
	    })
	    .state('editTask', {
	    	url: "/list/:list_id/task/:id",
	    	templateUrl: "/js/app/partials/addTask.html",
	    	controller: "EditTaskCtrl",
	    	resolve: {
	    		task: function($stateParams, Task){
		    		return Task.get({id: $stateParams.id});
		    	},
		    	list: function($stateParams){
		    		return $stateParams.list_id;
		    	}
	    	}
	    });
    $urlRouterProvider.otherwise("");
}]);