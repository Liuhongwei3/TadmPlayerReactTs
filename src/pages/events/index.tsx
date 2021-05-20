import React from "react";
import LazyLoad from "react-lazyload";
import { Link } from "react-router-dom";
import {
    Button,
    Empty,
    Spin,
    Typography,
    Comment,
    Avatar,
    Image,
    Space,
    Switch,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import reqs from "../../api/req";
import StyledDivider from "../../components/StyledDivider";
import { dateFormat, notify, toTop } from "../../utils";
import ShareDetail from "./share-detail";
import EventActions from "./event-actions";
import EventComm from "./event-comm";
import { IEventsRes, Event } from "./type";
import LoadingImg from "../../components/LoadingImg";
import { EMessageType } from "../enums";
import { useStore } from "../../hooks/useStore";

const INIT_LIMIT = 20;

const Events: React.FunctionComponent = () => {
    const store = useStore();
    const [loading, setLoading] = React.useState<boolean>(false);
    const [eventsRes, setEventsRes] = React.useState<IEventsRes>();
    const [limit, setLimit] = React.useState<number>(INIT_LIMIT);
    const [showComm, setShowComm] = React.useState<boolean>(false);
    const [curEventId, setCurEventId] = React.useState<string>("");
    const [showOwn, setShowOwn] = React.useState(true);
    const [showEvents, setShowEvents] = React.useState<Event[]>([]);

    React.useEffect(() => {
        toTop();
    }, []);

    React.useEffect(() => {
        setLoading(true);
        reqs.neteaseLogined
            .getEvents(limit)
            .then((res) => {
                setEventsRes(res);
            })
            .catch((e) => {
                notify(EMessageType.ERROR, e.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [limit]);

    React.useEffect(() => {
        if (eventsRes) {
            setShowEvents(
                showOwn
                    ? eventsRes.event
                    : eventsRes.event.filter(
                          (ev) => ev.user.userId !== store.userInfo.userId
                      )
            );
        }
    }, [eventsRes, showOwn, store.userInfo.userId]);

    const publishEvent = React.useCallback(() => {
        notify(EMessageType.WARNING, "该功能暂未开放");
    }, []);

    const avatar = React.useCallback((event: Event) => {
        return (
            <Avatar
                alt={event.user.nickname}
                src={
                    <LazyLoad height={32} placeholder={<LoadingImg />}>
                        <Image src={event.user.avatarUrl} />
                    </LazyLoad>
                }
            />
        );
    }, []);

    return (
        <Spin tip="Loading..." spinning={loading}>
            {eventsRes && eventsRes.event.length ? (
                <div style={{ padding: 10 }}>
                    <Space
                        style={{
                            width: "100%",
                            justifyContent: "space-between",
                        }}
                    >
                        <Typography.Title
                            level={3}
                            style={{ color: "#d0c051" }}
                        >
                            朋友动态
                        </Typography.Title>

                        <Button type="primary" onClick={publishEvent}>
                            <EditOutlined />
                            发布动态
                        </Button>
                    </Space>

                    <div>
                        <span style={{ fontSize: 14 }}>显示自己的动态：</span>
                        <Switch defaultChecked onChange={setShowOwn} />
                    </div>

                    <StyledDivider />

                    <React.Fragment>
                        {showEvents.map((event) => (
                            <div key={`events${event.id}${event.eventTime}`}>
                                <Comment
                                    actions={[
                                        <EventActions
                                            event={event}
                                            comm={{
                                                showComm,
                                                setShowComm,
                                                curEventId,
                                                setCurEventId,
                                            }}
                                        />,
                                    ]}
                                    author={
                                        <Link to={`/user/${event.user.userId}`}>
                                            {event.user.nickname}
                                        </Link>
                                    }
                                    avatar={avatar(event)}
                                    content={
                                        <ShareDetail
                                            event={event}
                                            json={JSON.parse(event.json)}
                                        />
                                    }
                                    datetime={dateFormat(
                                        event.eventTime,
                                        "more"
                                    )}
                                />
                                {event.info.threadId === curEventId && (
                                    <EventComm
                                        key={`event-comm-${event.id}`}
                                        showComm={showComm}
                                        event={event}
                                    />
                                )}
                            </div>
                        ))}
                    </React.Fragment>

                    <StyledDivider />
                    <Button
                        style={{ margin: "0 auto", display: "flex" }}
                        type="primary"
                        disabled={!eventsRes.more}
                        loading={loading}
                        onClick={() => setLimit(limit + 12)}
                    >
                        Loading More
                    </Button>
                </div>
            ) : (
                <Empty />
            )}
        </Spin>
    );
};

export default Events;
