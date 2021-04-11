import React from "react";
import LazyLoad from "react-lazyload";
import { useHistory } from "react-router-dom";
import { Button, Empty, Spin, Image } from "antd";
import { VideoCameraOutlined } from "@ant-design/icons";

import StyledItem from "../../components/detail/StyledItem";
import StyledWrapper from "../../components/detail/StyledWrapper";
import { countFormat, notify, toTop } from "../../utils";
import req from "../../api/req";
import LoadingImg from "../../components/LoadingImg";
import StyledName from "../../components/detail/StyledName";
import StyledCount from "../../components/detail/StyledCount";
import StyledDesc from "../../components/detail/StyledDesc";
import {
    DEFAULT_MV_SMALL_HEIGHT,
    DEFAULT_MV_SMALL_WIDTH,
} from "../../web-config/defaultConfig";
import { IMvsRes } from "./type";

const INIT_LIMIT = 24;

const StarMvs: React.FC = () => {
    const history = useHistory();
    const [loading, setLoading] = React.useState<boolean>(false);
    const [limit, setLimit] = React.useState<number>(INIT_LIMIT);
    const [mvRes, setMvRes] = React.useState<IMvsRes>();

    const getTopMvs = React.useCallback(() => {
        setLoading(true);
        req.neteaseLogined
            .starMvs(limit)
            .then((res) => {
                setMvRes(res);
            })
            .catch((e) =>
                notify(
                    "error",
                    (e.response && e.response.statusText) ||
                        e.message ||
                        "加载收藏的 MV 数据失败"
                )
            )
            .finally(() => setLoading(false));
    }, [limit]);

    React.useEffect(() => {
        toTop();
    }, []);

    React.useEffect(() => {
        getTopMvs();
    }, [getTopMvs]);

    const toDetail = React.useCallback(
        (id: number | string) => {
            history.push(`/mv/${id}`);
        },
        [history]
    );

    return (
        <Spin tip="Loading..." spinning={loading}>
            {mvRes?.data && mvRes?.data.length ? (
                <React.Fragment>
                    <StyledWrapper>
                        {mvRes?.data.map((item) => {
                            return (
                                <StyledItem
                                    key={item.vid}
                                    onClick={() => toDetail(item.vid)}
                                >
                                    <div
                                        style={{
                                            width: DEFAULT_MV_SMALL_WIDTH,
                                            height: DEFAULT_MV_SMALL_HEIGHT,
                                            position: "relative",
                                        }}
                                    >
                                        <LazyLoad
                                            height={DEFAULT_MV_SMALL_WIDTH}
                                            placeholder={<LoadingImg />}
                                        >
                                            <Image
                                                alt="mv-cover"
                                                loading="lazy"
                                                style={{ opacity: 0.8 }}
                                                preview={false}
                                                width={DEFAULT_MV_SMALL_WIDTH}
                                                height={DEFAULT_MV_SMALL_HEIGHT}
                                                src={item.coverUrl}
                                                placeholder={<LoadingImg />}
                                            />
                                        </LazyLoad>
                                        <StyledCount>
                                            <VideoCameraOutlined />
                                            {countFormat(item.playTime)}
                                        </StyledCount>
                                        <StyledDesc
                                            width={DEFAULT_MV_SMALL_WIDTH}
                                        >
                                            <span>By </span>
                                            {item.creator.map((artist) => {
                                                return item.creator.length ===
                                                    1 ? (
                                                    <span key={artist.userId}>
                                                        {artist.userName}
                                                    </span>
                                                ) : (
                                                    <span key={artist.userId}>
                                                        {`${artist.userName} / `}
                                                    </span>
                                                );
                                            })}
                                        </StyledDesc>
                                    </div>

                                    <StyledName width={DEFAULT_MV_SMALL_WIDTH}>
                                        {item.title}
                                    </StyledName>
                                </StyledItem>
                            );
                        })}
                    </StyledWrapper>
                    <Button
                        style={{ margin: "0 auto", display: "flex" }}
                        type="primary"
                        disabled={!mvRes.hasMore}
                        loading={loading}
                        onClick={() => setLimit(limit + 12)}
                    >
                        Loading More
                    </Button>
                </React.Fragment>
            ) : (
                <Empty />
            )}
        </Spin>
    );
};

export default StarMvs;
