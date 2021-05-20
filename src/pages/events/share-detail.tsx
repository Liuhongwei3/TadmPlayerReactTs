import React from "react";
import { useHistory } from "react-router-dom";
import { Image, Popconfirm, Tag } from "antd";
import styled from "styled-components";
import { DeleteTwoTone } from "@ant-design/icons";

import { Artist, Event, IJson } from "../user/type";
import { getEventType, notify } from "../../utils";
import { DEFAULT_RANDOM_COLORS } from "../../web-config/defaultConfig";
import LoadingImg from "../../components/LoadingImg";
import { EEventType, EMessageType } from "../enums";
import reqs from "../../api/req";
import { useStore } from "../../hooks/useStore";

interface IProps {
    event: Event;
    json: IJson | string;
    canDelete?: boolean;
    user?: { userId: number; nickname: string };
}

const types = [
    { type: EEventType.SHARE_ALBUM, route: "album" },
    { type: EEventType.SHARE_DETAIL, route: "detail" },
    { type: EEventType.SHARE_MV, route: "mv" },
];

const ShareDetail: React.FunctionComponent<IProps> = (props: IProps) => {
    const history = useHistory();
    const store = useStore();
    const {
        event,
        event: {
            id: eventId,
            type,
            pics,
            user: { userId },
        },
        json,
        canDelete,
        user,
    } = props;
    const randomIndex = Math.floor(Math.random() * 10);

    const delEvent = React.useCallback(() => {
        reqs.neteaseLogined
            .delEvent(eventId)
            .then((res) => {
                if (res.code === 200) {
                    notify(EMessageType.SUCCESS, "删除动态成功 ~");
                    window.location.reload();
                }
            })
            .catch((e) => {
                notify(EMessageType.ERROR, e.message || "删除动态失败！");
            });
    }, [eventId]);

    const toDetail = React.useCallback(
        (id: number | string) => {
            const route = types.find((item) => item.type === type)?.route;

            if (id && route) {
                history.push(`/${route}/${id}`);
            } else if (id && type === EEventType.SHARE_SONG) {
                store.updateCurSongId(+id);
            } else {
                notify(EMessageType.WARNING, "该功能暂未开放");
            }
        },
        [history, store, type]
    );

    const toUser = React.useCallback(
        (userid: number | undefined) => {
            if (!userid) return;
            history.push(`/user/${userid}`);
        },
        [history]
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
                    {userId === store.userInfo.userId &&
                        canDelete === undefined && (
                            <Popconfirm
                                title="确定要删除当前动态吗？"
                                okText="是的"
                                cancelText="否"
                                placement="right"
                                onConfirm={delEvent}
                            >
                                <DeleteTwoTone
                                    style={{ fontSize: 16 }}
                                    twoToneColor="#ff5d5d"
                                />
                            </Popconfirm>
                        )}
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
                            <StyledArts>
                                By{" "}
                                {typeof artists === "string" ? (
                                    <span>{artists}</span>
                                ) : (
                                    artists!.map((art) => (
                                        <span key={art.id}>{art.name} / </span>
                                    ))
                                )}
                            </StyledArts>
                        </StyledNameArtDiv>
                    </StyledDetailDiv>
                )}

                {json.forward && (
                    <ShareDetail
                        user={json.forward.user}
                        event={json.forward}
                        json={json.forward.json}
                    />
                )}
                {!json.forward && json.event && (
                    <ShareDetail
                        user={json.event.user}
                        event={json.event}
                        json={json.event.json}
                    />
                )}

                <Image.PreviewGroup>
                    {pics.map((pic) => (
                        <Image
                            alt="event-cover"
                            loading="lazy"
                            style={{
                                padding: 10,
                                height: 250,
                                width:
                                    +(pic.width / pic.height).toFixed(2) * 250,
                                maxWidth: "100%",
                            }}
                            placeholder={<LoadingImg />}
                            key={pic.originUrl}
                            src={pic.originUrl}
                        />
                    ))}
                </Image.PreviewGroup>
            </>
        );
    } else {
        const newJson = JSON.parse(json);

        return typeof newJson === "object" ? (
            <StyledForward
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <hr />
                <div
                    style={{ color: "orange" }}
                    onClick={() => toUser(user?.userId)}
                >
                    转发自：@{user?.nickname}
                </div>
                <ShareDetail canDelete={false} event={event} json={newJson} />
            </StyledForward>
        ) : (
            <StyledJson>{json}</StyledJson>
        );
    }
};

export default ShareDetail;

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
    margin: 10px 0 0 10px;
    font-size: 16px;
    justify-content: center;
    align-items: center;
`;

const StyledArts = styled.div`
    color: #b1b1b1;
    margin-top: 6px;
`;

const StyledJson = styled.div`
    width: 85vw;
`;

const StyledForward = styled.div`
    &:hover {
        cursor: pointer;
    }
`;
