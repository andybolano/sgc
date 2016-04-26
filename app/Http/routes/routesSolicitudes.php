<?php
 Route::resource("api/solicitudes","SolicitudesController");
 Route::get("api/solicitudes/byFuncionario/{id}","SolicitudesController@byFuncionario");
 Route::post("api/solicitudes/updateEstado","SolicitudesController@updateSolicitud");
  Route::post("api/solicitudes/respuesta","SolicitudesController@storeRespuesta");
  Route::get("api/solicitudes/historia/{id}","SolicitudesController@getHistoria");
  Route::post("api/solicitudes/revisado/{id}","SolicitudesController@updateEstadoRevisado");
  
  Route::post("api/solicitudes/eliminar/{id}","SolicitudesController@deleteSolicitud");