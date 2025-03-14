import Link from "next/link"
import { Circle } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full py-8 bg-[#00312D] text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center">
            <div className="relative h-10 w-10 rounded-full bg-[#e85a4f] flex items-center justify-center">
              <span className="font-bold text-white text-xs">KIMYO</span>
            </div>
            <span className="ml-3 text-sm font-medium">© {currentYear} KIMYO STUDIO</span>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            <Link href="#" className="text-sm hover:text-[#e85a4f] transition-colors">
              Projects
            </Link>
            <Link href="#" className="text-sm hover:text-[#e85a4f] transition-colors">
              About
            </Link>
            <Link href="#" className="text-sm hover:text-[#e85a4f] transition-colors">
              Contact
            </Link>
            <Link href="#" className="text-sm hover:text-[#e85a4f] transition-colors">
              Journal
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="#" aria-label="Instagram" className="hover:text-[#e85a4f] transition-colors">
              <Circle className="h-5 w-5" />
            </Link>
            <Link href="#" aria-label="Twitter" className="hover:text-[#e85a4f] transition-colors">
              <Circle className="h-5 w-5" />
            </Link>
            <Link href="#" aria-label="LinkedIn" className="hover:text-[#e85a4f] transition-colors">
              <Circle className="h-5 w-5" />
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 text-center md:text-left">
          <p className="text-xs text-white/70">Developed by  <Link href="https://rosopak.com" className="text-white underline">
    Rosopak.
  </Link></p>
        </div>
      </div>
    </footer>
  )
}

