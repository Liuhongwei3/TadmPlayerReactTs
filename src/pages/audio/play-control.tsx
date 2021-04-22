import React from "react";
import styled from "styled-components";
import {
    StepBackwardOutlined,
    StepForwardOutlined,
    PlayCircleOutlined,
    PauseCircleOutlined,
    BarsOutlined,
    DownloadOutlined,
    ShareAltOutlined,
} from "@ant-design/icons";
import { Col, Row, Slider } from "antd";
import { copyData, notify, timeFormat } from "../../utils";
import { useStore } from "../../hooks/useStore";
import { observer } from "mobx-react-lite";
import reqs from "../../api/req";
import { createDownload } from "../../features";

interface IProps {
    volume: number;
}

const PlayControl: React.FC<IProps> = observer((props: IProps) => {
    const store = useStore();
    const { volume } = props;
    const audioRef = React.useRef<HTMLAudioElement>(null);
    const [duration, setDuration] = React.useState<number>(0);
    const [playing, setPlaying] = React.useState<boolean>(false);
    const [isDragging, setIsDragging] = React.useState<boolean>(false);
    const [url, setUrl] = React.useState<string | null>(null);

    React.useEffect(() => {
        store.toggleAudioPlaying(playing);
    }, [playing, store]);

    const handleAudioPlay = React.useCallback((e) => {
        setPlaying(true);
    }, []);

    const handleAudioPause = React.useCallback((e) => {
        setPlaying(false);
    }, []);

    const handleAudioDurationChange = React.useCallback((e) => {
        setDuration(Math.floor((e.target as HTMLAudioElement).duration) || 0);
    }, []);

    const handleAudioTimeUpdate = React.useCallback(
        (e) => {
            const time = Math.floor((e.target as HTMLAudioElement).currentTime);

            // handle throttle run, 1s per
            if (!isDragging && store.curTime !== time) {
                store.updateCurTime(time);
            }
        },
        [isDragging, store]
    );

    const handleAudioEnded = React.useCallback((e) => {
        setPlaying(false);
    }, []);

    const handleTimeChange = React.useCallback((time: number) => {
        setIsDragging(true);
        store.updateCurTime(time);
    }, [store]);

    const handleAfterTimeChange = React.useCallback(
        (time: number) => {
            if (audioRef && audioRef.current && url) {
                audioRef.current.currentTime = time;
                store.updateCurTime(time);
                audioRef.current.play();
                setIsDragging(false);
            }
        },
        [store, url]
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
        if (store.audioPlaying && store.videoPlaying) {
            store.toggleAudioPlaying(false);
            pause();
        }
    }, [pause, store.videoPlaying, store.audioPlaying, store]);

    React.useEffect(() => {
        const sid = store.curSongId;
        pause();
        store.updateCurTime(0);
        setUrl(null);
        if (sid) {
            reqs.netease
                .getMusicUrl(sid)
                .then((res) => {
                    const urls = res.data.filter((d) => !!d.url);
                    if (urls.length) {
                        setUrl(urls[0].url);
                    } else {
                        notify("error", "暂无该歌曲音频播放资源！");
                        store.updateCurTime(0);
                        setDuration(0);
                    }
                })
                .catch((e) => {
                    notify("error", e.message);
                });
        }
    }, [pause, store, store.curSongId]);

    React.useEffect(() => {
        pause();
        if (audioRef && audioRef.current && url) {
            store.updateCurTime(0);
            // reset curTime will change Slider value, fix isDragging bug
            setIsDragging(false);
            play();
        }
    }, [pause, play, store, url]);

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

    const handleDownloadMusic = React.useCallback(() => {
        const song = store.curSong;
        if (!song || !url) return;
        reqs.netease
            .downloadMusic(url)
            .then((res) => {
                createDownload(
                    song.name || "song",
                    song.ar.join(",") || "player",
                    res.data
                );
                notify("success", "歌曲下载完成！");
            })
            .catch((e) => {
                notify("error", e.message);
            });
    }, [store.curSong, url]);

    return (
        <>
            <audio
                id="audio"
                crossOrigin="anonymous"
                preload="metadata"
                loop={false}
                ref={audioRef}
                src={url || undefined}
                onDurationChange={handleAudioDurationChange}
                onPlay={handleAudioPlay}
                onPause={handleAudioPause}
                onTimeUpdate={handleAudioTimeUpdate}
                onEnded={handleAudioEnded}
                onPlayCapture={handleAudioPause}
                onPlaying={handleAudioPlay}
                onWaiting={handleAudioPause}
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
                    <DownloadOutlined onClick={handleDownloadMusic} />
                    <ShareAltOutlined onClick={handleShareCopy} />
                </StyledController>

                <Row justify="space-between">
                    <StyledTime span={3} push={1}>
                        <div>{timeFormat(store.curTime)}</div>
                    </StyledTime>
                    <Col span={16}>
                        <Slider
                            defaultValue={0}
                            disabled={duration === 0}
                            tooltipVisible={false}
                            value={store.curTime}
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

    svg {
        font-size: 25px;
        margin: 0 10px;
    }

    @media screen and (max-width: 768px) {
        width: 100%;
        margin-top: 10px;
    }
`;
