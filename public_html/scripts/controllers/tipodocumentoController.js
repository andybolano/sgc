app.controller('tipodocumentoController',['$scope','$http', function ($scope,$http){
        $scope.Documentos = {};
        $scope.listaDocumentos = {};
        refrescar();
        function refrescar(){
            document.getElementById("guardar_d").disabled = false;
            document.getElementById("actualizar_d").disabled = true;
            
            $http.get(uri+'/api/documentos').success(function (respuesta){
                    $scope.listaDocumentos = respuesta;
                    $scope.Documentos = "";
            });
        }
        $scope.guardar = function(){
		$http.post(uri+'/api/documentos', $scope.Documentos).success(function (respuesta){
			Materialize.toast(respuesta.message,'5000',"rounded");
		        refrescar();
		});
        }    
        $scope.limpiar = function(){
		document.getElementById("guardar_d").disabled = false;
		document.getElementById("actualizar_d").disabled = true;
		$scope.Documentos = "";
	};   
        $scope.cargarModificar = function(item){
		document.getElementById("actualizar_d").disabled = false;
		document.getElementById("guardar_d").disabled = true;
                $scope.Documentos = item;
	};       
        $scope.modificar = function(){
		$http.put(uri+'/api/documentos/'+$scope.Documentos.id, $scope.Documentos).success(function (respuesta){
			refrescar();
                        Materialize.toast(respuesta.message,'5000',"rounded");
			document.getElementById("guardar_d").disabled = false;
			document.getElementById("actualizar_").disabled = true;
		});
	};
 
    }]); 




