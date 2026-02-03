'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [salonName, setSalonName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Реєстрація користувача
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            salon_name: salonName,
          },
        },
      })

      if (error) throw error

      if (data?.user) {
        // Успішна реєстрація
        alert('Реєстрація успішна! Перевірте email для підтвердження.')
        router.push('/login')
      }
    } catch (error: any) {
      setError(error.message || 'Помилка реєстрації')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-slate-800 rounded-lg shadow-xl p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          BeautyCRM
        </h1>
        <p className="text-slate-400 mt-2">Реєстрація нового салону</p>
      </div>

      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label htmlFor="salonName" className="block text-sm font-medium text-slate-300 mb-1">
            Назва салону
          </label>
          <input
            id="salonName"
            type="text"
            value={salonName}
            onChange={(e) => setSalonName(e.target.value)}
            className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-1">
            Пароль (мінімум 6 символів)
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
            minLength={6}
          />
        </div>

        {error && (
          <div className="text-red-400 text-sm">{error}</div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-md font-medium hover:from-purple-700 hover:to-pink-700 disabled:opacity-50"
        >
          {loading ? 'Реєстрація...' : 'Зареєструватись'}
        </button>
      </form>

      <p className="text-center text-slate-400 mt-6">
        Вже є акаунт?{' '}
        <Link href="/login" className="text-purple-400 hover:text-purple-300">
          Увійти
        </Link>
      </p>
    </div>
  )
}
