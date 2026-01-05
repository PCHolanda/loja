"use client"

import { useState } from "react"
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
        price: string // "R$ 49,90"
    }
}

export function CheckoutModal({ product }: CheckoutModalProps) {
    const [step, setStep] = useState<"form" | "pix">("form")
    const [loading, setLoading] = useState(false)
    const [pixCode, setPixCode] = useState("")

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        document: "",
    })

    // Parse price string to integer cents
    const getAmountInCents = (priceStr: string) => {
        return parseInt(priceStr.replace("R$", "").replace(",", "").replace(".", "").trim())
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
                // InfinitePay returns a link, not a QR Code directly usually.
                // We redirect the user or show a button.
                window.open(data.paymentLink, "_blank")
                setStep("pix") // Reusing step to show "Awaiting payment" state or success instructions
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
                    <DialogTitle>{step === "form" ? "Finalizar Compra" : "Pagamento Iniciado"}</DialogTitle>
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
                        <div className="p-4 rounded-lg bg-green-50 text-green-700">
                            Pagamento iniciado! Conclua a transação na página da InfinitePay.
                        </div>
                        <Button variant="outline" onClick={() => setStep("form")}>
                            Voltar
                        </Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}
