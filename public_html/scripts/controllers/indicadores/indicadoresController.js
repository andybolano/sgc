app.controller('indicadoresController',['$scope','$http', function ($scope,$http){
        $scope.listaIndicadores = {};
        $scope.listaCategorias = {};
        $scope.listaProcesos = {};
         $scope.listaSubcategorias = {};
        $scope.Indicadores = {};
         $scope.listaMedidas = {};
         $scope.indicador = {};
         $scope.listaSubcategorias = {};
         
          $scope.Medidas = {};
        $scope.listaMedidasConsulta = {};
         
         $scope.nombreUnidadMedida = "Ninguno";
         $scope.listaSubprocesos
        $scope.categorias = function (){
            $http.get(uri+'/api/categorias').success(function (respuesta){
                    $scope.listaCategorias = respuesta;
                    $scope.Indicadores.categoria = "1";
                     $scope.subcategorias();
            });
        }
        $scope.procesos = function (){
            $http.get(uri+'/api/procesos').success(function (respuesta){
                    $scope.listaProcesos = respuesta;
                    $scope.Indicadores.proceso = "1";
                    $scope.subprocesos();

            });
        }
        $scope.medidas = function (){
            $http.get(uri+'/api/medidas').success(function (respuesta){
                    $scope.listaMedidas = respuesta;
                    localStorage.setItem("unidadesMedidas",JSON.stringify(respuesta));

            });
        }
        
        $scope.nombreUnidad = function(){
             var unidades = JSON.parse(localStorage.getItem('unidadesMedidas'));
             for(i=0; i<unidades.length; i++){
                 if(unidades[i].id == $scope.Indicadores.unidadMedida){
                   $scope.nombreUnidadMedida  = unidades[i].nombre;
                   break;  
                 }
             }
             
        }

        $scope.subprocesos = function() {
            $http.get(uri + '/api/subprocesos/proceso/' + $scope.Indicadores.proceso).success(function(respuesta) {
                if (respuesta == 0) {

                    Materialize.toast("No hay sub categorias para este Proceso", '3000', 'rounded');
                } else {
                        $scope.listaSubprocesos = respuesta;
                    } 
                
            });
        }
          $scope.subcategorias = function() {
            $http.get(uri + '/api/subcategorias/categoria/' + $scope.Indicadores.categoria).success(function(respuesta) {
                if (respuesta == 0) {

                    Materialize.toast("No hay sub categorias para esta categoria", '3000', 'rounded');
                } else {
                        $scope.listaSubcategorias = respuesta;
                    } 
                
            });
        }
        
         $scope.refrescar = function(){
            document.getElementById("guardar").disabled = false;
            document.getElementById("actualizar").disabled = true;
            $http.get(uri+'/api/indicadores').success(function (respuesta){
            $scope.listaIndicadores   =  respuesta;
            $scope.Indicadores = "";
            });
        
      }
        
        
        $scope.guardar = function () {
         if($scope.Indicadores.subcategoria == undefined){
             Materialize.toast("Es necesario digilenciar todos lo campos",'5000',"rounded");
         }else{
             if($scope.Indicadores.nombre_denominador == undefined){
                 $scope.Indicadores.nombre_denominador = "none";
             }
             
              if($scope.Indicadores.limiteInferior == undefined){
                 $scope.Indicadores.limiteInferior =0;
             }
             if($scope.Indicadores.limiteSuperior == undefined){
                 $scope.Indicadores.limiteSuperior =0;
             }
             
             $scope.Indicadores.estado = 'ACTIVO';
            $http.post(uri+'/api/indicadores', $scope.Indicadores).success(function (respuesta){
			Materialize.toast(respuesta.message,'5000',"rounded");
		        $scope.refrescar();
		});
            }
        }
        
        $scope.cargarModificar = function(item){
            $('body, html').animate({
			scrollTop: '0px'
		}, 300);
		document.getElementById("actualizar").disabled = false;
		document.getElementById("guardar").disabled = true;
                $scope.Indicadores = item.i;
	};
        
        $scope.modificar = function(){
            if($scope.Indicadores.subcategoria == undefined){
             Materialize.toast("Es necesario digilenciar todos lo campos",'5000',"rounded");
         }else{
            
		$http.put(uri+'/api/indicadores/'+$scope.Indicadores.id, $scope.Indicadores).success(function (respuesta){
			$scope.refrescar();
                        Materialize.toast(respuesta.message,'5000',"rounded");
			document.getElementById("guardar").disabled = false;
			document.getElementById("actualizar").disabled = true;
		});
            }
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
		$http.delete(uri+'/api/indicadores/' + id).success(function (respuesta){
                       swal("Eliminado!", "Este Indicador ahora no existe.", "success"); 
                            $scope.refrescar();
                    });
                });
	};
        
   $scope.modalIndicador= function(item){
       $scope.indicador = item;
      $('#indicador').openModal();
    }
    
    $scope.modalUnidad= function(){
        $scope.refrescarMedidas();
      $('#medidas').openModal();
    }
    
    
     $scope.refrescarMedidas = function(){
            document.getElementById("guardarMedidas").disabled = false;
            document.getElementById("actualizarMedidas").disabled = true;
            
            $http.get(uri+'/api/medidas').success(function (respuesta){
                     $scope.listaMedidasConsulta = respuesta;
                    $scope.Medidas = "";
            });
        }
        $scope.guardarMedidas = function(){
		$http.post(uri+'/api/medidas', $scope.Medidas).success(function (respuesta){
			Materialize.toast(respuesta.message,'5000',"rounded");
                        $scope.Medidas = "";
                        $scope.medidas();
		        $scope.refrescarMedidas();
		});
        }    
        $scope.limpiarMedidas = function(){
		document.getElementById("guardarMedidas").disabled = false;
		document.getElementById("actualizarMedidas").disabled = true;
		$scope.Medidas = "";
	};   
        $scope.cargarModificarMedidas = function(item){
		document.getElementById("actualizarMedidas").disabled = false;
		document.getElementById("guardarMedidas").disabled = true;
                $scope.Medidas = item;
	};       
        $scope.modificarMedidas = function(){
		$http.put(uri+'/api/medidas/'+$scope.Medidas.id, $scope.Medidas).success(function (respuesta){
			$scope.refrescarMedidas();
                        $scope.Medidas = "";
                        Materialize.toast(respuesta.message,'5000',"rounded");
			document.getElementById("guardarMedidas").disabled = false;
			document.getElementById("actualizarMedidas").disabled = true;
		});
	};
        
         $scope.eliminarMedidas = function(id){
		swal({ 
                    title: "Esta usted seguro(a)?",   
                    text: "No prodrá revertir este cambio, y puede causar daños en otros registros!",  
                    type: "warning",   
                    showCancelButton: true,   
                    confirmButtonColor: "#DD6B55",   
                    confirmButtonText: "Si, eliminar!",   
                    closeOnConfirm: false 
                }, function(){  
		$http.delete(uri+'/api/medidas/' + id).success(function (respuesta){
                       swal("Eliminado!", "Esta categoria ahora no existe.", "success"); 
                            refrescar();
                    });
                });
	};
        
 }]); 


