<?php
 Route::resource("api/archivos","ArchivosController");
 Route::post("api/archivos/nuevaVersion","ArchivosController@storeDocumento"); //****/
 Route::get("api/archivos/{id}/historial","ArchivosController@historial");
 Route::get("api/archivos/{id}/proceso","ArchivosController@ByProceso");
 Route::get("api/obsoletos","ArchivosController@archivosObsoletos");
 Route::get("api/archivosExternos","ArchivosController@indexExterno");
 Route::post("api/archivos/update","ArchivosController@updateArchivo");
 
 Route::post("api/manuales/nuevo","ArchivosController@nuevoManual");
 Route::get("api/manuales","ArchivosController@getManuales");
 Route::post("api/manuales/anexo/nuevo","ArchivosController@nuevoAnexo");
 Route::get("api/anexos/{id}","ArchivosController@getAnexos");
 
 Route::get("api/manual/procesos","ArchivosController@getManualProcesos");
  Route::get("api/manual/calidad","ArchivosController@getManualCalidad");
  
 Route::get("api/manual/calidad/documento","ArchivosController@getDocManualCalidad");
 
 Route::post("api/archivos/nuevoExternos","ArchivosController@nuevoExterno");
 
  Route::get("api/archivos/{id}/procesoExterno","ArchivosController@ByProcesoExterno");