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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ArrowLeft, Save } from "lucide-react"
import { useState } from "react"
import { createSimulation } from "../../actions"
import { useRouter } from "next/navigation"

export default function NewSimulationPage() {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const form = e.target as HTMLFormElement
        const formData = new FormData(form)

        // Ensure type_label matches the select value if possible, or we handle it in action
        // For now, form data will capture 'type' as the name of the input if set correctly.
        // Let's verify input names below.

        try {
            const result = await createSimulation(formData)

            if (!result.success) {
                alert("Erro ao criar simulado: " + result.error)
            } else {
                alert("Simulado criado com sucesso!")
                router.push('/admin/simulations')
            }
        } catch (error) {
            console.error(error)
            alert("Erro interno")
        } finally {
            setLoading(false)
        }
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
                                <Label htmlFor="title">Nome do Simulado</Label>
                                <Input id="title" name="title" placeholder="Ex: Simulado Nacional #1" required />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="price">Preço (R$)</Label>
                                    <Input id="price" name="price" placeholder="49,90" required type="number" step="0.01" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="type">Tipo</Label>
                                    <Select name="type_label" required>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="2 dias de prova">2 dias de prova</SelectItem>
                                            <SelectItem value="1º Dia">1º Dia</SelectItem>
                                            <SelectItem value="2º Dia">2º Dia</SelectItem>
                                            <SelectItem value="Área Específica">Área Específica</SelectItem>
                                            <SelectItem value="Teste">Teste</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="questions">Quantidade de Questões</Label>
                                <Input id="questions" name="questions" placeholder="Ex: 180 questões" />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="description">Descrição Curta</Label>
                                <Input id="description" name="description" placeholder="Ex: Modelo exato do ENEM 2025" />
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
