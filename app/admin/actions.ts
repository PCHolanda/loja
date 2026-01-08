'use server'

import { supabaseAdmin } from "@/lib/supabase-admin"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

// Helper to verify admin session
async function requireAdmin() {
    const cookieStore = await cookies()
    const session = cookieStore.get("admin_session")
    if (!session || session.value !== "true") {
        throw new Error("Unauthorized: Admin Access Required")
    }
}

export async function createCourse(formData: FormData) {
    await requireAdmin()

    const title = formData.get("title") as string
    const price = formData.get("price") as string
    const duration = formData.get("duration") as string
    const description = formData.get("description") as string

    // Price conversion (R$ string to cents)
    const priceInCents = Math.round(parseFloat(price.replace(',', '.')) * 100)

    const { error } = await supabaseAdmin.from('products').insert({
        title,
        description,
        price: priceInCents,
        type: 'course',
        metadata: { duration }
    })

    if (error) {
        return { success: false, error: error.message }
    }

    return { success: true }
}

export async function createSimulation(formData: FormData) {
    await requireAdmin()

    const title = formData.get("title") as string
    const price = formData.get("price") as string
    const typeLabel = formData.get("type_label") as string
    const description = formData.get("description") as string
    const questions = formData.get("questions") as string

    // Price conversion
    const priceInCents = Math.round(parseFloat(price.replace(',', '.')) * 100)

    const { error } = await supabaseAdmin.from('products').insert({
        title,
        description,
        price: priceInCents,
        type: 'simulation',
        metadata: {
            questions,
            type_label: typeLabel || 'Simulado'
        }
    })

    if (error) {
        return { success: false, error: error.message }
    }

    return { success: true }
}
