'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsSubmitted(true)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="tote-page-frame">
      <NavbarShell />
      <main className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-lg flex-col justify-center px-4 py-16 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="w-full">
          <div className="rounded-[1.75rem] border border-[#dfe8e4] bg-white p-8 shadow-[0_22px_56px_rgba(45,90,76,0.08)]">
            <Link href="/login" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#4a635c] hover:text-[#2d5a4c]">
              <ArrowLeft className="h-4 w-4" />
              Back to login
            </Link>

            {!isSubmitted ? (
              <>
                <h1 className="text-3xl font-semibold tracking-tight text-[#1a2e28]">Reset your password</h1>
                <p className="mt-2 text-sm leading-relaxed text-[#4a635c]">Enter your email and we will send a reset link. Same soft card treatment as the home hero panels.</p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[#1a2e28]">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#5a6f68]" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border-[#dfe8e4] pl-10 focus-visible:ring-[#2d5a4c]/30"
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full rounded-full bg-[#2d5a4c] text-white hover:bg-[#23463c]" disabled={isLoading}>
                    {isLoading ? 'Sending…' : 'Send reset link'}
                  </Button>
                </form>
              </>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#eef5f2]">
                  <CheckCircle className="h-8 w-8 text-[#2d5a4c]" />
                </div>
                <h1 className="text-3xl font-semibold tracking-tight text-[#1a2e28]">Check your email</h1>
                <p className="mt-3 text-sm leading-relaxed text-[#4a635c]">
                  We sent a reset link to <strong className="text-[#1a2e28]">{email}</strong>
                </p>
                <Button asChild variant="outline" className="mt-8 w-full rounded-full border-[#dfe8e4]">
                  <Link href="/login">Back to login</Link>
                </Button>
                <p className="mt-6 text-sm text-[#4a635c]">
                  Didn&apos;t receive the email?{' '}
                  <button type="button" onClick={() => setIsSubmitted(false)} className="font-semibold text-[#2d5a4c] hover:underline">
                    Try again
                  </button>
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
