/* eslint-disable no-undef */
/**
 * Web Audio Visualization
 * @author Margox, Alex2wong
 * @version 2.1.1
 */

var __default_option = {
    effect: "circlebar",
    accuracy: 128,
    circlewave: {
        maxHeight: 20,
        minHeight: -5,
        spacing: 1,
        color: "#fcc",
        shadowBlur: 2,
        shadowColor: "#caa",
        fadeSide: true,
        prettify: false,
        particle: true,
        maxParticle: 100,
        circleRadius: 128,
    },
    circlebar: {
        maxHeight: 50,
        minHeight: 1,
        spacing: 1,
        color: "#fcc",
        shadowBlur: 2,
        shadowColor: "#caa",
        fadeSide: true,
        prettify: false,
        particle: true,
        maxParticle: 100,
        circleRadius: 128,
    },
};

function Particle(opt) {
    this.x = opt.x || 0;
    this.y = opt.y || 0;
    this.vx = opt.vx || Math.random() - 0.5;
    this.vy = opt.vy || Math.random() - 0.5;
    this.size = opt.size || Math.random() * 3;
    this.life = opt.life || Math.random() * 5;

    this.dead = false;

    this.alpha = 1;
    this.rotate = 0;
    this.color = opt.color || "rgba(244,244,244,.9)";
    this.type = opt.type || "circle";

    this.update = update;
    this.render = render;
    // return this;
}

function update(ctx) {
    this.x += this.vx;
    this.y += this.vy;

    this.life -= 0.01;
    this.alpha -= 0.003;
    this.rotate += Math.random() * 0.01;
    if (this.life < 0) {
        this.dead = true;
        this.alpha = 0;
        return;
    }
    this.render(ctx);
}

function render(ctx) {
    var dot = this,
        gA = ctx.globalAlpha;
    // ctx.shadowBlur = dot.size / 2;
    // ctx.shadowColor = 'rgba(244,244,244,.2)';
    ctx.fillStyle = dot.color;
    if (dot.type === "circle") {
        ctx.beginPath();
        ctx.globalAlpha = dot.alpha;
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fill();
    } else {
        ctx.save();
        ctx.translate(dot.x, dot.y);
        ctx.rotate(dot.rotate);
        ctx.rect(0, 0, dot.size, dot.size);
        ctx.restore();
        ctx.fill();
    }
    ctx.globalAlpha = gA;
}

/**
 * Constructor
 * @param {object} audioSource HTMLAudioSource/MediaStream
 * @param {object} canvasElement HTMLCanvasElement
 * @param {object} option Optional
 */
function Vudio(audioSource, canvasElement, flag, option) {
    if (flag) return;
    if (
        [
            "[object HTMLAudioSource]",
            "[object HTMLAudioElement]",
            "[object MediaStream]",
        ].indexOf(Object.prototype.toString.call(audioSource)) === -1
    ) {
        throw new TypeError("Invaild Audio Source");
    }

    if (
        Object.prototype.toString.call(canvasElement) !==
        "[object HTMLCanvasElement]"
    ) {
        throw new TypeError("Invaild Canvas Element");
    }

    this.audioSrc = audioSource;
    this.canvasEle = canvasElement;
    this.option = __mergeOption(__default_option, option);
    this.meta = {};

    this.stat = 0;
    this.freqByteData = null;
    this.particles = [];

    this.__init();
}

// private functions
function __mergeOption() {
    var __result = {};

    Array.prototype.forEach.call(arguments, function (argument) {
        var __prop;

        for (__prop in argument) {
            if (Object.prototype.hasOwnProperty.call(argument, __prop)) {
                if (
                    Object.prototype.toString.call(argument[__prop]) ===
                    "[object Object]"
                ) {
                    __result[__prop] = __mergeOption(
                        __result[__prop],
                        argument[__prop]
                    );
                } else {
                    __result[__prop] = argument[__prop];
                }
            }
        }
    });

    return __result;
}

