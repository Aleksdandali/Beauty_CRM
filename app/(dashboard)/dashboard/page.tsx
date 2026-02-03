import { Users, Calendar, DollarSign, TrendingUp } from 'lucide-react'

export default function DashboardPage() {
  // TODO: Fetch real data from Supabase
  const stats = [
    {
      name: 'Всього клієнтів',
      value: '0',
      icon: Users,
      change: '+0%',
      changeType: 'positive',
    },
    {
      name: 'Записів сьогодні',
      value: '0',
      icon: Calendar,
      change: '0',
      changeType: 'neutral',
    },
    {
      name: 'Виручка за місяць',
      value: '₴0',
      icon: DollarSign,
      change: '+0%',
      changeType: 'positive',
    },
    {
      name: 'Середній чек',
      value: '₴0',
      icon: TrendingUp,
      change: '+0%',
      changeType: 'positive',
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-slate-400 mt-1">Огляд вашого салону</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-slate-800 rounded-lg p-6 border border-slate-700"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-slate-900 rounded-lg">
                <stat.icon className="w-6 h-6 text-purple-400" />
              </div>
              <span className={`text-sm font-medium ${
                stat.changeType === 'positive' ? 'text-green-400' : 
                stat.changeType === 'negative' ? 'text-red-400' : 
                'text-slate-400'
              }`}>
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
            <p className="text-sm text-slate-400">{stat.name}</p>
          </div>
        ))}
      </div>

      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-8 text-white">
        <h2 className="text-2xl font-bold mb-2">
          Ласкаво просимо до BeautyCRM! 👋
        </h2>
        <p className="text-purple-100 mb-4">
          Для початку роботи підключіть Supabase базу даних. 
          Детальна інструкція в файлі QUICK_START.md
        </p>
        <div className="flex gap-4">
          <a
            href="https://supabase.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-white text-purple-600 rounded-lg font-medium hover:bg-purple-50 transition-colors"
          >
            Відкрити Supabase
          </a>
        </div>
      </div>
    </div>
  )
}
