app.controller('procesosController',['$scope','$http', function ($scope,$http){
        $scope.Procesos = {};
        $scope.listaProcesos = {};
        refrescar();
        function refrescar(){
            document.getElementById("guardar").disabled = false;
            document.getElementById("actualizar").disabled = true;
            
            $http.get(uri+'/api/procesos').success(function (respuesta){
                    $scope.listaProcesos = respuesta;
                    $scope.Procesos = "";
            });
        }
        $scope.guardar = function(){
		$http.post(uri+'/api/procesos', $scope.Procesos).success(function (respuesta){
			Materialize.toast(respuesta.message,'5000',"rounded");
		        refrescar();
		});
        }    
        $scope.limpiar = function(){
		document.getElementById("guardar").disabled = false;
		document.getElementById("actualizar").disabled = true;
		$scope.Procesos = "";
	};   
        $scope.cargarModificar = function(item){
		document.getElementById("actualizar").disabled = false;
		document.getElementById("guardar").disabled = true;
                $scope.Procesos = item;
	};       
        $scope.modificar = function(){
		$http.put(uri+'/api/procesos/'+$scope.Procesos.id, $scope.Procesos).success(function (respuesta){
			refrescar();
                        Materialize.toast(respuesta.message,'5000',"rounded");
			document.getElementById("guardar").disabled = false;
			document.getElementById("actualizar").disabled = true;
		});
	};
 
    }]); 




