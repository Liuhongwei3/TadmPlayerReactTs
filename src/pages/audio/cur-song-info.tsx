import React from "react";
import styled from "styled-components";
import { Avatar, Tooltip } from "antd";
import { HeartTwoTone, HeartOutlined } from "@ant-design/icons";
import { useStore } from "../../hooks/useStore";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import reqs from "../../api/req";
import { notify } from "../../utils";

const CurSongInfo: React.FC = observer(() => {
    const store = useStore();
    const isLiked = store.userLikeSongIds.find((id) => id === store.curSongId);

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
                    notify("error", e.message);
                });
        },
        [store]
    );

    return (
        <StyledSongInfo>
            {store.curSong ? (
                <>
                    <Avatar
                        shape="square"
                        size="large"
                        src={store.curSong.al.picUrl}
                    />
                    <StyledTitle>
                        <div>
                            <Tooltip title={store.curSong.name}>
                                <span>{store.curSong.name}</span>
                            </Tooltip>
                            {isLiked ? (
                                <HeartTwoTone
                                    style={{
                                        transform: "scale(0.8)",
                                    }}
                                    twoToneColor="#fc7878"
                                    onClick={() => handleSongLike(false)}
                                />
                            ) : (
                                <HeartOutlined
                                    style={{
                                        transform: "scale(0.8)",
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

const StyledSongInfo = styled.div`
    width: 25%;
    display: flex;
    jutify-content: center;
    align-items: center;

    @media screen and (max-width: 768px) {
        width: 85%;
    }
`;

const StyledTitle = styled.div`
    margin-left: 6px;
    overflow: hidden;

    > div {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
`;
