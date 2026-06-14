import type { Metadata } from 'next'
import { AuthLayout } from '@/features/auth/components/auth-layout'
import { AuthVisual } from '@/features/auth/components/auth-visual'
import { LoginForm } from '@/features/auth/components/login-form'

export const metadata: Metadata = { title: 'Sign In' }

const LOGIN_STATS = [
  { value: '50K+', label: 'Pilgrims' },
  { value: '4.9/5', label: 'Rating' },
  { value: '24/7', label: 'Support' },
]

export default function LoginPage() {
  return (
    <AuthLayout
      visual={
        <AuthVisual
          title="Welcome back to your sacred journey."
          description="Manage your bookings, documents, and payments — all in one place."
          gradient="from-amber-400 via-orange-500 to-rose-500"
          stats={LOGIN_STATS}
        />
      }
    >
      <LoginForm />
    </AuthLayout>
  )
}
