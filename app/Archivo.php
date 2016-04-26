<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Archivo extends Model
{
    protected $connection = 'sgc';
    
    protected $table = "archivos";
    
    public $timestamps = false;
    

   
   
}
