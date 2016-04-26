<?php
 Route::resource("api/indicadores","IndicadoresController");
 Route::get("api/getIndicadores/{proceso}","IndicadoresController@getIndicadoresByProceso");
 Route::get("api/getIndicadores/subproceso/{subproceso}","IndicadoresController@getIndicadoresBySubproceso");
 Route::post("api/indicadores/resultado","IndicadoresController@storeResultados");
 