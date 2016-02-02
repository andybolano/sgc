<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

use App\Http\Controllers\Controller;
use DB;
use App\Subproceso;

class SubprocesosController extends Controller
{
    

     public function getByproceso($id){
        
         $result = DB::select(DB::raw(
                        "Select *  from subprocesos WHERE idProceso = $id"
                    ));
         if(count($result)>0){
                return $result;
         }else{
             return 0;
         }
           
               
    }
    
    public function show($idSubsubproceso){       
        return Subsubproceso::find($idSubsubproceso); 
    }
    
    public function getAll(){
        return Subsubproceso::all();;   
    }

        /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        try {
               $result = DB::select(DB::raw(
                        "Select sp.* , procesos.nombre as nombreProceso  from subprocesos as sp 
                        INNER JOIN procesos ON procesos.id = sp.idProceso"  

                    ));
               
               return $result;
               
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
        
            $subproceso = new Subproceso();
            $subproceso->nombre = $data["nombre"];
            $subproceso->sigla = $data["sigla"];
                $subproceso->idProceso = $data["proceso"];
            $subproceso->save();
            
     
     
            return JsonResponse::create(array('message' => "Subsubproceso Guardado Correctamente", "request" => $subproceso), 200);
            
        } catch (Exception $exc) {
            return JsonResponse::create(array('message' => "No se pudo guardar el Subsubproceso", "exception"=>$exc->getMessage(), "request" =>json_encode($data)), 401);
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
            
            $subproceso = Subsubproceso::find($id);

             $subproceso->nombre = $data["nombre"];
            $subproceso->sigla= $data["sigla"];
             $subproceso->idProceso = $data["proceso"];
        
            
            $subproceso->save();
            
        
            
        return JsonResponse::create(array('message' => "Subsubproceso Modificado Correctamente", "request" =>json_encode($data)), 200);
            
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
            $subproceso = Subsubproceso::find($id);
            $subproceso->delete();
            return JsonResponse::create(array('message' => "Subsubproceso Eliminado Correctamente", "request" =>json_encode($id)), 200);
        } catch (Exception $ex) {
            return JsonResponse::create(array('message' => "No se pudo Eliminar la marca", "exception"=>$ex->getMessage(), "request" =>json_encode($id)), 401);
        }
    }
}
