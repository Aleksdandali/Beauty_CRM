export default function CalendarPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Календар</h1>
        <p className="text-slate-400 mt-1">Записи та розклад</p>
      </div>

      <div className="bg-slate-800 rounded-lg p-8 border border-slate-700">
        <div className="text-center text-slate-400">
          <p className="text-lg mb-2">📅 Календар в розробці</p>
          <p className="text-sm">
            Тут буде інтерактивний календар з можливістю drag-and-drop записів
          </p>
        </div>
      </div>
    </div>
  )
}
