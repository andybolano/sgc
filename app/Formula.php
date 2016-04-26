<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Formula extends Model
{
    protected $connection = 'sgc';
    protected $table = "formulas";
    public $timestamps = false;
}