'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ComponentType } from 'react'
import { Menu, X, Search, ChevronDown, LogOut, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { LOGO_ALT, LOGO_SRC } from '@/constants'
import { NotificationBell } from '@/features/notifications/components/notification-bell'

export interface NavGroup {
  label: string
  items: { label: string; href: string; Icon: ComponentType<{ className?: string }>; badge?: string | number }[]
}

interface Props {
  title: string
  subtitle: string
  accent: string
  navGroups: NavGroup[]
  userName: string
  userRole: string
  userAvatar: string
  children: React.ReactNode
}

export function DashboardShell({ title, subtitle, accent, navGroups, userName, userRole, userAvatar, children }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <DashboardSidebar
        title={title}
        subtitle={subtitle}
        accent={accent}
        navGroups={navGroups}
        userName={userName}
        userRole={userRole}
        userAvatar={userAvatar}
        open={open}
        onNavigate={() => setOpen(false)}
      />

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-30 lg:hidden"
        />
      )}

      <div className="lg:ml-72">
        <DashboardTopbar
          open={open}
          onToggleMenu={() => setOpen(o => !o)}
          userName={userName}
          userAvatar={userAvatar}
          title={title}
          accent={accent}
        />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="p-4 sm:p-6 lg:p-8"
        >
          {children}
        </motion.div>
      </div>
    </div>
  )
}

function DashboardSidebar({
  title,
  subtitle,
  accent,
  navGroups,
  userName,
  userRole,
  userAvatar,
  open,
  onNavigate,
}: {
  title: string
  subtitle: string
  accent: string
  navGroups: NavGroup[]
  userName: string
  userRole: string
  userAvatar: string
  open: boolean
  onNavigate: () => void
}) {
  return (
    <aside
      className={cn(
        'fixed top-0 left-0 bottom-0 w-72 bg-card/95 backdrop-blur-xl border-r border-border/60 z-40 transition-transform lg:translate-x-0 flex flex-col shadow-xl shadow-slate-900/5',
        open ? 'translate-x-0' : '-translate-x-full',
      )}
    >
      <SidebarBrand title={title} subtitle={subtitle} accent={accent} />
      <div className="flex-1 overflow-y-auto">
        <SidebarNav navGroups={navGroups} onNavigate={onNavigate} accent={accent} />
      </div>
      <SidebarUser userName={userName} userRole={userRole} userAvatar={userAvatar} accent={accent} />
    </aside>
  )
}

function SidebarBrand({ title, subtitle, accent }: { title: string; subtitle: string; accent: string }) {
  return (
    <Link
      href="/"
      className="relative flex items-center gap-3 px-5 py-4 border-b border-border/60 hover:bg-muted/40 transition-colors group"
    >
      <div className={cn('relative w-11 h-11 rounded-2xl bg-gradient-to-br shadow-lg shadow-primary/20 flex items-center justify-center overflow-hidden', accent)}>
        <Image src={LOGO_SRC} alt={LOGO_ALT} fill sizes="44px" className="object-contain p-1.5" priority />
      </div>
      <div className="flex-1 min-w-0 leading-tight">
        <p className="font-bold text-foreground text-sm truncate">{title}</p>
        <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground truncate">{subtitle}</p>
      </div>
      <Sparkles className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary/70 transition-colors" />
    </Link>
  )
}

