import React from "react";
import LazyLoad from "react-lazyload";
import { useParams } from "react-router-dom";
import { Avatar, Spin, Image, Tabs, Tooltip, Typography, Tag } from "antd";
import {
    ShareAltOutlined,
    TrademarkCircleOutlined,
    FieldTimeOutlined,
    StarOutlined,
    StarFilled,
    AudioOutlined,
    EditOutlined,
} from "@ant-design/icons";

import reqs from "../../api/req";
import { IAlbumDetailCount, IAlbumRes } from "./type";
import StyledTag from "../../components/StyledTag";
import LoadingImg from "../../components/LoadingImg";
import { countFormat, dateFormat, notify, toTop } from "../../utils";
import StyledWrapper from "../../components/detail/StyledWrapper";
import StyledDivider from "../../components/StyledDivider";
import AlbumSongs from "./album-songs";
import AlbumComments from "./album-comments";
import { useStore } from "../../hooks/useStore";
import { ELikeOpr } from "../../api/netease/types/like-type";
import { EMessageType, EShareResourceType, ESourceType } from "../enums";
import ShareResource from "../share-resource";
import openPublishCommModal from "../../components/comment/publish-comm-modal";

interface IRouteParams {
    albumId: string;
}

const Album: React.FunctionComponent = () => {
    const store = useStore();
    let { albumId } = useParams<IRouteParams>();
    const [subscribed, setSubscribed] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [activeKey, setActiveKey] = React.useState<string>("1");
    const [albumInfo, setAlbumInfo] = React.useState<IAlbumRes>();
    const [albumCount, setAlbumCount] = React.useState<IAlbumDetailCount>();
    albumId = albumId || String(store.curAlbumId);

    const getAlbumDetail = React.useCallback(() => {
        setLoading(true);

        Promise.all([
            reqs.netease.albumDetail(+albumId),
            reqs.netease.albumDetailCount(+albumId),
        ])
            .then((res) => {
                setAlbumInfo(res[0]);
                setAlbumCount(res[1]);
                setSubscribed(res[1].isSub);
            })
            .catch((err) => {
                notify(
                    EMessageType.ERROR,
                    (err.response && err.response.statusText) ||
                        err.message ||
                        "加载专辑数据失败"
                );
            })
            .finally(() => setLoading(false));
    }, [albumId]);

    React.useEffect(() => {
        getAlbumDetail();
    }, [getAlbumDetail]);

    React.useEffect(() => {
        store.updateCurAlbumId(+albumId);
        setActiveKey("1");
        toTop();
    }, [albumId, store]);

    const subscribeAlbum = React.useCallback(
        (type: ELikeOpr) => {
            reqs.neteaseLogined.subscribeAlbum(type, +albumId).then((res) => {
                if (res.code === 200) {
                    setSubscribed(type === ELikeOpr.LIKE);
                }
            });
        },
        [albumId]
    );

    const onTabChange = React.useCallback((activeKey: string) => {
        setActiveKey(activeKey);
    }, []);

    const publishComment = React.useCallback(() => {
        openPublishCommModal(ESourceType.ALBUM, +albumId);
    }, [albumId]);

    return (
        <Spin tip="Loading..." spinning={loading}>
            <StyledWrapper>
                <div>
                    <Avatar
                        src={
                            <LazyLoad height={50} placeholder={<LoadingImg />}>
                                <Image src={albumInfo?.album.picUrl} />
                            </LazyLoad>
                        }
                    />
                    <Tooltip title="专辑名">
                        <StyledTag color="blue">
                            {albumInfo?.album.name}
                        </StyledTag>
                    </Tooltip>
                    <Tooltip title="作者">
                        <StyledTag color="magenta">
                            {albumInfo?.album.artist.name}
                        </StyledTag>
                    </Tooltip>

                    {albumInfo?.album.subType && (
                        <Tooltip title="录制版本">
                            <StyledTag color="orange">
                                <AudioOutlined />
                                {albumInfo?.album.subType}
                            </StyledTag>
                        </Tooltip>
                    )}

                    {albumInfo?.album.company && (
                        <Tooltip title="所属唱片公司">
                            <StyledTag color="lime">
                                <TrademarkCircleOutlined />
                                {albumInfo?.album.company}
                            </StyledTag>
                        </Tooltip>
                    )}
                    <Tooltip title="发行时间">
                        <StyledTag color="volcano">
                            <FieldTimeOutlined />
                            {dateFormat(albumInfo?.album.publishTime)}
                        </StyledTag>
                    </Tooltip>
                    <Tooltip title="收藏">
                        <StyledTag color="purple">
                            <StarOutlined />
                            {countFormat(albumCount?.subCount)}
                        </StyledTag>
                    </Tooltip>
                    <Tooltip title="分享">
                        <StyledTag color="purple">
                            <ShareAltOutlined />
                            {countFormat(albumCount?.shareCount)}
                        </StyledTag>
                    </Tooltip>

                    {subscribed ? (
                        <Tooltip title="取消收藏">
                            <StarFilled
                                className="ant-svg-scale"
                                style={{ color: "#ff5a5a" }}
                                onClick={() => subscribeAlbum(ELikeOpr.DISLIKE)}
                            />
                        </Tooltip>
                    ) : (
                        <Tooltip title="收藏该专辑">
                            <StarOutlined
                                className="ant-svg-scale"
                                onClick={() => subscribeAlbum(ELikeOpr.LIKE)}
                            />
                        </Tooltip>
                    )}
                    <Tooltip title="分享该专辑">
                        <ShareResource
                            scale={true}
                            type={EShareResourceType.ALBUM}
                            id={+albumId}
                        />
                    </Tooltip>
                </div>
                <StyledDivider />

                <Tabs
                    style={{ width: "99%" }}
                    activeKey={activeKey}
                    defaultActiveKey="1"
                    onChange={(activeKey) => onTabChange(activeKey)}
                >
                    <Tabs.TabPane
                        tab={`歌曲(${countFormat(albumInfo?.album.size)})`}
                        key="1"
                    >
                        <AlbumSongs songs={albumInfo?.songs} />
                    </Tabs.TabPane>
                    <Tabs.TabPane
                        tab={`评论(${countFormat(albumCount?.commentCount)})`}
                        key="2"
                    >
                        <Tag color="orange" onClick={publishComment}>
                            <EditOutlined />
                            发布评论
                        </Tag>
                        <AlbumComments
                            albumId={+albumId}
                            commCount={albumCount?.commentCount}
                        />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab={`专辑详情`} key="3">
                        {albumInfo?.album.description ? (
                            <React.Fragment>
                                <Typography.Title
                                    level={4}
                                    style={{ color: "#a1a1a1" }}
                                >
                                    专辑介绍
                                </Typography.Title>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: albumInfo?.album.description,
                                    }}
                                ></div>
                            </React.Fragment>
                        ) : (
                            <div>暂无介绍</div>
                        )}
                    </Tabs.TabPane>
                </Tabs>
            </StyledWrapper>
        </Spin>
    );
};

export default Album;
