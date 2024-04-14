<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $table = 'orders';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'order_code',
        'status',
        'customer_name',
        'customer_phone',
        'customer_email',
        'shipping_address',
        'total_price',
        'shipping_method',
    ];

    // Relationship với OrderItem
    public function orderItems(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(OrderItem::class);
    }
}
