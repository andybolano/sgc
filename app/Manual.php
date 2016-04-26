<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Manual extends Model
{
    protected $connection = 'sgc';
    
    protected $table = "manuales";
    
    public $timestamps = false;
    

   
   
}