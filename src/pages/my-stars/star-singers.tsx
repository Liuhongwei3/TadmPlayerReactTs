import React from "react";
import LazyLoad from "react-lazyload";
import { useHistory } from "react-router-dom";
import { Button, Empty, Spin, Image } from "antd";
import { AppstoreOutlined, VideoCameraOutlined } from "@ant-design/icons";

import StyledItem from "../../components/detail/StyledItem";
import StyledWrapper from "../../components/detail/StyledWrapper";
import { countFormat, notify, toTop } from "../../utils";
import req from "../../api/req";
import LoadingImg from "../../components/LoadingImg";
import StyledName from "../../components/detail/StyledName";
import StyledCount from "../../components/detail/StyledCount";
import StyledDesc from "../../components/detail/StyledDesc";
import {
    DEFAULT_IMG_HEIGHT,
    DEFAULT_IMG_WIDTH,
} from "../../web-config/defaultConfig";
import { ISingersRes } from "./type";

const INIT_LIMIT = 24;

const StarSingers: React.FC = () => {
    const history = useHistory();
    const [loading, setLoading] = React.useState<boolean>(false);
    const [limit, setLimit] = React.useState<number>(INIT_LIMIT);
    const [singers, setSingers] = React.useState<ISingersRes>();

    const getTopSingers = React.useCallback(() => {
        setLoading(true);
        req.neteaseLogined
            .starSingers(limit)
            .then((res) => {
                setSingers(res);
            })
            .catch((e) =>
                notify(
                    "error",
                    (e.response && e.response.statusText) ||
                        e.message ||
                        "加载收藏的歌手数据失败"
                )
            )
            .finally(() => setLoading(false));
    }, [limit]);

    React.useEffect(() => {
        toTop();
    }, []);

    React.useEffect(() => {
        getTopSingers();
    }, [getTopSingers]);

    const toDetail = React.useCallback(
        (id: number) => {
            history.push(`/singer/${id}`);
        },
        [history]
    );

    return (
        <Spin tip="Loading..." spinning={loading}>
            {singers?.count && singers?.data.length ? (
                <React.Fragment>
                    <StyledWrapper>
                        {singers.data.map((item) => {
                            return (
                                <StyledItem
                                    key={item.id}
                                    onClick={() => toDetail(item.id)}
                                >
                                    <div
                                        style={{
                                            width: DEFAULT_IMG_WIDTH,
                                            height: DEFAULT_IMG_HEIGHT,
                                            position: "relative",
                                        }}
                                    >
                                        <LazyLoad
                                            height={100}
                                            placeholder={<LoadingImg />}
                                        >
                                            <Image
                                                alt="detail-cover"
                                                loading="lazy"
                                                style={{ opacity: 0.8 }}
                                                preview={false}
                                                width={DEFAULT_IMG_WIDTH}
                                                height={DEFAULT_IMG_HEIGHT}
                                                src={item.picUrl}
                                                placeholder={<LoadingImg />}
                                            />
                                        </LazyLoad>
                                        <StyledCount>
                                            <AppstoreOutlined />
                                            {countFormat(item.albumSize)}
                                        </StyledCount>
                                        <StyledDesc width={DEFAULT_IMG_WIDTH}>
                                            <VideoCameraOutlined />
                                            {item.mvSize}
                                        </StyledDesc>
                                    </div>

                                    <StyledName width={DEFAULT_IMG_WIDTH}>
                                        {item.name}
                                    </StyledName>
                                </StyledItem>
                            );
                        })}
                    </StyledWrapper>
                    <Button
                        style={{ margin: "0 auto", display: "flex" }}
                        type="primary"
                        disabled={!singers.hasMore}
                        loading={loading}
                        onClick={() => setLimit(limit + 16)}
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

export default StarSingers;
