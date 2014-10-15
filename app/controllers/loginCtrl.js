app.controller('loginCtrl', function($scope, $rootScope, sesion) {

    $scope.inicio = function(){

        $scope.user = '';
        $scope.psw = '';
        $rootScope.mensaje = '';
        $rootScope.nocargando = true;
        $rootScope.cargando = false;
    }

    $scope.login = function(){

        $rootScope.nocargando = false;
        $rootScope.cargando = true;
        $rootScope.mensaje = '';
        sesion.login($scope.user,$scope.psw);
    }
    
});