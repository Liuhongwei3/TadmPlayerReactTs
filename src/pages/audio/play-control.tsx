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
    RetweetOutlined,
} from "@ant-design/icons";
import { Col, Row, Slider } from "antd";
import { copyData, notify, timeFormat } from "../../utils";
import { useStore } from "../../hooks/useStore";
import { observer } from "mobx-react-lite";
import reqs from "../../api/req";
import { createDownload } from "../../features";
import { useHistory } from "react-router";
import { EMessageType, EPlayMode } from "../enums";
import SingleSvg from "../../components/svgs/single-svg";
import HeartJumpSvg from "../../components/svgs/heart-jump-svg";
import RandomSvg from "../../components/svgs/random-svg";

interface IProps {
    volume: number;
}

const PlayControl: React.FC<IProps> = observer((props: IProps) => {
    const history = useHistory();
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

    const nextSong = React.useCallback(() => {
        if (store.curPlayMode === EPlayMode.SINGLE) {
            return;
        }
        if (store.curPlaylists.length === 0) {
            notify(EMessageType.WARNING, "当前播放列表为空~");
        } else if (store.curPlaylists.length === 1) {
            notify(
                EMessageType.WARNING,
                "当前播放列表只有一首歌曲，播放完毕后自动停止播放~"
            );
        } else {
            store.updateCurTime(0);
            setDuration(0);
            let index = store.curPlaylists.findIndex(
                (id) => id === store.curSongId
            );
            index = index === store.curPlaylists.length - 1 ? 0 : index + 1;
            store.updateCurSongId(store.curPlaylists[index]);
        }
    }, [store]);

    const prevSong = React.useCallback(() => {
        if (store.curPlayMode === EPlayMode.SINGLE) {
            return;
        }
        if (store.curPlaylists.length === 0) {
            notify(EMessageType.WARNING, "当前播放列表为空~");
        } else if (store.curPlaylists.length === 1) {
            notify(
                EMessageType.WARNING,
                "当前播放列表只有一首歌曲，播放完毕后自动停止播放~"
            );
        } else {
            store.updateCurTime(0);
            setDuration(0);
            let index = store.curPlaylists.findIndex(
                (id) => id === store.curSongId
            );
            index = index === 0 ? store.curPlaylists.length - 1 : index - 1;
            store.updateCurSongId(store.curPlaylists[index]);
        }
    }, [store]);

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

    const handleAudioEnded = React.useCallback(
        (e) => {
            setPlaying(false);
            nextSong();
        },
        [nextSong]
    );

    const handleTimeChange = React.useCallback(
        (time: number) => {
            setIsDragging(true);
            store.updateCurTime(time);
        },
        [store]
    );

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
                        notify(
                            EMessageType.ERROR,
                            "暂无该歌曲音频播放资源,自动切换为下一首！"
                        );
                        store.updateCurTime(0);
                        setDuration(0);
                        nextSong();
                    }
                })
                .catch((e) => {
                    notify(EMessageType.ERROR, e.message);
                });
        }
    }, [nextSong, pause, store, store.curSongId]);

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
            notify(EMessageType.SUCCESS, "复制链接成功，请使用浏览器打开链接 ~");
        }
    }, [store.curSongId]);

    const handleDownloadMusic = React.useCallback(() => {
        const song = store.curSong;
        if (!song || !url) return;
        reqs.netease
            .downloadMusic(url)
            .then((res) => {
                if (res) {
                    createDownload(
                        song.name || "song",
                        song.ar.map((art) => art.name).join(",") || "player",
                        res
                    );
                    notify(EMessageType.SUCCESS, "歌曲下载完成！");
                } else {
                    notify(EMessageType.WARNING, "返回空数据！");
                }
            })
            .catch((e) => {
                notify(EMessageType.ERROR, e.message);
            });
    }, [store.curSong, url]);

    const toDetail = React.useCallback(() => {
        history.push(`/detail/${store.curDetailId}`);
    }, [history, store.curDetailId]);

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
                    <BarsOutlined onClick={toDetail} />

                    {store.curPlayMode === EPlayMode.ORDER && (
                        <RetweetOutlined onClick={store.updateCurPlayMode} />
                    )}
                    {store.curPlayMode === EPlayMode.RANDOM && (
                        <RandomSvg onClick={store.updateCurPlayMode} />
                    )}
                    {store.curPlayMode === EPlayMode.SINGLE && (
                        <SingleSvg onClick={store.updateCurPlayMode} />
                    )}
                    {store.curPlayMode === EPlayMode.HEART && (
                        <HeartJumpSvg onClick={store.updateCurPlayMode} />
                    )}

                    <StepBackwardOutlined
                        style={{
                            cursor:
                                store.curPlayMode === EPlayMode.SINGLE
                                    ? "not-allowed"
                                    : "pointer",
                        }}
                        disabled={store.curPlayMode === EPlayMode.SINGLE}
                        onClick={prevSong}
                    />

                    {playing ? (
                        <PauseCircleOutlined disabled={!url} onClick={pause} />
                    ) : (
                        <PlayCircleOutlined id="svg-play" disabled={!url} onClick={play} />
                    )}

                    <StepForwardOutlined
                        style={{
                            cursor:
                                store.curPlayMode === EPlayMode.SINGLE
                                    ? "not-allowed"
                                    : "pointer",
                        }}
                        disabled={store.curPlayMode === EPlayMode.SINGLE}
                        onClick={nextSong}
                    />

                    <DownloadOutlined
                        style={{
                            cursor: !url ? "not-allowed" : "auto",
                        }}
                        disabled={!url}
                        onClick={handleDownloadMusic}
                    />

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
        padding: 0 6px;

        svg {
            font-size: 22px;
            margin: 0 5px;
        }
    }
`;
