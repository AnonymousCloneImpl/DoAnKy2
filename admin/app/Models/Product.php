<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'producer_id',
        'model',
        'name',
        'status',
        'type',
        'discount_percentage',
        'image',
        'price',
        'blog_id'
    ];
}
