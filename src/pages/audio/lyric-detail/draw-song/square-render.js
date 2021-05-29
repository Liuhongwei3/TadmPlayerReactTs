// https://developer.mozilla.org/zh-CN/docs/Web/API/AnalyserNode/getByteFrequencyData

export function onLoadAudio(audio, canvas, flag) {
    if (!audio || !canvas || flag) return;

    try {
        var context = new (window.AudioContext || window.webkitAudioContext)();
        var analyser = context.createAnalyser();
        analyser.fftSize = 512;
        var source = context.createMediaElementSource(audio);

        source.connect(analyser);
        analyser.connect(context.destination);

        var bufferLength = analyser.frequencyBinCount;
        var dataArray = new Uint8Array(bufferLength);

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        var ctx = canvas.getContext("2d");
        var WIDTH = canvas.width;
        var HEIGHT = canvas.height;

        var barWidth = (WIDTH / bufferLength) * 1.5;
        var barHeight;

        function renderFrame() {
            requestAnimationFrame(renderFrame);

            // console.log(dataArray);

            analyser.getByteFrequencyData(dataArray);

            ctx.clearRect(0, 0, WIDTH, HEIGHT);

            for (var i = 0, x = 0; i < bufferLength; i++) {
                barHeight = dataArray[i];

                var r = barHeight + 25 * (i / bufferLength);
                var g = 250 * (i / bufferLength);
                var b = 50;

                ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
                ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

                x += barWidth + 2;
            }
        }

        renderFrame();
    } catch (e) {
        console.error("22222", e);
    }

    // setInterval(renderFrame, 44);
}
