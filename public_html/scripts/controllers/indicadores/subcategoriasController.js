app.controller('subcategoriasController',['$scope','$http', function ($scope,$http){
        $scope.Subcategorias = {};
        $scope.listaCategorias = {};
        $scope.listaSubcategorias = {};
        refrescar();
        cargarCategorias();
        function refrescar(){
            document.getElementById("guardar").disabled = false;
            document.getElementById("actualizar").disabled = true;
            
            $http.get(uri+'/api/subcategorias').success(function (respuesta){
                    $scope.listaSubcategorias = respuesta;
                    $scope.Subcategorias = "";
            });
        }
        
        function cargarCategorias(){
            $http.get(uri+'/api/categorias').success(function (respuesta){
                    $scope.listaCategorias = respuesta;

            });
        }
        $scope.guardar = function(){
		$http.post(uri+'/api/subcategorias', $scope.Subcategorias).success(function (respuesta){
			Materialize.toast(respuesta.message,'5000',"rounded");
		        refrescar();
		});
        }    
        $scope.limpiar = function(){
		document.getElementById("guardar").disabled = false;
		document.getElementById("actualizar").disabled = true;
		$scope.Subcategorias = "";
                      document.getElementById("subcategorias").value="";
	};   
        $scope.cargarModificar = function(item){
		document.getElementById("actualizar").disabled = false;
		document.getElementById("guardar").disabled = true;
                $scope.Subcategorias = item;
               document.getElementById("subcategorias").value=item.idCategoria;
	};       
        $scope.modificar = function(){
          console.log($scope.Subcategorias)
		$http.put(uri+'/api/subcategorias/'+$scope.Subcategorias.id, $scope.Subcategorias).success(function (respuesta){
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
                    $http.delete(uri+'/api/subcategorias/' + id).success(function (respuesta){
                            swal("Eliminado!", "Este subproceso ahora no existe.", "success"); 
                            refrescar();
                    });
                });
	};
 
    }]); 




