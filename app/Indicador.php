<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Indicador extends Model
{
    protected $connection = 'sgc';
    
    protected $table = "indicadores";
    
    public $timestamps = false;
    

   
   
}