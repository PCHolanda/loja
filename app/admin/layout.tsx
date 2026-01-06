import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Library, ShoppingCart, LogOut } from "lucide-react"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen bg-muted/40">
            {/* Sidebar */}
            <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r bg-background sm:flex">
                <div className="flex h-14 items-center border-b px-6">
                    <Link href="/" className="flex items-center gap-2 font-semibold">
                        <span>EduPrep Admin</span>
                    </Link>
                </div>
                <div className="flex flex-1 flex-col gap-4 px-4 py-4">
                    <Link href="/admin">
                        <Button variant="ghost" className="w-full justify-start gap-2">
                            <LayoutDashboard className="h-4 w-4" />
                            Dashboard
                        </Button>
                    </Link>
                    <Link href="/admin/courses">
                        <Button variant="ghost" className="w-full justify-start gap-2">
                            <Library className="h-4 w-4" />
                            Cursos
                        </Button>
                    </Link>
                    <Link href="/admin/simulations">
                        <Button variant="ghost" className="w-full justify-start gap-2">
                            <Library className="h-4 w-4" />
                            Simulados
                        </Button>
                    </Link>
                    <Link href="/admin/orders">
                        <Button variant="ghost" className="w-full justify-start gap-2">
                            <ShoppingCart className="h-4 w-4" />
                            Pedidos
                        </Button>
                    </Link>
                </div>
                <div className="mt-auto p-4">
                    <Button variant="outline" className="w-full justify-start gap-2">
                        <LogOut className="h-4 w-4" />
                        Sair
                    </Button>
                </div>
            </aside>

            {/* Content */}
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-64">
                <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                    {/* Mobile/Breadcrumbs header (simplified) */}
                    <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                        <h1 className="text-lg font-semibold md:text-xl">Painel Administrativo</h1>
                    </div>
                </header>
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    {children}
                </main>
            </div>
        </div>
    )
}
