import { NextResponse } from "next/server"

// Basic type for the request body
interface CheckoutRequest {
    productId: string
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

        // InfiniteTag (handle) is required. Set it in .env.local
        const infiniteHandle = process.env.INFINITEPAY_HANDLE
        if (!infiniteHandle) {
            return NextResponse.json({ error: "Server missing InfinitePay HANDLE configuration" }, { status: 500 })
        }

        console.log("Creating InfinitePay Link for:", productId)

        // API Endpoint for public checkout links
        const url = "https://api.infinitepay.io/invoices/public/checkout/links"

        // Construct Payload
        // Note: Amount must be in cents.
        const payload = {
            handle: infiniteHandle,
            // Changing to Google to rule out 'localhost' validation errors on InfinitePay side
            redirect_url: "https://www.google.com",
            // webhook_url: "https://your-domain.com/api/webhooks/infinitepay", // Optional
            order_nsu: `ORD-${Date.now()}`, // Unique Order ID
            items: [
                {
                    description: `Produto ${productId}`,
                    quantity: 1,
                    price: amount // API expects 'price' (in cents), not 'amount'
                }
            ],
            customer: {
                first_name: customer.name.split(" ")[0],
                last_name: customer.name.split(" ").slice(1).join(" ") || "Cliente",
                email: customer.email,
                // phone_number: customer.phone // Optional
            }
            // metadata: { productId } // Optional
        }

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // No Authorization header needed for this public endpoint as per docs found
            },
            body: JSON.stringify(payload)
        })

        if (!response.ok) {
            const errorText = await response.text()
            console.error("InfinitePay Error:", errorText)
            return NextResponse.json({ error: "Failed to create payment link", details: errorText }, { status: 400 })
        }

        const data = await response.json()

        // The API returns the link in `checkout_url` or similar field. 
        // Based on docs: returns { ... , url: "https://pay.infinitepay.io/..." } or similar.
        // Let's assume `data.url` based on standard link generation APIs, or `data.pay_url`.
        // If exact field is unknown from summary, we'll return the whole data to inspect or fallback.

        // Important: Use the returned URL.
        const paymentLink = data.url || data.link || data.checkout_url

        return NextResponse.json({
            success: true,
            paymentLink: paymentLink,
            debug: data
        })

    } catch (error) {
        console.error("Checkout error:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
