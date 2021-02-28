import React from "react";
import LazyLoad from "react-lazyload";
import { Link, useParams } from "react-router-dom";
import { Avatar, Empty, Spin, Image, Collapse, Tabs, Tooltip } from "antd";
import {
    ShareAltOutlined,
    CustomerServiceOutlined,
    StarFilled,
    StarOutlined,
    FieldTimeOutlined,
} from "@ant-design/icons";

import req from "../../api/req";
import { IDetailRes } from "./type";
import StyledWrapper from "../../components/detail/StyledWrapper";
import { countFormat, dateFormat, notify, toTop } from "../../utils";
import LoadingImg from "../../components/LoadingImg";
import StyledTag from "../../components/StyledTag";
import StyledDivider from "../../components/StyledDivider";
import { DEFAULT_DETAIL_ID, DEFAULT_RANDOM_COLORS } from "../../web-config/defaultConfig";
import DetailSongs from "./detail-songs";
import DetailComments from "./detail-comments";
import DetailSubscribedUsers from "./detail-subscribed-users";
import DetailSimilar from "./detail-similar";

interface IRouteParams {
    detailId: string;
}

const Detail: React.FunctionComponent = () => {
    let { detailId } = useParams<IRouteParams>();
    const [loading, setLoading] = React.useState<boolean>(false);
    const [activeKey, setActiveKey] = React.useState<string>("1");
    const [detailInfo, setDetailInfo] = React.useState<IDetailRes>();
    detailId = detailId || String(DEFAULT_DETAIL_ID);

    const getDetails = React.useCallback(() => {
        setLoading(true);
        req.netease
            .playlistdetail(+detailId)
            .then((res) => {
                setDetailInfo(res);
            })
            .catch((err) => {
                notify(
                    "error",
                    (err.response && err.response.statusText) ||
                        err.message ||
                        "加载歌单数据失败"
                );
            })
            .finally(() => setLoading(false));
    }, [detailId]);

    React.useEffect(() => {
        toTop();
    }, []);

    React.useEffect(() => {
        getDetails();
    }, [getDetails]);

    React.useEffect(() => {
        setActiveKey("1");
        toTop();
    }, [detailId]);

    const onTabChange = React.useCallback((activeKey: string) => {
        setActiveKey(activeKey);
    }, []);

    return (
        <Spin tip="Loading..." spinning={loading}>
            {detailInfo?.playlist ? (
                <StyledWrapper>
                    <div>
                        <Avatar
                            src={
                                <LazyLoad
                                    height={50}
                                    placeholder={<LoadingImg />}
                                >
                                    <Image
                                        src={detailInfo.playlist.coverImgUrl}
                                    />
                                </LazyLoad>
                            }
                        />
                        <Tooltip title="歌单名">
                            <StyledTag color="magenta">
                                {detailInfo?.playlist.name}
                            </StyledTag>
                        </Tooltip>
                        <Tooltip title="创建者">
                            <Link
                                to={`/user/${detailInfo?.playlist.creator.userId}`}
                            >
                                <StyledTag color="red">
                                    {detailInfo?.playlist.creator.nickname}
                                </StyledTag>
                            </Link>
                        </Tooltip>
                        <Tooltip title="播放量">
                            <StyledTag color="orange">
                                <CustomerServiceOutlined />
                                {countFormat(detailInfo?.playlist.playCount)}
                            </StyledTag>
                        </Tooltip>
                        <Tooltip title="分享">
                            <StyledTag color="gold">
                                <ShareAltOutlined />
                                {countFormat(detailInfo?.playlist.shareCount)}
                            </StyledTag>
                        </Tooltip>
                        <Tooltip title="收藏">
                            <StyledTag color="purple">
                                <StarOutlined />
                                {countFormat(
                                    detailInfo?.playlist.subscribedCount
                                )}
                            </StyledTag>
                        </Tooltip>
                        <Tooltip title="创建时间">
                            <StyledTag color="green">
                                <FieldTimeOutlined />
                                {dateFormat(detailInfo?.playlist.createTime)}
                            </StyledTag>
                        </Tooltip>

                        <StyledTag color="cyan">
                            更新：{dateFormat(detailInfo?.playlist.updateTime)}
                        </StyledTag>
                        {detailInfo?.playlist.updateFrequency ? (
                            <Tooltip title="更新频率">
                                <StyledTag color="blue">
                                    {detailInfo.playlist.updateFrequency}
                                </StyledTag>
                            </Tooltip>
                        ) : null}

                        {detailInfo.playlist.subscribed ? (
                            <Tooltip title="取消收藏">
                                <StarFilled
                                    className="ant-svg-scale"
                                    style={{ color: "#ff5a5a" }}
                                />
                            </Tooltip>
                        ) : (
                            <Tooltip title="收藏该歌单">
                                <StarOutlined className="ant-svg-scale" />
                            </Tooltip>
                        )}
                    </div>

                    {detailInfo.playlist.tags.length ? (
                        <div style={{ width: "100%" }}>
                            标签：
                            {detailInfo.playlist.tags.map((tag, index) => (
                                <StyledTag
                                    key={tag}
                                    color={DEFAULT_RANDOM_COLORS[index]}
                                >
                                    {tag}
                                </StyledTag>
                            ))}
                        </div>
                    ) : null}

                    <StyledDivider />

                    {detailInfo?.playlist.description && (
                        <>
                            <Collapse
                                style={{
                                    backgroundColor: "#a2a0a0d1",
                                    width: "50vw",
                                }}
                            >
                                <Collapse.Panel
                                    header="歌单简介"
                                    key="description"
                                >
                                    <p>{detailInfo?.playlist.description}</p>
                                </Collapse.Panel>
                            </Collapse>
                            <StyledDivider />
                        </>
                    )}

                    <Tabs
                        style={{ width: "99%" }}
                        defaultActiveKey="1"
                        activeKey={activeKey}
                        onChange={(activeKey) => onTabChange(activeKey)}
                    >
                        <Tabs.TabPane
                            tab={`歌曲(${countFormat(
                                detailInfo.playlist.trackCount
                            )})`}
                            key="1"
                        >
                            <DetailSongs
                                trackIds={detailInfo.playlist.trackIds}
                                songCount={detailInfo.playlist.trackCount}
                            />
                        </Tabs.TabPane>
                        <Tabs.TabPane
                            tab={`评论(${countFormat(
                                detailInfo.playlist.commentCount
                            )})`}
                            key="2"
                        >
                            <DetailComments
                                detailId={+detailId}
                                commCount={detailInfo.playlist.commentCount}
                            />
                        </Tabs.TabPane>
                        <Tabs.TabPane
                            tab={`收藏(${countFormat(
                                detailInfo.playlist.subscribedCount
                            )})`}
                            key="3"
                        >
                            <DetailSubscribedUsers
                                detailId={+detailId}
                                subUserCount={
                                    detailInfo.playlist.subscribedCount
                                }
                            />
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="推荐" key="4">
                            <DetailSimilar detailId={+detailId} />
                        </Tabs.TabPane>
                    </Tabs>
                </StyledWrapper>
            ) : (
                <Empty />
            )}
        </Spin>
    );
};

export default Detail;
