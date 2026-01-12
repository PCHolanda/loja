import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase-admin"

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
    // Next.js 15 requires awaiting params
    const { id } = await context.params

    if (!id) {
        return NextResponse.json({ error: "Missing ID" }, { status: 400 })
    }

    // Using Admin client to bypass RLS for this public check (security by ID obfuscation for MVP)
    const { data: order, error } = await supabaseAdmin
        .from('orders')
        .select('id, status, user_id')
        .eq('id', id)
        .single()

    if (error || !order) {
        return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    // Check if we need to auto-enroll (Business Logic Trigger)
    // If status is paid but not enrolled, we could do it here, but usually webhook handles it.
    // For now, just return status.

    return NextResponse.json({
        status: order.status,
        paid: order.status === 'paid'
    })
}
