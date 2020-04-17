
const throtte = (fn, delay = 500) => {
  let flag = true
  return function (...args) {
    if (!flag) { return }
    flag = false
    fn.apply(this, args)
    setTimeout(function () {
      flag = true
    }, delay)
  }
}
export default throtte
