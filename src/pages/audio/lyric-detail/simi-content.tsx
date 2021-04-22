import { Avatar, Spin } from "antd";
import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import {
    ISimiDetailsRes,
    ISimiMusicsRes,
} from "../../../api/netease/types/song-type";
import reqs from "../../../api/req";
import { useStore } from "../../../hooks/useStore";
import { notify } from "../../../utils";

interface IProps {
    id: number;
}

enum EType {
    DETAIL,
    SONG,
}

const SimiContent: React.FC<IProps> = (props: IProps) => {
    const history = useHistory();
    const store = useStore();
    const { id } = props;
    const showLyrics = store.showLyrics;
    const [loading, setLoading] = React.useState<boolean>(false);
    const [
        includeDetails,
        setIncludeDetails,
    ] = React.useState<ISimiDetailsRes>();
    const [simiMusics, setSimiMusics] = React.useState<ISimiMusicsRes>();

    const toDetail = React.useCallback(
        (type: EType, id: number) => {
            if (type === EType.DETAIL) {
                store.toggleShowLyrics(false);
                history.push(`/detail/${id}`);
            } else {
                store.updateCurSongId(id);
            }
        },
        [history, store]
    );

    React.useEffect(() => {
        // if (!showLyrics) return;
        setLoading(true);
        Promise.all([
            reqs.netease.getSimiDetailsBySongId(id),
            reqs.netease.getSimiMusicsBySongId(id),
        ])
            .then((res) => {
                setIncludeDetails(res[0]);
                setSimiMusics(res[1]);
            })
            .catch((e) => {
                notify("error", e.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id, showLyrics]);

    return (
        <Spin spinning={loading}>
            <StyledWrapper>
                {includeDetails?.playlists && (
                    <StyledTitle>包含这首歌的歌单</StyledTitle>
                )}
                {includeDetails?.playlists.map((detail) => (
                    <StyledItem
                        key={`lyric-detail-${detail.id}`}
                        onClick={() => toDetail(EType.DETAIL, detail.id)}
                    >
                        <Avatar
                            shape="square"
                            size="small"
                            src={detail.coverImgUrl}
                        />
                        <StyledName>{detail.name}</StyledName>
                    </StyledItem>
                ))}

                {simiMusics?.songs && <StyledTitle>相似歌曲</StyledTitle>}
                {simiMusics?.songs.map((song) => (
                    <StyledItem
                        key={`lyric-detail-${song.id}`}
                        onClick={() => toDetail(EType.SONG, song.id)}
                    >
                        <Avatar
                            shape="square"
                            size="small"
                            src={song.album.picUrl}
                        />
                        <StyledName>
                            {song.name} -{" "}
                            {song.artists.map((art) => art.name).join(" / ")}
                        </StyledName>
                    </StyledItem>
                ))}
            </StyledWrapper>
        </Spin>
    );
};

export default SimiContent;

const StyledName = styled.span`
    margin: 6px;
`;

const StyledTitle = styled.div`
    font-size: 16px;
    font-weight: 600;
    margin-top: 16px;
`;

const StyledItem = styled.div`
    margin: 6px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    &:hover {
        cursor: pointer;
    }
`;

const StyledWrapper = styled.div`
    margin-left: 36px;
    font-size: 14px;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    max-width: 30vw;
`;
