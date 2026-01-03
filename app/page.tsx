import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, GraduationCap, Laptop } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
            <Link
              href="/courses"
              className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium transition-colors hover:bg-muted/80"
            >
              Novas turmas abertas para 2026
            </Link>
            <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Sua aprovação no ENEM começa aqui.
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Acesse cursos completos e simulados exclusivos preparados pelos melhores professores do país. Estude onde e quando quiser.
            </p>
            <div className="space-x-4">
              <Link href="/register">
                <Button size="lg">Começar Agora</Button>
              </Link>
              <Link href="/simulations">
                <Button variant="outline" size="lg">
                  Ver Simulados
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <section
          id="features"
          className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
        >
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl font-bold">
              Metodologia Comprovada
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Nossa plataforma oferece tudo o que você precisa para alcançar sua nota 1000 na redação e dominar as provas objetivas.
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            <Card>
              <CardHeader>
                <Laptop className="h-10 w-10 mb-2 text-primary" />
                <CardTitle>100% Online</CardTitle>
                <CardDescription>
                  Estude pelo computador, tablet ou celular. Plataforma otimizada para todos os dispositivos.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <GraduationCap className="h-10 w-10 mb-2 text-primary" />
                <CardTitle>Professores Experts</CardTitle>
                <CardDescription>
                  Aulas com quem entende do assunto e tem experiência em aprovação nos vestibulares mais concorridos.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CheckCircle2 className="h-10 w-10 mb-2 text-primary" />
                <CardTitle>Simulados Reais</CardTitle>
                <CardDescription>
                  Questões inéditas e no modelo exato do ENEM para você treinar o tempo e a estratégia de prova.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="container py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl font-bold">
              Pronto para passar?
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Junte-se a milhares de estudantes que já transformaram seus sonhos em realidade.
            </p>
            <Link href="/register">
              <Button size="lg" className="mt-4">Criar Conta Gratuita</Button>
            </Link>
          </div>
        </section>
      </main>
      <footer className="py-6 md:px-8 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            &copy; 2026 EduPrep. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}
