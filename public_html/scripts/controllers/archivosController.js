app.controller('archivosController', ['$scope', '$http', function($scope, $http) {

        $scope.listaArchivos = {};
        $scope.Archivo = {};
        var archivos = new Array();
        var todo=new Array();
     

//obtener fecha de hoy
        
        Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
});


   $scope.modalCambios = function(id){
       document.getElementById("nombreArchivo").innerHTML = archivos[id].file.name;
       document.getElementById("idCambio").value=id;
      
      $('#cambios').openModal();
    }
    
    
    

        $scope.cargarArchivos = function() {
            $http.get(uri + '/api/archivos').success(function(respuesta) {
                console.log(respuesta);
                $scope.listaArchivos = respuesta;
 
            });
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
        var file;
        if(archivos.length==0){
            Materialize.toast("No existen Archivos para subir",1000,"rounded");
        }else{
            document.getElementById('subirArchivos').disabled=true;
             document.getElementById('loading').style.display="block";
             
	for(i=0; i < archivos.length; i++){
		file=archivos[i].file;
                proceso = document.getElementById("proceso"+i).value;
                subproceso = document.getElementById("subproceso"+i).value;
                documento = document.getElementById("documento"+i).value;
                version = document.getElementById("version"+i).value;
                fechaActualizacion = document.getElementById("fechaActualizacion"+i).value;
                //externo = document.getElementById("externo"+i).checked;
                externo = "false";
                responsable = document.getElementById("responsable"+i).value;
                cambio = document.getElementById("cambios"+i).value;
                responsableAprobacion = document.getElementById("responsableAprobacion"+i).value;
		todo.push({'id':i,'file': file,"proceso":proceso,"subproceso":subproceso,"documento":documento,"version":version,"fechaActualizacion":fechaActualizacion,"externo":externo,"responsable":responsable,"responsableAprobacion":responsableAprobacion,"cambio":cambio});
                
               }
             
         envios();
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

console.log(respuesta);
      
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
                        '<input type="number" id="version'+ i +'">'+
                        '</td>'+
                       '<td>'+
                        '<input type="date" id="fechaActualizacion'+ i +'" style="width:90%">'+
                        '</td>'+
                        '<td>'+
                         '<select  id="responsable' + i + '" class="browser-default">' +
                        '</select>' +
                        '</td>'+
                          '<td>'+
                         '<select  id="responsableAprobacion' + i + '" class="browser-default">' +
                        '</select>' +
                        '</td>'+
                        '<td style="text-align:center">'+
                        '<a href="javascript:;" onclick="angular.element(this).scope().modalCambios('+i+');"><i class="material-icons">message</i></a>'+
                        '<input type="hidden" id="cambios'+i+'" name="cambios'+i+'" value="">'+
                        '</td>'+
                        //'<td><p><input type="checkbox" id="externo'+i+'" /><label for="externo'+i+'"></label></p></td>'+
                        "</tr>";

                $("#lista").append(item);
                document.getElementById('fechaActualizacion'+ i ).value = new Date().toDateInputValue();
            }
            
         

           cargarProcesos();
                    
                    
                    
                    

        }


        function cargarProcesos() {
            $http.get(uri + '/api/procesos').success(function(respuesta) {
                var o = "";
                for (x = 0; x <archivos.length; x++)
                {
                   
                    document.getElementById("proceso" + x).innerHTML="";
                    var o = document.getElementById("proceso" + x);
                    for (i = 0; i < respuesta.length; i++) {
                        var option = document.createElement("option");
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
                        var option = document.createElement("option");
                        option.text = respuesta[i].nombre;
                        option.value = respuesta[i].id;
                        p.add(option);
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
        

        

    }]);



//$scope.listaSubprocesos = {};
//refrescar();
/*    function refrescar(){
 document.getElementById("guardar").disabled = false;
 document.getElementById("actualizar").disabled = true;
 
 $http.get(uri+'/api/subprocesos').success(function (respuesta){
 $scope.listaSubprocesos = respuesta;
 $scope.Subprocesos = "";
 });
 }
 
 
 /*  $scope.guardar = function(){
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
 };*/

