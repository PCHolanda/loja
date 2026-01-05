import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Target, BookOpen } from "lucide-react"

export default function AboutPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 container py-12 md:py-16">
                <div className="flex flex-col gap-8 md:gap-12 max-w-4xl mx-auto">

                    <div className="space-y-4 text-center">
                        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Sobre o EduPrep ENEM</h1>
                        <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
                            Nossa missão é democratizar o acesso à preparação de qualidade para o ENEM, conectando estudantes aos melhores conteúdos e ferramentas do mercado.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        <Card>
                            <CardHeader className="text-center">
                                <Target className="mx-auto h-12 w-12 text-primary mb-2" />
                                <CardTitle>Foco no Resultado</CardTitle>
                            </CardHeader>
                            <CardContent className="text-center text-muted-foreground">
                                Metodologia desenvolvida especificamente para aumentar sua nota na TRI e garantir sua vaga na universidade.
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="text-center">
                                <BookOpen className="mx-auto h-12 w-12 text-primary mb-2" />
                                <CardTitle>Conteúdo Atualizado</CardTitle>
                            </CardHeader>
                            <CardContent className="text-center text-muted-foreground">
                                Materiais revisados anualmente de acordo com as últimas tendências e matrizes de referência do INEP.
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="text-center">
                                <Users className="mx-auto h-12 w-12 text-primary mb-2" />
                                <CardTitle>Comunidade</CardTitle>
                            </CardHeader>
                            <CardContent className="text-center text-muted-foreground">
                                Milhares de alunos estudando juntos, trocando experiências e dúvidas em nossa plataforma exclusiva.
                            </CardContent>
                        </Card>
                    </div>

                    <div className="prose dark:prose-invert max-w-none">
                        <h2 className="text-2xl font-bold mb-4">Nossa História</h2>
                        <p className="mb-4 text-muted-foreground leading-relaxed">
                            Fundado em 2024, o EduPrep nasceu da necessidade de criar uma alternativa acessível e eficiente aos cursinhos presenciais tradicionais.
                            Percebemos que muitos estudantes perdiam horas no trânsito e pagavam mensalidades altíssimas por metodologias defasadas.
                        </p>
                        <p className="mb-4 text-muted-foreground leading-relaxed">
                            Reunimos um time de professores campeões de aprovação e desenvolvedores apaixonados por educação para criar uma plataforma
                            que se adapta ao seu ritmo, identifica suas dificuldades e propõe o melhor caminho para sua aprovação.
                        </p>

                        <h2 className="text-2xl font-bold mb-4 mt-8">Quem Somos</h2>
                        <p className="mb-4 text-muted-foreground leading-relaxed">
                            Somos uma EdTech focada 100% no Exame Nacional do Ensino Médio. Acreditamos que a tecnologia, quando bem aplicada,
                            pode acelerar o aprendizado e tornar o estudo mais prazeroso e eficiente.
                        </p>
                    </div>

                </div>
            </main>
            <footer className="py-6 items-center flex justify-center border-t">
                <span className="text-sm text-muted-foreground">© 2026 EduPrep. Transformando futuros.</span>
            </footer>
        </div>
    )
}
