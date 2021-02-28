import React from "react";
import LazyLoad from "react-lazyload";
import { useHistory } from "react-router-dom";
import { Empty, Spin } from "antd";

import req from "../../../api/req";
import { IPersonPush } from "../type";
import StyledItem from "../../../components/detail/StyledItem";
import StyledWrapper from "../../../components/detail/StyledWrapper";
import StyledDesc from "../../../components/detail/StyledDesc";
import StyledName from "../../../components/detail/StyledName";
import LoadingImg from "../../../components/LoadingImg";
import { notify } from "../../../utils";
import { DEFAULT_MV_HEIGHT, DEFAULT_MV_WIDTH } from "../../../web-config/defaultConfig";

const PersonPush: React.FunctionComponent = () => {
    const history = useHistory();
    const [loading, setLoading] = React.useState<boolean>(false);
    const [personPush, setPersonPush] = React.useState<Array<IPersonPush>>([]);

    const getPerPush = React.useCallback(() => {
        setLoading(true);
        req.netease
            .getPerPush()
            .then((res) => {
                setPersonPush(res.result);
            })
            .catch((e) =>
                notify(
                    "error",
                    (e.response && e.response.statusText) ||
                        e.message ||
                        "加载独家放送失败"
                )
            )
            .finally(() => setLoading(false));
    }, []);

    React.useEffect(() => {
        getPerPush();
    }, [getPerPush]);

    const toDetail = React.useCallback(
        (id: number) => {
            history.push(`/mv/${id}`);
        },
        [history]
    );

    return (
        <Spin tip="Loading..." spinning={loading}>
            <h2>《独家放送》</h2>
            {personPush.length ? (
                <StyledWrapper>
                    {personPush.map((item: IPersonPush) => {
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
                                    <StyledDesc width={DEFAULT_MV_WIDTH}>
                                        {item.copywriter}
                                    </StyledDesc>
                                </div>

                                <StyledName width={DEFAULT_MV_WIDTH}>
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
};

export default PersonPush;
