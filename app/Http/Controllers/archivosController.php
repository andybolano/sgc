<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

use App\Http\Controllers\Controller;
use DB;
use App\Archivo;

class ArchivosController extends Controller
{
    

    
    public function show($idArchivo){       
        return Archivo::find($idArchivo); 
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
                        "Select a.*, documentos.*, procesos.nombre as nam_proceso, subprocesos.nombre as nam_subproceso, tipodocumentos.nombre as nam_documento  from archivos as a 
                        INNER JOIN documentos ON documentos.idArchivo = a.id
                        INNER JOIN procesos ON procesos.id = a.proceso 
                        INNER JOIN subprocesos ON subprocesos.id = a.subproceso
                        INNER JOIN tipodocumentos ON tipodocumentos.id = a.tipoDocumento"

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
        
            $archivo = new Archivo();
            $archivo->nombre = $data["nombre"];
            $archivo->sigla = $data["sigla"];
            $archivo->save();
            
     
     
            return JsonResponse::create(array('message' => "Archivo Guardado Correctamente", "request" => $archivo), 200);
            
        } catch (Exception $exc) {
            return JsonResponse::create(array('message' => "No se pudo guardar el Archivo", "exception"=>$exc->getMessage(), "request" =>json_encode($data)), 401);
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
            
            $archivo = Archivo::find($id);

             $archivo->nombre = $data["nombre"];
            $archivo->sigla= $data["sigla"];
        
            
            $archivo->save();
            
        
            
        return JsonResponse::create(array('message' => "Archivo Modificado Correctamente", "request" =>json_encode($data)), 200);
            
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
            $archivo = Archivo::find($id);
            $archivo->delete();
            return JsonResponse::create(array('message' => "Archivo Eliminado Correctamente", "request" =>json_encode($id)), 200);
        } catch (Exception $ex) {
            return JsonResponse::create(array('message' => "No se pudo Eliminar la marca", "exception"=>$ex->getMessage(), "request" =>json_encode($id)), 401);
        }
    }
}
