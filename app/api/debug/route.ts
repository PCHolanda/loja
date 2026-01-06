import { NextResponse } from "next/server"

export async function GET() {
    return NextResponse.json({
        hasHandle: !!process.env.INFINITEPAY_HANDLE,
        handleLength: process.env.INFINITEPAY_HANDLE?.length || 0,
        envKeys: Object.keys(process.env).filter(key => key.startsWith("NEXT_") || key.includes("INFINITE")),
        timestamp: new Date().toISOString()
    })
}
