const welcomes = ['Good Morning', 'Good Afternoon', 'Good Evening']

const welcome = (h: number) => {
  if (h < 12) return welcomes[0]
  if (h < 18) return welcomes[1]
  return welcomes[2]
}

export default function Hero() {
  const date = new Date()

  return (
    <div className="flex flex-col gap-5 pt-5 pb-10">
      <span className="text-theme-blue-300 text-8xl font-bold pr-96 tracking-tighter">
        {welcome(date.getHours())}
      </span>
    </div>
  )
}
