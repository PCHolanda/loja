"use client"

import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

interface Course {
    id: string
    title: string
    description: string
    price: number
    type: string
    metadata: {
        duration?: string
        level?: string
    }
}

export default function CoursesPage() {
    const [courses, setCourses] = useState<Course[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchCourses()
    }, [])

    async function fetchCourses() {
        try {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('type', 'course')

            if (data) setCourses(data)
        } catch (error) {
            console.error("Erro", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 container py-12">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Cursos Preparatórios</h1>
                    <p className="text-muted-foreground">
                        Escolha o curso ideal para o seu momento de preparação e comece a estudar hoje mesmo.
                    </p>
                </div>

                {loading ? (
                    <p>Carregando cursos...</p>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {courses.map((course) => (
                            <Card key={course.id} className="flex flex-col">
                                <CardHeader>
                                    <div className="mb-2 w-fit rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                                        {course.metadata?.level || 'Geral'}
                                    </div>
                                    <CardTitle className="leading-snug">{course.title}</CardTitle>
                                    <CardDescription className="line-clamp-3">
                                        {course.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex-1">
                                    <div className="grid gap-2 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-2">
                                            <span>⏱ Duração: {course.metadata?.duration || 'Indefinido'}</span>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex items-center justify-between border-t p-6 bg-muted/20">
                                    <span className="text-xl font-bold">
                                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(course.price / 100)}
                                    </span>
                                    <Button>Matricule-se</Button>
                                </CardFooter>
                            </Card>
                        ))}

                        {courses.length === 0 && (
                            <div className="col-span-3 text-center py-12 text-muted-foreground">
                                Nenhum curso cadastrado ainda.
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    )
}
