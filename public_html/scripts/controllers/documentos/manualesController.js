app.controller('manualesController', ['$scope', '$http', function($scope, $http) {
 
        $scope.File = {};
        $scope.listadoManuales = {};
        $scope.listadoAnexos = {};
$scope.visualizarOne = function() {
      $("#lista").html("");
         var file= document.getElementById('file').files;
         var file;
         var item = "";      
          for (i = 0; i<file.length; i++)
            { 
                item = "<tr>"+
                        "<td>"+1+"</td>"+
                        "<td>"+file[i].name+"</td>"+
                        '<td><input type="date" id="fechaActualizacion" style="width:90%"></td>'+
                        '<td><select id="tipoManual"  class="browser-default"><option value="PROCEDIMIENTO">PROCEDIMIENTO</option><option value="CALIDAD">CALIDAD</option></select></td>'+
                        "</tr>";
            }    
            $("#lista").append(item);
            document.getElementById('fechaActualizacion').value = new Date().toDateInputValue();   
  }
  
     Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
});

 $scope.guardar = function(){
                var formData=new FormData();
                formData.append('documento',$scope.File.documento);
                formData.append('nombre',$("#tipoManual").val());
                formData.append('fecha',$("#fechaActualizacion").val());
                
            $http.post(uri+'/api/manuales/nuevo', formData,{transformRequest: angular.identity, 
            headers: {'Content-Type': undefined}}).success(function(respuesta) {
                if(respuesta.request == "OK"){
                    swal("Buen Trabajo!", ""+respuesta.message+"", "success");
                    $("#lista").html("");
                    $("#file").value("");
                    $scope.getManuales();
                }else{
                   sweetAlert("Oops...", "Hemos detectado un problema!", "error"); 
                }
            });
               
                
 }


$scope.getManuales = function(){
            $http.get(uri+'/api/manuales').success(function(respuesta) {
                    $scope.listadoManuales = respuesta;  
            });         
                
 }
 
 $scope.cargarAnexos = function(item){
      
            $('#nombreManual').html(item.nombre);
            $('#id_manual').val(item.id);
            $('#anexos').openModal();
            $scope.getAnexos(item.id);
        }
        
        $scope.visualizarOne_anexo = function() {
      $("#listaAnexo").html("");
         var file= document.getElementById('file_2').files;
         var file;
         var item = "";      
          for (i = 0; i<file.length; i++)
            { 
                item = "<tr>"+
                        "<td>"+1+"</td>"+
                        "<td>"+file[i].name+"</td>"+
 
                          "<td>"+(file[i].size / (1024 * 1024)).toFixed(2) + "MG</td>"+
                        "</tr>";
            }    
            $("#listaAnexo").append(item);
           
  }
  
     Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
});

$scope.guardarAnexos = function(){
                var formData=new FormData();
                formData.append('documento',$scope.File.documento_2);
                formData.append('manual',$("#id_manual").val());
              
            var id = $("#id_manual").val();
            $http.post(uri+'/api/manuales/anexo/nuevo', formData,{transformRequest: angular.identity, 
            headers: {'Content-Type': undefined}}).success(function(respuesta) {
                if(respuesta.request == "OK"){
                    swal("Buen Trabajo!", ""+respuesta.message+"", "success");
                    $("#listaAnexo").html("");
                   
                    $scope.getAnexos(id);
                    
                }else{
                   sweetAlert("Oops...", "Hemos detectado un problema!", "error"); 
                }
            });
               
                
 }
 
 $scope.getAnexos = function(id){
    
            $http.get(uri+'/api/anexos/'+id).success(function(respuesta) {
                    $scope.listadoAnexos = respuesta;  
            });         
                
 }
  
}]);



