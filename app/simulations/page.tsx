import { Navbar } from "@/components/navbar"
import { CheckoutModal } from "@/components/checkout-modal"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Clock, BarChart } from "lucide-react"

// Dados estáticos de exemplo
const simulations = [
    {
        id: 1,
        title: "Simulado Nacional #1",
        description: "Prova completa com 180 questões + Redação. Modelo exato do ENEM 2025.",
        price: "R$ 49,90",
        questions: "180 questões",
        type: "2 dias de prova"
    },
    {
        id: 2,
        title: "Simulado Ciências da Natureza",
        description: "Foco total em Física, Química e Biologia. Ideal para treinar tempo e conteúdo específico.",
        price: "R$ 29,90",
        questions: "45 questões",
        type: "Área Específica"
    },
    {
        id: 3,
        title: "Simulado Matemática",
        description: "45 questões de matemática para você testar sua resistência e estratégia de resolução.",
        price: "R$ 29,90",
        questions: "45 questões",
        type: "Área Específica"
    },
    {
        id: 4,
        title: "Simulado Linguagens + Humanas",
        description: "Treine o primeiro dia de prova com questões inéditas e atualizadas.",
        price: "R$ 39,90",
        questions: "90 questões",
        type: "1º Dia"
    },
    {
        id: 99,
        title: "Simulado Teste (Integração)",
        description: "Simulado de valor simbólico para testar o fluxo de pagamento real.",
        price: "R$ 1,00",
        questions: "5 questões",
        type: "Teste"
    }
]

export default function SimulationsPage() {
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

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                    {simulations.map((sim) => (
                        <Card key={sim.id} className="flex flex-col md:flex-row shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex flex-col justify-between p-6 w-full">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                                            {sim.type}
                                        </span>
                                    </div>
                                    <CardTitle className="mb-2 text-xl">{sim.title}</CardTitle>
                                    <CardDescription className="mb-4">
                                        {sim.description}
                                    </CardDescription>

                                    <div className="flex gap-4 text-sm text-muted-foreground mb-6">
                                        <div className="flex items-center gap-1">
                                            <FileText className="h-4 w-4" />
                                            {sim.questions}
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
                                    <span className="text-2xl font-bold">{sim.price}</span>
                                    <CheckoutModal product={sim} />
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </main>
        </div>
    )
}
