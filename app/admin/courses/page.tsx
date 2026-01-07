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

interface Course {
    id: string
    title: string
    price: number
    type: string
    metadata: {
        duration?: string
    }
}

export default function AdminCoursesPage() {
    const [courses, setCourses] = useState<Course[]>([])

    useEffect(() => {
        fetchCourses()
    }, [])

    async function fetchCourses() {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('type', 'course')

        if (data) setCourses(data)
    }

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
                {courses.map((course) => (
                    <Card key={course.id}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {course.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(course.price / 100)}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {course.metadata?.duration || 'Duração não definida'}
                            </p>
                            <div className="mt-4 flex gap-2">
                                {/* Future: Add Edit link */}
                                <Button variant="outline" size="sm" className="w-full">Editar</Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {courses.length === 0 && (
                    <p className="col-span-3 text-muted-foreground">Nenhum curso cadastrado ainda.</p>
                )}
            </div>
        </div>
    )
}
