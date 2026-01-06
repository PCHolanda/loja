import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { PlusCircle } from "lucide-react"

export default function AdminCoursesPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Cursos</h2>
                    <p className="text-muted-foreground">
                        Gerencie os cursos e módulos de aulas.
                    </p>
                </div>
                <Button asChild>
                    <Link href="/admin/courses/new">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Novo Curso
                    </Link>
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* Placeholder */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Extensivo ENEM 2026
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">R$ 297,00</div>
                        <p className="text-xs text-muted-foreground">
                            Completo • Todas as matérias
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
