import React from "react";
import styled from "styled-components";
import {
    StepBackwardOutlined,
    StepForwardOutlined,
    PlayCircleOutlined,
    PauseCircleOutlined,
    SoundOutlined,
    BarsOutlined,
} from "@ant-design/icons";
import { Slider } from "antd";

const AudioControl: React.FC = () => {
    return (
        <>
            <audio id="audio" src="urls" muted={true} crossOrigin="anonymous" />

            <StyledControlPanel>
                <StyledSongInfo>hello</StyledSongInfo>

                <StyledControl>
                    <div>
                        <BarsOutlined />
                        <StepBackwardOutlined />
                        <PlayCircleOutlined />
                        <PauseCircleOutlined />
                        <StepForwardOutlined />
                    </div>

                    <Slider defaultValue={0} max={100} />
                </StyledControl>

                <StyledRight>
                    <SoundOutlined />

                    <Slider defaultValue={70} max={100} />
                </StyledRight>
            </StyledControlPanel>
        </>
    );
};

export default AudioControl;

const StyledRight = styled.div`
    width: 20%;
`;

const StyledControl = styled.div`
    width: 45%;
`;

const StyledSongInfo = styled.div`
    width: 30%;
`;

const StyledControlPanel = styled.div`
    background-color: rgb(105 105 105);
    position: fixed;
    z-index: 99;
    border-radius: 10px 10px 0 0;
    bottom: 0;
    left: 80px;
    width: calc(100vw - 84px);
    height: 75px;
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
        font-size: 25px;
        margin: 0 10px;
    }
`;
