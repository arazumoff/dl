angular.module('myApp.services', ['ngResource'])
.factory('List', function($resource){
	return $resource('/api/v1/list/:id/ ', null,{
		query: {method:'GET', isArray:false},
	});
})
.factory('Task',  function($resource){
	return $resource('/api/v1/task/:id/ ', null, {
		query: {method:'GET', isArray:false},
	});
})