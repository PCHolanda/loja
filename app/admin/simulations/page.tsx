"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { PlusCircle } from "lucide-react"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

interface Simulation {
    id: string
    title: string
    price: number
    type: string
    metadata: {
        questions?: string
        type_label?: string
    }
}

export default function AdminSimulationsPage() {
    const [simulations, setSimulations] = useState<Simulation[]>([])

    useEffect(() => {
        fetchSimulations()
    }, [])

    async function fetchSimulations() {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('type', 'simulation')

        if (data) setSimulations(data)
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Simulados</h2>
                    <p className="text-muted-foreground">
                        Gerencie os simulados disponíveis na plataforma.
                    </p>
                </div>
                <Button asChild>
                    <Link href="/admin/simulations/new">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Novo Simulado
                    </Link>
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {simulations.map((sim) => (
                    <Card key={sim.id}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {sim.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(sim.price / 100)}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {sim.metadata?.questions || '?'} • {sim.metadata?.type_label || 'Geral'}
                            </p>
                            <div className="mt-4 flex gap-2">
                                {/* Future: Add Edit link */}
                                <Button variant="outline" size="sm" className="w-full">Editar</Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {simulations.length === 0 && (
                    <p className="col-span-3 text-muted-foreground">Nenhum simulado cadastrado ainda.</p>
                )}
            </div>
        </div>
    )
}