Vudio.prototype = {
    __init: function () {
        try {
            var audioContext = new (window.AudioContext ||
                    window.webkitAudioContext ||
                    window.mozAudioContext)(),
                source =
                    Object.prototype.toString.call(this.audioSrc) !==
                    "[object MediaStream]"
                        ? audioContext.createMediaElementSource(this.audioSrc)
                        : audioContext.createMediaStreamSource(this.audioSrc);
            this.analyser = audioContext.createAnalyser();
            this.meta.spr = audioContext.sampleRate;

            source.connect(this.analyser);
            this.analyser.fftSize = this.option.accuracy * 2;
            this.analyser.connect(audioContext.destination);

            this.freqByteData = new Uint8Array(this.analyser.frequencyBinCount);

            this.context2d = this.canvasEle.getContext("2d");

            var memCanv = document.createElement("canvas");
            this.memCtx = memCanv.getContext("2d");

            this.effects = this.__effects();

            this.__resizeCanvas();

            window.onresize = this.__resizeCanvas.bind(this);
        } catch (e) {
            console.error("22222", e);
        }
    },

    __resizeCanvas() {
        // var dpr = window.devicePixelRatio || 1;
        var dpr = 1;

        this.width = this.canvasEle.clientWidth;
        this.height = this.canvasEle.clientHeight;

        // ready for HD screen
        this.canvasEle.width = this.width * dpr;
        this.canvasEle.height = this.height * dpr;
        this.context2d.scale(dpr, dpr);
        this.context2d.globalCompositeOperation = "lighter";

        // resize memCanvas also.
        this.memCtx.canvas.width = this.width * dpr;
        this.memCtx.canvas.height = this.height * dpr;
        this.memCtx.scale(dpr, dpr);
    },

    __recreateAnalyzer() {
        var audioContext = new (window.AudioContext ||
                window.webkitAudioContext ||
                window.mozAudioContext)(),
            source =
                Object.prototype.toString.call(this.audioSrc) !==
                "[object MediaStream]"
                    ? audioContext.createMediaElementSource(this.audioSrc)
                    : audioContext.createMediaStreamSource(this.audioSrc);

        this.analyser = audioContext.createAnalyser();
        this.meta.spr = audioContext.sampleRate;

        source.connect(this.analyser);
        this.analyser.fftSize = this.option.accuracy * 2;
        this.analyser.connect(audioContext.destination);
    },

    __rebuildData: function (freqByteData, horizontalAlign) {
        var __freqByteData;

        if (horizontalAlign === "left") {
            __freqByteData = freqByteData;
        } else if (horizontalAlign === "right") {
            __freqByteData = Array.from(freqByteData).reverse();
        } else {
            __freqByteData = [].concat(
                Array.from(freqByteData)
                    .reverse()
                    .slice(this.option.accuracy / 2, this.option.accuracy),
                Array.from(freqByteData).slice(0, this.option.accuracy / 2)
            );
        }

        return __freqByteData;
    },

    readAudioSrc: function (fileEle, vudio, label) {
        if (fileEle.files.length === 0) {
            label.innerText = "Drop Audio file here to play";
            return;
        }
        var file = fileEle.files[0];
        var fr = new FileReader();
        if (file.type.indexOf("audio") !== 0) return;
        label.innerText = file.name;
        fr.onload = function (evt) {
            vudio.audioSrc.src = evt.target.result;
            vudio.audioSrc.play();
            vudio.dance();
        };
        fr.readAsDataURL(file);
    },

    __animate: function () {
        if (this.stat === 1) {
            this.analyser.getByteFrequencyData(this.freqByteData);
            typeof this.effects[this.option.effect] === "function" &&
                this.effects[this.option.effect](this.freqByteData);
            requestAnimationFrame(this.__animate.bind(this));
        }
    },

    __testFrame: function () {
        this.analyser.getByteFrequencyData(this.freqByteData);
        typeof this.__effects()[this.option.effect] === "function" &&
            this.__effects()[this.option.effect](this.freqByteData);
    },

    /**
     * render blured background particles
     */
    __renderMemParticles: function (strokStyle, fillStyle, type) {
        // // generate and render particles if enabled
        if (1) {
            // should clean dead particle before render, remove the first particle if full.
            delete this.particles.find(function (p) {
                return p.dead;
            });
            if (this.particles.length > 50) {
                this.particles.shift();
            } else {
                this.particles.push(
                    new Particle({
                        x: Math.random() * this.width,
                        y: Math.random() * 100 - 50 + this.height / 2,
                        vx: Math.random() * 0.2 - 0.3,
                        vy: Math.random() * 0.3 - 0.4,
                        size: Math.random() * 5,
                        life: Math.random() * 50,
                        type: type,
                        color: fillStyle,
                    })
                );
            }
            this.particles.forEach((dot) => {
                dot.update(this.context2d);
            });
        }
    },

    // effect functions
    __effects: function () {
        var __that = this;

        return {
            circlewave: function (freqByteData) {
                var __circlewaveOption = __that.option.circlewave;
                var __fadeSide = __circlewaveOption.fadeSide;
                var __prettify = __circlewaveOption.prettify;
                var __freqByteData = __that.__rebuildData(
                    freqByteData,
                    __circlewaveOption.horizontalAlign
                );
                var __angle = (Math.PI * 2) / __freqByteData.length;
                var __maxHeight,
                    __width,
                    __height,
                    __left,
                    __color,
                    __linearGradient;
                var circleRadius = __circlewaveOption.circleRadius;
                var __particle = __circlewaveOption.particle;
                var __maxParticle = __circlewaveOption.maxParticle;
                var __isStart = true;
                __color = __circlewaveOption.color;

                if (__circlewaveOption.horizontalAlign !== "center") {
                    __fadeSide = false;
                    __prettify = false;
                }

                // clear canvas
                __that.context2d.clearRect(0, 0, __that.width, __that.height);
                __that.context2d.save();
                __that.context2d.lineWidth = 4;
                __that.context2d.fillStyle = "rgba(200, 200, 200, .2)";
                __that.context2d.translate(
                    __that.width / 2 - 0.5,
                    __that.height / 2 - 0.5
                );

                if (__circlewaveOption.shadowBlur > 0) {
                    __that.context2d.shadowBlur = __circlewaveOption.shadowBlur;
                    __that.context2d.shadowColor =
                        __circlewaveOption.shadowColor;
                }

                // generate and render particles if enabled
                if (__particle) {
                    // should clean dead particle before render.
                    delete __that.particles.find(function (p) {
                        return p.dead;
                    });
                    if (__that.particles.length > __maxParticle) {
                        __that.particles.shift();
                    } else {
                        const deg = Math.random() * Math.PI * 2;
                        __that.particles.push(
                            new Particle({
                                x: (circleRadius + 30) * Math.sin(deg),
                                y: (circleRadius + 30) * Math.cos(deg),
                                vx:
                                    0.3 * Math.sin(deg) +
                                    Math.random() * 0.5 -
                                    0.3,
                                vy:
                                    0.3 * Math.cos(deg) +
                                    Math.random() * 0.5 -
                                    0.3,
                                life: Math.random() * 10,
                            })
                        );
                    }

                    __that.particles.forEach((dot) => {
                        dot.update(__that.context2d);
                    });
                }

                __that.context2d.beginPath();

                // draw circlewave
                __freqByteData.forEach(function (value, index) {
                    __width =
                        (circleRadius * Math.PI -
                            __that.option.accuracy *
                                __circlewaveOption.spacing) /
                        __that.option.accuracy;
                    __left = index * (__width + __circlewaveOption.spacing);
                    __circlewaveOption.spacing !== 1 &&
                        (__left += __circlewaveOption.spacing / 2);

                    if (__prettify) {
                        if (index <= __that.option.accuracy / 2) {
                            __maxHeight =
                                (1 -
                                    (__that.option.accuracy / 2 - 1 - index) /
                                        (__that.option.accuracy / 2)) *
                                __circlewaveOption.maxHeight;
                        } else {
                            __maxHeight =
                                (1 -
                                    (index - __that.option.accuracy / 2) /
                                        (__that.option.accuracy / 2)) *
                                __circlewaveOption.maxHeight;
                        }
                    } else {
                        __maxHeight = __circlewaveOption.maxHeight;
                    }

                    __height = (value / 256) * __maxHeight;
                    __height =
                        __height < __circlewaveOption.minHeight
                            ? __circlewaveOption.minHeight
                            : __height;

                    if (__color instanceof Array) {
                        __linearGradient = __that.context2d.createLinearGradient(
                            -circleRadius - __maxHeight,
                            -circleRadius - __maxHeight,
                            circleRadius + __maxHeight,
                            circleRadius + __maxHeight
                        );

                        __color.forEach(function (color, index) {
                            var __pos, effectiveColor;
                            if (color instanceof Array) {
                                effectiveColor = color[1];
                            } else {
                                effectiveColor = color;
                            }
                            __pos = index / __color.length;
                            __linearGradient.addColorStop(
                                __pos,
                                effectiveColor
                            );
                        });

                        __that.context2d.strokeStyle = __linearGradient;
                        __that.context2d.fillStyle = __linearGradient;
                    } else {
                        __that.context2d.strokeStyle = __color;
                        __that.context2d.fillStyle = __color;
                    }

                    if (__fadeSide) {
                        if (index <= __that.option.accuracy / 2) {
                            __that.context2d.globalAlpha =
                                1 -
                                (__that.option.accuracy / 2 - 1 - index) /
                                    (__that.option.accuracy / 2);
                        } else {
                            __that.context2d.globalAlpha =
                                1 -
                                (index - __that.option.accuracy / 2) /
                                    (__that.option.accuracy / 2);
                        }
                    } else {
                        __that.context2d.globalAlpha = 1;
                    }

                    var curAngle = __angle * index;
                    var __x = Math.sin(curAngle) * (circleRadius + __height);
                    var __y = Math.cos(curAngle) * (circleRadius + __height);

                    // __that.context2d.rotate(__angle * index);
                    if (__isStart) {
                        __that.context2d.moveTo(__x, __y);
                        __isStart = false;
                    } else {
                        __that.context2d.lineTo(__x, __y);
                    }
                });
                var globalAlpha = __that.context2d.globalAlpha;
                __that.context2d.closePath();
                __that.context2d.stroke();
                __that.context2d.globalAlpha = 0.5;
                __that.context2d.fill();
                __that.context2d.globalAlpha = globalAlpha;

                // need to restore canvas after translate to center..
                __that.context2d.restore();
            },

            circlebar: function (freqByteData) {
                var __circlebarOption = __that.option.circlebar;
                var __fadeSide = __circlebarOption.fadeSide;
                var __prettify = __circlebarOption.prettify;
                var __freqByteData = __that.__rebuildData(
                    freqByteData,
                    __circlebarOption.horizontalAlign
                );
                var __angle = (Math.PI * 2) / __freqByteData.length;
                var __maxHeight, __width, __height, __left, __color;
                var circleRadius = __circlebarOption.circleRadius;
                var __particle = __circlebarOption.particle;
                var __maxParticle = __circlebarOption.maxParticle;
                var __offsetX = 0;

                if (__circlebarOption.horizontalAlign !== "center") {
                    __fadeSide = false;
                    __prettify = false;
                }

                // clear canvas
                __that.context2d.clearRect(0, 0, __that.width, __that.height);
                __that.context2d.save();
                __that.context2d.translate(
                    __that.width / 2 - 0.5,
                    __that.height / 2 - 0.5
                );

                if (__circlebarOption.shadowBlur > 0) {
                    __that.context2d.shadowBlur = __circlebarOption.shadowBlur;
                    __that.context2d.shadowColor =
                        __circlebarOption.shadowColor;
                }

                // generate and render particles if enabled
                if (__particle) {
                    delete __that.particles.find(function (p) {
                        return p.dead;
                    });
                    if (__that.particles.length > __maxParticle) {
                        __that.particles.shift();
                    } else {
                        const deg = Math.random() * Math.PI * 2;
                        __that.particles.push(
                            new Particle({
                                x: (circleRadius + 20) * Math.sin(deg),
                                y: (circleRadius + 20) * Math.cos(deg),
                                vx:
                                    0.3 * Math.sin(deg) +
                                    Math.random() * 0.5 -
                                    0.3,
                                vy:
                                    0.3 * Math.cos(deg) +
                                    Math.random() * 0.5 -
                                    0.3,
                                life: Math.random() * 10,
                                // type: 'rect'
                            })
                        );
                    }
                    __that.particles.forEach((dot) => {
                        dot.update(__that.context2d);
                    });
                }

                __width =
                    (circleRadius * Math.PI -
                        __that.option.accuracy * __circlebarOption.spacing) /
                    __that.option.accuracy;
                __offsetX = -__width / 2;
                __color = __circlebarOption.color;
                // since circlebar use ctx.rotate for each bar, so do NOT support gradient in bar currently.
                var renderStyle =
                    __color instanceof Array ? __color[0] : __color;
                __that.context2d.fillStyle = renderStyle;

                __that.context2d.globalAlpha = 1;
                __that.context2d.beginPath();

                // draw circlebar
                // console.warn('__freqBytesData: ', __freqByteData, ' first entry height: ', __freqByteData[1] / 256 * __circlebarOption.maxHeight);
                for (
                    var index = __freqByteData.length - 1;
                    index >= 0;
                    index--
                ) {
                    var value = __freqByteData[index];
                    __left = index * (__width + __circlebarOption.spacing);
                    __circlebarOption.spacing !== 1 &&
                        (__left += __circlebarOption.spacing / 2);

                    if (false) {
                        if (index <= __that.option.accuracy / 2) {
                            __maxHeight =
                                (1 -
                                    (__that.option.accuracy / 2 - 1 - index) /
                                        (__that.option.accuracy / 2)) *
                                __circlebarOption.maxHeight;
                        } else {
                            __maxHeight =
                                (1 -
                                    (index - __that.option.accuracy / 2) /
                                        (__that.option.accuracy / 2)) *
                                __circlebarOption.maxHeight;
                        }
                    } else {
                        __maxHeight = __circlebarOption.maxHeight;
                    }

                    __height = (value / 256) * __maxHeight;
                    __height =
                        __height < __circlebarOption.minHeight
                            ? __circlebarOption.minHeight
                            : __height;

                    if (__fadeSide) {
                        if (index <= __that.option.accuracy / 2) {
                            __that.context2d.globalAlpha =
                                1 -
                                (__that.option.accuracy / 2 - 1 - index) /
                                    (__that.option.accuracy / 2);
                        } else {
                            __that.context2d.globalAlpha =
                                1 -
                                (index - __that.option.accuracy / 2) /
                                    (__that.option.accuracy / 2);
                        }
                    }

                    __that.context2d.rotate(__angle);
                    __that.context2d.rect(
                        __offsetX,
                        circleRadius,
                        __width,
                        __height
                    );
                }
                __that.context2d.closePath();
                __that.context2d.fill();

                // need to restore canvas after translate to center..
                __that.context2d.restore();
            },
        };
    },

    dance: function () {
        if (
            this.analyser &&
            this.analyser.context &&
            (this.stat === 0 || this.analyser.context.state === "suspended")
        ) {
            this.analyser.context.resume();
            this.stat = 1;
            this.__animate();
        }
        return this;
    },

    pause: function () {
        this.stat = 0;
        //// for saving CPU, could cancle animation.
        return this;
    },

    setOption: function (option) {
        console.log(option);
        this.option = __mergeOption(this.option, option);
    },
};

export default Vudio;
