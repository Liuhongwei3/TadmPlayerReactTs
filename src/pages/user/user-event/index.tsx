import React from "react";
import LazyLoad from "react-lazyload";
import { Empty, Spin, Comment, Avatar, Image, Button } from "antd";

import req from "../../../api/req";
import { dateFormat, notify } from "../../../utils";
import { Event, IEventsRes } from "../type";
import LoadingImg from "../../../components/LoadingImg";
import ShareDetail from "./share-detail";
import UserEventActions from "./user-event-actions";
import { handleJson } from "../content-util";
import UserEventComm from "./user-event-comm";

interface IProps {
    userId: number;
    eventCount: number;
}

const INIT_LIMIT = 10;

const UserEvent: React.FunctionComponent<IProps> = (props: IProps) => {
    const { userId, eventCount } = props;
    const [loading, setLoading] = React.useState<boolean>(false);
    const [limit, setLimit] = React.useState<number>(INIT_LIMIT);
    // const [lasttime, setLasttime] = React.useState<number>(0);
    const [eventsRes, setEventsRes] = React.useState<IEventsRes>();
    const [showComm, setShowComm] = React.useState<boolean>(false);
    const [curEventId, setCurEventId] = React.useState<string>("");

    const getUserEvents = React.useCallback(() => {
        setLoading(true);
        req.netease
            // .userEvent(userId, limit, lasttime)
            .userEvent(userId, limit)
            .then((res) => {
                if (res.events.length) {
                    res.events = handleJson(res.events);
                }
                setEventsRes(res);
                // setLasttime(res.lasttime);
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
                            preview={false}
                            width={50}
                            height={50}
                            src={event.user.avatarUrl}
                        />
                    </LazyLoad>
                }
            />
        );
    }, []);

    return eventCount ? (
        <Spin tip="Loading..." spinning={loading}>
            {eventsRes && eventsRes.size ? (
                <React.Fragment>
                    {eventsRes.events.map((event) => (
                        <div key={`event-${event.id}`}>
                            <Comment
                                actions={[
                                    <UserEventActions
                                        event={event}
                                        comm={{
                                            showComm,
                                            setShowComm,
                                            curEventId,
                                            setCurEventId,
                                        }}
                                    />,
                                ]}
                                author={event.user.nickname}
                                avatar={avatar(event)}
                                content={
                                    <ShareDetail
                                        type={event.type}
                                        json={event.json}
                                        pics={event.pics}
                                    />
                                }
                                datetime={dateFormat(event.eventTime, "more")}
                            />
                            {event.info.threadId === curEventId && (
                                <UserEventComm
                                    key={`event-comm-${event.id}`}
                                    showComm={showComm}
                                    event={event}
                                />
                            )}
                        </div>
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
