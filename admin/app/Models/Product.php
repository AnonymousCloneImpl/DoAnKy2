<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = ['name', 'price', 'height', 'length_col', 'width', 'base_unit', 'producer', 'quantity', 'status', 'inserted_at', 'inserted_by', 'updated_at', 'updated_by'];
}
