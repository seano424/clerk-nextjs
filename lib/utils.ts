export const timeConvert = (n: number) => {
  var num = n
  var hours = num / 60
  var rhours = Math.floor(hours)
  var minutes = (hours - rhours) * 60
  var rminutes = Math.round(minutes)
  return rhours + 'h ' + rminutes + 'min'
}

const bgColors = ['bg-theme-cyan', 'bg-theme-yellow', 'bg-white']
export const alternatingBgColor = (i: number) => bgColors[i % bgColors.length]