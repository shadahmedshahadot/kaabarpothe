'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, Eye, EyeOff, Lock, Mail } from 'lucide-react'
import { Input, Label } from '@/components/ui/input'
import { SocialAuthButtons } from './social-buttons'
import { ROUTES } from '@/constants'

export function LoginForm() {
  const [showPwd, setShowPwd] = useState(false)
  return (
    <>
      <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2 tracking-tight">
        Welcome back
      </h2>
      <p className="text-muted-foreground mb-8">Sign in to continue your sacred journey.</p>

      <form className="space-y-4">
        <Field label="Email" icon={<Mail className="w-4 h-4" />}>
          <Input type="email" placeholder="you@email.com" required className="h-12 pl-10" />
        </Field>

        <Field label="Password" icon={<Lock className="w-4 h-4" />}>
          <Input
            type={showPwd ? 'text' : 'password'}
            placeholder="••••••••"
            required
            className="h-12 pl-10 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPwd(s => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={showPwd ? 'Hide password' : 'Show password'}
          >
            {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </Field>

        <div className="flex items-center justify-between text-sm pt-1">
          <label className="inline-flex items-center gap-2 cursor-pointer text-muted-foreground select-none">
            <input type="checkbox" className="w-4 h-4 rounded border-border accent-primary" /> Remember me
          </label>
          <Link href="/forgot-password" className="text-primary font-medium hover:underline">
            Forgot?
          </Link>
        </div>

        <button
          type="submit"
          className="group relative w-full bg-gradient-to-r from-primary via-amber-500 to-orange-500 text-primary-foreground py-3.5 rounded-xl font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 inline-flex items-center justify-center gap-2 transition-all"
        >
          Sign in
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </form>

      <SocialAuthButtons />

      <p className="mt-8 text-sm text-center text-muted-foreground">
        New here?{' '}
        <Link href={ROUTES.register} className="text-primary font-semibold hover:underline">
          Create an account
        </Link>
      </p>

      <div className="mt-10 pt-6 border-t border-border text-center text-xs text-muted-foreground">
        <p className="mb-2 uppercase tracking-[0.18em] text-[10px]">Quick access</p>
        <div className="flex gap-3 justify-center">
          <Link href={ROUTES.pilgrim.root} className="hover:text-foreground">
            Pilgrim Portal
          </Link>
          <span>·</span>
          <Link href={ROUTES.admin.root} className="hover:text-foreground">
            Admin
          </Link>
        </div>
      </div>
    </>
  )
}

function Field({
  label,
  icon,
  children,
}: {
  label: string
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
          {icon}
        </span>
        {children}
      </div>
    </div>
  )
}
