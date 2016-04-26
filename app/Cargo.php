<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Cargo extends Model
{
    protected $connection = 'funcionarios';
    
    protected $table = "cargos";
    
    public $timestamps = false;
    

   
   
}
