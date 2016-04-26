app.controller('archivosController', ['$scope', '$http', function($scope, $http) {

        $scope.listaArchivos = {};
        $scope.Archivo = {};
        $scope.File = {};
        $scope.Historial = {};
        var archivos = new Array();
        var todo=new Array();
        var list_archivo=new Array();
        
        $scope.listaProcesos = {};
        $scope.listaSubprocesos = {};
        $scope.listaCargos = {};
        $scope.nombre="";
        $scope.nota="";
        $scope.version="";
        $scope.idArchivo="";
        $scope.idDocumentoActual="";
        $scope.externo = {};

  getAllSubprocesos();
  getAllprocesos();
    getAlldocumentos();
//obtener fecha de hoy
        
        function getAllSubprocesos(){
            $http.get(uri + '/api/subprocesos').success(function(respuesta) {
                  localStorage.setItem("subprocesos",JSON.stringify(respuesta));
              });
        }
        
        function getAllprocesos(){
            $http.get(uri + '/api/procesos').success(function(respuesta) {
                $scope.listaProcesos = respuesta;
                  localStorage.setItem("procesos",JSON.stringify(respuesta));
              });
        }
        
        function getAlldocumentos(){
            $http.get(uri + '/api/documentos').success(function(respuesta) {
                     localStorage.setItem("documentos",JSON.stringify(respuesta));
              });
        }
        $scope.guardarExterno = function(){
            
            $scope.externo.fechaActualizacion = $('#fecha').val();
            
          
            $http.post(uri+'/api/archivos/nuevoExternos',$scope.externo).success(function(respuesta) {
                if(respuesta.request == "OK"){
                    swal("Buen Trabajo!", ""+respuesta.message+"", "success");
                   $scope.externo = "";
                   $scope.cargarArchivosExternos();
                }else{
                   sweetAlert("Oops...", "Hemos detectado un problema!", "error"); 
                }
            });
        }
        
        $scope.nuevaVersion = function(item){
      
                $scope.nombre=item.archivo.nombre;
                $scope.version=item.archivo.version;
                $scope.idArchivo = item.archivo.idArchivo;
                $scope.idDocumentoActual = item.archivo.idDoc;
            $('#nuevaVersion').openModal();
              $scope.historialArchivos(item.archivo.idArchivo);
              $("#listaVersion").html("");
              $("#file").val("");
        }
        
          $scope.historialArchivos = function(idArchivo){
             
                $http.get(uri + '/api/archivos/'+idArchivo+'/historial').success(function(respuesta) {
                    $scope.Historial = respuesta;
                 });
                
            }
        
        
            
            
            $scope.modalNota = function(nota,nombre,version){
                $scope.nota=nota;
                $scope.nombre=nombre;
                $scope.version=version;
                 $('#nota').openModal();
            }
            
             $scope.modalEdit = function(item){
                   $scope.nombre=item.archivo.nombre;
              $('#edit').openModal();
                $('#proceso').html("");
                $('#subproceso').html("");
                    var procesos = JSON.parse(localStorage.getItem("procesos"));
          
                    for(i=0; i<procesos.length; i++){
                          $('#proceso').append('<option value="'+procesos[i].id+'" selected="selected">'+procesos[i].nombre+'</option>');
                    }
                    
                   
                    
                      var documentos = JSON.parse(localStorage.getItem("documentos"));
          
                    for(i=0; i<documentos.length; i++){
                          $('#documentos').append('<option value="'+documentos[i].id+'" selected="selected">'+documentos[i].nombre+'</option>');
                    }
                    
                    document.getElementById("proceso").value=item.archivo.proceso;
                    document.getElementById("documentos").value=item.archivo.tipoDocumento;
                    
                    $scope.cargarSubprocesosEdit(item.archivo.proceso);
                    document.getElementById("fechaActualizacion").value=item.archivo.fecha;
                    
                    
                       var cargos = JSON.parse(localStorage.getItem("cargos"));
                   
                    for(i=0; i<cargos.length; i++){
                          $('#responsableDocumento').append('<option value="'+cargos[i].id+'" selected="selected">'+cargos[i].nombre+'</option>');
                          $('#responsableAprobacion').append('<option value="'+cargos[i].id+'" selected="selected">'+cargos[i].nombre+'</option>');
                    }
     
            
                 document.getElementById("responsableDocumento").value=item.archivo.responsable;
                 document.getElementById("responsableAprobacion").value=item.archivo.responsableAprobacion;
                 document.getElementById("estado").value=item.archivo.estado;
                 document.getElementById("cambio").value=item.archivo.nota;
                 document.getElementById("version").value=item.archivo.version;
                 document.getElementById("idArchivo").value=item.archivo.idArch;
                 document.getElementById("idDocumento").value=item.archivo.idDoc;
            }
            
          
            
            $scope.cargarSubprocesosEdit = function (proceso){
                $('#subproceso').html("");
                    var subprocesos = JSON.parse(localStorage.getItem("subprocesos"));
                    for(i=0; i<subprocesos.length; i++){
                       if(subprocesos[i].proceso == proceso){ 
                         $('#subproceso').append('<option value="'+subprocesos[i].id+'" selected="selected">'+subprocesos[i].nombre+'</option>');
                       }
                    }
            }
            
    
            
         $scope.cargarArchivosExternos = function() {
           document.getElementById('fecha').value = new Date().toDateInputValue(); 
           var item = "";
           var nombreRes = "";
           var nombreApro = "";
           list_archivo.length=0;
            $http.get(uri + '/api/archivosExternos').success(function(respuesta) {
             
                var cargos = JSON.parse(localStorage.getItem("cargos"));
                for(i=0; i<respuesta.length; i++){
                            for(y=0; y<cargos.length; y++){
                                  if(respuesta[i].responsable == cargos[y].id){
                                      nombreRes = cargos[y].nombre;
                                      
                                      break;
                                  }
                              }
                              
               item = {archivo:respuesta[i],nombreResponsable:nombreRes}
               list_archivo.push(item);
              
                    item="";
                
                }
                
             
                
             $scope.listaArchivosExternos = list_archivo;
        
            });
        } 
        
       $scope.cargarArchivos = function() {
           document.getElementById("loading").style.display="block";
           var item = "";
           var nombreRes = "";
           var nombreApro = "";
           list_archivo.length=0;
            $http.get(uri + '/api/archivos').success(function(respuesta) {
              
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
                
             
                document.getElementById("loading").style.display="none";
             $scope.listaArchivos = list_archivo;
        
            });
        }
        
        $scope.cargarArchivosObsoletos = function() {
           var item = "";
           var nombreRes = "";
           var nombreApro = "";
           list_archivo.length=0;
           $http.get(uri + '/api/obsoletos').success(function(respuesta) {
              
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
                
             
                
             $scope.listaArchivos = list_archivo;
       });
        }
        
        
        Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
});


   $scope.modalCambios = function(id){
       
       document.getElementById("nombreArchivo").innerHTML = archivos[id].file.name;
       document.getElementById("idCambio").value=id;
       document.getElementById("cambiosRealizados").value= document.getElementById("cambios"+id).value;
      $('#cambios').openModal();
    }
    
       $scope.cargarTodo = function(){
        var proceso = "";
        var subproceso = "";
        var documento = "";
        var version="";
        var fechaActualizacion ="";
        var externo = "";
        var responsable="";
        var responsableAprobacion="";
        var cambio="";
        var formatoCambios="";
        var file;
        var ubicacion;
        var sapo = false;
        if(archivos.length==0){
            Materialize.toast("No existen Archivos para subir",1000,"rounded");
        }else{
            document.getElementById('subirArchivos').disabled=true;
             document.getElementById('loading').style.display="block";
             
             
      
           for(i=0; i < archivos.length; i++){
               
               if( document.getElementById("externo"+i).checked == false){
           
             if($("#version"+i).val().length < 1) {
                 Materialize.toast("Debe incluir la version del archivo "+parseInt(i+1),3000,"rounded");
                 document.getElementById('subirArchivos').disabled=false;
             document.getElementById('loading').style.display="none";
                sapo = true;
                return false;
             }
              if($("#cambios"+i).val().length < 1) {
                Materialize.toast("Debe registrar los cambio relizados a los archivos "+parseInt(i+1),3000,"rounded");
                 document.getElementById('subirArchivos').disabled=false;
             document.getElementById('loading').style.display="none";
                sapo = true;
                return false;
             }
                }else{
                    document.getElementById("responsableAprobacion"+i).value = 0;
                   if($("#ubicacion"+i).val().length < 1) {
                Materialize.toast("Debe registrar la ubucacion del archivo:  "+parseInt(i+1),3000,"rounded");
                 document.getElementById('subirArchivos').disabled=false;
             document.getElementById('loading').style.display="none";
                sapo = true;
                return false;
             } 
                }
           }
   
       
  
        if(sapo == false){    
	for(i=0; i < archivos.length; i++){
		file=archivos[i].file;
                proceso = document.getElementById("proceso"+i).value;
                subproceso = document.getElementById("subproceso"+i).value;
                documento = document.getElementById("documento"+i).value;
                version = document.getElementById("version"+i).value;
                fechaActualizacion = document.getElementById("fechaActualizacion"+i).value;
                externo = document.getElementById("externo"+i).checked;
                responsable = document.getElementById("responsable"+i).value;
                cambio = document.getElementById("cambios"+i).value;
                  formatoCambios = {
                   descripcion:$('input[id="descripcionCambio'+i+'"]').val(),
                    razones:$('input[id="razonesCambio'+i+'"]').val(),
                    afecta:$('input[id="afectaCambio'+i+'"]').val(),
                    necesidades:$('input[id="necesidadesCambio'+i+'"]').val(),
                    flujo:$('input[id="flujoCambio'+i+'"]').val(),
                    ajuste:$('input[id="ajusteCambio'+i+'"]').val(), 
                };
                ubicacion = document.getElementById("ubicacion"+i).value;
                responsableAprobacion = document.getElementById("responsableAprobacion"+i).value;
                  
                todo.push({'id':i,'file': file,"proceso":proceso,"subproceso":subproceso,"documento":documento,"version":version,"fechaActualizacion":fechaActualizacion,"externo":externo,"responsable":responsable,"responsableAprobacion":responsableAprobacion,"ubicacion":ubicacion,"cambio":cambio,"formatoCambios":JSON.stringify(formatoCambios)});
                   
               }
             
         envios();
         }else{
             Materialize.toast("Por favor Digilenciar Campos",1000,"rounded");  
         }
    
         
     
        
        }
    }
        
function envios(){
    var process;
    var subprocess;
    var documento;
    var version;
    var fechaActualizacion;
    var externo;
    var responsable;
    var responsableAprobacion;
    var cambio;
    var ubicacion;
    var formatoCambios;
	if(window.FormData){
        var formdata = new FormData();
    }
    if (todo.length > 0){// va siminuyendo la cantidad de datos     
        process = (todo[0].proceso);
        subprocess = (todo[0].subproceso);
        documento = (todo[0].documento);
        version = (todo[0].version);
        fechaActualizacion =(todo[0].fechaActualizacion);
        externo =(todo[0].externo);
        responsable =(todo[0].responsable);
        responsableAprobacion =(todo[0].responsableAprobacion);
        cambio =(todo[0].cambio);
        ubicacion =(todo[0].ubicacion); 
        formatoCambios =(todo[0].formatoCambios); 
        
       var proceso = todo.shift(), f=proceso.file;
       formdata.append('file',f);
       formdata.append('proceso',process);
       formdata.append('subproceso',subprocess);
       formdata.append('documento',documento);
       formdata.append('version',version);
       formdata.append('fechaActualizacion',fechaActualizacion);
       formdata.append('externo',externo);
       formdata.append('responsable',responsable);
       formdata.append('responsableAprobacion',responsableAprobacion);
       formdata.append('cambio',cambio);
       formdata.append('ubicacion',ubicacion);
       formdata.append('formatoCambios',formatoCambios);
       formdata.append('id_usuario',sessionStorage.id_usuario);
      envioDatos(formdata);
    }else{
        document.getElementById('subirArchivos').disabled=false;
        document.getElementById('loading').style.display="none";
    swal("Buen Trabajo!", "Archivos Subidos correctamente!", "success")    
    $("#lista").html("");
         archivos.length=0;
    document.getElementById('files').value="";
    }
}
function envioDatos(ar){
   $.ajax({
    url: "upload.php",
    type: "POST",
    dataType: "html",
    data:ar,
    cache: false,
    contentType: false,
    processData: false
})
    .done(function(res){
        var  respuesta  = eval("(" + res + ")");    
if(respuesta[0].respuesta=="KO"){
    $("#lista").html("");
    document.getElementById('files').value="";
    todo.length=0;
document.getElementById('subirArchivos').disabled=false;
 document.getElementById('loading').style.display="none";
     swal("Oops algo anda mal!", "Hubo un problema al subir el archivo \n\
    "+respuesta[0].nombre, "error");
         archivos.length=0;
}else if(respuesta[0].respuesta=="OK"){
    Materialize.toast("Subido Correctamente: "+respuesta[0].nombre,'3000','rounded');
    envios();
}
    });
}
  $scope.visualizarOne = function() {
      $("#listaVersion").html("");
         var file= document.getElementById('file').files;
         var file;
         var item = "";      
          for (i = 0; i<file.length; i++)
            { 
                item = "<tr>"+
                        "<td>"+1+"</td>"+
                        "<td>"+file[i].name+"</td>"+
                        "<td>"+(file[i].size / (1024 * 1024)).toFixed(2) + "MG</td>"+
                        '<td><span class="bage" style="background-color:#fb8c00 ;font-size:14px">'+(parseInt($scope.version)+(1))+'</span></td>'+
                        '<td><input type="date" id="fechaActualizacion" style="width:90%"></td>'+
                         '<td style="text-align: center"><a href="javascript:;" id="cambiosFormatoBtn" title="PLANIFICACIÓN CAMBIOS QUE AFECTAN SISTEMA DE GESTIÓN DE CALIDAD" onclick="angular.element(this).scope().modalFormatoCambiosNuevaVersion('+i+');"><i class="material-icons">assignment</i></a></td>' +
                        "</tr>";
            }    
            $("#listaVersion").append(item);
            document.getElementById('fechaActualizacion').value = new Date().toDateInputValue();   
  }
  
  $scope.modalFormatoCambiosNuevaVersion = function(id){
      $('#cambiosFormato').openModal();
    }
    
  $scope.visualizarOneEdit = function() {
         var file= document.getElementById('file_edit').files;
         var file;
         var item = "";
         $("#listaVersion_edit").html("");
          for (i = 0; i<file.length; i++)
            { 
                item = "<tr>"+
                        "<td>"+1+"</td>"+
                        "<td>"+file[i].name+"</td>"+
                        "<td>"+(file[i].size / (1024 * 1024)).toFixed(2) + "MG</td>"+
                        '<td><span class="bage" style="background-color:#fb8c00 ;font-size:14px">'+document.getElementById("version").value+'</span></td>'+
                        "</tr>";
            }    
            $("#listaVersion_edit").append(item);     
  }     
       $scope.guardarNuevaVersion = function(){
           
            var formData = new FormData();

            if($scope.File.cambios == undefined){
             Materialize.toast("Debe indicar los cambios realizados", '3000', 'rounded');
             
            
        }else{
            
             if($scope.File.documento == undefined){
                  Materialize.toast("No se ha cargado ningun archivo", '3000', 'rounded');
             }else{
                 
                 
               
                if($('#descripcionCambio').val() == "" || $('#razonesCambio').val() == ""
                    || $('#afectaCambio').val() == "" || $('#necesidadesCambio').val() == ""
                    || $('#flujoCambio').val() == ""
                    || $('#ajusteCambio').val() == "" ){
             
                        Materialize.toast("Es necesario digilenciar el formato de cambios",2000,"rounded");
                      
                    }else{
                        
            var formatoCambios = {
                   descripcion:$('#descripcionCambio').val(),
                    razones:$('#razonesCambio').val(),
                    afecta:$('#afectaCambio').val(),
                    necesidades:$('#necesidadesCambio').val(),
                    flujo:$('#flujoCambio').val(),
                    ajuste:$('#ajusteCambio').val(), 
                };
               
           
           
           
                var formData=new FormData();
                formData.append('documento',$scope.File.documento);
                  formData.append('formatoCambios', JSON.stringify(formatoCambios));
                formData.append('idArchivo',$scope.idArchivo);
                formData.append('cambios', $scope.File.cambios);
                formData.append('fecha', $("#fechaActualizacion").val());
                formData.append('version', (parseInt($scope.version)+(1)));
                formData.append('idDocumentoActual', $scope.idDocumentoActual); 
                formData.append('id_funcionario', sessionStorage.id_usuario); 
                
            $http.post(uri+'/api/archivos/nuevaVersion', formData,{transformRequest: angular.identity, 
            headers: {'Content-Type': undefined}}).success(function(respuesta) {
                if(respuesta.request == "OK"){
                    swal("Buen Trabajo!", ""+respuesta.message+"", "success");
                    $scope.cargarArchivos();
                }else{
                   sweetAlert("Oops...", "Hemos detectado un problema!", "error"); 
                }
            });
             }
        }
       }
    }
                $scope.actualizarAchivos = function (){ 
                    
                    $('#loading-edit').openModal();
                    
                    
                 var formData=new FormData();           
               if($scope.File.documento_edit == undefined){
                }else{
                    formData.append('documento',$scope.File.documento_edit);
                } 
                formData.append('proceso',$('#proceso').val());
                formData.append('tipoDocumento',$('#documentos').val());
                formData.append('subproceso',$('#subproceso').val());
                formData.append('fechaActualizacion', $('#fechaActualizacion').val());
                formData.append('version', $('#version').val());
                formData.append('responsableDocumento', $('#responsableDocumento').val());
                formData.append('responsableAprobacion', $('#responsableAprobacion').val());
                formData.append('estado', $('#estado').val());
                formData.append('cambio', $('#cambio').val());
                formData.append('idArchivo', $('#idArchivo').val());
                formData.append('idDocumento', $('#idDocumento').val());
                 formData.append('id_funcionario', sessionStorage.id_usuario); 
          
                $http.post(uri+'/api/archivos/update',formData,{transformRequest: angular.identity, 
                headers: {'Content-Type': undefined}}).success(function(respuesta) {
             
                        if(respuesta.request=="OK"){
                            $('#loading-edit').closeModal();
                            $('#listaVersion_edit').html("");
                            $('#file_edit').val("");
                            swal("Buen trabajo!", ""+respuesta.message+"", "success");
                            $scope.cargarArchivos();
                        }else{
                   sweetAlert("Oops...", "Hemos detectado un problema!", "error"); 
                }
                });
                
                
                
            }
            
            $scope.validarExterno= function(id) {
                if( $('#externo'+id).prop('checked') ) {
                    $('#version'+id).attr('disabled','disabled');
                     $('#version'+id).css('background-color','#c3c3c3');
                     $('#responsableAprobacion'+id).attr('disabled','disabled');
                     $('#responsableAprobacion'+id).css('background-color','#c3c3c3');
                     $('#cambiosBtn'+id).css('color','#fff');
                      $('#ubicacion'+id).css('background-color','#FFF');
                     $('#ubicacion'+id).removeAttr('disabled');
                }else{
                    $('#version'+id).removeAttr('disabled');
                     $('#version'+id).css('background-color','#FFFFFF');
                     $('#responsableAprobacion'+id).removeAttr('disabled');
                     $('#responsableAprobacion'+id).css('background-color','#FFFFFF');
                     $('#cambiosBtn'+id).css('color','#039BE5');
                     $('#ubicacion'+id).css('background-color','#c3c3c3');
                     $('#ubicacion'+id).attr('disabled','disabled');
                }
            }
        $scope.visualizar = function() {  
         var files= document.getElementById('files').files;
         var file;
         var item = "";
         $("#lista").html("");
         for (i = 0; i<files.length; i++)
            {   
                file=files[i];
                archivos.push({'id':i,'file': file});
            }
            //cargando tabla
            for (i = 0; i<archivos.length; i++)
            {
                item = "<tr>" +
                        "<td>"+parseInt(i+1)+".</td>"+
                        '<td><input type="checkbox" id="externo'+i+'" onchange="angular.element(this).scope().validarExterno('+i+')" /><label for="externo'+i+'"></label></td>'+
                        "<td>" + archivos[i].file.name + "</td>" +
                        '<td>' +
                        '<select onchange="angular.element(this).scope().cargarSubprocesos(this.value,this.id)"  id="proceso' + i + '" class="browser-default">' +
                        '</select>' +
                        '</td>' +
                        '<td>' +
                        '<select  id="subproceso' + i + '" class="browser-default">' +
                        '</select>' +
                        '</td>' +
                        '<td>' +
                        '<select  id="documento' + i + '" class="browser-default">' +
                        '</select>' +
                        '</td>' +
                        "<td style='font-size:12px'>" + (archivos[i].file.size / (1024 * 1024)).toFixed(2) + " MG</td>" +
                        '<td>'+
                        '<input type="number" id="version'+ i +'" min="1" max="99"  required="required" title="Solo para documentos internos" onblur="validarPositivo(this.value,this.id)">'+
                        '</td>'+
                       '<td>'+
                        '<input type="date" id="fechaActualizacion'+ i +'" style="width:90%">'+
                        '</td>'+
                        '<td>'+
                         '<select  id="responsable' + i + '" class="browser-default">' +
                        '</select>' +
                        '</td>'+
                         '<td>'+
                         '<select  id="responsableAprobacion' + i + '" title="Solo para documentos internos" class="browser-default">' +
                        '</select>' +
                        '</td>'+
                        '<td><input type="text" id="ubicacion'+i+'" title="Solo para documentos externos " disabled style="background-color:#c3c3c3"></td>'+
                        '<td style="text-align:center">'+
                        '<a href="javascript:;" id="cambiosBtn'+i+'" onclick="angular.element(this).scope().modalCambios('+i+');"><i class="material-icons">message</i></a>'+
                        '<input type="hidden" id="cambios'+i+'" title="Solo para documentos internos" name="cambios'+i+'" value="">'+
                        '</td>'+
                        
                         '<td style="text-align:center">'+
                        
                        '<a href="javascript:;" id="cambiosFormatoBtn'+i+'" title="PLANIFICACIÓN CAMBIOS QUE AFECTAN SISTEMA DE GESTIÓN DE CALIDAD" onclick="angular.element(this).scope().modalFormatoCambios('+i+');"><i class="material-icons">assignment</i></a>'+
                        
                        '<input type="hidden" id="descripcionCambio'+i+'" name="descripcionCambio'+i+'" value="">'+
                        '<input type="hidden" id="razonesCambio'+i+'" name="razonesCambio'+i+'" value="">'+
                        '<input type="hidden" id="afectaCambio'+i+'" name="afectaCambio'+i+'" value="">'+
                        '<input type="hidden" id="necesidadesCambio'+i+'" name="necesidadesCambio'+i+'" value="">'+
                         '<input type="hidden" id="flujoCambio'+i+'" name="flujoCambio'+i+'" value="">'+
                          '<input type="hidden" id="ajusteCambio'+i+'" name="ajusteCambio'+i+'" value="">'+
                         
                        '</td>'+
                        //'<td><p><input type="checkbox" id="externo'+i+'" /><label for="externo'+i+'"></label></p></td>'+
                        "</tr>";
                $("#lista").append(item);
                document.getElementById('fechaActualizacion'+ i ).value = new Date().toDateInputValue();
            }
           cargarProcesos();         
        }
        
         $scope.modalFormatoCambios = function(id){
       
      document.getElementById("nombreArchivoFormato").innerHTML = archivos[id].file.name;
      document.getElementById("idCambioFormato").value=id;
      
      document.getElementById("descripcionCambio").value= document.getElementById("descripcionCambio"+id).value;
      document.getElementById("razonesCambio").value= document.getElementById("razonesCambio"+id).value;
      document.getElementById("afectaCambio").value= document.getElementById("afectaCambio"+id).value;
      document.getElementById("necesidadesCambio").value= document.getElementById("necesidadesCambio"+id).value;
      document.getElementById("flujoCambio").value= document.getElementById("flujoCambio"+id).value;
      document.getElementById("ajusteCambio").value= document.getElementById("ajusteCambio"+id).value;
      
      $('#cambiosFormato').openModal();
    }
    
    
        function cargarProcesos() {
            $http.get(uri + '/api/procesos').success(function(respuesta) {
                var o = "";
                var option="";
                for (x = 0; x <archivos.length; x++)
                { 
                    document.getElementById("proceso" + x).innerHTML="";
                    var o = document.getElementById("proceso" + x);
                    for (i = 0; i < respuesta.length; i++) {
                        option = document.createElement("option");
                        option.text = respuesta[i].nombre;
                        option.value = respuesta[i].id;
                        o.add(option);
                    }
                }
                $scope.cargarSubprocesos(1, 0);
                cargarDocumentos();
                cargarCargos();
            });
        }      
        function cargarCargos() {
            $http.get('http://www.appccvalledupar.co/timeit/public/api/cargos').success(function(respuesta) {
                var o = "";
                for (x = 0; x <archivos.length; x++)
                {               
                    document.getElementById("responsable" + x).innerHTML="";
                    document.getElementById("responsableAprobacion" + x).innerHTML="";
                    var o = document.getElementById("responsable" + x);
                    var p = document.getElementById("responsableAprobacion" + x);
                    for (i = 0; i < respuesta.length; i++) {
                        var option = document.createElement("option");
                        option.text = respuesta[i].nombre;
                        option.value = respuesta[i].id;
                        o.add(option);
                    }
                      for (i = 0; i < respuesta.length; i++) {
                          if(respuesta[i].id == 68 || respuesta[i].id == 9){
                        var option = document.createElement("option");
                        option.text = respuesta[i].nombre;
                        option.value = respuesta[i].id;
                        
                        p.add(option);
                        }
                    }
                }
            });
        }
        $scope.cargarSubprocesos = function(proceso, idSelect) {
            $http.get(uri + '/api/subprocesos/proceso/' + proceso).success(function(respuesta) {
                if (respuesta == 0) {
                    if (idSelect != 0) {
                        idSelect = idSelect.replace(/\D/g, '');
                    }
                    Materialize.toast("No hay sub procesos para este proceso", '3000', 'rounded');
                    document.getElementById("subproceso" + idSelect).innerHTML = "";
                } else {
                    if (isNaN(idSelect) == false) {
                        document.getElementById("subproceso" + idSelect).innerHTML = "";                  
                        var o = "";
                        for (x = 0; x < archivos.length; x++)
                        {
                            var o = document.getElementById("subproceso" + x);
                            for (i = 0; i < respuesta.length; i++) {
                                var option = document.createElement("option");
                                option.text = respuesta[i].nombre;
                                option.value = respuesta[i].id;
                                o.add(option);
                            }
                        }
                    } else {
                        idSelect = idSelect.replace(/\D/g, '');
                        document.getElementById("subproceso" + idSelect).innerHTML = "";
                        var o = document.getElementById("subproceso" + idSelect);
                        for (i = 0; i < respuesta.length; i++)
                        {
                            var option = document.createElement("option");
                            option.text = respuesta[i].nombre;
                            option.value = respuesta[i].id;
                            o.add(option);
                        }
                    }
                }
            });
        }
        
        $scope.cargarSubprocesosExternos = function(proceso) {
            $http.get(uri + '/api/subprocesos/proceso/' + proceso).success(function(respuesta) {
                if (respuesta == 0) {
                    Materialize.toast("No hay sub procesos para este proceso", '3000', 'rounded');
                    $scope.listaSubprocesos="";
                } else {
                   
                                        
                        $scope.listaSubprocesos = respuesta;
                            
                }
            });
        }
        
        function cargarDocumentos() {
            $http.get(uri + '/api/documentos').success(function(respuesta) {    
                var o = "";
                for (x = 0; x < archivos.length; x++)
                {
                    var o = document.getElementById("documento" + x);
                    for (i = 0; i < respuesta.length; i++) {
                        var option = document.createElement("option");
                        option.text = respuesta[i].nombre;
                        option.value = respuesta[i].id;
                        o.add(option);
                    }
                }
            });
        }
        
        
        
        
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
                    $http.delete(uri+'/api/archivos/' + id).success(function (respuesta){
                            swal("Eliminado!", "Este archivo a ahora no existe.", "success"); 
                            $scope.cargarArchivos();
                    });
                });
	};
        


    }]);




