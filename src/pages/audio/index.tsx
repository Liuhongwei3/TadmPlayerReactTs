import React from "react";
import styled from "styled-components";
import CurSongInfo from "./cur-song-info";
import PlayControl from "./play-control";
import RightControl from "./right-control";

const AudioControl: React.FC = () => {
    const [volume, setVolume] = React.useState<number>(1);

    const handleVolumeChange = React.useCallback((num: number) => {
        setVolume(num);
    }, []);

    return (
        <StyledControlPanel>
            <CurSongInfo />

            <PlayControl volume={volume} />

            <RightControl handleVolumeChange={handleVolumeChange} />
        </StyledControlPanel>
    );
};

export default AudioControl;

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
    justify-content: space-around;
    align-items: center;

    svg {
        font-size: 25px;
        margin: 0 10px;
    }
`;
