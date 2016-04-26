app.controller('indexController',['$scope','$http', function ($scope,$http){
    hoy();
    function hoy() {
        var meses = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
        var diasSemana = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");
        var f = new Date();
        var hoy = diasSemana[f.getDay()] + ", " + f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear();
        $scope.hoy = hoy;
    }
    
    $scope.usuario = {};

usuario();
cargarCargos_init();
function usuario(){
   var usuario = JSON.parse(sessionStorage.getItem('session'));
   $scope.usuario = usuario[0];
}

function cargarCargos_init() {
    if(localStorage.getItem("cargos")){
        
    }else{
            $http.get('http://www.appccvalledupar.co/timeit/public/api/cargos').success(function(respuesta) {
                $scope.listaCargos = respuesta;
                localStorage.setItem("cargos",JSON.stringify(respuesta));
            });
    }
    }
 }]);


