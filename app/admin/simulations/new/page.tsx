"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Save } from "lucide-react"
import { useState } from "react"
// import { supabase } from "@/lib/supabase" // Uncomment when connecting to DB

export default function NewSimulationPage() {
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        // Simulate API call
        setTimeout(() => {
            setLoading(false)
            alert("Simulado cadastrado com sucesso! (Simulação)")
            // router.push('/admin/simulations')
        }, 1000)

        /* Real implementation:
        const { error } = await supabase.from('products').insert({ ... })
        */
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/admin/simulations">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Novo Simulado</h2>
                    <p className="text-muted-foreground">
                        Cadastre um novo simulado para venda.
                    </p>
                </div>
            </div>

            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Detalhes do Produto</CardTitle>
                        <CardDescription>
                            Informações básicas que aparecerão na loja.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="title">Título do Simulado</Label>
                                <Input id="title" placeholder="Ex: Simulado ENEM 2026 - Dia 1" required />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="price">Preço (R$)</Label>
                                    <Input id="price" placeholder="49,90" required type="number" step="0.01" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="type">Tipo</Label>
                                    <Input id="type" placeholder="Ex: 2 dias de prova" />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="description">Descrição</Label>
                                <Input id="description" placeholder="Breve descrição do conteúdo..." />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="questions">Quantidade de Questões</Label>
                                <Input id="questions" placeholder="Ex: 90 questões" />
                            </div>

                            <div className="flex justify-end">
                                <Button type="submit" disabled={loading}>
                                    {loading ? "Salvando..." : (
                                        <>
                                            <Save className="mr-2 h-4 w-4" />
                                            Salvar Simulado
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
