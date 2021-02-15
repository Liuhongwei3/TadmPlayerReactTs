import React from "react";
import { Button, Empty, Popover, Spin } from "antd";
import {
    CustomerServiceOutlined,
    RightOutlined,
    GlobalOutlined,
    SmileOutlined,
    AppstoreOutlined,
    RadarChartOutlined,
    SkinOutlined,
} from "@ant-design/icons";

import req from "../../api/req";
import { IHotDetail, IHotDetailCats } from "./type";
import {
    countFormat,
    dateFormat,
    notify,
    toTop,
    uniqueId,
    updateCurMenu,
} from "../../utils";
import StyledWrapper from "../../components/detail/StyledWrapper";
import StyledItem from "../../components/detail/StyledItem";
import StyledCount from "../../components/detail/StyledCount";
import StyledDesc from "../../components/detail/StyledDesc";
import StyledName from "../../components/detail/StyledName";
import StyledTag from "../../components/StyledTag";
import LazyLoad from "react-lazyload";
import LoadingImg from "../../components/LoadingImg";
import { useHistory } from "react-router-dom";
import StyledDivider from "../../components/StyledDivider";

const INIT_LIMIT = 24;
const DEFAULT_CATS = {
    code: 200,
    all: { name: "全部歌单" },
    categories: {
        0: "语种",
        1: "风格",
        2: "场景",
        3: "情感",
        4: "主题",
    },
    sub: [
        {
            name: "流行",
            resourceCount: 943,
            type: 0,
            category: 1,
            resourceType: 0,
            hot: true,
            activity: false,
        },
    ],
};

const HotDetail: React.FunctionComponent = () => {
    const history = useHistory();
    const [curCat, setcurCat] = React.useState<string>("全部歌单");
    const [limit, setLimit] = React.useState<number>(INIT_LIMIT);
    const [visible, setVisible] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [hotDetailCats, setHotDetailCats] = React.useState<IHotDetailCats>(
        DEFAULT_CATS
    );
    const [topLists, setTopLists] = React.useState<Array<IHotDetail>>([]);

    const getHotDetailCats = React.useCallback(() => {
        req.netease.hotDetailCats().then((res) => {
            setHotDetailCats(res);
        });
    }, []);

    const getHotDetails = React.useCallback(() => {
        setLoading(true);
        req.netease
            .hotDetails(curCat, limit)
            .then((res) => {
                setTopLists(uniqueId(res.playlists));
            })
            .catch((e) =>
                notify(
                    "error",
                    (e.response && e.response.statusText) ||
                        e.message ||
                        "加载热门歌单数据失败"
                )
            )
            .finally(() => setLoading(false));
    }, [curCat, limit]);

    React.useEffect(() => {
        toTop();
    }, []);

    React.useEffect(() => {
        getHotDetailCats();
    }, [getHotDetailCats]);

    React.useEffect(() => {
        getHotDetails();
    }, [getHotDetails]);

    const updateCurInfo = React.useCallback((curCat: string) => {
        setLimit(INIT_LIMIT);
        setcurCat(curCat);
        setVisible(false);
    }, []);

    const toDetail = React.useCallback(
        (id: number) => {
            history.push(`/detail/${id}`);
            updateCurMenu();
        },
        [history]
    );

    const PopContent = React.useCallback(() => {
        return (
            <div style={{ width: 500 }}>
                {Object.entries(hotDetailCats.categories).map((item, index) => (
                    <div key={item[0]} style={{ margin: "20px 0" }}>
                        <h3>
                            {index === 0 && <GlobalOutlined />}
                            {index === 1 && <RadarChartOutlined />}
                            {index === 2 && <SkinOutlined />}
                            {index === 3 && <SmileOutlined />}
                            {index === 4 && <AppstoreOutlined />}
                            {item[1]}
                        </h3>
                        <div>
                            {hotDetailCats.sub
                                .filter(
                                    (items) =>
                                        items.category === Number(item[0])
                                )
                                .map((cat) => (
                                    <StyledTag
                                        key={cat.name}
                                        color={
                                            curCat === cat.name
                                                ? "red"
                                                : "rgb(159 157 157)"
                                        }
                                        fontSize={13}
                                        onClick={() => updateCurInfo(cat.name)}
                                    >
                                        {cat.name}
                                    </StyledTag>
                                ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    }, [hotDetailCats, curCat, updateCurInfo]);

    return (
        <Spin tip="Loading..." spinning={loading}>
            <div
                style={{
                    display: "inline-block",
                    padding: "24px 0 0 24px",
                }}
            >
                <span>选择分类：</span>
                <Popover
                    style={{ height: 500 }}
                    placement="bottomLeft"
                    visible={visible}
                    trigger="click"
                    title={
                        hotDetailCats ? (
                            <StyledTag
                                fontSize={13}
                                color={
                                    curCat === hotDetailCats.all.name
                                        ? "red"
                                        : "rgb(159 157 157)"
                                }
                                onClick={() =>
                                    updateCurInfo(hotDetailCats.all.name)
                                }
                            >
                                {hotDetailCats.all.name}
                            </StyledTag>
                        ) : (
                            <Empty />
                        )
                    }
                    content={hotDetailCats ? <PopContent /> : <Empty />}
                    onVisibleChange={(visible) => setVisible(visible)}
                >
                    <Button
                        type="ghost"
                        style={{ color: "pink" }}
                        icon={<RightOutlined />}
                        onClick={() => setVisible(true)}
                    >{`${curCat}`}</Button>
                </Popover>
            </div>

            <StyledDivider />

            {topLists.length ? (
                <React.Fragment>
                    <StyledWrapper>
                        {topLists.map((item: IHotDetail) => {
                            return (
                                <StyledItem
                                    key={item.id}
                                    onClick={() => toDetail(item.id)}
                                >
                                    <div
                                        style={{
                                            width: 150,
                                            height: 150,
                                            position: "relative",
                                        }}
                                    >
                                        <LazyLoad placeholder={<LoadingImg />}>
                                            <img
                                                style={{ opacity: 0.65 }}
                                                width={150}
                                                height={150}
                                                alt="detail-cover"
                                                loading="lazy"
                                                src={item.coverImgUrl}
                                            />
                                        </LazyLoad>
                                        <StyledCount>
                                            <CustomerServiceOutlined />
                                            {countFormat(item.playCount)}
                                        </StyledCount>
                                        <StyledDesc width={150}>
                                            <div>{`By ${item.creator.nickname}`}</div>
                                            <div>{`${dateFormat(
                                                item.updateTime
                                            )} 更新`}</div>
                                        </StyledDesc>
                                    </div>

                                    <StyledName width={150}>
                                        {item.name}
                                    </StyledName>
                                </StyledItem>
                            );
                        })}
                    </StyledWrapper>
                    <Button
                        style={{ margin: "0 auto", display: "flex" }}
                        type="primary"
                        disabled={limit >= 100}
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
    );
};

export default HotDetail;
