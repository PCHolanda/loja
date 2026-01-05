import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "lucide-react"

// Dados estáticos de exemplo
const courses = [
    {
        id: 1,
        title: "Intensivo ENEM 2026",
        description: "O curso completo com todas as matérias para quem quer começar do zero e garantir a aprovação este ano.",
        price: "R$ 497,00",
        duration: "10 meses",
        level: "Completo"
    },
    {
        id: 2,
        title: "Matemática do Zero ao 800+",
        description: "Domine a matemática básica e avançada com foco total na interpretação de questões do ENEM.",
        price: "R$ 197,00",
        duration: "4 meses",
        level: "Intermediário"
    },
    {
        id: 3,
        title: "Redação Nota 1000",
        description: "Aprenda a estrutura perfeita, repertório sociocultural e como não zerar na redação mais importante do ano.",
        price: "R$ 147,00",
        duration: "3 meses",
        level: "Todos os níveis"
    },
    {
        id: 4,
        title: "Ciências da Natureza Descomplicada",
        description: "Física, Química e Biologia explicadas de forma simples e direta, com muitos exercícios resolvidos.",
        price: "R$ 247,00",
        duration: "5 meses",
        level: "Avançado"
    },
    {
        id: 5,
        title: "Humanas Total",
        description: "História, Geografia, Filosofia e Sociologia. Entenda o mundo e gabarite a prova de Humanas.",
        price: "R$ 197,00",
        duration: "4 meses",
        level: "Completo"
    },
    {
        id: 6,
        title: "Revisão Final ENEM",
        description: "O conteúdo mais quente e as apostas dos professores para a prova, resumidos em 1 mês de aula.",
        price: "R$ 97,00",
        duration: "1 mês",
        level: "Revisão"
    }
]

export default function CoursesPage() {
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

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {courses.map((course) => (
                        <Card key={course.id} className="flex flex-col">
                            <CardHeader>
                                <div className="mb-2 w-fit rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                                    {course.level}
                                </div>
                                <CardTitle className="leading-snug">{course.title}</CardTitle>
                                <CardDescription className="line-clamp-3">
                                    {course.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <div className="grid gap-2 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <span>⏱ Duração: {course.duration}</span>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex items-center justify-between border-t p-6 bg-muted/20">
                                <span className="text-xl font-bold">{course.price}</span>
                                <Button>Matricule-se</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </main>
        </div>
    )
}
