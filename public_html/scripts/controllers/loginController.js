app.controller('loginController', function($scope,loginService) {
    
        $scope.Usuario = {};
        
        initialize();
         function initialize()
         {
        $scope.Usuario = {
            user: "",  
            clave: ""                     
        };
    }
    
    
        $scope.iniciarSesion = function() {        
        if ($scope.Usuario.user == "" || $scope.Usuario.clave == "") {
              Materialize.toast("Faltan campos por digilenciar",5000,'rounded');
        } else {
            
        if(username){    
                    var object = {
                        username: $scope.Usuario.user,
                        pass: $scope.Usuario.clave
                    };            
                    document.getElementById("error").innerHTML = "";
                    document.getElementById("loading").style.display="block";
                    document.getElementById("btn-entrar").disabled=true;
                    var promisePost = loginService.autenticarUsuario(object);
                    promisePost.then(function(d) {                
                        if(d.data.message=="KO"){
                        document.getElementById("loading").style.display="none";
                        document.getElementById("btn-entrar").disabled=false;
                        Materialize.toast("Datos incorrectos, verifique su usuario y contraseña.",4000,'rounded');
                        }else if(d.data.message=="OK"){
                            
                            
                           var usuario = JSON.parse(d.data.request);
                          sessionStorage.id_usuario=usuario[0].noDocumento;
                            if(usuario[0].idCargo == "17" || usuario[0].idCargo == "67" || usuario[0].idCargo == "11"){
                               document.getElementById("loading").style.display="none";
                               document.getElementById("btn-entrar").disabled=false;
                               Materialize.toast("Usuario auntenticado",4000,'rounded');
                               window.location.href = "view/index.html";
                               sessionStorage.setItem('session',d.data.request);
                              
                           }else{                       
                               swal({   
                                title: "Oops <small>"+usuario[0].nombres+"</small>!",   
                                text: '<img src="http://www.appccvalledupar.co/timeit/view/blob.php?id='+usuario[0].noDocumento+'" alt="Contact Person" width = "100px" height="100px" style = "border-radius:50%;"><br><br>Parece que no deberias estar aquí',   
                                html: true });
                               
                               document.getElementById("loading").style.display="none";
                               document.getElementById("btn-entrar").disabled=false; 
                           }
                        }                                               
                    }, function(err) {
                        if (err.status == 401) {
                            console.log(err.data.exception);
                              document.getElementById("btn-entrar").disabled="false";
                        } else {
                            alert("Error Al procesar Solicitud");
                              document.getElementById("btn-entrar").disabled="false";
                        }
                        console.log("Some Error Occured " + JSON.stringify(err));
                          document.getElementById("btn-entrar").disabled="false";
                    });
            }else{

            }
        }
    };
    

});

