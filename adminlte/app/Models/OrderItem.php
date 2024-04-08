<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use HasFactory;

    protected $table = 'order_item';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'order_id',
        'quantity',
        'product_id',
    ];

    // Relationship với Order
    public function order(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    // Khai báo mối quan hệ với model Product
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
