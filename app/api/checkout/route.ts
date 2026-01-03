import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

// Basic type for the request body
interface CheckoutRequest {
    productId: string
    cardHash: string // For Pagar.me V4 or specific token for V5
    amount: number
    customer: {
        name: string
        email: string
        document: string // CPF/CNPJ
    }
}

export async function POST(request: Request) {
    try {
        const body: CheckoutRequest = await request.json()
        const { productId, amount, customer } = body

        // 1. Validate Product exists (optional but recommended)
        // const { data: product } = await supabase.from('products').select('*').eq('id', productId).single()

        // 2. Create Order in Pending state
        // For now assuming we have a logged in user logic or anonymous checkout (if supported)
        // In a real app, we'd use supabase-admin to create order linked to user.

        console.log("Processing payment for:", productId)

        // 3. Call Pagar.me API
        // Implementation depends on V4 vs V5. 
        // Example for V5 (using fetch/axios):
        const pagarmeApiKey = process.env.PAGARME_API_KEY
        if (!pagarmeApiKey) {
            return NextResponse.json({ error: "Server missing Pagar.me configuration" }, { status: 500 })
        }

        const response = await fetch("https://api.pagar.me/core/v5/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic " + Buffer.from(pagarmeApiKey + ":").toString("base64"),
            },
            body: JSON.stringify({
                items: [
                    {
                        amount: amount, // in cents
                        description: "Curso/Simulado",
                        quantity: 1,
                        code: productId,
                    }
                ],
                customer: {
                    name: customer.name,
                    email: customer.email,
                    document: customer.document,
                    type: "individual",
                },
                payments: [
                    {
                        payment_method: "credit_card",
                        credit_card: {
                            // In production, use token or card_id. NOT RAW DATA IF POSSIBLE.
                            // For demo/V5 often accepts card info significantly protected.
                            // Ideally use Pagar.me Card Hash or Token.
                            installments: 1,
                            statement_descriptor: "EDUPREP",
                        }
                    }
                ]
            })
        })

        if (!response.ok) {
            const errorData = await response.json()
            console.error("Pagar.me Error:", errorData)
            return NextResponse.json({ error: "Payment failed", details: errorData }, { status: 400 })
        }

        const transaction = await response.json()

        // 4. Update Order status in Database
        // await supabase.from('orders').update({ status: 'paid', payment_id: transaction.id }).eq('id', newOrderId)

        return NextResponse.json({ success: true, transaction })
    } catch (error) {
        console.error("Checkout error:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
