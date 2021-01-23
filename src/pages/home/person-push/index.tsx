import React from "react";
import { Spin } from "antd";

import req from "../../../api/req";
import { IRecomDetail } from "../type";
import StyledItem from "../../../components/detail/StyledItem";
import StyledWrapper from "../../../components/detail/StyledWrapper";
import StyledDesc from "../../../components/detail/StyledDesc";
import StyledName from "../../../components/detail/StyledName";

const PersonPush: React.FunctionComponent = () => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [personPush, setPersonPush] = React.useState<Array<IRecomDetail>>([]);

    const getPerPush = async () => {
        setLoading(true);
        let data = await req.netease.getPerPush();
        setPersonPush(data);
        setLoading(false);
    };

    React.useEffect(() => {
        getPerPush();
    }, []);

    return (
        <Spin tip="Loading..." spinning={loading}>
            <h2>《独家放送》</h2>
            <StyledWrapper>
                {personPush.map((item: IRecomDetail) => {
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
                                <StyledDesc width={360}>
                                    {item.copywriter}
                                </StyledDesc>
                            </div>

                            <StyledName width={360}>{item.name}</StyledName>
                        </StyledItem>
                    );
                })}
            </StyledWrapper>
        </Spin>
    );
};

export default PersonPush;
