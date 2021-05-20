import React from "react";
import LazyLoad from "react-lazyload";
import { useHistory } from "react-router-dom";
import { Empty, Spin, Image } from "antd";
import { VideoCameraOutlined } from "@ant-design/icons";

import req from "../../../api/req";
import { INewMv } from "../type";
import { countFormat, notify } from "../../../utils";
import StyledItem from "../../../components/detail/StyledItem";
import StyledWrapper from "../../../components/detail/StyledWrapper";
import StyledDesc from "../../../components/detail/StyledDesc";
import StyledName from "../../../components/detail/StyledName";
import StyledCount from "../../../components/detail/StyledCount";
import LoadingImg from "../../../components/LoadingImg";
import {
    DEFAULT_MV_SMALL_WIDTH,
    DEFAULT_MV_SMALL_HEIGHT,
} from "../../../web-config/defaultConfig";
import { EMessageType } from "../../enums";

const NewMv: React.FC = () => {
    const history = useHistory();
    const [loading, setLoading] = React.useState<boolean>(false);
    const [recommendMv, setRecommendMv] = React.useState<INewMv[]>([]);

    const getRecommendMv = React.useCallback(() => {
        setLoading(true);
        req.netease
            .getNewMvs()
            .then((res) => {
                setRecommendMv(res.data);
            })
            .catch((e) =>
                notify(
                    EMessageType.ERROR,
                    (e.response && e.response.statusText) ||
                        e.message ||
                        "加载最新 MV 数据失败"
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
            <h2>《最新 MV》</h2>
            {recommendMv.length ? (
                <StyledWrapper>
                    {recommendMv.map((item) => {
                        return (
                            <StyledItem
                                key={item.id}
                                onClick={() => toDetail(item.id)}
                            >
                                <div
                                    style={{
                                        width: DEFAULT_MV_SMALL_WIDTH,
                                        height: DEFAULT_MV_SMALL_HEIGHT,
                                        position: "relative",
                                    }}
                                >
                                    <LazyLoad
                                        height={DEFAULT_MV_SMALL_HEIGHT}
                                        placeholder={<LoadingImg />}
                                    >
                                        <Image
                                            alt="detail-cover"
                                            loading="lazy"
                                            style={{ opacity: 0.8 }}
                                            preview={false}
                                            width={DEFAULT_MV_SMALL_WIDTH}
                                            height={DEFAULT_MV_SMALL_HEIGHT}
                                            src={item.cover}
                                            placeholder={<LoadingImg />}
                                        />
                                    </LazyLoad>
                                    <StyledCount>
                                        <VideoCameraOutlined />
                                        {countFormat(item.playCount)}
                                    </StyledCount>
                                    <StyledDesc width={DEFAULT_MV_SMALL_WIDTH}>
                                        {item.briefDesc}
                                    </StyledDesc>
                                </div>

                                <StyledName width={DEFAULT_MV_SMALL_WIDTH}>
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

export default NewMv;
