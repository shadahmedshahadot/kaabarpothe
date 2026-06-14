import { Plus, Shield } from 'lucide-react'
import { PageTitle } from '@/components/layouts/dashboard-shell'
import { Badge } from '@/components/ui/badge'

const users = [
  { id: 'u1', name: 'Imam Yusuf Khalil', email: 'yusuf@sakinah.travel', role: 'Super Admin', avatar: 'from-amber-400 to-orange-500', lastActive: 'Now' },
  { id: 'u2', name: 'Sister Amina Khalil', email: 'amina@sakinah.travel', role: 'Admin', avatar: 'from-rose-400 to-pink-500', lastActive: '5 min ago' },
  { id: 'u3', name: 'Brother Hamza Khalil', email: 'hamza@sakinah.travel', role: 'Admin', avatar: 'from-emerald-400 to-teal-500', lastActive: '1 hour ago' },
  { id: 'u4', name: 'Aisha Bint Mansur', email: 'aisha@sakinah.travel', role: 'Content Manager', avatar: 'from-violet-400 to-purple-500', lastActive: '2 hours ago' },
  { id: 'u5', name: 'Khalid Al-Rashid', email: 'khalid@sakinah.travel', role: 'Finance Manager', avatar: 'from-blue-400 to-indigo-500', lastActive: 'Yesterday' },
  { id: 'u6', name: 'Maryam Tariq', email: 'maryam@sakinah.travel', role: 'Operations Manager', avatar: 'from-cyan-400 to-sky-500', lastActive: '3 days ago' },
]

const roles = [
  { name: 'Super Admin', count: 1, permissions: 'Full system access · Cannot be deleted', color: 'rose' },
  { name: 'Admin', count: 2, permissions: 'All except billing and role management', color: 'amber' },
  { name: 'Content Manager', count: 1, permissions: 'Packages, blogs, FAQs, media library', color: 'violet' },
  { name: 'Finance Manager', count: 1, permissions: 'Payments, refunds, financial reports', color: 'blue' },
  { name: 'Operations Manager', count: 1, permissions: 'Bookings, pilgrims, group leaders, logistics', color: 'cyan' },
]

export default function AdminUsersPage() {
  return (
    <>
      <PageTitle
        title="Users & roles"
        description="Manage admin users and their permission levels."
        action={
          <button className="bg-foreground text-background px-4 py-2 rounded-xl text-sm font-semibold inline-flex items-center gap-2 hover:bg-primary"><Plus className="w-4 h-4" /> Invite user</button>
        }
      />

      <h2 className="text-lg font-bold text-foreground mb-3">Roles</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {roles.map(r => (
          <div key={r.name} className="bg-card border border-border rounded-2xl p-5">
            <div className={`w-10 h-10 rounded-xl bg-${r.color}-500/15 text-${r.color}-600 flex items-center justify-center mb-3`}>
              <Shield className="w-5 h-5" />
            </div>
            <p className="font-bold text-foreground">{r.name}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{r.count} user{r.count !== 1 ? 's' : ''}</p>
            <p className="text-xs text-muted-foreground/80 mt-2 leading-relaxed">{r.permissions}</p>
          </div>
        ))}
      </div>

      <h2 className="text-lg font-bold text-foreground mb-3">Active users</h2>
      <div className="bg-card border border-border rounded-2xl divide-y divide-border">
        {users.map(u => (
          <div key={u.id} className="flex items-center gap-4 p-5 hover:bg-muted/30 transition-colors">
            <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${u.avatar} text-white font-bold flex items-center justify-center`}>
              {u.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground">{u.name}</p>
              <p className="text-xs text-muted-foreground">{u.email}</p>
            </div>
            <Badge variant="secondary">{u.role}</Badge>
            <span className="text-xs text-muted-foreground hidden sm:inline">{u.lastActive}</span>
            <button className="text-xs font-semibold text-muted-foreground hover:text-foreground">Manage</button>
          </div>
        ))}
      </div>
    </>
  )
}
