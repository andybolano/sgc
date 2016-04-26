<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

use App\Http\Controllers\Controller;

use App\Indicador;
use App\Proceso;
use App\Subproceso;
use App\Cargo;
use DB;

class IndicadoresController extends Controller
{
    

    public function storeResultados(Request $request){
        try{
            
            $data = $request->all();
            $resultados = json_decode($data["resultados"]);
                foreach ($resultados as $r) {
                      $resultado = new resultadosIndicadores();
                      $resultado->numerador = $r->numerador;
                      $resultado->denominador = $r->denominador;
                      $resultado->mes = $p->cantidad;
                      $resultado->anio = $p->precio;
                      $resultado->total = $p->subtotal;
                      $resultado->save();    
                  }
            
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
    }
    public function show($idIndicador){       
        return Indicador::find($idIndicador); 
    }
    
    public function getAll(){
        return Indicador::all();   
    }
    
    public function getIndicadoresByProceso($idProceso){
        try{
            
           $indicadores = DB::select(DB::raw("SELECT i.*,procesos.id as idProcesos,procesos.nombre as nombreProceso,medidas.nombre as medidaNombre,subprocesos.nombre as nombreSubproceso,subprocesos.id as idSubproceso, categorias.nombre as nombreCategoria, subcategorias.nombre as nombreSubcategoria  FROM indicadores as i
                   INNER JOIN categorias ON categorias.id = i.categoria
                   INNER JOIN subcategorias ON subcategorias.id = i.subcategoria
                   INNER JOIN procesos ON procesos.id = i.proceso
                   INNER JOIN subprocesos ON subprocesos.id = i.subproceso
                   INNER JOIN medidas ON medidas.id = i.unidadMedida
                   WHERE i.proceso = $idProceso AND i.estado ='ACTIVO'"
                   ));
             
           return $indicadores;
        
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
    }

    public function getIndicadoresBySubproceso($idSubproceso){
        try{
            
           $indicadores = DB::select(DB::raw("SELECT i.*,procesos.id as idProcesos,procesos.nombre as nombreProceso,medidas.nombre as medidaNombre,subprocesos.nombre as nombreSubproceso,subprocesos.id as idSubproceso, categorias.nombre as nombreCategoria, subcategorias.nombre as nombreSubcategoria  FROM indicadores as i
                   INNER JOIN categorias ON categorias.id = i.categoria
                   INNER JOIN subcategorias ON subcategorias.id = i.subcategoria
                   INNER JOIN procesos ON procesos.id = i.proceso
                   INNER JOIN subprocesos ON subprocesos.id = i.subproceso
                   INNER JOIN medidas ON medidas.id = i.unidadMedida
                   WHERE i.subproceso = $idSubproceso AND i.estado ='ACTIVO'"
                   ));
             
           return $indicadores;
        
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
    }
        /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        try {
            
            $listaIndicadores= array();
             
           $indicadores = DB::select(DB::raw("SELECT i.*,procesos.id as idProcesos,procesos.nombre as nombreProceso,medidas.nombre as medidaNombre,subprocesos.nombre as nombreSubproceso,subprocesos.id as idSubproceso, categorias.nombre as nombreCategoria, subcategorias.nombre as nombreSubcategoria FROM indicadores as i 
                   INNER JOIN categorias ON categorias.id = i.categoria
                   INNER JOIN subcategorias ON subcategorias.id = i.subcategoria
                   INNER JOIN procesos ON procesos.id = i.proceso
                   INNER JOIN subprocesos ON subprocesos.id = i.subproceso
                   INNER JOIN medidas ON medidas.id = i.unidadMedida
                   WHERE i.estado = 'ACTIVO'
                   ")); 
           
        foreach ($indicadores as $p){
          
          if($p->nombreSubproceso == '-'){
              //no tiene subproceso osea q el reponsable es el del proceso"
               $proceso = Proceso::find($p->idProcesos);
             $cargo = Cargo::find($proceso['responsable']);
              
              
          }else{
             $subproceso = Subproceso::find($p->idSubproceso);
             $cargo = Cargo::find($subproceso['responsable']);
          } 
          
          $listaIndicadores[] = array( 
              'i'  => $p,
              'responsable' => $cargo
          );

        }
            
     
                   return $listaIndicadores;
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
    }
    

    
    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request)
    {
        try {           
            $data = $request->all();
        
            $indicador = new Indicador();
            $indicador->nombre = $data["nombre"];
            $indicador->fuente = $data["fuente"];
            $indicador->categoria = $data["categoria"];
            $indicador->subcategoria = $data["subcategoria"];
            $indicador->frecuencia = $data["frecuencia"];
            $indicador->proceso = $data["proceso"];
            $indicador->subproceso = $data["subproceso"];
            $indicador->sentido = $data["sentido"];
            $indicador->unidadMedida = $data["unidadMedida"];
            $indicador->limiteInferior = $data["limiteInferior"];
            $indicador->limiteSuperior = $data["limiteSuperior"];
            $indicador->nombre_numerador = htmlspecialchars($data["nombre_numerador"]);
            $indicador->nombre_denominador = htmlspecialchars($data["nombre_denominador"]);
            $indicador->estado = $data['estado'];
            $indicador->save();
            
           
             
     
     
            return JsonResponse::create(array('message' => "Indicador Guardado Correctamente", "request" => $indicador), 200);
            
        } catch (Exception $exc) {
            return JsonResponse::create(array('message' => "No se pudo guardar el Indicador", "exception"=>$exc->getMessage(), "request" =>json_encode($data)), 401);
        }
        
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        try {
            
            $data = $request->all();
            
            $indicador = Indicador::find($id);

            $indicador->nombre = $data["nombre"];
            $indicador->categoria = $data["categoria"];
            $indicador->subcategoria = $data["subcategoria"];
            $indicador->frecuencia = $data["frecuencia"];
            $indicador->proceso = $data["proceso"];
            $indicador->subproceso = $data["subproceso"];
            $indicador->sentido = $data["sentido"];
            $indicador->unidadMedida = $data["unidadMedida"];
             $indicador->limiteInferior = $data["limiteInferior"];
            $indicador->limiteSuperior = $data["limiteSuperior"];
             $indicador->nombre_numerador = htmlspecialchars($data["nombre_numerador"]);
            $indicador->nombre_denominador = htmlspecialchars($data["nombre_denominador"]);
            $indicador->estado = $data['estado'];
            $indicador->save();
         
        
            
            $indicador->save();
            
        
            
        return JsonResponse::create(array('message' => "Indicador Modificado Correctamente", "request" =>json_encode($data)), 200);
            
        } catch (Exception $exc) {
            return JsonResponse::create(array('message' => "No se pudo Modificar la marca", "exception"=>$exc->getMessage(), "request" =>json_encode($data)), 401);
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        try {
            $indicador = Indicador::find($id);
            $indicador->delete();
            return JsonResponse::create(array('message' => "Indicador Eliminado Correctamente", "request" =>json_encode($id)), 200);
        } catch (Exception $ex) {
            return JsonResponse::create(array('message' => "No se pudo Eliminar la marca", "exception"=>$ex->getMessage(), "request" =>json_encode($id)), 401);
        }
    }
}
