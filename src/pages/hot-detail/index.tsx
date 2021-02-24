import React from "react";
import { useHistory } from "react-router-dom";
import LazyLoad from "react-lazyload";
import { Button, Empty, Spin } from "antd";
import { CustomerServiceOutlined } from "@ant-design/icons";

import req from "../../api/req";
import { IHotDetail } from "./type";
import { countFormat, dateFormat, notify, toTop, uniqueId } from "../../utils";
import StyledWrapper from "../../components/detail/StyledWrapper";
import StyledItem from "../../components/detail/StyledItem";
import StyledCount from "../../components/detail/StyledCount";
import StyledDesc from "../../components/detail/StyledDesc";
import StyledName from "../../components/detail/StyledName";
import LoadingImg from "../../components/LoadingImg";
import StyledDivider from "../../components/StyledDivider";
import { DEFAULT_IMG_HEIGHT, DEFAULT_IMG_WIDTH } from "../../defaultConfig";
import HotDetailCats from "./hot-detail-cats";

const INIT_LIMIT = 24;

const HotDetail: React.FunctionComponent = () => {
    const history = useHistory();
    const [curCat, setcurCat] = React.useState<string>("全部歌单");
    const [limit, setLimit] = React.useState<number>(INIT_LIMIT);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [topLists, setTopLists] = React.useState<Array<IHotDetail>>([]);

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
        getHotDetails();
    }, [getHotDetails]);

    const toDetail = React.useCallback(
        (id: number) => {
            history.push(`/detail/${id}`);
        },
        [history]
    );

    return (
        <Spin tip="Loading..." spinning={loading}>
            <HotDetailCats
                curCat={curCat}
                setCurCat={setcurCat}
                setLimit={setLimit}
            />

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
                                            width: DEFAULT_IMG_WIDTH,
                                            height: DEFAULT_IMG_HEIGHT,
                                            position: "relative",
                                        }}
                                    >
                                        <LazyLoad placeholder={<LoadingImg />}>
                                            <img
                                                style={{ opacity: 0.65 }}
                                                width={DEFAULT_IMG_WIDTH}
                                                height={DEFAULT_IMG_HEIGHT}
                                                alt="detail-cover"
                                                loading="lazy"
                                                src={item.coverImgUrl}
                                            />
                                        </LazyLoad>
                                        <StyledCount>
                                            <CustomerServiceOutlined />
                                            {countFormat(item.playCount)}
                                        </StyledCount>
                                        <StyledDesc width={DEFAULT_IMG_WIDTH}>
                                            <div>{`By ${item.creator.nickname}`}</div>
                                            <div>{`${dateFormat(
                                                item.updateTime
                                            )} 更新`}</div>
                                        </StyledDesc>
                                    </div>

                                    <StyledName width={DEFAULT_IMG_WIDTH}>
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
