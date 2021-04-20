import React from "react";
import styled from "styled-components";
import CurSongInfo from "./cur-song-info";
import LyricDetail from "./lyric-detail";
import PlayControl from "./play-control";
import RightControl from "./right-control";

const AudioControl: React.FC = () => {
    const [volume, setVolume] = React.useState<number>(1);

    const handleVolumeChange = React.useCallback((num: number) => {
        setVolume(num);
    }, []);

    return (
        <>
            <StyledControlPanel>
                <CurSongInfo />

                <PlayControl volume={volume} />

                <RightControl handleVolumeChange={handleVolumeChange} />
            </StyledControlPanel>

            <LyricDetail />
        </>
    );
};

export default AudioControl;

const StyledControlPanel = styled.div`
    background-color: rgb(105 105 105);
    position: fixed;
    z-index: 1000;
    border-radius: 10px 10px 0 0;
    bottom: 0;
    left: 80px;
    width: calc(100vw - 84px);
    padding: 6px 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
`;
