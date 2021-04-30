import React from "react";
import LazyLoad from "react-lazyload";
import { useHistory } from "react-router-dom";
import { Button, Empty, Spin, Image } from "antd";
import { BarsOutlined } from "@ant-design/icons";

import StyledItem from "../../components/detail/StyledItem";
import StyledWrapper from "../../components/detail/StyledWrapper";
import { dateFormat, notify, toTop } from "../../utils";
import req from "../../api/req";
import LoadingImg from "../../components/LoadingImg";
import StyledName from "../../components/detail/StyledName";
import StyledCount from "../../components/detail/StyledCount";
import StyledDesc from "../../components/detail/StyledDesc";
import {
    DEFAULT_IMG_HEIGHT,
    DEFAULT_IMG_WIDTH,
} from "../../web-config/defaultConfig";
import { IAlbumsRes } from "./type";
import { EMessageType } from "../enums";

const INIT_LIMIT = 24;

const StarAlbums: React.FC = () => {
    const history = useHistory();
    const [loading, setLoading] = React.useState<boolean>(false);
    const [limit, setLimit] = React.useState<number>(INIT_LIMIT);
    const [albums, setAlbums] = React.useState<IAlbumsRes>();

    const getSubUsers = React.useCallback(() => {
        setLoading(true);
        req.neteaseLogined
            .starAlbums(limit)
            .then((res) => {
                setAlbums(res);
            })
            .catch((e) =>
                notify(
                    EMessageType.ERROR,
                    (e.response && e.response.statusText) ||
                        e.message ||
                        "加载收藏的专辑数据失败"
                )
            )
            .finally(() => setLoading(false));
    }, [limit]);

    React.useEffect(() => {
        toTop();
    }, []);

    React.useEffect(() => {
        getSubUsers();
    }, [getSubUsers]);

    const toDetail = React.useCallback(
        (id: number) => {
            history.push(`/album/${id}`);
        },
        [history]
    );

    return (
        <Spin tip="Loading..." spinning={loading}>
            {albums && albums.data.length ? (
                <React.Fragment>
                    <StyledWrapper>
                        {albums.data.map((item) => {
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
                                                alt="album-cover"
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
                                            <BarsOutlined />
                                            {item.size}
                                        </StyledCount>
                                        <StyledDesc width={DEFAULT_IMG_WIDTH}>
                                            {`${dateFormat(item.subTime)} 收藏`}
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
                        disabled={!albums.hasMore}
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

export default StarAlbums;
