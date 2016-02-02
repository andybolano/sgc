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
            var object = {
                username: $scope.Usuario.user,
                pass: $scope.Usuario.clave
            };            
            document.getElementById("error").innerHTML = "";
            var promisePost = loginService.autenticarUsuario(object);
            promisePost.then(function(d) {                
                if(d.data.message=="KO"){
     
                    Materialize.toast("Datos incorrectos, verifique su usuario y contraseña.",4000,'rounded');
                }else if(d.data.message=="OK"){
                    Materialize.toast("Usuario auntenticado",4000,'rounded');
                      window.location.href = "view/admin/index.html";
                      sessionStorage.setItem('session',d.data.request);
                }                                               
            }, function(err) {
                if (err.status == 401) {
                    console.log(err.data.exception);
                } else {
                    alert("Error Al procesar Solicitud");
                }
                console.log("Some Error Occured " + JSON.stringify(err));
            });
        }
    };
    

});

