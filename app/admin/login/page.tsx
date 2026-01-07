"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Cookies from "js-cookie"

export default function AdminLoginPage() {
    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const router = useRouter()

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()

        // Hardcoded credentials as requested
        if (user === "admin" && password === "super13") {
            // Set simple cookie
            Cookies.set("admin_session", "true", { expires: 1 }) // 1 day
            router.push("/admin")
        } else {
            setError("Credenciais inválidas")
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Acesso Admin</CardTitle>
                    <CardDescription>
                        Área restrita para gerenciamento.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="user">Usuário</Label>
                            <Input
                                id="user"
                                type="text"
                                value={user}
                                onChange={(e) => setUser(e.target.value)}
                                placeholder="Digite o usuário"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Senha</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Digite a senha"
                                required
                            />
                        </div>
                        {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
                        <Button type="submit" className="w-full">
                            Entrar
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
