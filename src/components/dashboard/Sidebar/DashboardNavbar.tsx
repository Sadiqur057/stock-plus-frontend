import { Button } from "@/components/ui/button"
import { Menu } from 'lucide-react'

interface NavbarProps {
  onOpenSidebar: () => void
}

export default function Navbar({ onOpenSidebar }: NavbarProps) {
  return (
    <nav className="flex items-center justify-between p-4 bg-background border-b">
      <Button variant="ghost" size="icon" onClick={onOpenSidebar} className="lg:hidden">
        <Menu className="h-6 w-6" />
      </Button>
      <h1 className="text-xl font-semibold">Dashboard</h1>
      {/* Add other navbar items here */}
    </nav>
  )
}

