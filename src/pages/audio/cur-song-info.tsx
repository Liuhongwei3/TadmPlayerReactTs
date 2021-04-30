import React from "react";
import styled from "styled-components";
import { Avatar, Tag, Tooltip } from "antd";
import {
    HeartTwoTone,
    HeartOutlined,
    UpOutlined,
    DownOutlined,
} from "@ant-design/icons";
import { useStore } from "../../hooks/useStore";
import { observer } from "mobx-react-lite";
import { Link, useHistory } from "react-router-dom";
import reqs from "../../api/req";
import { notify } from "../../utils";
import { EMessageType } from "../enums";

const CurSongInfo: React.FC = observer(() => {
    const store = useStore();
    const history = useHistory();
    const isLiked = store.userLikeSongIds.find((id) => id === store.curSongId);
    const songMvId = store.curSong?.mv;

    const handleSongLike = React.useCallback(
        (like: boolean) => {
            reqs.neteaseLogined
                .likeSong(store.curSongId, like)
                .then((res) => {
                    if (like) {
                        store.updateUserLikeSongIds([
                            ...store.userLikeSongIds,
                            store.curSongId,
                        ]);
                    } else {
                        store.updateUserLikeSongIds(
                            store.userLikeSongIds.filter(
                                (id) => id !== store.curSongId
                            )
                        );
                    }
                })
                .catch((e) => {
                    notify(EMessageType.ERROR, e.message);
                });
        },
        [store]
    );

    const toDetail = React.useCallback(
        (id: number) => {
            history.push(`/mv/${id}`);
        },
        [history]
    );

    return (
        <StyledSongInfo>
            {store.curSong ? (
                <>
                    <StyledAvatar onClick={() => store.toggleShowLyrics()}>
                        <Avatar
                            shape="square"
                            size="large"
                            src={store.curSong.al.picUrl}
                        />
                        {store.showLyrics ? (
                            <StyledDownOutlined />
                        ) : (
                            <StyledUpOutlined />
                        )}
                    </StyledAvatar>

                    <StyledTitle>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <Tooltip title={store.curSong.name}>
                                <StyledSongName>
                                    {store.curSong.name}
                                </StyledSongName>
                            </Tooltip>
                            {!!songMvId && (
                                <StyledMvTag
                                    color="magenta"
                                    onClick={() => toDetail(songMvId)}
                                >
                                    MV
                                </StyledMvTag>
                            )}
                            {isLiked ? (
                                <HeartTwoTone
                                    style={{
                                        marginLeft: 6,
                                    }}
                                    twoToneColor="#fc7878"
                                    onClick={() => handleSongLike(false)}
                                />
                            ) : (
                                <HeartOutlined
                                    style={{
                                        marginLeft: 5,
                                    }}
                                    onClick={() => handleSongLike(true)}
                                />
                            )}
                        </div>

                        <div
                            style={{
                                fontSize: 15,
                            }}
                        >
                            {store.curSong.ar.length === 1 ? (
                                <Link
                                    key={store.curSong.ar[0].id}
                                    to={`/singer/${store.curSong.ar[0].id}`}
                                >
                                    {store.curSong.ar[0].name}
                                </Link>
                            ) : (
                                store.curSong.ar.map((ar) => (
                                    <Link
                                        key={`${ar.id}${ar.name}`}
                                        to={`/singer/${ar.id}`}
                                    >
                                        {`${ar.name} / `}
                                    </Link>
                                ))
                            )}
                        </div>
                    </StyledTitle>
                </>
            ) : null}
        </StyledSongInfo>
    );
});

export default CurSongInfo;

const StyledMvTag = styled(Tag)`
    margin-left: 6px;
    margin-right: 0;

    &:hover {
        cursor: pointer;
    }
`;

const StyledUpOutlined = styled(UpOutlined)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 2px;
    background-color: rgba(0, 0, 0, 0.45);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: all 0.3s;
`;

const StyledDownOutlined = styled(DownOutlined)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 2px;
    background-color: rgba(0, 0, 0, 0.45);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: all 0.3s;
`;

const StyledAvatar = styled.div`
    display: inline-block;
    position: relative;

    &:hover > span {
        opacity: 1;
        cursor: pointer;
    }

    svg {
        margin: 0;
    }
`;

const StyledSongName = styled.span`
    max-width: 70%;
`;

const StyledSongInfo = styled.div`
    width: 30%;
    display: flex;
    jutify-content: center;
    align-items: center;

    @media screen and (max-width: 768px) {
        width: 85%;
    }
`;

const StyledTitle = styled.div`
    width: 100%;
    margin-left: 6px;
    overflow: hidden;

    > div,
    span {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
`;
