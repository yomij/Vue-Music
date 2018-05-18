export default function(fn, delay) {
  let timer
  return function() {
    var args = arguments
    clearTimeout(timer)
    timer = setTimeout(() => {
      console.log(timer);
      fn.apply(this, args)
    }, delay)
  }
}