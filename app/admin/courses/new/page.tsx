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
import { createCourse } from "../../actions"

export default function NewCoursePage() {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const form = e.target as HTMLFormElement
        const formData = new FormData(form)

        try {
            const result = await createCourse(formData)

            if (!result.success) {
                alert("Erro ao criar curso: " + result.error)
            } else {
                alert("Curso criado com sucesso!")
                router.push('/admin/courses')
            }
        } catch (error) {
            alert("Erro inesperado.")
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/admin/courses">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Novo Curso</h2>
                    <p className="text-muted-foreground">
                        Crie um novo curso estruturado.
                    </p>
                </div>
            </div>

            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Informações do Curso</CardTitle>
                        <CardDescription>
                            Dados principais e precificação.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="title">Nome do Curso</Label>
                                <Input id="title" name="title" placeholder="Ex: Matemática Zero ao Topo" required />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="price">Preço (R$)</Label>
                                    <Input id="price" name="price" placeholder="197,90" required type="number" step="0.01" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="duration">Duração</Label>
                                    <Input id="duration" name="duration" placeholder="Ex: 6 meses" />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="description">Descrição</Label>
                                <Input id="description" name="description" placeholder="O que o aluno vai aprender..." />
                            </div>

                            <div className="flex justify-end">
                                <Button type="submit" disabled={loading}>
                                    {loading ? "Salvando..." : (
                                        <>
                                            <Save className="mr-2 h-4 w-4" />
                                            Salvar Curso
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
