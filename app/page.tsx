import { redirect } from 'next/navigation'

export default function Home() {
  // Перенаправляємо на логін
  redirect('/login')
}
