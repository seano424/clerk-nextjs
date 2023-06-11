const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const nth = (d: number) => {
  if (d > 3 && d < 21) return 'th'
  switch (d % 10) {
    case 1:
      return 'st'
    case 2:
      return 'nd'
    case 3:
      return 'rd'
    default:
      return 'th'
  }
}

interface OverviewProps {
  percentageActive: number | null
}

export default function Overview({ percentageActive }: OverviewProps) {
  const date = new Date()

  return (
    <div className="flex-col flex">
      <div className="flex justify-between text-xl text-white">
        <span>Today&apos;s {days[date.getDay()]}</span>
        {percentageActive !== null && (
          <span>{percentageActive.toFixed(0)}% completed</span>
        )}
      </div>
      <div className="flex justify-between text-lg text-theme-slate-500">
        <span>
          {months[date.getMonth()]} {date.getDate()}
          {nth(date.getDate())}, {date.getFullYear()}
        </span>
        {percentageActive !== null ? (
          <span>Completed Todos</span>
        ) : (
          <span>Awaiting Todos...</span>
        )}
      </div>
    </div>
  )
}
