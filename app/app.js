//inicializamos la aplicacion
var app = angular.module('app', ['ui.bootstrap', 'ngCookies','ngRoute','ngAnimate','angularFileUpload','datatables']);

//configuramos nuestra aplicacion
app.config(function($routeProvider){

    //Configuramos la ruta que queremos el html que le toca y que controlador usara
    $routeProvider.when('/busqueda/provedores',{
            templateUrl: 'views/busquedaProvedor.html',
            controller : 'busquedaProvedorCtrl'
    });

    $routeProvider.when('/home',{
            templateUrl: 'views/home.html',
            controller : 'homeCtrl'
    });

    $routeProvider.when('/login',{
            templateUrl: 'views/login.html',
            controller : 'loginCtrl'
    });

    $routeProvider.when('/provedor',{
            templateUrl: 'views/provedor.html',
            controller : 'provedorCtrl'
    });
    
    $routeProvider.otherwise({redirectTo:'/login'});

});


//sirve para ejecutar cualquier cosa cuando inicia la aplicacion
app.run(function ($rootScope ,$cookies, $cookieStore, sesion, $location){

    //evento que verifica cuando alguien cambia de ruta
    $rootScope.$on('$routeChangeStart', function(){

        $rootScope.cerrar = false;
        $rootScope.username =  $cookies.username;

        sesion.checkStatus();

    });


    //funcion en angular
    $rootScope.logout = function(){

        sesion.logout();
    } 

    //generamos al rootscope las variables que tenemos en las cookies para no perder la sesion 
    $rootScope.username =  $cookies.username;

});


//servicio que verifica sesiones de usuario
app.factory("sesion", function($cookies,$cookieStore,$location, $rootScope, $http)
{
    return{
        login : function(username, password)
        {   
            $http({
                url:'api/api.php?funcion=login',
                method:'POST', 
                contentType: 'application/json', 
                dataType: "json", 
                data:{user:username,psw:password}
            }).success( function (data){

                if (data.respuesta) {
                    $rootScope.mensaje = data.respuesta;
                    $rootScope.nocargando = true;
                    $rootScope.cargando = false;

                }else{

                    $rootScope.username = data[0].Usu_nombre;
                    $cookies.username = data[0].Usu_nombre;
                    $location.path("/home");
                    //console.log(data);
                }
            });



        },
        logout : function()
        {
            //al hacer logout eliminamos la cookie con $cookieStore.remove y los rootscope
            $cookieStore.remove("username"),
            $rootScope.username =  '';

            //mandamos al login
            $location.path("/login");

        },
        checkStatus : function()
        {
            //verifica el estatus de la sesion al cambiar de ruta 
            //si manda alguna ruta direfente de login y no tiene sesion activa en cookies manda a login
            if($location.path() != "/login" && typeof($cookies.username) == "undefined")
            {   
                $location.path("/login");
            }
            //en el caso de que intente acceder al login y ya haya iniciado sesión lo mandamos a la home
            if($location.path() == "/login" && typeof($cookies.username) != "undefined")
            {
                $location.path("/home");
            }
        }
    }

});


app.factory("busquedas", function($http, $rootScope){
    return{
    }
});

