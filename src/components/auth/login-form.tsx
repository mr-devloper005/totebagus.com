'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Sparkles } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { useToast } from '@/components/ui/use-toast'

type LoginFormProps = {
  actionClass: string
  mutedClass: string
  inputClass: string
}

export function LoginForm({ actionClass, mutedClass, inputClass }: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, isLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!email.trim() || !password) {
      toast({
        title: 'Missing fields',
        description: 'Enter your email and password to continue.',
        variant: 'destructive',
      })
      return
    }
    await login(email.trim(), password)
    toast({
      title: 'Signed in',
      description: 'Your session is saved on this device.',
    })
    router.push('/')
    router.refresh()
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 grid gap-4">
      <input
        name="email"
        type="email"
        autoComplete="email"
        value={email}
        onChange={(ev) => setEmail(ev.target.value)}
        className={`h-12 rounded-xl px-4 text-sm outline-none ring-offset-2 focus:ring-2 focus:ring-[#2d5a4c]/30 ${inputClass}`}
        placeholder="Email address"
      />
      <input
        name="password"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
        className={`h-12 rounded-xl px-4 text-sm outline-none ring-offset-2 focus:ring-2 focus:ring-[#2d5a4c]/30 ${inputClass}`}
        placeholder="Password"
      />
      <button type="submit" disabled={isLoading} className={`inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold transition-opacity disabled:opacity-60 ${actionClass}`}>
        {isLoading ? 'Signing in…' : 'Sign in'}
      </button>
      <div className={`flex items-center justify-between text-sm ${mutedClass}`}>
        <Link href="/forgot-password" className="hover:underline">
          Forgot password?
        </Link>
        <Link href="/register" className="inline-flex items-center gap-2 font-semibold hover:underline">
          <Sparkles className="h-4 w-4" />
          Create account
        </Link>
      </div>
    </form>
  )
}
