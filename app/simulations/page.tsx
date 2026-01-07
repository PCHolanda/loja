"use client"

import { Navbar } from "@/components/navbar"
import { CheckoutModal } from "@/components/checkout-modal"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { FileText, Clock, BarChart } from "lucide-react"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

interface Simulation {
    id: string
    title: string
    description: string
    price: number
    type: string
    metadata: {
        questions?: string
        type_label?: string
    }
}

export default function SimulationsPage() {
    const [simulations, setSimulations] = useState<Simulation[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchSimulations()
    }, [])

    async function fetchSimulations() {
        try {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('type', 'simulation')

            if (data) setSimulations(data)
        } catch (error) {
            console.error("Erro ao buscar simulados", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 container py-12">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Simulados Inéditos</h1>
                    <p className="text-muted-foreground">
                        Treine com questões simuladas no mesmo padrão da prova oficial. Relatórios de desempenho detalhados inclusos.
                    </p>
                </div>

                {loading ? (
                    <p>Carregando simulados...</p>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                        {simulations.map((sim) => (
                            <Card key={sim.id} className="flex flex-col md:flex-row shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex flex-col justify-between p-6 w-full">
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                                                {sim.metadata?.type_label || sim.type}
                                            </span>
                                        </div>
                                        <CardTitle className="mb-2 text-xl">{sim.title}</CardTitle>
                                        <CardDescription className="mb-4">
                                            {sim.description}
                                        </CardDescription>

                                        <div className="flex gap-4 text-sm text-muted-foreground mb-6">
                                            <div className="flex items-center gap-1">
                                                <FileText className="h-4 w-4" />
                                                {sim.metadata?.questions || '? questões'}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="h-4 w-4" />
                                                Cronômetro Real
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <BarChart className="h-4 w-4" />
                                                TRI Estimada
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between mt-auto pt-4 border-t">
                                        <span className="text-2xl font-bold">
                                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(sim.price / 100)}
                                        </span>
                                        <CheckoutModal product={sim} />
                                    </div>
                                </div>
                            </Card>
                        ))}

                        {simulations.length === 0 && (
                            <div className="col-span-2 text-center py-12 text-muted-foreground">
                                Nenhum simulado disponível no momento.
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    )
}
