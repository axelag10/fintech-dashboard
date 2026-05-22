<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (
            $credentials['email'] !== 'admin@test.com' ||
            $credentials['password'] !== '123456'
        ) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }

        return response()->json([
            'token' => 'fake-jwt-token',
            'user' => [
                'name' => 'Admin',
                'email' => 'admin@test.com',
            ]
        ]);
    }
}
