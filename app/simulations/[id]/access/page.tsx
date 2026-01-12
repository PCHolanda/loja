"use client"

import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Lock } from "lucide-react"
import { useSearchParams, useParams } from "next/navigation"
import Link from "next/link"

export default function SimulationAccessPage() {
    const searchParams = useSearchParams()
    const { id } = useParams()
    const success = searchParams.get("success")

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 container py-12 flex items-center justify-center">
                <Card className="max-w-md w-full">
                    <CardHeader className="text-center">
                        {success ? (
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                                <CheckCircle2 className="h-8 w-8 text-green-600" />
                            </div>
                        ) : (
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                                <Lock className="h-8 w-8 text-muted-foreground" />
                            </div>
                        )}

                        <CardTitle className="text-2xl">
                            {success ? "Pagamento Confirmado!" : "Acesso ao Conteúdo"}
                        </CardTitle>
                        <CardDescription>
                            {success
                                ? "Seu acesso foi liberado com sucesso. Bem-vindo!"
                                : "Verifique seu email para instruções de acesso."}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="rounded-lg border p-4 bg-muted/20">
                            <h3 className="font-semibold mb-2">Simulado ID: {id}</h3>
                            <p className="text-sm text-muted-foreground">
                                Você já pode iniciar a prova. Lembre-se que o cronômetro começa assim que você clicar em "Iniciar".
                            </p>
                        </div>

                        <Button className="w-full h-12 text-lg" asChild>
                            <Link href="/simulations">
                                Iniciar Prova Agora
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}
