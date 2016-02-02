app.controller('subprocesosController',['$scope','$http', function ($scope,$http){
        $scope.Subprocesos = {};
        $scope.listaProcesos = {};
        $scope.listaSubprocesos = {};
        refrescar();
        cargarProcesos();
        function refrescar(){
            document.getElementById("guardar").disabled = false;
            document.getElementById("actualizar").disabled = true;
            
            $http.get(uri+'/api/subprocesos').success(function (respuesta){
                    $scope.listaSubprocesos = respuesta;
                    $scope.Subprocesos = "";
            });
        }
        
        function cargarProcesos(){
            $http.get(uri+'/api/procesos').success(function (respuesta){
                    $scope.listaProcesos = respuesta;

            });
        }
        $scope.guardar = function(){
		$http.post(uri+'/api/subprocesos', $scope.Subprocesos).success(function (respuesta){
			Materialize.toast(respuesta.message,'5000',"rounded");
		        refrescar();
		});
        }    
        $scope.limpiar = function(){
		document.getElementById("guardar").disabled = false;
		document.getElementById("actualizar").disabled = true;
		$scope.Subprocesos = "";
                      document.getElementById("subprocesos").value="";
	};   
        $scope.cargarModificar = function(item){
		document.getElementById("actualizar").disabled = false;
		document.getElementById("guardar").disabled = true;
                $scope.Subprocesos = item;
               document.getElementById("subprocesos").value=item.idProceso;
	};       
        $scope.modificar = function(){
		$http.put(uri+'/api/subprocesos/'+$scope.Subprocesos.id, $scope.Subprocesos).success(function (respuesta){
			refrescar();
                        Materialize.toast(respuesta.message,'5000',"rounded");
			document.getElementById("guardar").disabled = false;
			document.getElementById("actualizar").disabled = true;
		});
	};
 
    }]); 




