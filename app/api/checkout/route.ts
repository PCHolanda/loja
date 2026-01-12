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

import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase-admin"

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

        console.log("Processing Checkout for:", productId)

        // 1. Find or Create User
        let userId: string

        // Try to find existing user by email
        // Note: listing users requires admin rights
        const { data: { users }, error: searchError } = await supabaseAdmin.auth.admin.listUsers()
        const existingUser = users?.find(u => u.email === customer.email)

        if (existingUser) {
            userId = existingUser.id
            // Update metadata/profile if needed? Skipping for MVP.
        } else {
            // Create new user (Passwordless/Magic Link flow could be better, but we'll set a temporary pwd or purely generic)
            // Ideally sending an invite. For this MVP, we create a verified user so we can link data.
            // Password will be auto-generated or handled via "Forgot Password" later.
            const tempPassword = `MudeMe${Date.now()}!`
            const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
                email: customer.email,
                password: tempPassword,
                email_confirm: true,
                user_metadata: { full_name: customer.name }
            })

            if (createError || !newUser.user) {
                console.error("Failed to create user:", createError)
                return NextResponse.json({ error: "Failed to register customer" }, { status: 500 })
            }
            userId = newUser.user.id

            // Create Profile entry (mirroring auth) if trigger doesn't exist
            // Assuming we might need to insert into public.profiles depending on schema triggers.
            // Let's safe insert.
            await supabaseAdmin.from('profiles').insert({
                id: userId,
                email: customer.email,
                full_name: customer.name
            }).ignore()
        }

        // 2. Create Order in Pending Status
        const { data: order, error: orderError } = await supabaseAdmin
            .from('orders')
            .insert({
                user_id: userId,
                total: amount,
                status: 'pending',
                // metadata: { productId } // If we add metadata column to orders later
            })
            .select()
            .single()

        if (orderError || !order) {
            console.error("Failed to create order:", orderError)
            return NextResponse.json({ error: "Failed to initialize order" }, { status: 500 })
        }

        // 2.5 Link Order Item
        await supabaseAdmin.from('order_items').insert({
            order_id: order.id,
            product_id: productId,
            price: amount
        })

        // 3. Generate Payment Link
        const url = "https://api.infinitepay.io/invoices/public/checkout/links"
        const payload = {
            handle: infiniteHandle,
            redirect_url: "https://www.google.com", // Keeping google for now as requested
            order_nsu: order.id, // Using our DB Order ID
            items: [
                {
                    description: `Produto ${productId}`,
                    quantity: 1,
                    price: amount
                }
            ],
            customer: {
                first_name: customer.name.split(" ")[0],
                last_name: customer.name.split(" ").slice(1).join(" ") || "Cliente",
                email: customer.email,
            },
            metadata: {
                orderId: order.id,
                productId: productId,
                userId: userId
            }
        }

        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        })

        if (!response.ok) {
            const errorText = await response.text()
            console.error("InfinitePay Error:", errorText)
            // Fallback: If link fails, at least we have the order. But good to error out.
            return NextResponse.json({ error: "Failed to create payment link", details: errorText }, { status: 400 })
        }

        const data = await response.json()
        const paymentLink = data.url || data.link || data.checkout_url

        // 4. Return Data + Order ID for polling
        return NextResponse.json({
            success: true,
            paymentLink: paymentLink,
            orderId: order.id,
            debug: data
        })

    } catch (error) {
        console.error("Checkout error:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
