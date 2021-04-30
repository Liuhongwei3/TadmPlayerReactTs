import React from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { observer } from "mobx-react-lite";
import { Image } from "antd";
import { useStore } from "../../../hooks/useStore";
import LoadingImg from "../../../components/LoadingImg";
import SimiContent from "../lyric-detail/simi-content";
import SongComments from "./song-comments";
import Lyrics from "./lyrics";
import SquareCanvas from "./all-canvas/square-canvas";
import CircleCanvas from "./all-canvas/circle-canvas";

const LyricDetail: React.FC = observer(() => {
    const store = useStore();
    const song = store.curSong;
    const showLyrics = store.showLyrics;

    React.useEffect(() => {
        document.getElementById("lyric-detail")?.scroll({ top: 0 });
    }, [song?.id, showLyrics]);

    return song ? (
        <StyledWrapper id="lyric-detail" show={showLyrics}>
            <StyledContent>
                <StyledOuter>
                    <StyledInner>
                        <StyledImage
                            alt="lyric-detail-cover"
                            loading="lazy"
                            preview={{
                                maskClassName: "lyric-detail-image-mask",
                            }}
                            width={180}
                            height={180}
                            placeholder={<LoadingImg />}
                            src={song.al.picUrl}
                        />
                    </StyledInner>
                </StyledOuter>

                <CircleCanvas />

                <StyledSongLyrics>
                    <div style={{ fontSize: 24 }}>{song.name}</div>
                    <div
                        style={{
                            fontSize: 15,
                        }}
                    >
                        <span style={{ color: "grey" }}>歌手：</span>
                        {song.ar.length === 1 ? (
                            <Link
                                key={song.ar[0].id}
                                to={`/singer/${song.ar[0].id}`}
                            >
                                {song.ar[0].name}
                            </Link>
                        ) : (
                            song.ar.map((ar) => (
                                <Link
                                    key={`${ar.id}${ar.name}`}
                                    to={`/singer/${ar.id}`}
                                >
                                    {`${ar.name} / `}
                                </Link>
                            ))
                        )}
                    </div>

                    <Lyrics />
                </StyledSongLyrics>

                <SimiContent id={song.id} />
            </StyledContent>

            <SongComments id={song.id} />

            <SquareCanvas />
        </StyledWrapper>
    ) : null;
});

export default LyricDetail;

const rotate = keyframes`
    from { 
        transform: rotate(0deg); 
    }
    to { 
        transform: rotate(360deg); 
    }
`;

const StyledImage = styled(Image)`
    border-radius: 50%;
    border: 10px solid #222;
    animation: ${rotate} infinite linear 25s;
    position: relative;
`;

const StyledInner = styled.div`
    position: relative;

    .lyric-detail-image-mask {
        border-radius: 50%;
    }

    &::before {
        content: "";
        position: absolute;
        width: 180px;
        height: 180px;
        border-radius: 50%;
        filter: blur(16px);
        background-image: radial-gradient(white, silver);
    }
`;

const StyledOuter = styled.div`
    position: relative;
`;

const StyledSongLyrics = styled.div`
    width: 38%;
    text-align: center;

    @media screen and (max-width: 768px) {
        width: 95%;
    }
`;

const StyledContent = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
`;

const StyledWrapper = styled.div`
    position: fixed;
    background-color: rgba(0, 0, 0, 0.9);
    width: calc(100vw - 86px);
    height: 88vh;
    left: 80px;
    transition: all 0.75s;
    z-index: 999;
    padding: 36px;
    overflow-y: scroll;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    ${(props: { show: boolean }) =>
        props.show ? `bottom: 60px;` : "bottom: -100vh;"}

    @media screen and (max-width: 768px) {
        padding: 10px;
        height: 86vh;

        ${(props: { show: boolean }) =>
            props.show ? `bottom: 14%;` : "bottom: -100vh;"}
    }
`;
