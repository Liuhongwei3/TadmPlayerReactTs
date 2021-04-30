import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";

import { useStore } from "../../../../hooks/useStore";
import Vudio from "../draw-song/circle-render";
import { ECanvasType } from "../../../enums";
import { randomNumberMinToMax } from "../../../../utils";
import { isPc } from "../../../../web-config/defaultConfig";

const colors = [
    [
        [0, "#f00"],
        [0.3, "#f00"],
        [0.3, "#f90"],
        [0.7, "#f90"],
        [0.7, "#ff0"],
        [1, "#ff0"],
    ],
    "#ff0",
    ["#06f", "#09f", " #0Cf", "#0ff"],
    ["#fb6d6b", "#c10056", " #a50053", "#51074b"],
    [
        [0, "#ff422d"],
        [0.5, "#ff422d"],
        [0.5, "#6072ff"],
        [1, "#6072ff"],
    ],
];

const CircleCanvas: React.FC = observer(() => {
    const store = useStore();
    const song = store.curSong;
    const audioPlaying = store.audioPlaying;
    const curCanvasType = store.curCanvasType;
    const [flag, setFlag] = React.useState<boolean>(false);
    const storeColorIndex = store.curCircleCanvasColorIndex;
    // const index = randomNumberMinToMax(0, 5);
    const index =
        storeColorIndex === 0 || storeColorIndex
            ? storeColorIndex
            : randomNumberMinToMax(0, 5);

    // not pc can't run this
    if (!isPc) {
        return null;
    }

    React.useEffect(() => {
        const audio = document.getElementById("audio");
        const canvas = document.getElementById("circle-canvas");

        if (
            (curCanvasType === ECanvasType.CIRCLEBAR ||
                curCanvasType === ECanvasType.CIRCLEWAVE) &&
            audioPlaying &&
            audio &&
            canvas &&
            !flag
        ) {
            console.log(22, index, colors[index]);
            var vudio = new Vudio(audio, canvas, flag, {
                effect: curCanvasType,
                accuracy: 128,
                circlebar: {
                    maxHeight: 40,
                    fadeSide: true,
                    particle: false,
                    shadowBlur: 4,
                    shadowColor: "rgba(244,244,244,.5)",
                    color: colors[1],
                },
                circlewave: {
                    fadeSide: true,
                    maxParticle: 50,
                    shadowBlur: 4,
                    shadowColor: "rgba(244,244,244,.5)",
                    color: colors[index],
                },
            });
            vudio.dance();
            setFlag(true);
        }
    }, [song, audioPlaying, flag, curCanvasType, index]);

    return <StyledCanvas id="circle-canvas" />;
});

export default CircleCanvas;

const StyledCanvas = styled.canvas`
    position: absolute;
    left: -42%;
    top: -10%;
    width: 110%;
    height: 100%;
    z-index: -1;
`;
