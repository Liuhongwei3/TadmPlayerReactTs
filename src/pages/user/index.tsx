import React from "react";
import { useHistory, useParams } from "react-router-dom";
import LazyLoad from "react-lazyload";
import {
    Avatar,
    Button,
    Collapse,
    Empty,
    Spin,
    Tabs,
    Image,
    Tooltip,
    Typography,
} from "antd";
import {
    CustomerServiceOutlined,
    StarFilled,
    StarOutlined,
    FieldTimeOutlined,
    LineChartOutlined,
    CrownOutlined,
    WeiboCircleOutlined,
} from "@ant-design/icons";

import req from "../../api/req";
import StyledWrapper from "../../components/detail/StyledWrapper";
import { countFormat, dateFormat, notify, toTop } from "../../utils";
import { IUserDetail, MainAuthType } from "./type";
import StyledDivider from "../../components/StyledDivider";
import LoadingImg from "../../components/LoadingImg";
import StyledTag from "../../components/StyledTag";
import { DEFAULT_RANDOM_COLORS } from "../../web-config/defaultConfig";
import UserPlaylist from "./user-playlist";
import UserFollow from "./user-follow";
import UserSex from "./user-sex";
import UserFollowed from "./user-followed";
import UserEvent from "./user-event";
import { createTime, userType } from "./content-util";
import { useStore } from "../../hooks/useStore";
import { ELikeOpr } from "../../api/netease/types/like-type";

interface IRouteParams {
    userId: string;
}

