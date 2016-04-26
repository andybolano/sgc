<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Subproceso extends Model
{
    protected $connection = 'sgc';
    
    protected $table = "subprocesos";
    
    public $timestamps = false;
    

   
   
}
