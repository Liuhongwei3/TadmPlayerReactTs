import React from "react";
import { Spin } from "antd";

import req from "../../../api/req";
import { IRecomDetail } from "../type";
import { countFormat } from "../../../utils";
import StyledItem from "../../../components/detail/StyledItem";
import StyledWrapper from "../../../components/detail/StyledWrapper";
import StyledDesc from "../../../components/detail/StyledDesc";
import StyledName from "../../../components/detail/StyledName";
import StyledCount from "../../../components/detail/StyledCount";
import LazyLoad from "react-lazyload";
import LoadingImg from "../../../components/LoadingImg";

const RecommendMv: React.FunctionComponent = () => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [recommendMv, setRecommendMv] = React.useState<Array<IRecomDetail>>(
        []
    );

    const getRecommendMv = async () => {
        setLoading(true);
        let data = await req.netease.getNewMvs();
        setRecommendMv(data);
        setLoading(false);
    };

    React.useEffect(() => {
        getRecommendMv();
    }, []);

    return (
        <Spin tip="Loading..." spinning={loading}>
            <h2>《推荐MV》</h2>
            <StyledWrapper>
                {recommendMv.map((item: IRecomDetail) => {
                    return (
                        <StyledItem key={item.id}>
                            <div
                                style={{
                                    width: 320,
                                    height: 200,
                                    position: "relative",
                                }}
                            >
                                <LazyLoad
                                    height={200}
                                    placeholder={<LoadingImg />}
                                >
                                    <img
                                        style={{ opacity: 0.65 }}
                                        width={320}
                                        height={200}
                                        alt="detail-cover"
                                        src={item.picUrl}
                                    />
                                </LazyLoad>
                                <StyledCount>
                                    {countFormat(item.playCount)}
                                </StyledCount>
                                <StyledDesc width={320}>
                                    {item.copywriter}
                                </StyledDesc>
                            </div>

                            <StyledName width={320}>{item.name}</StyledName>
                        </StyledItem>
                    );
                })}
            </StyledWrapper>
        </Spin>
    );
};

export default RecommendMv;
