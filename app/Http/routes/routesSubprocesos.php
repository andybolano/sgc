<?php
 Route::resource("api/subprocesos","SubprocesosController");
 Route::get("api/subprocesos/proceso/{id}","SubprocesosController@getByProceso");