function SidebarNav({ navGroups, onNavigate, accent }: { navGroups: NavGroup[]; onNavigate: () => void; accent: string }) {
  const pathname = usePathname()
  const rootHref = navGroups[0]?.items[0]?.href
  return (
    <nav className="p-4 space-y-5">
      {navGroups.map(g => (
        <div key={g.label}>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground/70 px-3 mb-2">{g.label}</p>
          <ul className="space-y-0.5">
            {g.items.map(({ label, href, Icon, badge }) => {
              const active = pathname === href || (href !== rootHref && pathname.startsWith(href))
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={onNavigate}
                    className={cn(
                      'group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                      active
                        ? cn('bg-gradient-to-r text-white shadow-md shadow-primary/25', accent)
                        : 'text-foreground/70 hover:bg-muted hover:text-foreground',
                    )}
                  >
                    {active && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white/60 rounded-r-full" />
                    )}
                    <Icon className={cn('w-4 h-4 transition-transform', active ? 'scale-110' : 'group-hover:scale-110')} />
                    <span className="flex-1 truncate">{label}</span>
                    {badge != null && (
                      <span
                        className={cn(
                          'text-[10px] px-1.5 py-0.5 rounded-full font-bold min-w-[20px] text-center',
                          active
                            ? 'bg-white/25 text-white'
                            : 'bg-primary/12 text-primary',
                        )}
                      >
                        {badge}
                      </span>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </nav>
  )
}

function SidebarUser({ userName, userRole, userAvatar, accent }: { userName: string; userRole: string; userAvatar: string; accent: string }) {
  const initials = userName.split(' ').map(n => n[0]).slice(0, 2).join('')
  const avatarClass = userAvatar || accent
  return (
    <div className="p-4 border-t border-border/60 bg-gradient-to-b from-muted/10 to-muted/30">
      <div className="flex items-center gap-3 mb-3 p-2 rounded-xl bg-card/60 border border-border/40">
        <div className={cn('w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center text-white font-bold shadow-md shadow-primary/20 ring-2 ring-background', avatarClass)}>
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-foreground truncate">{userName}</p>
          <p className="text-[11px] text-muted-foreground truncate">{userRole}</p>
        </div>
      </div>
      <Link
        href="/"
        className="flex items-center justify-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors py-2 rounded-lg"
      >
        <LogOut className="w-3.5 h-3.5" /> সাইন আউট
      </Link>
    </div>
  )
}

function DashboardTopbar({
  open,
  onToggleMenu,
  userName,
  userAvatar,
  title,
  accent,
}: {
  open: boolean
  onToggleMenu: () => void
  userName: string
  userAvatar: string
  title: string
  accent: string
}) {
  const initials = userName.split(' ').map(n => n[0]).slice(0, 2).join('')
  const avatarClass = userAvatar || accent
  return (
    <header className="sticky top-0 z-20 bg-background/70 backdrop-blur-xl border-b border-border/60 h-16 flex items-center gap-3 px-4 sm:px-6">
      <button
        className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
        onClick={onToggleMenu}
        aria-label={open ? 'Close menu' : 'Open menu'}
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      <div className="hidden lg:flex items-center gap-2 pr-4 mr-1 border-r border-border/60">
        <span className={cn('inline-block w-2 h-2 rounded-full bg-gradient-to-br', accent)} />
        <span className="font-semibold text-sm text-foreground">{title}</span>
      </div>

      <div className="flex-1 max-w-md relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="search"
          placeholder="বুকিং, হাজী, প্যাকেজ অনুসন্ধান…"
          className="w-full h-9 pl-10 pr-14 rounded-xl bg-muted/50 border border-transparent focus:border-primary/60 focus:bg-card focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm transition-all"
        />
        <kbd className="hidden sm:inline-flex absolute right-2 top-1/2 -translate-y-1/2 items-center gap-0.5 h-6 px-1.5 rounded border border-border/70 bg-background text-[10px] font-mono text-muted-foreground">
          ⌘K
        </kbd>
      </div>

      <NotificationBell />
      <div className="hidden sm:flex items-center gap-2 pl-2 pr-3 py-1.5 hover:bg-muted rounded-xl cursor-pointer transition-colors border border-transparent hover:border-border/60">
        <div className={cn('w-8 h-8 rounded-lg bg-gradient-to-br text-white font-bold text-xs flex items-center justify-center shadow shadow-primary/15', avatarClass)}>
          {initials}
        </div>
        <span className="text-sm font-medium hidden md:inline">{userName.split(' ')[0]}</span>
        <ChevronDown className="w-3 h-3 text-muted-foreground" />
      </div>
    </header>
  )
}

export function PageTitle({ title, description, action }: { title: string; description?: string; action?: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-6 border-b border-border/60"
    >
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">{title}</h1>
        {description && <p className="text-muted-foreground mt-1.5 text-sm sm:text-base">{description}</p>}
      </div>
      {action}
    </motion.div>
  )
}
