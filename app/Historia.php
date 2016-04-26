<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Historia extends Model
{
    protected $connection = 'sgc';
    
    protected $table = "historiadocumentos";
    
    public $timestamps = false;
    

   
   
}