import React from "react";
import LazyLoad from "react-lazyload";
import { useParams } from "react-router-dom";
import { Avatar, Empty, Spin, Image, Collapse, Tabs, Tooltip } from "antd";
import {
    CustomerServiceOutlined,
    StarFilled,
    StarOutlined,
    FieldTimeOutlined,
    VideoCameraOutlined,
} from "@ant-design/icons";

import req from "../../api/req";
import StyledWrapper from "../../components/detail/StyledWrapper";
import { countFormat, dateFormat, notify, toTop } from "../../utils";
import LoadingImg from "../../components/LoadingImg";
import StyledTag from "../../components/StyledTag";
import StyledDivider from "../../components/StyledDivider";
import { DEFAULT_RANDOM_COLORS, DEFAULT_SINGER_ID } from "../../defaultConfig";
import { ISingerRes } from "./type";
import SingerSongs from "./singer-songs";
import SingerHotSongs from "./singer-hot-songs";
import SingerAlbums from "./singer-albums";
import SingerSimilar from "./singer-similar";
import SingerMvs from "./singer-mvs";
import SingerDesc from "./singer-desc";

interface IRouteParams {
    singerId: string;
}

const Singer: React.FunctionComponent = () => {
    let { singerId } = useParams<IRouteParams>();
    const [loading, setLoading] = React.useState<boolean>(false);
    const [activeKey, setActiveKey] = React.useState<string>("1");
    const [singerInfo, setSingerInfo] = React.useState<ISingerRes>();
    singerId = singerId || String(DEFAULT_SINGER_ID);

    const getDetails = React.useCallback(() => {
        setLoading(true);
        req.netease
            .singerDetail(+singerId)
            .then((res) => {
                setSingerInfo(res);
            })
            .catch((err) => {
                notify(
                    "error",
                    (err.response && err.response.statusText) ||
                        err.message ||
                        "加载歌手数据失败"
                );
            })
            .finally(() => setLoading(false));
    }, [singerId]);

    React.useEffect(() => {
        toTop();
    }, []);

    React.useEffect(() => {
        getDetails();
    }, [getDetails]);

    React.useEffect(() => {
        setActiveKey("1");
        toTop();
    }, [singerId]);

    const onTabChange = React.useCallback((activeKey: string) => {
        setActiveKey(activeKey);
    }, []);

    return (
        <Spin tip="Loading..." spinning={loading}>
            {singerInfo?.artist.name ? (
                <StyledWrapper>
                    <div>
                        <Avatar
                            size="large"
                            src={
                                <LazyLoad
                                    height={50}
                                    placeholder={<LoadingImg />}
                                >
                                    <Image src={singerInfo.artist.picUrl} />
                                </LazyLoad>
                            }
                        />
                        <Tooltip title="歌手名">
                            <StyledTag color="magenta">
                                {singerInfo?.artist.name}
                            </StyledTag>
                        </Tooltip>
                        <Tooltip title="歌曲数">
                            <StyledTag color="blue">
                                <CustomerServiceOutlined
                                    style={{ marginRight: 5 }}
                                />
                                {countFormat(singerInfo?.artist.musicSize)}
                            </StyledTag>
                        </Tooltip>
                        <Tooltip title="专辑数">
                            <StyledTag color="purple">
                                <CustomerServiceOutlined
                                    style={{ marginRight: 5 }}
                                />
                                {countFormat(singerInfo.artist.albumSize)}
                            </StyledTag>
                        </Tooltip>
                        <Tooltip title="MV数">
                            <StyledTag color="orange">
                                <VideoCameraOutlined
                                    style={{ marginRight: 5 }}
                                />
                                {countFormat(singerInfo?.artist.mvSize)}
                            </StyledTag>
                        </Tooltip>
                        <Tooltip title="入驻时间">
                            <StyledTag color="green">
                                <FieldTimeOutlined style={{ marginRight: 5 }} />
                                {dateFormat(singerInfo?.artist.publishTime)}
                            </StyledTag>
                        </Tooltip>

                        {singerInfo.artist.followed ? (
                            <Tooltip title="取消关注">
                                <StarFilled
                                    className="ant-svg-scale"
                                    style={{ color: "#ff5a5a" }}
                                />
                            </Tooltip>
                        ) : (
                            <Tooltip title="关注该歌手">
                                <StarOutlined className="ant-svg-scale" />
                            </Tooltip>
                        )}
                    </div>

                    {singerInfo.artist.alias.length ? (
                        <div style={{ width: "100%" }}>
                            别名：
                            {singerInfo.artist.alias.map((tag, index) => (
                                <StyledTag
                                    key={tag}
                                    color={DEFAULT_RANDOM_COLORS[index]}
                                >
                                    {tag}
                                </StyledTag>
                            ))}
                            {singerInfo.artist.transNames &&
                                singerInfo.artist.transNames.map(
                                    (name, index) => (
                                        <StyledTag
                                            key={name}
                                            color={DEFAULT_RANDOM_COLORS[index]}
                                        >
                                            {name}
                                        </StyledTag>
                                    )
                                )}
                        </div>
                    ) : null}

                    <StyledDivider />

                    <Collapse
                        style={{ backgroundColor: "#a2a0a0d1", width: "75vw" }}
                    >
                        <Collapse.Panel header="歌手简介" key="description">
                            <p>{singerInfo?.artist.briefDesc}</p>
                        </Collapse.Panel>
                    </Collapse>

                    <StyledDivider />

                    <Tabs
                        style={{ width: "calc(100vw - 104px)" }}
                        activeKey={activeKey}
                        defaultActiveKey="1"
                        onChange={(activeKey) => onTabChange(activeKey)}
                    >
                        <Tabs.TabPane tab={`全部歌曲`} key="2">
                            <SingerSongs singerId={+singerId} />
                        </Tabs.TabPane>
                        <Tabs.TabPane tab={`歌曲TOP 50`} key="1">
                            <SingerHotSongs hotSongs={singerInfo.hotSongs} />
                        </Tabs.TabPane>
                        <Tabs.TabPane tab={`专辑`} key="3">
                            <SingerAlbums
                                singerId={+singerId}
                                albumCount={singerInfo.artist.albumSize}
                            />
                        </Tabs.TabPane>
                        <Tabs.TabPane tab={`MV`} key="4">
                            <SingerMvs
                                singerId={+singerId}
                                mvCount={singerInfo.artist.mvSize}
                            />
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="歌手详情" key="5">
                            <SingerDesc singerId={+singerId} />
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="相似歌手" key="6">
                            <SingerSimilar singerId={+singerId} />
                        </Tabs.TabPane>
                    </Tabs>
                </StyledWrapper>
            ) : (
                <Empty />
            )}
        </Spin>
    );
};

export default Singer;
