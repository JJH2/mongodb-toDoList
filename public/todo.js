const myTodo = angular.module('myTodo', []);

function mainController($scope, $http) {
    $scope.formData = {};
    $http.get('/todos')
        .success(function(data) {
            $scope.todos = data;
        })
        .error(function(err) {
            console.log('err=' + err);
        })
    $scope.createTodo = function() {
        $http.post('/todos', $scope.formData)
            .success(function(data) {
                $scope.formData = {}
                $scope.todos = data;
                console.log(data);
            })
            .error(function(err) {
                console.log('err=' + err)
            })
    }
    $scope.deleteTodo = function(id) {
        $http.delete('/todos/' + id)
            .success(function(data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function(err) {
                console.log('err=' + err)
            })
    }
}