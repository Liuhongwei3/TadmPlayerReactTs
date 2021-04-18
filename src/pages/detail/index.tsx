import React from "react";
import LazyLoad from "react-lazyload";
import { Link, useHistory, useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import {
    Avatar,
    Empty,
    Spin,
    Image,
    Collapse,
    Tabs,
    Tooltip,
    Popconfirm,
} from "antd";
import {
    ShareAltOutlined,
    CustomerServiceOutlined,
    StarFilled,
    StarOutlined,
    FieldTimeOutlined,
    EditOutlined,
    DeleteTwoTone,
} from "@ant-design/icons";

import req from "../../api/req";
import { IDetailRes, ISong } from "./type";
import StyledWrapper from "../../components/detail/StyledWrapper";
import { countFormat, dateFormat, notify, toTop } from "../../utils";
import LoadingImg from "../../components/LoadingImg";
import StyledTag from "../../components/StyledTag";
import StyledDivider from "../../components/StyledDivider";
import {
    DEFAULT_RANDOM_COLORS,
    RECOMMEND_DAY_ID,
} from "../../web-config/defaultConfig";
import DetailSongs from "./detail-songs";
import DetailComments from "./detail-comments";
import DetailSubscribedUsers from "./detail-subscribed-users";
import DetailSimilar from "./detail-similar";
import { useStore } from "../../hooks/useStore";
import { ESubscribeDetail } from "../../api/netease/types/like-type";
import openEditDetailDialog from "./edit-detail-dialog";

interface IRouteParams {
    detailId: string;
}

const Detail: React.FunctionComponent = observer(() => {
    const store = useStore();
    const history = useHistory();
    let { detailId } = useParams<IRouteParams>();
    const [isOwnDetail, setIsOwnDetail] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [subscribed, setSubscribed] = React.useState(false);
    const [activeKey, setActiveKey] = React.useState<string>("detail-song");
    const [detailInfo, setDetailInfo] = React.useState<IDetailRes>();
    const [dailySongs, setDailySongs] = React.useState<ISong[]>([]);
    detailId = detailId || String(store.curDetailId);

    const getDetails = React.useCallback((force = false) => {
        setLoading(true);
        if (+detailId === RECOMMEND_DAY_ID) {
            req.neteaseLogined
                .getRecommendSongs()
                .then((res) => {
                    setDailySongs(res.data.dailySongs);
                })
                .catch((err) => {
                    notify(
                        "error",
                        (err.response && err.response.statusText) ||
                            err.message ||
                            "加载每日推荐歌曲数据失败"
                    );
                })
                .finally(() => setLoading(false));
            return;
        }
        req.netease
            .playlistdetail(+detailId, force)
            .then((res) => {
                setDetailInfo(res);
                setIsOwnDetail(
                    res.playlist.creator.userId === store.userInfo.userId
                );
                setSubscribed(res.playlist.subscribed);
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
    }, [detailId, store.userInfo.userId]);

    React.useEffect(() => {
        toTop();
    }, []);

    React.useEffect(() => {
        getDetails();
    }, [getDetails]);

    React.useEffect(() => {
        store.updateCurDetailId(+detailId);
        setActiveKey("detail-song");
        toTop();
    }, [detailId, store]);

    const subscribeDetail = React.useCallback(
        (type: ESubscribeDetail) => {
            req.neteaseLogined.subscribeDetail(type, +detailId).then((res) => {
                if (res.code === 200) {
                    setSubscribed(type === ESubscribeDetail.SUBSCRIBE);
                }
            });
        },
        [detailId]
    );

    const onTabChange = React.useCallback((activeKey: string) => {
        setActiveKey(activeKey);
    }, []);

    const deleteDetail = React.useCallback(() => {
        req.neteaseLogined
            .deleteDetail(+detailId)
            .then(() => {
                notify("success", "删除歌单成功");
                history.push(`/user/${store.curUserId}`);
            })
            .catch((e) => {
                notify("error", e.message || "删除歌单失败");
            });
    }, [detailId, history, store.curUserId]);

    return (
        <Spin tip="Loading..." spinning={loading}>
            {+detailId === RECOMMEND_DAY_ID && (
                <DetailSongs
                    isOwnDetail={false}
                    detailId={+detailId}
                    dailySongs={dailySongs}
                    trackIds={[]}
                    songCount={dailySongs.length}
                    getDetails={getDetails}
                />
            )}
            {+detailId !== RECOMMEND_DAY_ID && detailInfo?.playlist ? (
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

                        {!isOwnDetail && (
                            <>
                                {subscribed ? (
                                    <Tooltip title="取消收藏">
                                        <StarFilled
                                            className="ant-svg-scale"
                                            style={{ color: "#ff5a5a" }}
                                            onClick={() =>
                                                subscribeDetail(
                                                    ESubscribeDetail.DISSUBSCRIBE
                                                )
                                            }
                                        />
                                    </Tooltip>
                                ) : (
                                    <Tooltip title="收藏该歌单">
                                        <StarOutlined
                                            className="ant-svg-scale"
                                            onClick={() =>
                                                subscribeDetail(
                                                    ESubscribeDetail.SUBSCRIBE
                                                )
                                            }
                                        />
                                    </Tooltip>
                                )}
                            </>
                        )}

                        {isOwnDetail && (
                            <>
                                <Tooltip title="更新该歌单">
                                    <EditOutlined
                                        className="ant-svg-scale"
                                        onClick={() =>
                                            openEditDetailDialog(
                                                detailInfo.playlist
                                            )
                                        }
                                    />
                                </Tooltip>
                                <Tooltip title="删除该歌单">
                                    <Popconfirm
                                        title="确定要删除该歌单吗?"
                                        onConfirm={deleteDetail}
                                    >
                                        <DeleteTwoTone
                                            className="ant-svg-scale"
                                            twoToneColor="#ff2626c7"
                                        />
                                    </Popconfirm>
                                </Tooltip>
                            </>
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
                        defaultActiveKey="detail-song"
                        activeKey={activeKey}
                        onChange={(activeKey) => onTabChange(activeKey)}
                    >
                        <Tabs.TabPane
                            tab={`歌曲(${countFormat(
                                detailInfo.playlist.trackCount
                            )})`}
                            key="detail-song"
                        >
                            <DetailSongs
                                isOwnDetail={isOwnDetail}
                                detailId={+detailId}
                                trackIds={detailInfo.playlist.trackIds}
                                songCount={detailInfo.playlist.trackCount}
                                getDetails={getDetails}
                            />
                        </Tabs.TabPane>
                        <Tabs.TabPane
                            tab={`评论(${countFormat(
                                detailInfo.playlist.commentCount
                            )})`}
                            key="detail-comment"
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
                            key="detail-subscibe"
                        >
                            <DetailSubscribedUsers
                                detailId={+detailId}
                                subUserCount={
                                    detailInfo.playlist.subscribedCount
                                }
                            />
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="推荐" key="detail-similar">
                            <DetailSimilar detailId={+detailId} />
                        </Tabs.TabPane>
                    </Tabs>
                </StyledWrapper>
            ) : (
                +detailId !== RECOMMEND_DAY_ID && <Empty />
            )}
        </Spin>
    );
});

export default Detail;
