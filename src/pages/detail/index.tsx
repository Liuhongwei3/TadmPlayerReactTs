import React from "react";
import { Avatar, Empty, Spin, Image, Collapse, Tabs } from "antd";

import req from "../../api/req";
import { IDetailRes } from "./type";
import StyledWrapper from "../../components/detail/StyledWrapper";
import { countFormat, dateFormat } from "../../utils";
import LazyLoad from "react-lazyload";
import LoadingImg from "../../components/LoadingImg";
import StyledTag from "../../components/StyledTag";
import StyledDivider from "../../components/StyledDivider";
import { DEFAULT_RANDOM_COLORS } from "../../defaultConfig";
import DetailSongs from "./detail-songs";
import { useParams } from "react-router-dom";

interface IRouteParams {
    detailId: string;
}

const Detail: React.FunctionComponent = (props) => {
    const { detailId } = useParams<IRouteParams>();
    const [loading, setLoading] = React.useState<boolean>(false);
    const [detailInfo, setDetailInfo] = React.useState<IDetailRes>();

    const getDetails = React.useCallback(async () => {
        setLoading(true);
        const data = await req.netease.playlistdetail(+detailId || 3778678);
        setDetailInfo(data);
        setLoading(false);
    }, [detailId]);

    React.useEffect(() => {
        getDetails();
    }, [getDetails]);

    const onTabChange = React.useCallback(() => {
        console.log("change");
    }, []);

    return (
        <Spin tip="Loading..." spinning={loading}>
            {detailInfo?.playlist.trackIds.length ? (
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
                        <StyledTag color="magenta">
                            {detailInfo?.playlist.name}
                        </StyledTag>
                        <StyledTag color="red">
                            {detailInfo?.playlist.creator.nickname}
                        </StyledTag>
                        <StyledTag color="volcano">
                            歌曲：{countFormat(detailInfo?.playlist.trackCount)}
                        </StyledTag>
                        <StyledTag color="orange">
                            播放：{countFormat(detailInfo?.playlist.playCount)}
                        </StyledTag>
                        <StyledTag color="gold">
                            分享：{countFormat(detailInfo?.playlist.shareCount)}
                        </StyledTag>
                        <StyledTag color="purple">
                            收藏：
                            {countFormat(detailInfo?.playlist.subscribedCount)}
                        </StyledTag>
                        <StyledTag color="green">
                            创建：{dateFormat(detailInfo?.playlist.createTime)}
                        </StyledTag>
                        <StyledTag color="cyan">
                            更新：{dateFormat(detailInfo?.playlist.updateTime)}
                        </StyledTag>
                        {detailInfo?.playlist.updateFrequency ? (
                            <StyledTag color="blue">
                                {detailInfo.playlist.updateFrequency}
                            </StyledTag>
                        ) : null}
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

                    <Collapse
                        style={{ backgroundColor: "#a2a0a0d1", width: "50vw" }}
                    >
                        <Collapse.Panel header="歌单简介" key="description">
                            <p>{detailInfo?.playlist.description}</p>
                        </Collapse.Panel>
                    </Collapse>

                    <StyledDivider />

                    <Tabs
                        style={{ width: "calc(100vw - 104px)" }}
                        defaultActiveKey="1"
                        onChange={onTabChange}
                    >
                        <Tabs.TabPane
                            tab={`歌曲(${countFormat(
                                detailInfo.playlist.trackCount
                            )})`}
                            key="1"
                        >
                            <DetailSongs
                                trackIds={detailInfo.playlist.trackIds}
                            />
                        </Tabs.TabPane>
                        <Tabs.TabPane
                            tab={`评论(${countFormat(
                                detailInfo.playlist.commentCount
                            )})`}
                            key="2"
                        >
                            Content of Tab Pane 2
                        </Tabs.TabPane>
                        <Tabs.TabPane
                            tab={`收藏(${countFormat(
                                detailInfo.playlist.subscribedCount
                            )})`}
                            key="3"
                        >
                            Content of Tab Pane 3
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="推荐" key="4">
                            Content of Tab Pane 3
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
