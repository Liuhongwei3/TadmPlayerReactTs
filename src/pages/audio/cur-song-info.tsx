import React from "react";
import styled from "styled-components";
import { Avatar, Tooltip } from "antd";
import { useStore } from "../../hooks/useStore";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

const CurSongInfo: React.FC = observer(() => {
    const store = useStore();

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
                        <Tooltip title={store.curSong.name}>
                            <div>{store.curSong.name}</div>
                        </Tooltip>
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
    height: 100%;
    display: flex;
    jutify-content: center;
    align-items: center;
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
