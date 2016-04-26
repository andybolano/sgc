app.controller('subprocesosController',['$scope','$http', function ($scope,$http){
        $scope.Subprocesos = {};
        $scope.listaProcesos = {};
        $scope.listaSubprocesos = {};
        $scope.listaCargos = {};
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
          $scope.getCargos = function () {
             var cargos = JSON.parse(localStorage.getItem('cargos'));
           
              $scope.listaCargos = cargos;
            
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
            console.log(item);
		document.getElementById("actualizar").disabled = false;
		document.getElementById("guardar").disabled = true;
                $scope.Subprocesos = item;

	};       
        $scope.modificar = function(){
          
		$http.put(uri+'/api/subprocesos/'+$scope.Subprocesos.id, $scope.Subprocesos).success(function (respuesta){
			refrescar();
                        Materialize.toast(respuesta.message,'5000',"rounded");
			document.getElementById("guardar").disabled = false;
			document.getElementById("actualizar").disabled = true;
		});
	};
        
        $scope.eliminar = function(id){
		swal({ 
                    title: "Esta usted seguro(a)?",   
                    text: "No prodrá revertir este cambio, y puede causar daños en otros registros!",  
                    type: "warning",   
                    showCancelButton: true,   
                    confirmButtonColor: "#DD6B55",   
                    confirmButtonText: "Si, eliminar!",   
                    closeOnConfirm: false 
                }, function(){   
                    $http.delete(uri+'/api/subprocesos/' + id).success(function (respuesta){
                            swal("Eliminado!", "Este subproceso ahora no existe.", "success"); 
                            refrescar();
                    });
                });
	};
 
    }]); 




