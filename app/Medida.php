<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Medida extends Model
{
    protected $connection = 'sgc';
    
    protected $table = "medidas";
    
    public $timestamps = false;
    

   
   
}