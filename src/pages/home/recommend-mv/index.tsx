import React from "react";
import LazyLoad from "react-lazyload";
import { useHistory } from "react-router-dom";
import { Empty, Spin } from "antd";
import { VideoCameraOutlined } from "@ant-design/icons";

import req from "../../../api/req";
import { IRecommendMv } from "../type";
import { countFormat, notify } from "../../../utils";
import StyledItem from "../../../components/detail/StyledItem";
import StyledWrapper from "../../../components/detail/StyledWrapper";
import StyledDesc from "../../../components/detail/StyledDesc";
import StyledName from "../../../components/detail/StyledName";
import StyledCount from "../../../components/detail/StyledCount";
import LoadingImg from "../../../components/LoadingImg";
import {
    DEFAULT_MV_WIDTH,
    DEFAULT_MV_HEIGHT,
} from "../../../web-config/defaultConfig";

const RecommendMv: React.FunctionComponent = () => {
    const history = useHistory();
    const [loading, setLoading] = React.useState<boolean>(false);
    const [recommendMv, setRecommendMv] = React.useState<Array<IRecommendMv>>(
        []
    );

    const getRecommendMv = React.useCallback(() => {
        setLoading(true);
        req.netease
            .getNewMvs()
            .then((res) => {
                setRecommendMv(res.result);
            })
            .catch((e) =>
                notify(
                    "error",
                    (e.response && e.response.statusText) ||
                        e.message ||
                        "加载推荐 MV 数据失败"
                )
            )
            .finally(() => setLoading(false));
    }, []);

    React.useEffect(() => {
        getRecommendMv();
    }, [getRecommendMv]);

    const toDetail = React.useCallback(
        (id: number) => {
            history.push(`/mv/${id}`);
        },
        [history]
    );

    return (
        <Spin tip="Loading..." spinning={loading}>
            <h2>《推荐MV》</h2>
            {recommendMv.length ? (
                <StyledWrapper>
                    {recommendMv.map((item: IRecommendMv) => {
                        return (
                            <StyledItem
                                key={item.id}
                                onClick={() => toDetail(item.id)}
                            >
                                <div
                                    style={{
                                        width: DEFAULT_MV_WIDTH,
                                        height: DEFAULT_MV_HEIGHT,
                                        position: "relative",
                                    }}
                                >
                                    <LazyLoad
                                        height={DEFAULT_MV_HEIGHT}
                                        placeholder={<LoadingImg />}
                                    >
                                        <img
                                            style={{ opacity: 0.8 }}
                                            width={DEFAULT_MV_WIDTH}
                                            height={DEFAULT_MV_HEIGHT}
                                            alt="detail-cover"
                                            src={item.picUrl}
                                        />
                                    </LazyLoad>
                                    <StyledCount>
                                        <VideoCameraOutlined />
                                        {countFormat(item.playCount)}
                                    </StyledCount>
                                    <StyledDesc width={DEFAULT_MV_WIDTH}>
                                        {item.copywriter}
                                    </StyledDesc>
                                </div>

                                <StyledName width={DEFAULT_MV_WIDTH}>{item.name}</StyledName>
                            </StyledItem>
                        );
                    })}
                </StyledWrapper>
            ) : (
                <Empty />
            )}
        </Spin>
    );
};

export default RecommendMv;
