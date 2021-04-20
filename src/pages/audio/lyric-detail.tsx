import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { Empty, Image, Pagination, Spin } from "antd";
import { useStore } from "../../hooks/useStore";
import LoadingImg from "../../components/LoadingImg";
import reqs from "../../api/req";
import { notify } from "../../utils";
import { ICommentsRes } from "../commType";
import { ESourceType } from "../../api/netease/types/like-type";
import StyledComment from "../../components/StyledComment";

const pageSize = 10;

const LyricDetail: React.FC = observer(() => {
    const store = useStore();
    const song = store.curSong;
    const showLyrics = store.showLyrics;
    const [loading, setLoading] = React.useState<boolean>(false);
    const [page, setPage] = React.useState<number>(1);
    const [comms, setcomms] = React.useState<ICommentsRes>();

    React.useEffect(() => {
        document.getElementById("lyric-detail")?.scroll({ top: 0 });
    });

    const before = React.useMemo(() => {
        return comms && comms.comments.length && comms.comments[pageSize - 1]
            ? comms.comments[pageSize - 1].time
            : undefined;
    }, [comms]);

    const getDetailComments = React.useCallback(() => {
        if (!song) return;
        setLoading(true);
        reqs.netease
            .getMusicComment(song.id, pageSize, (page - 1) * pageSize, before)
            .then((res) => {
                setcomms(res);
            })
            .catch((e) => {
                notify("error", e.message);
            })
            .finally(() => setLoading(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [song?.id, page, pageSize]);

    React.useEffect(() => {
        if (!song || !showLyrics) return;

        setcomms(undefined);
        getDetailComments();
    }, [song, getDetailComments, page, showLyrics]);

    const pageChange = React.useCallback((page1, pageSize1) => {
        setPage(page1);
    }, []);

    return song ? (
        <StyledWrapper id="lyric-detail" show={showLyrics}>
            <StyledContent>
                <Image
                    style={{ borderRadius: "50%" }}
                    alt="lyric-detail-cover"
                    loading="lazy"
                    placeholder={<LoadingImg />}
                    width={150}
                    height={150}
                    src={song.al.picUrl}
                />
                <div>
                    <div>{song.name}</div>
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
                </div>
            </StyledContent>

            <Spin style={{ minHeight: "80vh" }} spinning={loading}>
                {comms && comms.hotComments && !!comms.hotComments.length && (
                    <StyledSongComment>
                        <StyledCommTitle>精彩评论</StyledCommTitle>
                        {comms.hotComments.map((comm) => (
                            <StyledComment
                                key={comm.commentId}
                                type={ESourceType.SONG}
                                id={song.id}
                                comm={comm}
                            />
                        ))}
                    </StyledSongComment>
                )}

                {comms && !!comms.comments.length ? (
                    <StyledSongComment>
                        <StyledCommTitle>
                            最新评论（{comms.total}）
                        </StyledCommTitle>
                        {comms.comments.map((comm) => (
                            <StyledComment
                                key={comm.commentId}
                                type={ESourceType.SONG}
                                id={song.id}
                                comm={comm}
                            />
                        ))}
                        <Pagination
                            style={{ float: "right" }}
                            total={comms.total}
                            current={page}
                            showSizeChanger={false}
                            onChange={(page, pageSize) =>
                                pageChange(page, pageSize)
                            }
                        />
                    </StyledSongComment>
                ) : (
                    <Empty />
                )}
            </Spin>
        </StyledWrapper>
    ) : null;
});

export default LyricDetail;

const StyledCommTitle = styled.div`
    color: #efb448;
    font-size: 16px;
`;

const StyledSongComment = styled.div`
    width: 50%;
    font-size: 14px;
    margin: 24px auto;

    @media screen and (max-width: 768px) {
        width: 100%;
    }
`;

const StyledContent = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
`;

const StyledWrapper = styled.div`
    position: fixed;
    background-color: rgba(0, 0, 0, 0.9);
    width: calc(100vw - 86px);
    height: 86vh;
    left: 80px;
    transition: all 0.6s;
    z-index: 999;
    padding: 36px;
    overflow-y: scroll;

    ${(props: { show: boolean }) =>
        props.show ? `bottom: 73px;` : "bottom: -100vh;"}

    @media screen and (max-width: 768px) {
        padding: 10px;

        ${(props: { show: boolean }) =>
            props.show ? `bottom: 14%;` : "bottom: -100vh;"}
    }
`;
