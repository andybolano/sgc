<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

use App\Http\Controllers\Controller;

use DB;
use App\DocumentosArchivos;
use App\Historia;
use App\Archivo;

class SolicitudesController extends Controller
{
    
     public function byFuncionario($id)
    {
        try {
                $result = DB::select(DB::raw(
                        "Select COUNT(historiadocumentos.id) as totalMensajes , a.*,a.id as idArch, documentos.*,documentos.id as idDoc, procesos.nombre as nam_proceso, subprocesos.nombre as nam_subproceso, tipodocumentos.nombre as nam_documento,formatoCambios.* from archivos as a 
                        INNER JOIN documentos ON documentos.idArchivo = a.id AND documentos.estado = 'ESPERANDO APROBACION' AND documentos.idFuncionario_subio = $id
                        INNER JOIN procesos ON procesos.id = a.proceso 
                        INNER JOIN subprocesos ON subprocesos.id = a.subproceso
                        INNER JOIN tipodocumentos ON tipodocumentos.id = a.tipoDocumento
                        INNER JOIN formatoCambios ON  formatoCambios.idDocumento = documentos.id
                        LEFT JOIN historiadocumentos ON historiadocumentos.revisado = 0 AND historiadocumentos.documento = documentos.id"
                    ));          
                 return $result; 
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
    }
    
    //revision de mensajes
public function updateEstadoRevisado($id){
    $mensaje = Historia::find($id);
    $mensaje->revisado = 1;
    $mensaje->save();
}
    
   /* public function show($idProceso){       
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
              $result = DB::select(DB::raw(
                        "Select a.*,a.id as idArch, documentos.*,documentos.id as idDoc, procesos.nombre as nam_proceso, subprocesos.nombre as nam_subproceso, tipodocumentos.nombre as nam_documento,formatoCambios.* from archivos as a 
                        INNER JOIN documentos ON documentos.idArchivo = a.id AND documentos.estado = 'ESPERANDO APROBACION'
                        INNER JOIN procesos ON procesos.id = a.proceso 
                        INNER JOIN subprocesos ON subprocesos.id = a.subproceso
                        INNER JOIN tipodocumentos ON tipodocumentos.id = a.tipoDocumento
                        INNER JOIN formatoCambios ON  formatoCambios.idDocumento = documentos.id"

                    ));
                
                 return $result;  
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
    }
    
     public function updateSolicitud(Request $request)
    {

        try {  
        $data = $request->all();
        $id = $data["idDocumento"];
        $documento = DocumentosArchivos::find($id);

        if($data["autoriza"] =='comite'){
            $documento->aprobacioncomite = $data["estado"];
            $documento->revisioncomite = 1;
            if($documento->aprobacionresponsable =='1' && $data["estado"] == '1'){
                $documento->estado="VIGENTE";
              
                
              //****************poner obsoleto el antiguo  
                $idArchivo = $documento->idArchivo;
                
               $result = DB::select(DB::raw(
                        "Select * FROM documentos WHERE idArchivo = $idArchivo AND id not in ($id) "
                    ));
               
              if(count($result)>0){ 
                    foreach ($result as $i) {
                        $idDoc_obsoleto = $i->id;
                    } 
                    $doc = DocumentosArchivos::find($idDoc_obsoleto); 
                      $doc->estado="OBSOLETO";
                      $doc->save();
                      $nombreOriginal = (explode('/',$documento->url,6));
                     
                     
                      $archivo = Archivo::find($idArchivo);
                      $archivo->nombre  = $nombreOriginal[5];
                      $archivo->save();
              }
               //^************************************ 
               
                
            }
        }else if($data["autoriza"] =='calidad'){
            $documento->aprobacionresponsable = $data["estado"];
             $documento->revisionresponsable = 1;
             if($documento->aprobacioncomite =='1' && $data["estado"] == '1'){
                $documento->estado="VIGENTE";
               
                  //***********poner obsoleto el antiguo  
                $idArchivo = $documento->idArchivo;
                
               $result = DB::select(DB::raw(
                        "Select * FROM documentos WHERE idArchivo = $idArchivo AND id not in ($id) "
                    ));
               
              if(count($result)>0){ 
                    foreach ($result as $i) {
                        $idDoc_obsoleto = $i->id;
                    } 
                    $doc = DocumentosArchivos::find($idDoc_obsoleto); 
                      $doc->estado="OBSOLETO";
                      $doc->save();
              }
              //********************************/
            }
        }

        $documento->save();

      
       return JsonResponse::create(array('message' => "Documento Modificado Correctamente", "request" =>json_encode($documento)), 200);         
        } catch (Exception $exc) {
            return JsonResponse::create(array('message' => "No se pudo Modificar la marca", "exception"=>$exc->getMessage(), "request" =>json_encode($data)), 401);
        }
    }
    
    
     public function deleteSolicitud($id)
    {
        try {  
        $documento = DocumentosArchivos::find($id);
        $documento->estado = 'ELIMINAR';
        $documento->save();
        
        DB::table('historiadocumentos')->where('documento', $id)->delete();
        
        return JsonResponse::create(array('message' => "Solicitud eliminada Correctamente", "request" =>json_encode($documento)), 200);         
        } catch (Exception $exc) {
            return JsonResponse::create(array('message' => "No se pudo Modificar la marca", "exception"=>$exc->getMessage(), "request" =>json_encode($data)), 401);
        }
   }
        
 public function storeRespuesta(Request $request)
    {
        try {            
        $data = $request->all();
        $historia = new Historia();        
        $historia->documento = $data["documento"];
        $historia->mensaje = $data["mensaje"];
        $historia->fecha =  $data["fecha"];
        $historia->emisor =$data["emite"];   
        $historia->nombre =  $data["nombre"];
        $historia->save();  
        return JsonResponse::create(array('message' => "Respuesta enviada correctamente", "request" =>json_encode($historia)), 200);            
        } catch (Exception $exc) {
            return JsonResponse::create(array('message' => "No se pudo Modificar la marca", "exception"=>$exc->getMessage(), "request" =>json_encode($data)), 401);
        }
    }
    
    public function getHistoria($id) {
        try {
              $result = DB::select(DB::raw(
                        "Select * FROM historiadocumentos WHERE documento = $id"
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
    /*public function store(Request $request)
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
  /*  public function update(Request $request, $id)
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
   /* public function destroy($id)
    {
        try {
            $proceso = Proceso::find($id);
            $proceso->delete();
            return JsonResponse::create(array('message' => "Proceso Eliminado Correctamente", "request" =>json_encode($id)), 200);
        } catch (Exception $ex) {
            return JsonResponse::create(array('message' => "No se pudo Eliminar la marca", "exception"=>$ex->getMessage(), "request" =>json_encode($id)), 401);
        }
    }*/
}
