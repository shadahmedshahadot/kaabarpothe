import type { Metadata } from 'next'
import { AuthLayout } from '@/features/auth/components/auth-layout'
import { AuthVisual } from '@/features/auth/components/auth-visual'
import { RegisterForm } from '@/features/auth/components/register-form'

export const metadata: Metadata = { title: 'Create account' }

const REGISTER_BULLETS = [
  'Save packages to compare later',
  'Get personalized recommendations',
  '24/7 multilingual scholar support',
  'Track bookings and payments',
]

export default function RegisterPage() {
  return (
    <AuthLayout
      visual={
        <AuthVisual
          title="Begin your journey today."
          description="Free account. No commitments. Save packages, get personalized quotes, and chat with our scholar team."
          gradient="from-emerald-400 via-teal-500 to-cyan-600"
          pattern="dots"
          bullets={REGISTER_BULLETS}
        />
      }
    >
      <RegisterForm />
    </AuthLayout>
  )
}
