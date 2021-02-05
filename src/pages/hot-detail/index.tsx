import React from "react";
import { Button, Divider, Empty, Popover, Spin } from "antd";
import { CustomerServiceOutlined, RightOutlined } from "@ant-design/icons";

import req from "../../api/req";
import { IHotDetail, IHotDetailCats } from "./type";
import { countFormat, dateFormat, unique } from "../../utils";
import StyledWrapper from "../../components/detail/StyledWrapper";
import StyledItem from "../../components/detail/StyledItem";
import StyledCount from "../../components/detail/StyledCount";
import StyledDesc from "../../components/detail/StyledDesc";
import StyledName from "../../components/detail/StyledName";
import { DEFAULT_CATS } from "../../defaultConfig";
import StyledTag from "../../components/StyledTag";
import LazyLoad from "react-lazyload";
import LoadingImg from "../../components/LoadingImg";

const INIT_LIMIT = 24;

const HotDetail: React.FunctionComponent = () => {
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
                setTopLists(unique(res.playlists));
            })
            .finally(() => setLoading(false));
    }, [curCat, limit]);

    React.useEffect(() => {
        getHotDetailCats();
    }, [getHotDetailCats]);

    React.useEffect(() => {
        getHotDetails();
    }, [getHotDetails]);

    const updateCurInfo = React.useCallback(async (curCat: string) => {
        setcurCat(curCat);
        setLimit(INIT_LIMIT);
        setVisible(false);
    }, []);
    const PopContent = React.useCallback(() => {
        return (
            <div style={{ width: 500 }}>
                {Object.entries(hotDetailCats.categories).map((item) => (
                    <div key={item[0]} style={{ margin: "20px 0" }}>
                        <h4>{item[1]}</h4>
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
            <Popover
                placement="bottomLeft"
                title={
                    <StyledTag
                        fontSize={13}
                        color={
                            curCat === hotDetailCats.all.name
                                ? "red"
                                : "rgb(159 157 157)"
                        }
                        onClick={() => updateCurInfo(hotDetailCats.all.name)}
                    >
                        {hotDetailCats.all.name}
                    </StyledTag>
                }
                content={<PopContent />}
                visible={visible}
                trigger="click"
                onVisibleChange={(visible) => setVisible(visible)}
            >
                <span
                    style={{
                        display: "inline-block",
                        padding: "24px 0 0 24px",
                    }}
                >
                    <span>选择分类：</span>
                    <Button
                        type="ghost"
                        style={{ color: "pink" }}
                        icon={<RightOutlined />}
                        onClick={() => setVisible(true)}
                    >{`${curCat}`}</Button>
                </span>
            </Popover>
            <Divider />
            {topLists.length ? (
                <StyledWrapper>
                    {topLists.map((item: IHotDetail) => {
                        return (
                            <StyledItem key={item.id}>
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
                                        <CustomerServiceOutlined
                                            style={{ marginRight: 5 }}
                                        />
                                        {countFormat(item.playCount)}
                                    </StyledCount>
                                    <StyledDesc width={150}>
                                        <div>{`By ${item.creator.nickname}`}</div>
                                        <div>{`${dateFormat(
                                            item.updateTime
                                        )} 更新`}</div>
                                    </StyledDesc>
                                </div>

                                <StyledName width={150}>{item.name}</StyledName>
                            </StyledItem>
                        );
                    })}
                </StyledWrapper>
            ) : (
                <Empty />
            )}

            <Button
                style={{ margin: "0 auto", display: "flex" }}
                type="primary"
                disabled={!topLists.length || limit >= 100}
                loading={loading}
                onClick={() => setLimit(limit + 12)}
            >
                Loading More
            </Button>
        </Spin>
    );
};

export default HotDetail;
