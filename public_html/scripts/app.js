var uri = "../../public";
var gl_resultado = {};
var app;
(function(){
    app = angular.module("sgc", ['ngRoute','ui.keypress']);
    
    app.config(['$routeProvider', '$locationProvider', function AppConfig($routeProvider, $locationProvider){
            
            
            $routeProvider
             .when("/documentos",{
                        templateUrl: 'documentos/index.html'
                    })
            .when("/consultarArchivos",{
                        templateUrl: 'documentos/consultarArchivos.html'
                    })
                    .when("/solicitudes",{
                        templateUrl: 'documentos/solicitudes.html'
                    })
                    .when("/consultarArchivosExternos",{
                        templateUrl: 'documentos/consultarArchivosExternos.html'
                    })
                    .when("/manuales",{
                        templateUrl: 'documentos/manuales.html'
                    })
                    .when("/archivos",{
                        templateUrl: 'documentos/archivos.html'
                    })
                    .when("/procesos",{
                        templateUrl: 'documentos/procesos.html'
                    })
                    .when("/tipodocumentos",{
                        templateUrl: 'documentos/documentos.html'
                    })
                    .when("/subprocesos",{
                        templateUrl: 'documentos/subprocesos.html'
                    })
                    .when("/obsoletos",{
                        templateUrl: 'documentos/obsoletos.html'
                    })
                    .when("/indicadores",{
                        templateUrl: 'indicadores/index.html'
                    })
                    .when("/indicadores/categorias",{
                        templateUrl: 'indicadores/categorias.html'
                    })
                    .when("/indicadores/subcategorias",{
                        templateUrl: 'indicadores/subcategorias.html'
                    })
                    .when("/indicadores/crear",{
                        templateUrl: 'indicadores/gestionIndicadores.html'
                    })
                    .when("/indicadores/medidas",{
                        templateUrl: 'indicadores/medidas.html'
                    })
                    .otherwise({
                        redirectTo:"/indicadores"
                    });
                    
            
    }]);

    app.directive('ngEnter', function () {
        return function (scope, elements, attrs) {
            elements.bind('keydown keypress', function (event) {
                if (event.which === 13) {
                    scope.$apply(function () {
                        scope.$eval(attrs.ngEnter);
                    });
                    event.preventDefault();
                }
            });
        };
    });
    
    app.filter('ifEmpty', function() {
        return function(input, defaultValue) {
            if (angular.isUndefined(input) || input === null || input === '') {
                return defaultValue;
            }

            return input;
        };
    });
    
    app.directive('uploaderModel',['$parse',function($parse){
        return{
            restrict: 'A',
            link: function(scope,iElement,iAttrs){
                iElement.on('change',function(e)
                {
                    $parse(iAttrs.uploaderModel).assign(scope,iElement[0].files[0]);
                });
            }
        };

    }]);

   

})();


