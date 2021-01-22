
export function debounce(func, delay = 500, immediate = false) {
  let timer;
  return function(...args) {
    let context = this;
    timer && clearTimeout(timer);
    if (immediate) {
      let callNow = !timer;
      timer = setTimeout(() => (timer = null), delay);
      if (callNow) {
        func.apply(context, args);
      }
    } else {
      timer = setTimeout(() => func.apply(context, ...args), delay);
    }
  };
}

export function throttle(func, delay = 500, immediate = false) {
  let prev = Date.now();
  return function(...args) {
    let now = Date.now(),
      context = this;
    if (now - prev >= delay) {
      func.apply(context, args);
      prev = Date.now();
    }
  };
}

export function shuffle(arr) {
  let i = arr.length;
  if (i <= 0) {
    return [];
  }
  while (i) {
    let j = Math.floor(Math.random() * i--);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function to(promise) {
  return promise
    .then((data) => {
      return [null, data];
    })
    .catch((err) => {
      return [err];
    });
}

export function timeFormat(timeIn = 0) {
  const time = timeIn ? new Date(timeIn * 1000) : 0;
  if (time) {
    let minute = time.getMinutes();
    let second = time.getSeconds();
    second = second.toString().padStart(2, "0");
    return `${minute} : ${second}`;
  } else {
    return "0 : 00";
  }
}

export function notify(type, title, message) {
  // return debounce(
  //   Notification[type]({
  //     title,
  //     message,
  //     duration: 1500,
  //   }),
  //   500
  // );
}
