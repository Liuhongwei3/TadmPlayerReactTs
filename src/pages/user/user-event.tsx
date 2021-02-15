import React from "react";
import LazyLoad from "react-lazyload";
import { Empty, Spin, Comment, Avatar, Image, Tooltip, Button } from "antd";
import { LikeFilled, LikeOutlined } from "@ant-design/icons";

import req from "../../api/req";
import { dateFormat, notify } from "../../utils";
import { Artist, Event, IEventsRes } from "./type";
import LoadingImg from "../../components/LoadingImg";

interface IProps {
    userId: number;
    eventCount: number;
}

const INIT_LIMIT = 10;

const UserEvent: React.FunctionComponent<IProps> = (props: IProps) => {
    const { userId, eventCount } = props;
    const [loading, setLoading] = React.useState<boolean>(false);
    const [limit, setLimit] = React.useState<number>(INIT_LIMIT);
    const [lasttime, setLasttime] = React.useState<number>(0);
    const [eventsRes, setEventsRes] = React.useState<IEventsRes>();

    const handleJson = React.useCallback((events: Event[]) => {
        return [
            ...events.map((event) => {
                const temp =
                    typeof event.json === "string" && JSON.parse(event.json);
                event.json = Object.assign(
                    { ...temp },
                    {
                        msg: temp.msg,
                        song: temp.song,
                        playlist: temp.playlist,
                        album: temp.album,
                        mv: temp.mv,
                        video: temp.video,
                        djRadio: temp.djRadio,
                        forward: temp.event,
                    }
                );

                return event;
            }),
        ];
    }, []);

    const getUserEvents = React.useCallback(() => {
        setLoading(true);
        req.netease
            .userEvent(userId, limit, lasttime)
            .then((res) => {
                if (res.events.length) {
                    res.events = handleJson(res.events);
                }
                setEventsRes(res);
                setLasttime(res.lasttime);
            })
            .catch((e) =>
                notify(
                    "error",
                    (e.response && e.response.statusText) ||
                        e.message ||
                        "加载用户动态数据失败"
                )
            )
            .finally(() => setLoading(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [handleJson, limit, userId]);

    React.useEffect(() => {
        eventCount && getUserEvents();
    }, [eventCount, getUserEvents, limit]);

    const avatar = React.useCallback((event: Event) => {
        return (
            <Avatar
                alt={event.user.nickname}
                src={
                    <LazyLoad height={50} placeholder={<LoadingImg />}>
                        <Image
                            width={50}
                            height={50}
                            src={event.user.avatarUrl}
                        />
                    </LazyLoad>
                }
            />
        );
    }, []);

    const actions = React.useCallback((event: Event) => {
        return [
            <Tooltip title="Like">
                <span>
                    {event.info.liked ? <LikeFilled /> : <LikeOutlined />}
                    <span className="comment-action">
                        {event.info.likedCount}
                    </span>
                </span>
            </Tooltip>,
            <span>Reply to</span>,
        ];
    }, []);

    const shareDetail = React.useCallback(
        (url: string, name: string, artists: Artist[] | string) => {
            return (
                <div
                    style={{
                        width: "100%",
                        display: "inline-flex",
                        padding: 10,
                        borderRadius: 5,
                        backgroundColor: "rgba( 101, 100, 100, .5)",
                    }}
                >
                    <Image width={80} height={80} src={url} />

                    <div
                        style={{
                            marginLeft: 10,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <div>{name}</div>
                        By{" "}
                        {typeof artists === "string" ? (
                            <span>{artists}</span>
                        ) : (
                            artists.map((art) => (
                                <span key={art.id}>{art.name} / </span>
                            ))
                        )}
                    </div>
                </div>
            );
        },
        []
    );

    const content = React.useCallback(
        (event: Event) => {
            return typeof event.json === "object" ? (
                <>
                    <div style={{ margin: "10px 0" }}>{event.json.msg}</div>
                    <div style={{ margin: "10px 0" }}>
                        {event.json.song &&
                            shareDetail(
                                event.json.song.img80x80,
                                event.json.song.name,
                                event.json.song.artists
                            )}
                        {event.json.playlist &&
                            shareDetail(
                                event.json.playlist.coverImgUrl,
                                event.json.playlist.name,
                                event.json.playlist.creator.nickname
                            )}
                        {event.json.album &&
                            shareDetail(
                                event.json.album.picUrl,
                                event.json.album.name,
                                event.json.album.artists
                            )}
                        {event.json.mv &&
                            shareDetail(
                                event.json.mv.imgurl,
                                event.json.mv.name,
                                event.json.mv.artists
                            )}
                        {event.json.djRadio &&
                            shareDetail(
                                event.json.djRadio.picUrl,
                                event.json.djRadio.name,
                                event.json.djRadio.dj.nickname
                            )}
                    </div>
                    {event.pics.map((pic) => (
                        <Image
                            width={Math.round(pic.width / pic.height) * 250}
                            height={250}
                            key={pic.originUrl}
                            src={pic.originUrl}
                        />
                    ))}
                </>
            ) : (
                ""
            );
        },
        [shareDetail]
    );

    return eventCount ? (
        <Spin tip="Loading..." spinning={loading}>
            {eventsRes && eventsRes.size ? (
                <React.Fragment>
                    {eventsRes.events.map((event) => (
                        <Comment
                            key={event.id}
                            actions={actions(event)}
                            author={event.user.nickname}
                            avatar={avatar(event)}
                            content={content(event)}
                            datetime={dateFormat(event.eventTime, "more")}
                        />
                    ))}
                    <Button
                        style={{ margin: "0 auto", display: "flex" }}
                        type="primary"
                        disabled={!eventsRes.more}
                        loading={loading}
                        onClick={() => setLimit(limit + 12)}
                    >
                        Loading More
                    </Button>
                </React.Fragment>
            ) : (
                <Empty />
            )}
        </Spin>
    ) : (
        <Empty />
    );
};

export default UserEvent;
