<?php

namespace Database\Factories;

use App\Models\Order;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Enums\OrderStatus;

/**
 * @extends Factory<Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'customer_name' => fake()->name(),
            'customer_email' => fake()->safeEmail(),

            'amount' => fake()->randomFloat(2, 100, 5000),

            'status' => fake()->randomElement([
                OrderStatus::PAID->value,
                OrderStatus::PENDING->value,
                OrderStatus::FAILED->value,
                OrderStatus::REFUNDED->value,
            ]),

            'payment_method' => fake()->randomElement([
                'credit_card',
                'paypal',
                'bank_transfer',
            ]),

            'metadata' => [
                'bank' => fake()->randomElement([
                    'BBVA',
                    'Santander',
                    'Banorte',
                    'Banamex',
                    'NU Bank',
                ]),
                'ip' => fake()->ipv4(),
                'country' => fake()->country(),
                'transaction_id' => fake()->uuid(),
            ],
        ];
    }
}
