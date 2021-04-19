import React from "react";
import styled from "styled-components";
import {
    StepBackwardOutlined,
    StepForwardOutlined,
    PlayCircleOutlined,
    PauseCircleOutlined,
    BarsOutlined,
    ShareAltOutlined,
} from "@ant-design/icons";
import { Col, Row, Slider } from "antd";
import { copyData, notify, timeFormat } from "../../utils";
import { useStore } from "../../hooks/useStore";
import { observer } from "mobx-react-lite";
import reqs from "../../api/req";

interface IProps {
    volume: number;
}

const PlayControl: React.FC<IProps> = observer((props: IProps) => {
    const store = useStore();
    const { volume } = props;
    const audioRef = React.useRef<HTMLAudioElement>(null);
    const [curTime, setCurTime] = React.useState<number>(0);
    const [duration, setDuration] = React.useState<number>(0);
    const [playing, setPlaying] = React.useState<boolean>(false);
    const [isDragging, setIsDragging] = React.useState<boolean>(false);
    const [url, setUrl] = React.useState<string>("");

    React.useEffect(() => {
        const sid = store.curSongId;
        if (sid) {
            reqs.netease
                .getMusicUrl(sid)
                .then((res) => {
                    setUrl(res.data.filter((d) => !!d.url)[0].url);
                })
                .catch((e) => {
                    notify("error", e.message);
                });
        }
    }, [store.curSongId]);

    React.useEffect(() => {
        const song = store.curSong;
        if (song) {
            setDuration(Math.round(song.dt / 1000));
        }
    }, [store.curSong]);

    const handleAudioPlay = React.useCallback((e) => {
        if (audioRef && audioRef.current) {
            setPlaying(true);
        }
    }, []);

    const handleAudioPause = React.useCallback((e) => {
        setPlaying(false);
    }, []);

    const handleAudioTimeUpdate = React.useCallback(
        (e) => {
            if (!isDragging) {
                setCurTime((e.target as HTMLAudioElement).currentTime);
            }
        },
        [isDragging]
    );

    const handleAudioEnded = React.useCallback((e) => {
        setPlaying(false);
    }, []);

    const handleTimeChange = React.useCallback((time: number) => {
        setIsDragging(true);
        setCurTime(time);
    }, []);

    const handleAfterTimeChange = React.useCallback(
        (time: number) => {
            if (audioRef && audioRef.current && url) {
                audioRef.current.currentTime = time;
                audioRef.current.play();
                setIsDragging(false);
            }
        },
        [url]
    );

    // todos: set volume to 0 or 1 gradually
    const play = React.useCallback(() => {
        if (audioRef && audioRef.current && url) {
            audioRef.current.play();
        }
    }, [url]);

    const pause = React.useCallback(() => {
        if (audioRef && audioRef.current) {
            audioRef.current.pause();
        }
    }, []);

    React.useEffect(() => {
        pause();
        if (audioRef && audioRef.current && url) {
            setCurTime(0);
            // reset curTime will change Slider value, fix isDragging bug
            setIsDragging(false);
            play();
        }
    }, [pause, play, url]);

    React.useEffect(() => {
        if (audioRef && audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    const handleShareCopy = React.useCallback(() => {
        const copied = copyData(
            `http://music.163.com/song?id=${store.curSongId}`
        );
        if (copied) {
            notify("success", "复制链接成功，请使用浏览器打开链接 ~");
        }
    }, [store.curSongId]);

    return (
        <>
            <audio
                id="audio"
                crossOrigin="anonymous"
                preload="metadata"
                loop={false}
                ref={audioRef}
                src={url}
                onPlay={handleAudioPlay}
                onPause={handleAudioPause}
                onTimeUpdate={handleAudioTimeUpdate}
                onEnded={handleAudioEnded}
            />

            <StyledControl>
                <StyledController>
                    <BarsOutlined />
                    <StepBackwardOutlined />
                    {playing ? (
                        <PauseCircleOutlined onClick={pause} />
                    ) : (
                        <PlayCircleOutlined onClick={play} />
                    )}
                    <StepForwardOutlined />
                    <ShareAltOutlined onClick={handleShareCopy} />
                </StyledController>

                <Row justify="space-between">
                    <StyledTime span={3} push={1}>
                        <div>{timeFormat(curTime)}</div>
                    </StyledTime>
                    <Col span={16}>
                        <Slider
                            defaultValue={0}
                            disabled={duration === 0}
                            tooltipVisible={false}
                            value={curTime}
                            max={duration}
                            onChange={handleTimeChange}
                            onAfterChange={handleAfterTimeChange}
                        />
                    </Col>
                    <StyledTime span={3}>
                        <div>{timeFormat(duration)}</div>
                    </StyledTime>
                </Row>
            </StyledControl>
        </>
    );
});

export default PlayControl;

const StyledTime = styled(Col)`
    display: flex;
    align-items: center;
`;

const StyledController = styled.div`
    display: flex;
    justify-content: center;
`;

const StyledControl = styled.div`
    width: 36%;

    @media screen and (max-width: 768px) {
        width: 100%;
        margin-top: 10px;
    }
`;
