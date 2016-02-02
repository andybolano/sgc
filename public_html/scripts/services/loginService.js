app.service('loginService', function($http){
      this.autenticarUsuario = function (object){
          u = "../public";
          var req = $http.post('http://www.appccvalledupar.co/timeit/public/api/usuario/autenticar',object);
	  return req;
        }
    });


