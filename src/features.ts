import { ILyricRes, ILyric, ILyrics } from "./api/netease/types/lyric-type";

/* eslint-disable no-useless-escape */
export function createDownload(name: string, player: string, data: any) {
    //	Phone
    // let name = this.name + '-' + this.player + '.mp3';
    // let dtask = plus.downloader.createDownload(this.urls, {
    //   method: 'post',
    //   filename: `_downloads/${this.name}`,
    //   retry: 3
    // }, function(d, status){
    //   if(status === 200){
    //     alert("下载成功: " + d.filename);
    //     // _this.showPluginAuto();
    //     plus.runtime.openFile(d.filename);
    //   } else {
    //     alert("下载失败: " + status);
    //   }
    // });
    // //dtask.addEventListener("statechanged", onStateChanged, false);
    // dtask.start();

    //	PC
    let blob = new Blob([data], { type: "audio/mpeg;charset=utf-8" });
    let downloadElement = document.createElement("a");
    let href = window.URL.createObjectURL(blob);
    downloadElement.href = href;
    downloadElement.download = name + "-" + player + ".mp3";
    document.body.appendChild(downloadElement);
    downloadElement.click();
    document.body.removeChild(downloadElement);
    window.URL.revokeObjectURL(href);
}

export function parseLyric(lrc: string) {
    const lyrics = lrc.split("\n");

    let lrcObj: ILyric[] = [];
    let lrcMap: Map<number, string> = new Map();
    let lrcTime: Map<number, number> = new Map();
    let j = 0;

    for (let i = 0; i < lyrics.length; i++) {
        const lyric = decodeURIComponent(lyrics[i]);
        const timeReg = /\[\d*:\d*((\.|:)\d*)*\]/g;
        const timeRegExpArr = lyric.match(timeReg);

        if (!timeRegExpArr) continue;

        const text = lyric.replace(timeReg, "");

        for (let k = 0, h = timeRegExpArr.length; k < h; k++) {
            const t = timeRegExpArr[k];
            const min = Number(String(t.match(/\[\d*/i)).slice(1));
            const sec = Number(String(t.match(/:\d*/i)).slice(1));
            const time = min * 60 + sec;

            if (text !== "") {
                lrcTime.set(time, j++);
                lrcMap.set(time, text);
                lrcObj.push({ time: time, text });
            }
        }
    }

    return { lrcObj, lrcMap, lrcTime };
}

export default function lyricParser(lrc: ILyricRes) {
    const { lrcObj, lrcMap, lrcTime } = parseLyric(lrc.lrc.lyric || "");
    const { lrcObj: tlrcObj, lrcMap: tlrcMap, lrcTime: tlrcTime } = parseLyric(
        lrc.tlyric.lyric || ""
    );

    const lyrObj: ILyrics = {
        lrcMap,
        lrcTime,
        lyric: lrcObj,
        tlyric: tlrcObj,
        tlrcMap,
        tlrcTime,
        lyricUser: lrc.lyricUser,
        transUser: lrc.transUser,
    };

    return lyrObj;
}

// export function onLoadAudio(audio) {
//     let context = new (window.AudioContext || window.webkitAudioContext)();
//     let analyser = context.createAnalyser();
//     analyser.fftSize = 512;

//     let source = context.createMediaElementSource(
//         document.getElementById("audio")
//     );

//     source.connect(analyser);
//     analyser.connect(context.destination);

//     let bufferLength = analyser.frequencyBinCount;
//     let dataArray = new Uint8Array(bufferLength);

//     let canvas = document.getElementById("canvas");
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;

//     let ctx = canvas.getContext("2d");
//     let WIDTH = canvas.width;
//     let HEIGHT = canvas.height;

//     let barWidth = (WIDTH / bufferLength) * 1.5;
//     let barHeight;

//     function renderFrame() {
//         requestAnimationFrame(renderFrame);

//         analyser.getByteFrequencyData(dataArray);

//         ctx.clearRect(0, 0, WIDTH, HEIGHT);

//         for (let i = 0, x = 0; i < bufferLength; i++) {
//             barHeight = dataArray[i];

//             let r = barHeight + 25 * (i / bufferLength);
//             // let r = Math.round(Math.random()*255);

//             let g = 250 * (i / bufferLength);
//             // let g = Math.round(Math.random()*255);

//             let b = 50;
//             // let b = Math.round(Math.random()*255);

//             ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
//             // ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
//             ctx.arc(x, HEIGHT, 50, 2 * Math.PI, false);

//             x += barWidth + 2;
//         }
//     }

//     renderFrame();
//     // setInterval(renderFrame, 44);
// }
