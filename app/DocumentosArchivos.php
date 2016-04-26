<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DocumentosArchivos extends Model
{
    protected $connection = 'sgc';
    
    protected $table = "documentos";
    
    public $timestamps = false;
    

   
   
}