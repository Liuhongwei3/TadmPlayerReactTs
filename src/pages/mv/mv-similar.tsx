import React from "react";
import LazyLoad from "react-lazyload";
import { useHistory } from "react-router-dom";
import { Empty, Spin } from "antd";
import { VideoCameraOutlined, FieldTimeOutlined } from "@ant-design/icons";

import StyledDesc from "../../components/detail/StyledDesc";
import StyledItem from "../../components/detail/StyledItem";
import StyledName from "../../components/detail/StyledName";
import StyledWrapper from "../../components/detail/StyledWrapper";
import LoadingImg from "../../components/LoadingImg";
import reqs from "../../api/req";
import { countFormat, notify, timeFormat } from "../../utils";
import { Mv } from "./type";
import StyledCount from "../../components/detail/StyledCount";
import {
    DEFAULT_MV_SMALL_HEIGHT,
    DEFAULT_MV_SMALL_WIDTH,
} from "../../defaultConfig";

interface IProps {
    mvId: number;
}

const MvSimilar: React.FunctionComponent<IProps> = (props: IProps) => {
    const { mvId } = props;
    const history = useHistory();
    const [loading, setLoading] = React.useState<boolean>(false);
    const [similarMvs, setSimilarMvs] = React.useState<Mv[]>([]);

    const getSimilarMvs = React.useCallback(() => {
        setLoading(true);
        reqs.netease
            .simiMv(+mvId)
            .then((res) => {
                setSimilarMvs(res.mvs);
            })
            .catch((e) =>
                notify(
                    "error",
                    (e.response && e.response.statusText) ||
                        e.message ||
                        "加载相似 MV 数据失败"
                )
            )
            .finally(() => setLoading(false));
    }, [mvId]);

    React.useEffect(() => {
        getSimilarMvs();
    }, [getSimilarMvs]);

    const toDetail = React.useCallback(
        (id: number) => {
            history.push(`/mv/${id}`);
        },
        [history]
    );

    return (
        <Spin tip="Loading..." spinning={loading}>
            {similarMvs.length ? (
                <React.Fragment>
                    <StyledWrapper>
                        {similarMvs.map((item: Mv) => {
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
                                            <img
                                                style={{ opacity: 0.85 }}
                                                width={DEFAULT_MV_SMALL_WIDTH}
                                                height={DEFAULT_MV_SMALL_HEIGHT}
                                                alt="detail-cover"
                                                src={item.cover}
                                            />
                                        </LazyLoad>
                                        <StyledCount>
                                            <VideoCameraOutlined />
                                            {countFormat(item.playCount)}
                                        </StyledCount>
                                        <StyledDesc
                                            width={DEFAULT_MV_SMALL_WIDTH}
                                        >
                                            <FieldTimeOutlined />
                                            {timeFormat(
                                                Math.floor(item.duration / 1000)
                                            )}
                                        </StyledDesc>
                                    </div>

                                    <StyledName width={DEFAULT_MV_SMALL_WIDTH}>
                                        {item.name}
                                    </StyledName>
                                </StyledItem>
                            );
                        })}
                    </StyledWrapper>
                </React.Fragment>
            ) : (
                <Empty />
            )}
        </Spin>
    );
};

export default MvSimilar;
