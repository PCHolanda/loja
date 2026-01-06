import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { PlusCircle } from "lucide-react"

export default function AdminSimulationsPage() {
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
                {/* Placeholder for list - eventually map from Supabase */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Simulado Nacional #1
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">R$ 49,90</div>
                        <p className="text-xs text-muted-foreground">
                            180 questões • 2 dias
                        </p>
                        <div className="mt-4 flex gap-2">
                            <Button variant="outline" size="sm" className="w-full">Editar</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
