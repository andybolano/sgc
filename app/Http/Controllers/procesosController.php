<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

use App\Http\Controllers\Controller;

use App\Proceso;

class ProcesosController extends Controller
{
    

    
    public function show($idProceso){       
        return Proceso::find($idProceso); 
    }
    
    public function getAll(){
        return Proceso::all();;   
    }

        /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        try {
            return Proceso::all();   
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
        
            $proceso = new Proceso();
            $proceso->nombre = $data["nombre"];
            $proceso->sigla = $data["sigla"];
            $proceso->save();
            
     
     
            return JsonResponse::create(array('message' => "Proceso Guardado Correctamente", "request" => $proceso), 200);
            
        } catch (Exception $exc) {
            return JsonResponse::create(array('message' => "No se pudo guardar el Proceso", "exception"=>$exc->getMessage(), "request" =>json_encode($data)), 401);
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
            
            $proceso = Proceso::find($id);

             $proceso->nombre = $data["nombre"];
            $proceso->sigla= $data["sigla"];
        
            
            $proceso->save();
            
        
            
        return JsonResponse::create(array('message' => "Proceso Modificado Correctamente", "request" =>json_encode($data)), 200);
            
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
            $proceso = Proceso::find($id);
            $proceso->delete();
            return JsonResponse::create(array('message' => "Proceso Eliminado Correctamente", "request" =>json_encode($id)), 200);
        } catch (Exception $ex) {
            return JsonResponse::create(array('message' => "No se pudo Eliminar la marca", "exception"=>$ex->getMessage(), "request" =>json_encode($id)), 401);
        }
    }
}
