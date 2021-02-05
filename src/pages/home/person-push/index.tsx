import React from "react";
import { Empty, Spin } from "antd";

import req from "../../../api/req";
import { IPersonPush } from "../type";
import StyledItem from "../../../components/detail/StyledItem";
import StyledWrapper from "../../../components/detail/StyledWrapper";
import StyledDesc from "../../../components/detail/StyledDesc";
import StyledName from "../../../components/detail/StyledName";
import LazyLoad from "react-lazyload";
import LoadingImg from "../../../components/LoadingImg";

const PersonPush: React.FunctionComponent = () => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [personPush, setPersonPush] = React.useState<Array<IPersonPush>>([]);

    const getPerPush = React.useCallback(async () => {
        setLoading(true);
        let data = await req.netease.getPerPush();
        setPersonPush(data.result);
        setLoading(false);
    }, []);

    React.useEffect(() => {
        getPerPush();
    }, [getPerPush]);

    return (
        <Spin tip="Loading..." spinning={loading}>
            <h2>《独家放送》</h2>
            {personPush.length ? (
                <StyledWrapper>
                    {personPush.map((item: IPersonPush) => {
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
                                        height={150}
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
                                    <StyledDesc width={320}>
                                        {item.copywriter}
                                    </StyledDesc>
                                </div>

                                <StyledName width={320}>{item.name}</StyledName>
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

export default PersonPush;
