<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

use App\Http\Controllers\Controller;
use DB;
use App\Subcategoria;

class SubcategoriasController extends Controller
{
    

     public function getBycategoria($id){
        
         $result = DB::select(DB::raw(
                        "Select *  from subcategorias WHERE idCategoria = $id"
                    ));
         if(count($result)>0){
                return $result;
         }else{
             return 0;
         }
           
               
    }
    
    public function show($idSubsubcategoria){       
        return Subcategoria::find($idSubsubcategoria); 
    }
    
    public function getAll(){
        return Subcategoria::all();;   
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
                        "Select sp.* , categorias.nombre as nombreCategoria  from subcategorias as sp 
                        INNER JOIN categorias ON categorias.id = sp.idCategoria"  

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
        
            $subcategoria = new Subcategoria();
            $subcategoria->nombre = $data["nombre"];
             $subcategoria->idCategoria = $data["categoria"];
            $subcategoria->save();
            
     
     
            return JsonResponse::create(array('message' => "Subsubcategoria Guardado Correctamente", "request" => $subcategoria), 200);
            
        } catch (Exception $exc) {
            return JsonResponse::create(array('message' => "No se pudo guardar el Subsubcategoria", "exception"=>$exc->getMessage(), "request" =>json_encode($data)), 401);
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
            
            $subcategoria = Subcategoria::find($id);

             $subcategoria->nombre = $data["nombre"];
             $subcategoria->idCategoria = $data["idCategoria"];
        
            
            $subcategoria->save();
            
        
            
        return JsonResponse::create(array('message' => "Subsubcategoria Modificado Correctamente", "request" =>json_encode($data)), 200);
            
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
            $subcategoria = Subcategoria::find($id);
            $subcategoria->delete();
            return JsonResponse::create(array('message' => "Subsubcategoria Eliminado Correctamente", "request" =>json_encode($id)), 200);
        } catch (Exception $ex) {
            return JsonResponse::create(array('message' => "No se pudo Eliminar la marca", "exception"=>$ex->getMessage(), "request" =>json_encode($id)), 401);
        }
    }
}
