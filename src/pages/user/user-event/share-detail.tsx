import React from "react";
import { useHistory } from "react-router-dom";
import { Image, Tag } from "antd";
import styled from "styled-components";

import { Artist, IJson, Pic } from "../type";
import { getEventType, notify } from "../../../utils";
import { DEFAULT_RANDOM_COLORS } from "../../../web-config/defaultConfig";

const StyledDetailDiv = styled.div`
    width: 100%;
    display: inline-flex;
    padding: 10px;
    border-radius: 5px;
    background-color: rgba(101, 100, 100, 0.5);
    color: white;
    margin-top: 10px;

    &:hover {
        cursor: pointer;
    }
`;

const StyledNameArtDiv = styled.div`
    margin-left: 10px;
    font-size: 16px;
    justify-content: center;
    align-items: center;
`;

interface IProps {
    type: number;
    json: IJson | string;
    pics: Pic[];
}

const types = [
    { type: 19, route: "album" },
    { type: 13, route: "detail" },
    { type: 21, route: "mv" },
];

const ShareDetail: React.FunctionComponent<IProps> = (props: IProps) => {
    const history = useHistory();
    const { type, json, pics } = props;
    const randomIndex = Math.floor(Math.random() * 10);

    const toDetail = React.useCallback(
        (id: number | string) => {
            const route = types.find((item) => item.type === type)?.route;

            if (id && route) {
                history.push(`/${route}/${id}`);
            } else {
                notify("warning", "该功能暂未开放");
            }
        },
        [history, type]
    );

    if (typeof json === "object") {
        const cover =
            (json.song && (json.song.img80x80 || json.song?.album.img80x80)) ||
            (json.album && json.album.picUrl) ||
            (json.playlist && json.playlist.coverImgUrl) ||
            (json.mv && json.mv.imgurl) ||
            (json.djRadio && json.djRadio.picUrl) ||
            (json.video && json.video.coverUrl) ||
            "";
        const name: string =
            (json.song && json.song.name) ||
            (json.album && json.album.name) ||
            (json.playlist && json.playlist.name) ||
            (json.mv && json.mv.name) ||
            (json.djRadio && json.djRadio.name) ||
            (json.video && json.video.title) ||
            "";
        const id: number | string =
            (json.song && json.song.id) ||
            (json.album && json.album.id) ||
            (json.playlist && json.playlist.id) ||
            (json.mv && json.mv.id) ||
            (json.djRadio && json.djRadio.id) ||
            (json.video && json.video.videoId) ||
            0;
        const artists: Artist[] | string =
            (json.song && json.song.artists) ||
            (json.album && json.album.artists) ||
            (json.playlist && json.playlist.creator.nickname) ||
            (json.mv && json.mv.artists) ||
            (json.djRadio && json.djRadio.dj.nickname) ||
            (json.video && json.video.creator.nickname) ||
            "";

        return (
            <>
                <div style={{ margin: "10px 0" }}>
                    <Tag key={type} color={DEFAULT_RANDOM_COLORS[randomIndex]}>
                        {getEventType(type)}
                    </Tag>
                </div>
                <div>{json.msg}</div>
                {name && (
                    <StyledDetailDiv onClick={() => toDetail(id)}>
                        {cover && (
                            <Image
                                preview={false}
                                width={80}
                                height={80}
                                src={cover}
                            />
                        )}

                        <StyledNameArtDiv>
                            <div>{name}</div>
                            <div style={{ color: "#B1B1B1" }}>
                                By{" "}
                                {typeof artists === "string" ? (
                                    <span>{artists}</span>
                                ) : (
                                    artists!.map((art) => (
                                        <span key={art.id}>{art.name} / </span>
                                    ))
                                )}
                            </div>
                        </StyledNameArtDiv>
                    </StyledDetailDiv>
                )}

                <Image.PreviewGroup>
                    {pics.map((pic) => (
                        <Image
                            style={{ padding: 10 }}
                            width={+(pic.width / pic.height).toFixed(2) * 250}
                            height={250}
                            key={pic.originUrl}
                            src={pic.originUrl}
                        />
                    ))}
                </Image.PreviewGroup>
            </>
        );
    } else {
        return <span>{json}</span>;
    }
};

export default ShareDetail;
