app.controller('procesosController',['$scope','$http', function ($scope,$http){
        $scope.Procesos = {};
        $scope.listaProcesos = {};
        $scope.listaCargos ={};
        refrescar();
        function refrescar(){
            document.getElementById("guardar").disabled = false;
            document.getElementById("actualizar").disabled = true;
            
            $http.get(uri+'/api/procesos').success(function (respuesta){
                    $scope.listaProcesos = respuesta;
                    $scope.Procesos = "";
            });
        }
        
        $scope.getCargos = function () {
             var cargos = JSON.parse(localStorage.getItem('cargos'));
           
              $scope.listaCargos = cargos;
            
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
		$http.delete(uri+'/api/procesos/' + id).success(function (respuesta){
                       swal("Eliminado!", "Este proceso ahora no existe.", "success"); 
                            refrescar();
                    });
                });
	};
 
    }]); 




