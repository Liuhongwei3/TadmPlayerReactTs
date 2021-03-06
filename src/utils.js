import { message } from "antd";
import { IEventTypeText } from "./pages/enums";

export const randomNumberMinToMax = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min; //不含最大值，含最小值
};

export const isObject = (obj) => {
    return typeof obj === "object";
};

export const isArray = (arr) => {
    return arr instanceof Array;
};

export function toTop() {
    document.documentElement.scrollTop = document.body.scrollTop = 0;
}

export const updateCurMenu = () => {
    const curUrl = window.location.hash.split("#")[1].split("/");
    // const reg = new RegExp(`${curUrl[1]}/g`);

    return curUrl && curUrl[1] ? [curUrl[1]] : ["home"];
};

export const setOutDateCookie = () => {
    if (document.cookie) {
        // const cookies = document.cookie.split(";");

        // cookies.forEach((cookie) => {
        //     const name = cookie.split("=")[0];
        //     const value = cookie.split("=")[1];
        //     document.cookie = `${name}=${value};expires=${new Date(
        //         0
        //     ).toISOString()}`;
        // });

        // eslint-disable-next-line no-useless-escape
        const keys = document.cookie.match(/[^ =;]+(?=\=)/g);
        if (keys) {
            keys.forEach((key) => {
                document.cookie =
                    key + "=0;expires=" + new Date(0).toUTCString();
            });
        }

        // window.location.reload();
    } else {
        alert("不支持操作cookie，请手动清除");
    }
};

export const getCurDay = () => {
    const time = Date.now();

    return new Date(time).getDate().toString().padStart(2, "0");
};

export function dateFormat(dateIn = 0, type = "less") {
    // const time = new Date(dateIn);
    // let y = time.getFullYear();
    // let m = time.getMonth() + 1;
    // m = m.toString().padStart(2, "0");
    // let d = time.getDate();
    // d = d.toString().padStart(2, "0");
    // return `${y}/${m}/${d}`;

    const date = dateIn ? new Date(dateIn) : 0;
    if (date) {
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();

        month = month.toString().padStart(2, "0");
        day = day.toString().padStart(2, "0");
        hour = hour.toString().padStart(2, "0");
        minutes = minutes.toString().padStart(2, "0");
        seconds = seconds.toString().padStart(2, "0");

        const curYear = new Date().getFullYear();
        const curDay = new Date().getDate();

        let res = "";
        res =
            curYear === year
                ? `${month}月${day}日`
                : `${year}年${month}月${day}日`;

        if (+day === curDay) {
            res = "今天";
        } else if (curDay - +day === 1) {
            res = "昨天";
        } else if (curDay - +day === 2) {
            res = "前天";
        }

        res += type === "more" ? ` ${hour}:${minutes}:${seconds}` : "";

        return res;
    } else {
        return "Private";
    }
}

export function timeFormat(timeIn = 0) {
    const time = timeIn ? new Date(timeIn * 1000) : 0;
    if (time) {
        let minute = time.getMinutes();
        let second = time.getSeconds();
        second = second.toString().padStart(2, "0");
        return `${minute} : ${second}`;
    }
    return "0 : 00";
}

export function countFormat(value) {
    if (value === 0) return 0;
    if (!value) return "暂无";

    if (value < 1000) {
        return value;
    } else if (value > 1000 && value < 10000) {
        return Math.floor(value / 1000) + " K+";
    } else if (value > 10000 && value < 1000000) {
        return Math.floor(value / 10000) + " W+";
    } else if (value > 1000000 && value < 10000000) {
        return Math.floor(value / 1000000) + " 百W+";
    } else if (value > 10000000 && value < 100000000) {
        return Math.floor(value / 10000000) + " 千W+";
    } else {
        return Math.floor(value / 100000000) + " 亿+";
    }
}

export function debounce(func, delay = 500, immediate = false) {
    let timer;
    return function (...args) {
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
    return function (...args) {
        let now = Date.now(),
            context = this;
        if (now - prev >= delay) {
            func.apply(context, args);
            prev = Date.now();
        }
    };
}

export function shuffle(arr = []) {
    if (!arr.length) return [];

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

export function notify(type, msg) {
    return debounce(message[type](msg), 100);
}

export function parseLyric(lrc) {
    let lyrics = lrc.split("\n");
    let lrcObj = [];
    for (let i = 0; i < lyrics.length; i++) {
        let lyric = decodeURIComponent(lyrics[i]);
        let timeReg = /\[\d*:\d*((.|:)\d*)*]/g;
        let timeRegExpArr = lyric.match(timeReg);
        if (!timeRegExpArr) continue;
        let clause = lyric.replace(timeReg, "");
        for (let k = 0, h = timeRegExpArr.length; k < h; k++) {
            let t = timeRegExpArr[k];
            let min = Number(String(t.match(/\[\d*/i)).slice(1)),
                sec = Number(String(t.match(/:\d*/i)).slice(1));
            let time = min * 60 + sec;
            if (clause !== "") {
                lrcObj.push({ time: time, text: clause });
            }
        }
    }
    return lrcObj;
}

export const unique = (arr) => {
    return arr.length ? [...new Set(arr)] : [];
};

export function uniqueId(arr) {
    const res = new Map();
    return arr.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1));
}

export function getEventType(str = 0) {
    if (str === 0) return "";

    if (str) {
        return IEventTypeText[+str] || "发布动态";
    }
    return str;
}

export function copyData(text, options = undefined) {
    var range,
        selection,
        mark,
        success = false;
    if (!options) {
        options = {};
    }
    try {
        range = document.createRange();
        selection = document.getSelection();

        mark = document.createElement("span");
        mark.textContent = text;
        // reset user styles for span element
        mark.style.all = "unset";
        // prevents scrolling to the end of the page
        mark.style.position = "fixed";
        mark.style.top = 0;
        mark.style.clip = "rect(0, 0, 0, 0)";
        // used to preserve spaces and line breaks
        mark.style.whiteSpace = "pre";
        // do not inherit user-select (it may be `none`)
        mark.style.webkitUserSelect = "text";
        mark.style.MozUserSelect = "text";
        mark.style.msUserSelect = "text";
        mark.style.userSelect = "text";
        mark.addEventListener("copy", function (e) {
            e.stopPropagation();
            if (options.format) {
                e.preventDefault();

                // all other browsers
                e.clipboardData.clearData();
                e.clipboardData.setData(options.format, text);
            }
            if (options.onCopy) {
                e.preventDefault();
                options.onCopy(e.clipboardData);
            }
        });

        document.body.appendChild(mark);

        range.selectNodeContents(mark);
        selection.addRange(range);

        var successful = document.execCommand("copy");
        if (!successful) {
            throw new Error("copy command was unsuccessful");
        }
        success = true;
    } catch (err) {
        console.error("unable to copy using execCommand: ", err);
        try {
            window.clipboardData.setData(options.format || "text", text);
            options.onCopy && options.onCopy(window.clipboardData);
            success = true;
        } catch (err) {
            console.error("unable to copy using clipboardData: ", err);
            console.error("falling back to prompt", options);
        }
    } finally {
        if (selection) {
            if (typeof selection.removeRange == "function") {
                selection.removeRange(range);
            } else {
                selection.removeAllRanges();
            }
        }

        if (mark) {
            document.body.removeChild(mark);
        }
    }

    return success;
}
