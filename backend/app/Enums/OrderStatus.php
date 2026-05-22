<?php

namespace App\Enums;

enum OrderStatus:string
{
    case PAID = 'paid';
    case PENDING = 'pending';
    case FAILED = 'failed';
    case REFUNDED = 'refunded';
}