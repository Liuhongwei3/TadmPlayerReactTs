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

const RecommendMv: React.FunctionComponent = () => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [recommendMv, setRecommendMv] = React.useState<Array<IRecomDetail>>([]);

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
                                    width: 360,
                                    height: 200,
                                    position: "relative",
                                }}
                            >
                                <img
                                    style={{ opacity: 0.65 }}
                                    width={360}
                                    height={200}
                                    alt="detail-cover"
                                    src={item.picUrl}
                                />
                                <StyledCount>{countFormat(item.playCount)}</StyledCount>
                                <StyledDesc width={360}>
                                    {item.copywriter}
                                </StyledDesc>
                            </div>

                            <StyledName width={300}>{item.name}</StyledName>
                        </StyledItem>
                    );
                })}
            </StyledWrapper>
        </Spin>
    );
};

export default RecommendMv;
