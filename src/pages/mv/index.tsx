import React from "react";
import LazyLoad from "react-lazyload";
import { Link, useParams } from "react-router-dom";
import { Avatar, Tabs, Image, Tooltip, Spin, Empty } from "antd";
import {
    FieldTimeOutlined,
    CustomerServiceOutlined,
    StarOutlined,
    StarFilled,
    ShareAltOutlined,
    CommentOutlined,
} from "@ant-design/icons";

import StyledDivider from "../../components/StyledDivider";
import { countFormat, notify, toTop } from "../../utils";
import LoadingImg from "../../components/LoadingImg";
import { DEFAULT_MV_ID } from "../../defaultConfig";
import reqs from "../../api/req";
import { IMvDetailRes, IMvUrl } from "./type";
import StyledTag from "../../components/StyledTag";
import StyledWrapper from "../../components/detail/StyledWrapper";
import MvComments from "./mv-comments";
import MvDesc from "./mv-desc";
import MvSimilar from "./mv-similar";

interface IRouteParams {
    mvId: string;
}

const Mv: React.FunctionComponent = () => {
    let { mvId } = useParams<IRouteParams>();
    const [loading, setLoading] = React.useState<boolean>(false);
    const [activeKey, setActiveKey] = React.useState<string>("2");
    const [mvInfo, setMvInfo] = React.useState<IMvDetailRes>();
    const [mvUrl, setMvUrl] = React.useState<IMvUrl>();
    mvId = mvId || String(DEFAULT_MV_ID);

    const getAlbumDetail = React.useCallback(() => {
        setLoading(true);

        Promise.all([reqs.netease.mvDetail(+mvId), reqs.netease.mvUrl(+mvId)])
            .then((res) => {
                setMvInfo(res[0]);
                res[1].code === 200 && setMvUrl(res[1].data);
            })
            .catch((err) => {
                notify("error", err.message || err || "加载 MV 数据失败");
            })
            .finally(() => setLoading(false));
    }, [mvId]);

    React.useEffect(() => {
        getAlbumDetail();
    }, [getAlbumDetail]);

    React.useEffect(() => {
        setActiveKey("2");
        toTop();
    }, [mvId]);

    const onTabChange = React.useCallback((activeKey: string) => {
        setActiveKey(activeKey);
    }, []);

    return (
        <Spin tip="Loading..." spinning={loading}>
            <StyledWrapper>
                {mvInfo?.data ? (
                    <React.Fragment>
                        <div>
                            <Avatar
                                src={
                                    <LazyLoad
                                        height={50}
                                        placeholder={<LoadingImg />}
                                    >
                                        <Image src={mvInfo?.data.cover} />
                                    </LazyLoad>
                                }
                            />
                            <Tooltip title="MV 标题">
                                <StyledTag color="blue">
                                    {mvInfo?.data.name}
                                </StyledTag>
                            </Tooltip>
                            <Tooltip title="作者">
                                <StyledTag color="magenta">
                                    {mvInfo?.data.artists[0].name}
                                </StyledTag>
                            </Tooltip>
                            <Tooltip title="播放量">
                                <StyledTag color="orange">
                                    <CustomerServiceOutlined
                                        style={{ marginRight: 5 }}
                                    />
                                    {countFormat(mvInfo?.data.playCount)}
                                </StyledTag>
                            </Tooltip>
                            <Tooltip title="收藏量">
                                <StyledTag color="purple">
                                    <StarOutlined style={{ marginRight: 5 }} />
                                    {countFormat(mvInfo?.data.subCount)}
                                </StyledTag>
                            </Tooltip>
                            <Tooltip title="分享量">
                                <StyledTag color="green">
                                    <ShareAltOutlined
                                        style={{ marginRight: 5 }}
                                    />
                                    {countFormat(mvInfo?.data.shareCount)}
                                </StyledTag>
                            </Tooltip>
                            <Tooltip title="评论数">
                                <StyledTag color="blue">
                                    <CommentOutlined
                                        style={{ marginRight: 5 }}
                                    />
                                    {countFormat(mvInfo?.data.commentCount)}
                                </StyledTag>
                            </Tooltip>
                            <Tooltip title="发行时间">
                                <StyledTag color="volcano">
                                    <FieldTimeOutlined
                                        style={{ marginRight: 5 }}
                                    />
                                    {mvInfo?.data.publishTime}
                                </StyledTag>
                            </Tooltip>
                            {mvInfo?.subed ? (
                                <Tooltip title="取消收藏">
                                    <StarFilled
                                        className="ant-svg-scale"
                                        style={{ color: "#ff5a5a" }}
                                    />
                                </Tooltip>
                            ) : (
                                <Tooltip title="收藏该 MV">
                                    <StarOutlined className="ant-svg-scale" />
                                </Tooltip>
                            )}
                        </div>

                        <div style={{ width: "100%" }}>
                            表演者：
                            {mvInfo?.data.artists.length === 1 ? (
                                <Link
                                    to={`/singer/${mvInfo?.data.artists[0].id}`}
                                >
                                    {mvInfo?.data.artists[0].name}
                                </Link>
                            ) : (
                                mvInfo?.data.artists.map((ar) => (
                                    <Link key={ar.id} to={`/singer/${ar.id}`}>
                                        {ar.name} /
                                    </Link>
                                ))
                            )}
                        </div>

                        <StyledDivider />

                        {mvUrl?.url && (
                            <video
                                width={"100%"}
                                height={520}
                                controls={true}
                                src={mvUrl.url}
                            />
                        )}

                        <StyledDivider />

                        <Tabs
                            style={{ width: "100%" }}
                            activeKey={activeKey}
                            defaultActiveKey="1"
                            onChange={(activeKey) => onTabChange(activeKey)}
                        >
                            <Tabs.TabPane tab={`MV 简介`} key="1">
                                <MvDesc
                                    briefDesc={mvInfo.data.briefDesc}
                                    desc={mvInfo.data.desc}
                                />
                            </Tabs.TabPane>
                            <Tabs.TabPane
                                tab={`评论(${mvInfo?.data.commentCount})`}
                                key="2"
                            >
                                <MvComments
                                    mvId={+mvId}
                                    commCount={mvInfo?.data.commentCount || 0}
                                />
                            </Tabs.TabPane>
                            <Tabs.TabPane tab={`相似 MV`} key="3">
                                <MvSimilar mvId={+mvId} />
                            </Tabs.TabPane>
                        </Tabs>
                    </React.Fragment>
                ) : (
                    <Empty />
                )}
            </StyledWrapper>
        </Spin>
    );
};

export default Mv;
