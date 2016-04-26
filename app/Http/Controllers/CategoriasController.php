<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

use App\Http\Controllers\Controller;

use App\Categoria;

class CategoriasController extends Controller
{
    

    
    public function show($idCategoria){       
        return Categoria::find($idCategoria); 
    }
    
    public function getAll(){
        return Categoria::all();;   
    }

        /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        try {
            return Categoria::all();   
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
        
            $categoria = new Categoria();
            $categoria->nombre = $data["nombre"];
            $categoria->save();
            
     
     
            return JsonResponse::create(array('message' => "Categoria Guardado Correctamente", "request" => $categoria), 200);
            
        } catch (Exception $exc) {
            return JsonResponse::create(array('message' => "No se pudo guardar el Categoria", "exception"=>$exc->getMessage(), "request" =>json_encode($data)), 401);
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
            
            $categoria = Categoria::find($id);

             $categoria->nombre = $data["nombre"];
         
        
            
            $categoria->save();
            
        
            
        return JsonResponse::create(array('message' => "Categoria Modificado Correctamente", "request" =>json_encode($data)), 200);
            
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
            $categoria = Categoria::find($id);
            $categoria->delete();
            return JsonResponse::create(array('message' => "Categoria Eliminado Correctamente", "request" =>json_encode($id)), 200);
        } catch (Exception $ex) {
            return JsonResponse::create(array('message' => "No se pudo Eliminar la marca", "exception"=>$ex->getMessage(), "request" =>json_encode($id)), 401);
        }
    }
}
