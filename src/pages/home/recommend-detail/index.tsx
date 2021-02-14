import React from "react";
import { Empty, Spin } from "antd";
import { CustomerServiceOutlined } from "@ant-design/icons";

import req from "../../../api/req";
import { IRecomDetail } from "../type";
import { countFormat, notify, updateCurMenu } from "../../../utils";
import StyledCount from "../../../components/detail/StyledCount";
import StyledItem from "../../../components/detail/StyledItem";
import StyledWrapper from "../../../components/detail/StyledWrapper";
import StyledDesc from "../../../components/detail/StyledDesc";
import StyledName from "../../../components/detail/StyledName";
import LazyLoad from "react-lazyload";
import LoadingImg from "../../../components/LoadingImg";
import { useHistory } from "react-router-dom";

const RecommendDetail: React.FunctionComponent = () => {
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
                    "error",
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
            updateCurMenu();
        },
        [history]
    );

    return (
        <Spin tip="Loading..." spinning={loading}>
            <h2>《推荐歌单》</h2>
            {recomDetails.length ? (
                <StyledWrapper>
                    {recomDetails.map((item: IRecomDetail) => {
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
                                    <LazyLoad
                                        height={150}
                                        placeholder={<LoadingImg />}
                                    >
                                        <img
                                            style={{ opacity: 0.65 }}
                                            width={150}
                                            height={150}
                                            alt="detail-cover"
                                            src={item.picUrl}
                                        />
                                    </LazyLoad>

                                    <StyledCount>
                                        <CustomerServiceOutlined
                                            style={{ marginRight: 5 }}
                                        />
                                        {countFormat(item.playCount)}
                                    </StyledCount>
                                    <StyledDesc width={150}>
                                        {item.copywriter}
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
        </Spin>
    );
};

export default RecommendDetail;
