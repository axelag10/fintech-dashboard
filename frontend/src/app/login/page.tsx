'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { login } from '@/services/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('admin@test.com')
    const [password, setPassword] = useState('123456')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleLogin = async () => {
        try {
            setLoading(true)

            setError('')

            const data = await login(
            email,
            password
            )

            localStorage.setItem(
            'token',
            data.token
            )

            router.replace('/')
        } catch {
            setError('Invalid credentials')
        } finally {
            setLoading(false)
        }
    }

    return (
        <main
            className="
            min-h-screen
            bg-gradient-to-br
            from-slate-100
            to-slate-200
            dark:from-slate-950
            dark:to-slate-900
            flex
            items-center
            justify-center
            p-4
            "
        >
            <Card className="w-full max-w-md">
            <CardContent className="p-8">
                <div className="mb-6 text-center">
                <h1 className="text-3xl font-bold">
                    Orders && Payments Admin
                </h1>

                <p className="text-gray-500 mt-2">
                    Sign in to continue
                </p>
                </div>

                <div className="space-y-4">
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                    setEmail(e.target.value)
                    }
                />

                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                    setPassword(e.target.value)
                    }
                />

                {error && (
                    <div
                    className="
                        text-sm
                        text-red-500
                    "
                    >
                    {error}
                    </div>
                )}

                <Button
                    className="w-full"
                    onClick={handleLogin}
                    disabled={loading}
                >
                    {loading
                    ? 'Signing in...'
                    : 'Sign In'}
                </Button>
                </div>
            </CardContent>
            </Card>
        </main>
    )
}