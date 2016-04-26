app.controller('solicitudesController', ['$scope', '$http', function($scope, $http) {
   
 $scope.solicitudes = {};       
  var list_archivo=new Array();
$scope.formatocambios = {};
     
     $scope.historiadocumentos = {};
      
       
      cargarCargos_init();
        getAllSubprocesos();
        getAllprocesos();
        getAlldocumentos();
        
             function getAllSubprocesos() {
            $http.get('http://www.appccvalledupar.co/sgc/public/api/subprocesos').success(function(respuesta) {
                localStorage.setItem("subprocesos", JSON.stringify(respuesta));
            });
        }

        function getAllprocesos() {
            $http.get('http://www.appccvalledupar.co/sgc/public/api/procesos').success(function(respuesta) {
                localStorage.setItem("procesos", JSON.stringify(respuesta));
            });
        }

        function getAlldocumentos() {
            $http.get('http://www.appccvalledupar.co/sgc/public/api/documentos').success(function(respuesta) {
                localStorage.setItem("documentos", JSON.stringify(respuesta));
            });
        }

        function cargarCargos_init() {
            $http.get('http://www.appccvalledupar.co/timeit/public/api/cargos').success(function(respuesta) {
                localStorage.setItem("cargos", JSON.stringify(respuesta));
            });
        }
        
        
    $scope.cargarAllSolicitides = function (){
      var item = "";
           var nombreRes = "";
           var nombreApro = "";
           list_archivo.length=0;
           
     $http.get('http://www.appccvalledupar.co/sgc/public/api/solicitudes').success(function(respuesta) {
          
         var cargos = JSON.parse(localStorage.getItem("cargos"));
                for(i=0; i<respuesta.length; i++){
                 
                            for(y=0; y<cargos.length; y++){
                                  if(respuesta[i].responsable == cargos[y].id){
                                      nombreRes = cargos[y].nombre;
                                      break;
                                  }
                              }
                              
                            for(y=0; y<cargos.length; y++){          
                                if(respuesta[i].responsableAprobacion == cargos[y].id){ 
                                    nombreApro = cargos[y].nombre;
                                    break;
                                }
                            }
                            
                     
                
               item = {archivo:respuesta[i],nombreResponsable:nombreRes,nombreResponsableApro:nombreApro}

             list_archivo.push(item);
              
                    item="";
                
                }
                
             

             $scope.solicitudes = list_archivo;
             console.log($scope.solicitudes);
                document.getElementById("loading").style.display="none";
            }); 
    };
    
   $scope.cargarSolicitides = function (){
       
    var usuario = JSON.parse(sessionStorage.getItem('session'));
    var id= usuario[0].noDocumento;
    
      var item = "";
           var nombreRes = "";
           var nombreApro = "";
           list_archivo.length=0;
           
     $http.get('http://www.appccvalledupar.co/sgc/public/api/solicitudes/byFuncionario/'+id).success(function(respuesta) {
          
         var cargos = JSON.parse(localStorage.getItem("cargos"));
                for(i=0; i<respuesta.length; i++){
                 
                            for(y=0; y<cargos.length; y++){
                                  if(respuesta[i].responsable == cargos[y].id){
                                      nombreRes = cargos[y].nombre;
                                      break;
                                  }
                              }
                              
                            for(y=0; y<cargos.length; y++){          
                                if(respuesta[i].responsableAprobacion == cargos[y].id){ 
                                    nombreApro = cargos[y].nombre;
                                    break;
                                }
                            }
                            
                     
                
               item = {archivo:respuesta[i],nombreResponsable:nombreRes,nombreResponsableApro:nombreApro}

             list_archivo.push(item);
              
                    item="";
                
                }
                
             

             $scope.solicitudes = list_archivo;
             console.log($scope.solicitudes);
                document.getElementById("loading").style.display="none";
            }); 
    };
    
    
     $scope.modalNota = function(nota,nombre,version){
                $scope.nota=nota;
                $scope.nombre=nombre;
                $scope.version=version;
                 $('#nota').openModal();
            };
          $scope.modalRespuesta = function(nombre, idDocumento){
               $scope.idDocumentoActual = idDocumento;
                $scope.nombre=nombre;
                 $('#respuesta').openModal();
                 
                 $http.get('http://www.appccvalledupar.co/sgc/public/api/solicitudes/historia/'+idDocumento).success(function(respuesta) {
                           $scope.historiadocumentos = respuesta;
                 });
            };  
            
            $scope.enviarRespuesta = function(documento){
                
                 var fecha = new Date();
                    var hoy =fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + (fecha.getDate()+1)
        
                var object = {
                    mensaje:$('#mensaje').val(),
                    documento:documento,
                    fecha:hoy,
                    nombre:'Maria Alejandra Munera',
                    emite:'Coordinador de Calidad'
                }
                
               $http.post('http://www.appccvalledupar.co/sgc/public/api/solicitudes/respuesta',object).success(function(respuesta) {
                           $scope.rechazarDocumento(documento,2);
                 });
               
            }
            
            
            $scope.rechazarDocumento = function(id,estado){
              
                 swal({title: "Este documento sera rechazado",   
                    text: "Esta realmente seguro que desean enviar este mensaje?",   
                    type: "warning",   showCancelButton: true,   
                    confirmButtonColor: "#DD6B55",   
                    confirmButtonText: "Si, deseamos enviarlo!",   
                    cancelButtonText: "No, no lo enviaremos!",   
                    closeOnConfirm: false,   
                    closeOnCancel: false 
                }, function(isConfirm){   
                    if (isConfirm) {
                 var object = {
                                idDocumento:id,
                                autoriza:"calidad",
                                estado:estado
                            }
                            
                          
                         
                        $http.post('http://www.appccvalledupar.co/sgc/public/api/solicitudes/updateEstado',object).success(function(respuesta) {
                                     
                            $('#mensaje').val('');
                                      $('#respuesta').closeModal();
                                    swal("Repuesta!", "Ha sido enviada con satisfacion.Y el documento ha sido rechazado", "success");
                                  $scope.cargarAllSolicitides();
                        });
                        
                        } else {     
                        swal("Cancelada", "Esta operacion ha sido cancelada", "error");   
                    } });
                        
            }
            $scope.modalFormatoCambios = function(descripcion, razones, afecta, necesidades, flujo, ajuste){
                 $scope.formatocambios.descripcion = descripcion;
                 $scope.formatocambios.razones = razones;
                 $scope.formatocambios.afecta = afecta;
                 $scope.formatocambios.necesidades = necesidades;
                 $scope.formatocambios.flujo = flujo;
                 $scope.formatocambios.ajuste = ajuste;
                 $('#formatocambios').openModal();
              
            };
            
            $scope.actualizarEstado = function(id,estado){
                swal({title: "Este documento sera aprobado",   
                    text: "Esta realmente seguro que desean aprobar este documento?",   
                    type: "warning",   showCancelButton: true,   
                    confirmButtonColor: "#DD6B55",   
                    confirmButtonText: "Si, deseamos aprobarlo!",   
                    cancelButtonText: "No, no lo aprobaremos!",   
                    closeOnConfirm: false,   
                    closeOnCancel: false 
                }, function(isConfirm){   
                    if (isConfirm) {
                        
                        
                         var object = {
                                idDocumento:id,
                                autoriza:"calidad",
                                estado:estado
                            }
                          
                        $http.post('http://www.appccvalledupar.co/sgc/public/api/solicitudes/updateEstado',object).success(function(respuesta) {
                                    swal("Aprobado!", "Este documento ahora se encuentra vigente.", "success");
                                  $scope.cargarAllSolicitides();
                           
                        });
                        
                        
                    } else {     
                        swal("Cancelada", "Esta operacion ha sido cancelada", "error");   
                    } });
            }
            
}]);