const User: React.FunctionComponent = () => {
    const store = useStore();
    const history = useHistory();
    let { userId } = useParams<IRouteParams>();
    const [loading, setLoading] = React.useState<boolean>(false);
    const [activeKey, setActiveKey] = React.useState<string>("1");
    const [userInfo, setUserInfo] = React.useState<IUserDetail>();
    const [followed, setFollowed] = React.useState<boolean>(false);
    userId = userId || String(store.curUserId);

    const getUserInfo = React.useCallback(() => {
        setLoading(true);
        req.netease
            .userDetail(+userId)
            .then((res) => {
                setUserInfo(res);
                setFollowed(res.profile.followed);
            })
            .catch((err) => {
                notify(
                    "error",
                    (err.response && err.response.statusText) ||
                        err.message ||
                        "加载用户详情数据失败"
                );
            })
            .finally(() => setLoading(false));
    }, [userId]);

    React.useEffect(() => {
        toTop();
    }, []);

    React.useEffect(() => {
        getUserInfo();
    }, [getUserInfo]);

    React.useEffect(() => {
        store.updateCurUserId(+userId);
        setActiveKey("1");
    }, [store, userId]);

    const onTabChange = React.useCallback((activeKey: string) => {
        setActiveKey(activeKey);
    }, []);

    const toDetail = React.useCallback(
        (id: number) => {
            history.push(`/singer/${id}`);
        },
        [history]
    );

    const followUser = React.useCallback(
        (type: ELikeOpr) => {
            req.neteaseLogined.followUser(type, +userId).then((res) => {
                if (res.code === 200) {
                    setFollowed(type === ELikeOpr.LIKE);
                }
            });
        },
        [userId]
    );

    const Binds = React.useCallback(() => {
        return userInfo &&
            userInfo.bindings?.length &&
            userInfo.bindings.filter((bind) => bind.url.length).length ? (
            <div style={{ width: "100%", marginTop: 5 }}>
                社交网络：
                {userInfo.bindings
                    .filter((bind) => bind.url.length)
                    .map((bind) => (
                        <Typography.Link
                            key={bind.id}
                            href={bind.url}
                            target="_blank"
                        >
                            {bind.type === 2 && (
                                <WeiboCircleOutlined
                                    style={{ color: "#fdc672", fontSize: 20 }}
                                />
                            )}
                        </Typography.Link>
                    ))}
            </div>
        ) : null;
    }, [userInfo]);

    const AuthTypes = React.useCallback(() => {
        return userInfo && userInfo.profile.allAuthTypes?.length ? (
            <div style={{ width: "100%" }}>
                <span>认证标签：</span>
                {userInfo.profile.allAuthTypes
                    ?.filter((type) => type.desc.length)
                    .map((type, index) => (
                        <StyledTag
                            key={type.desc}
                            color={DEFAULT_RANDOM_COLORS[index]}
                        >
                            {type.desc}
                        </StyledTag>
                    ))}
            </div>
        ) : null;
    }, [userInfo]);

    const singerInfo = React.useCallback(
        (id: number, name: string, mainAuthType: MainAuthType) => {
            return (
                <React.Fragment>
                    <div style={{ width: "100%" }}>
                        音乐人：
                        <StyledTag color="blue">{name}</StyledTag>
                        {mainAuthType?.tags &&
                            mainAuthType?.tags.map((tag, index) => (
                                <StyledTag
                                    key={tag}
                                    color={DEFAULT_RANDOM_COLORS[index]}
                                >
                                    {tag}
                                </StyledTag>
                            ))}
                        <Button type="primary" onClick={() => toDetail(id)}>
                            去歌手页 &gt;
                        </Button>
                    </div>
                    <StyledDivider />
                </React.Fragment>
            );
        },
        [toDetail]
    );

    return (
        <Spin tip="Loading..." spinning={loading}>
            {userInfo?.profile.nickname ? (
                <StyledWrapper>
                    <div>
                        <Avatar
                            src={
                                <LazyLoad
                                    height={32}
                                    placeholder={<LoadingImg />}
                                >
                                    <Image src={userInfo.profile.avatarUrl} />
                                </LazyLoad>
                            }
                        />
                        <Tooltip title="用户名">
                            <StyledTag color="magenta">
                                {userInfo?.profile.nickname}
                            </StyledTag>
                        </Tooltip>
                        <Tooltip title="性别">
                            <StyledTag color="cyan">
                                <UserSex gender={userInfo.profile.gender} />
                            </StyledTag>
                        </Tooltip>
                        <Tooltip title="等级">
                            <StyledTag color="red">
                                <LineChartOutlined />
                                {`Lv.${userInfo.level}`}
                            </StyledTag>
                        </Tooltip>
                        <Tooltip title="用户类型">
                            <StyledTag color="gold">
                                {userType(
                                    userInfo.profile.userType,
                                    userInfo?.profile.mainAuthType?.desc
                                )}
                            </StyledTag>
                        </Tooltip>
                        {userInfo.profile.vipType === 11 && (
                            <StyledTag color="purple">
                                <CrownOutlined />
                                黑胶 VIP
                            </StyledTag>
                        )}
                        <Tooltip title={`累计听歌(${userInfo.listenSongs})`}>
                            <StyledTag color="orange">
                                <CustomerServiceOutlined />
                                {countFormat(userInfo.listenSongs)}
                            </StyledTag>
                        </Tooltip>
                        <Tooltip title="出生日期">
                            <StyledTag color="blue">
                                {dateFormat(userInfo.profile.birthday)}
                            </StyledTag>
                        </Tooltip>
                        <Tooltip title="村龄">
                            <StyledTag color="green">
                                <FieldTimeOutlined />
                                {createTime(userInfo.createDays)}
                            </StyledTag>
                        </Tooltip>

                        {followed ? (
                            <Tooltip title="取消关注">
                                <StarFilled
                                    className="ant-svg-scale"
                                    style={{ color: "#ff5a5a" }}
                                    onClick={() => followUser(ELikeOpr.DISLIKE)}
                                />
                            </Tooltip>
                        ) : (
                            <Tooltip title="关注该用户">
                                <StarOutlined
                                    className="ant-svg-scale"
                                    onClick={() => followUser(ELikeOpr.LIKE)}
                                />
                            </Tooltip>
                        )}
                    </div>

                    <Binds />

                    <StyledDivider />

                    <AuthTypes />

                    {userInfo.profile.artistId &&
                        singerInfo(
                            userInfo.profile.artistId,
                            userInfo.profile.artistName!,
                            userInfo.profile.mainAuthType!
                        )}

                    {!!userInfo?.profile.signature && (
                        <>
                            <Collapse
                                style={{
                                    backgroundColor: "#a2a0a0d1",
                                    width: "50vw",
                                }}
                            >
                                <Collapse.Panel
                                    header="个人介绍"
                                    key="description"
                                >
                                    <Typography.Paragraph
                                        ellipsis={{
                                            rows: 2,
                                            expandable: true,
                                        }}
                                    >
                                        {userInfo?.profile.signature}
                                    </Typography.Paragraph>
                                </Collapse.Panel>
                            </Collapse>
                            <StyledDivider />
                        </>
                    )}

                    <Tabs
                        style={{ width: "100%" }}
                        activeKey={activeKey}
                        defaultActiveKey="1"
                        onChange={(activeKey) => onTabChange(activeKey)}
                    >
                        <Tabs.TabPane
                            tab={`动态(${countFormat(
                                userInfo.profile.eventCount
                            )})`}
                            key="2"
                        >
                            <UserEvent
                                userId={+userId}
                                eventCount={userInfo.profile.eventCount}
                            />
                        </Tabs.TabPane>
                        <Tabs.TabPane
                            tab={`歌单(${countFormat(
                                userInfo.profile.playlistCount
                            )})`}
                            key="1"
                        >
                            <UserPlaylist userId={+userId} />
                        </Tabs.TabPane>
                        <Tabs.TabPane
                            tab={`关注(${countFormat(
                                userInfo.profile.follows
                            )})`}
                            key="3"
                        >
                            <UserFollow
                                userId={+userId}
                                followCount={userInfo.profile.follows}
                            />
                        </Tabs.TabPane>
                        <Tabs.TabPane
                            tab={`粉丝(${countFormat(
                                userInfo.profile.followeds
                            )})`}
                            key="4"
                        >
                            <UserFollowed
                                userId={+userId}
                                followedCount={userInfo.profile.followeds}
                            />
                        </Tabs.TabPane>
                    </Tabs>
                </StyledWrapper>
            ) : (
                <Empty />
            )}
        </Spin>
    );
};

export default User;
