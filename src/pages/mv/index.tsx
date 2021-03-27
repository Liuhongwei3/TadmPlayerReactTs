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
import DPlayer from "dplayer";

import StyledDivider from "../../components/StyledDivider";
import { countFormat, notify, toTop } from "../../utils";
import LoadingImg from "../../components/LoadingImg";
import reqs from "../../api/req";
import { IMvDetailRes, IMvUrl } from "./type";
import StyledTag from "../../components/StyledTag";
import StyledWrapper from "../../components/detail/StyledWrapper";
import MvComments from "./mv-comments";
import MvDesc from "./mv-desc";
import MvSimilar from "./mv-similar";
import styled from "styled-components";
import { useStore } from "../../hooks/useStore";

const StyledDPlayer = styled.div`
    width: 75%;
    max-height: 520px;
    border-radius: 10px;
    margin: 0 auto;

    @media screen and (max-width: 768px) {
        width: 100%;
        height: 240px;

        .dplayer-controller .dplayer-icons .dplayer-icon {
            width: 30px;
        }
        .dplayer-time {
            font-size: 10px !important;
        }
    }
`;

interface IRouteParams {
    mvId: string;
}

const Mv: React.FunctionComponent = () => {
    const store = useStore();
    let { mvId } = useParams<IRouteParams>();
    const [loading, setLoading] = React.useState<boolean>(false);
    const [activeKey, setActiveKey] = React.useState<string>("2");
    const [mvInfo, setMvInfo] = React.useState<IMvDetailRes>();
    const [mvUrl, setMvUrl] = React.useState<IMvUrl>();
    mvId = mvId || String(store.curMvId);

    const getAlbumDetail = React.useCallback(() => {
        setLoading(true);

        Promise.all([reqs.netease.mvDetail(+mvId), reqs.netease.mvUrl(+mvId)])
            .then((res) => {
                setMvInfo(res[0]);
                if (res[1].code === 200) {
                    setMvUrl(res[1].data);
                }
            })
            .catch((err) => {
                notify(
                    "error",
                    (err.response && err.response.statusText) ||
                        err.message ||
                        "加载 MV 数据失败"
                );
            })
            .finally(() => setLoading(false));
    }, [mvId]);

    React.useEffect(() => {
        getAlbumDetail();
    }, [getAlbumDetail]);

    React.useEffect(() => {
        if (mvUrl) {
            const dp = new DPlayer({
                container: document.getElementById("dplayer"),
                screenshot: true,
                volume: 1,
                theme: "#faa3a3",
                // theme: "#FADFA3",
                // logo:
                //     "https://user-gold-cdn.xitu.io/2020/3/22/171012d7cd64fae9?imageView2/1/w/180/h/180/q/85/format/webp/interlace/1",
                video: {
                    // quality: [
                    //     {
                    //         name: '蓝光',
                    //         url: res[1].data.url,
                    //         type: 'mp4',
                    //     },
                    // ],
                    // defaultQuality: 0,
                    url: mvUrl.url,
                },
                contextmenu: [
                    {
                        text: "Tadm",
                        link:
                            "https://github.com/Liuhongwei3/TadmPlayerReactTs",
                    },
                ],
            });

            return () => {
                dp.destroy();
            };
        }
    }, [mvUrl]);

    React.useEffect(() => {
        store.updateCurMvId(+mvId);
        setActiveKey("2");
        toTop();
    }, [mvId, store]);

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
                                    <CustomerServiceOutlined />
                                    {countFormat(mvInfo?.data.playCount)}
                                </StyledTag>
                            </Tooltip>
                            <Tooltip title="收藏量">
                                <StyledTag color="purple">
                                    <StarOutlined />
                                    {countFormat(mvInfo?.data.subCount)}
                                </StyledTag>
                            </Tooltip>
                            <Tooltip title="分享量">
                                <StyledTag color="green">
                                    <ShareAltOutlined />
                                    {countFormat(mvInfo?.data.shareCount)}
                                </StyledTag>
                            </Tooltip>
                            <Tooltip title="评论数">
                                <StyledTag color="blue">
                                    <CommentOutlined />
                                    {countFormat(mvInfo?.data.commentCount)}
                                </StyledTag>
                            </Tooltip>
                            <Tooltip title="发行时间">
                                <StyledTag color="volcano">
                                    <FieldTimeOutlined />
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

                        {mvUrl && mvUrl?.url && (
                            <>
                                {/* <video
                                    width={"100%"}
                                    height={520}
                                    controls={true}
                                    src={mvUrl.url}
                                /> */}
                                <StyledDPlayer id="dplayer"></StyledDPlayer>
                            </>
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
                                tab={`评论(${countFormat(
                                    mvInfo?.data.commentCount
                                )})`}
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
