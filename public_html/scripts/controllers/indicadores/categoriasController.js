app.controller('categoriasController',['$scope','$http', function ($scope,$http){
        $scope.Categorias = {};
        $scope.listaCategorias = {};
        refrescar();
        
        
        function refrescar(){
            document.getElementById("guardar").disabled = false;
            document.getElementById("actualizar").disabled = true;
            
            $http.get(uri+'/api/categorias').success(function (respuesta){
                    $scope.listaCategorias = respuesta;
                    $scope.Categorias = "";
            });
        }
        $scope.guardar = function(){
          
		$http.post(uri+'/api/categorias', $scope.Categorias).success(function (respuesta){
			Materialize.toast(respuesta.message,'5000',"rounded");
		        refrescar();
		});
        }    
        $scope.limpiar = function(){
		document.getElementById("guardar").disabled = false;
		document.getElementById("actualizar").disabled = true;
		$scope.Categorias = "";
	};   
        $scope.cargarModificar = function(item){
		document.getElementById("actualizar").disabled = false;
		document.getElementById("guardar").disabled = true;
                $scope.Categorias = item;
	};       
        $scope.modificar = function(){
		$http.put(uri+'/api/categorias/'+$scope.Categorias.id, $scope.Categorias).success(function (respuesta){
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
		$http.delete(uri+'/api/categorias/' + id).success(function (respuesta){
                       swal("Eliminado!", "Esta categoria ahora no existe.", "success"); 
                            refrescar();
                    });
                });
	};
 
    }]); 







