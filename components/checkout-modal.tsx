"use client"

import { useState, useEffect } from "react"
import { QRCodeSVG } from "qrcode.react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label" // We'll assume Label or just use div for now to save a file
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

interface CheckoutModalProps {
    product: {
        id: number | string
        title: string
        price: string | number // "R$ 49,90" or 4990 (cents)
    }
}

const [orderId, setOrderId] = useState<string | null>(null)
const [statusCheckCount, setStatusCheckCount] = useState(0)

// Polling Effect
useEffect(() => {
    let interval: NodeJS.Timeout

    if (step === "pix" && orderId) {
        console.log("Starting polling for order:", orderId)
        interval = setInterval(async () => {
            try {
                const res = await fetch(`/api/orders/${orderId}/status`)
                const data = await res.json()

                console.log("Order Status:", data.status)
                setStatusCheckCount(c => c + 1)

                if (data.paid === true) {
                    clearInterval(interval)
                    // Redirect to success page
                    window.location.href = `/simulations/${product.id}/access?success=true`
                }
            } catch (err) {
                console.error("Polling error:", err)
            }
        }, 3000) // Poll every 3 seconds
    }

    return () => clearfix(interval)
}, [step, orderId, product.id])

// Helper to stop interval
function clearfix(i: NodeJS.Timeout) {
    if (i) clearInterval(i)
}

const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
        const amount = getAmountInCents(product.price)

        const response = await fetch("/api/checkout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                productId: String(product.id),
                amount: amount,
                paymentMethod: "pix",
                customer: {
                    name: formData.name,
                    email: formData.email,
                    document: formData.document,
                },
            }),
        })

        const data = await response.json()

        if (data.success) {
            // Determine destination based on screen size or preference?
            // Opening in new tab is standard for InfinitePay.
            if (data.paymentLink) {
                window.open(data.paymentLink, "_blank")
            }

            // Set Order ID to start polling
            if (data.orderId) {
                setOrderId(data.orderId)
            }

            setStep("pix")
        } else {
            alert("Erro ao processar pagamento: " + JSON.stringify(data.details || data.error))
        }
    } catch (error) {
        console.error(error)
        alert("Erro interno")
    } finally {
        setLoading(false)
    }
}

return (
    <Dialog>
        <DialogTrigger asChild>
            <Button>Comprar Agora</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>{step === "form" ? "Finalizar Compra" : "Aguardando Pagamento"}</DialogTitle>
                <DialogDescription>
                    {step === "form"
                        ? `Você está comprando: ${product.title}`
                        : "Sua guia de pagamento foi aberta em uma nova aba."}
                </DialogDescription>
            </DialogHeader>

            {step === "form" ? (
                <form onSubmit={handleCheckout} className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <label htmlFor="name" className="text-sm font-medium">Nome Completo</label>
                        <Input
                            id="name"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="email" className="text-sm font-medium">Email</label>
                        <Input
                            id="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="document" className="text-sm font-medium">CPF</label>
                        <Input
                            id="document"
                            placeholder="000.000.000-00"
                            required
                            value={formData.document}
                            onChange={(e) => setFormData({ ...formData, document: e.target.value })}
                        />
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Processando..." : "Ir para Pagamento"}
                        </Button>
                    </DialogFooter>
                </form>
            ) : (
                <div className="flex flex-col items-center justify-center space-y-4 py-4">
                    <div className="p-4 rounded-lg bg-green-50 text-green-700 text-center">
                        <p className="font-semibold">Pagamento iniciado!</p>
                        <p className="text-sm mt-1">Estamos aguardando a confirmação do banco...</p>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground animate-pulse">
                        <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                        Verificando status ({statusCheckCount})
                    </div>

                    <Button variant="outline" onClick={() => setStep("form")}>
                        Voltar / Tentar Novamente
                    </Button>
                </div>
            )}
        </DialogContent>
    </Dialog>
)
}
