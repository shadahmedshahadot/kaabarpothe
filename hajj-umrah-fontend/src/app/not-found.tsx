import Link from 'next/link'
import { ArrowRight, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="max-w-md w-full text-center">
        <p className="text-[140px] font-bold leading-none bg-gradient-to-br from-primary via-amber-500 to-accent bg-clip-text text-transparent">404</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Path not found</h1>
        <p className="text-muted-foreground mb-8">The page you're looking for doesn't exist, has moved, or was never on this journey.</p>
        <div className="flex gap-3 justify-center">
          <Link href="/" className="inline-flex items-center gap-2 bg-foreground text-background px-5 py-3 rounded-xl font-semibold hover:bg-primary transition-colors">
            <Home className="w-4 h-4" /> Go home
          </Link>
          <Link href="/packages/umrah" className="inline-flex items-center gap-2 border border-border px-5 py-3 rounded-xl font-semibold hover:bg-muted transition-colors">
            Browse packages <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
