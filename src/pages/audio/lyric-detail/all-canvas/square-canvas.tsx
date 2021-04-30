import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";

import { useStore } from "../../../../hooks/useStore";
import { onLoadAudio } from "../draw-song/square-render";
import { ECanvasType } from "../../../enums";

const SquareCanvas: React.FC = observer(() => {
    const store = useStore();
    const song = store.curSong;
    const audioPlaying = store.audioPlaying;
    const curCanvasType = store.curCanvasType;
    const [flag, setFlag] = React.useState<boolean>(false);
    
    React.useEffect(() => {
        const audio = document.getElementById("audio");
        const canvas = document.getElementById("square-canvas");

        if (curCanvasType === ECanvasType.SQUARE && audioPlaying && audio && canvas && !flag) {
            console.log(11);
            onLoadAudio(audio, canvas);
            setFlag(true);
        }
    }, [song, audioPlaying, flag, curCanvasType]);

    return <StyledCanvas id="square-canvas"></StyledCanvas>;
});

export default SquareCanvas;

const StyledCanvas = styled.canvas`
    position: absolute;
    left: 0;
    bottom: 60px;
    width: 90%;
    height: 100%;
    z-index: -1;
    opacity: 1;
    margin: 0 5%; 
`;
