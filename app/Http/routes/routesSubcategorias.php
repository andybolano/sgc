<?php
 Route::resource("api/subcategorias","SubcategoriasController");
 Route::get("api/subcategorias/categoria/{id}","SubcategoriasController@getByCategoria");