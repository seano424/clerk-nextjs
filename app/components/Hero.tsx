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

const welcomes = ['Good Morning', 'Good Afternoon', 'Good Evening']

const welcome = (h: number) => {
  if (h < 12) return welcomes[0]
  if (h < 18) return welcomes[1]
  return welcomes[2]
}

export default function Hero() {
  const date = new Date()

  return (
    <div className="flex flex-col gap-5">
      <span className="text-theme-blue-300 text-5xl">
        {welcome(date.getHours())}
      </span>
      <div className="flex-col flex">
        <div className="flex justify-between text-xl text-white">
          <span>Today's {days[date.getDay()]}</span>
          <span>75% done</span>
        </div>
        <div className="flex justify-between text-lg text-theme-slate-500">
          <span>
            {months[date.getMonth()]} {date.getDate()}
            {nth(date.getDate())}, {date.getFullYear()}{' '}
          </span>
          <span>Completed Tasks</span>
        </div>
      </div>
    </div>
  )
}
