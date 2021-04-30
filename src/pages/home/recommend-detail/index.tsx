import React from "react";
import { useHistory } from "react-router-dom";
import LazyLoad from "react-lazyload";
import { observer } from "mobx-react-lite";
import { Empty, Spin, Image } from "antd";
import { CustomerServiceOutlined, CalendarOutlined } from "@ant-design/icons";

import req from "../../../api/req";
import { IRecomDetail } from "../type";
import { countFormat, getCurDay, notify } from "../../../utils";
import StyledCount from "../../../components/detail/StyledCount";
import StyledItem from "../../../components/detail/StyledItem";
import StyledWrapper from "../../../components/detail/StyledWrapper";
import StyledDesc from "../../../components/detail/StyledDesc";
import StyledName from "../../../components/detail/StyledName";
import LoadingImg from "../../../components/LoadingImg";
import {
    DEFAULT_IMG_HEIGHT,
    DEFAULT_IMG_WIDTH,
    RECOMMEND_DAY_ID,
} from "../../../web-config/defaultConfig";
import { useStore } from "../../../hooks/useStore";
import { EMessageType } from "../../enums";

const RecommendDetail: React.FunctionComponent = observer(() => {
    const store = useStore();
    const history = useHistory();
    const [loading, setLoading] = React.useState<boolean>(false);
    const [recomDetails, setRecomDetails] = React.useState<Array<IRecomDetail>>(
        []
    );

    const getRecomDetails = React.useCallback(() => {
        setLoading(true);
        req.netease
            .getRecomDetails()
            .then((res) => {
                setRecomDetails(res.result);
            })
            .catch((e) =>
                notify(
                    EMessageType.ERROR,
                    (e.response && e.response.statusText) ||
                        e.message ||
                        "加载推荐歌单数据失败"
                )
            )
            .finally(() => setLoading(false));
    }, []);

    React.useEffect(() => {
        getRecomDetails();
    }, [getRecomDetails]);

    const toDetail = React.useCallback(
        (id: number) => {
            history.push(`/detail/${id}`);
        },
        [history]
    );

    return (
        <Spin tip="Loading..." spinning={loading}>
            <h2>《推荐歌单》</h2>

            {recomDetails.length ? (
                <StyledWrapper>
                    {store.userInfo.userId ? (
                        <StyledItem onClick={() => toDetail(RECOMMEND_DAY_ID)}>
                            <div
                                style={{
                                    width: DEFAULT_IMG_WIDTH,
                                    height: DEFAULT_IMG_HEIGHT,
                                    position: "relative",
                                    display: "flex",
                                    justifyContent: "center",
                                    background: "#e2973a8c",
                                }}
                            >
                                <CalendarOutlined style={{ fontSize: 80 }} />
                                <span
                                    style={{
                                        position: "absolute",
                                        fontSize: 24,
                                        top: 34,
                                        left: 62,
                                    }}
                                >
                                    {getCurDay()}
                                </span>
                                <StyledDesc width={DEFAULT_IMG_WIDTH}>
                                    根据你的口味生成，每天6:00更新
                                </StyledDesc>
                            </div>

                            <StyledName width={DEFAULT_IMG_WIDTH}>
                                每日歌曲推荐
                            </StyledName>
                        </StyledItem>
                    ) : null}

                    {recomDetails.map((item: IRecomDetail) => {
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
                                    <LazyLoad
                                        height={DEFAULT_IMG_HEIGHT}
                                        placeholder={<LoadingImg />}
                                    >
                                        <Image
                                            alt="detail-cover"
                                            loading="lazy"
                                            style={{ opacity: 0.8 }}
                                            preview={false}
                                            width={DEFAULT_IMG_WIDTH}
                                            height={DEFAULT_IMG_HEIGHT}
                                            src={item.picUrl}
                                            placeholder={<LoadingImg />}
                                        />
                                    </LazyLoad>

                                    <StyledCount>
                                        <CustomerServiceOutlined />
                                        {countFormat(item.playCount)}
                                    </StyledCount>
                                    <StyledDesc width={DEFAULT_IMG_WIDTH}>
                                        {item.copywriter}
                                    </StyledDesc>
                                </div>

                                <StyledName width={DEFAULT_IMG_WIDTH}>
                                    {item.name}
                                </StyledName>
                            </StyledItem>
                        );
                    })}
                </StyledWrapper>
            ) : (
                <Empty />
            )}
        </Spin>
    );
});

export default RecommendDetail;
