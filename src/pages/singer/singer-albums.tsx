import React from "react";
import { Empty, Pagination, Spin, Image } from "antd";
import LazyLoad from "react-lazyload";
import StyledItem from "../../components/detail/StyledItem";
import StyledName from "../../components/detail/StyledName";
import StyledWrapper from "../../components/detail/StyledWrapper";
import LoadingImg from "../../components/LoadingImg";
import { dateFormat, notify } from "../../utils";
import { useHistory } from "react-router-dom";
import reqs from "../../api/req";
import { HotAlbum } from "./type";
import StyledDesc from "../../components/detail/StyledDesc";
import StyledCount from "../../components/detail/StyledCount";
import {
    DEFAULT_IMG_HEIGHT,
    DEFAULT_IMG_WIDTH,
} from "../../web-config/defaultConfig";
import { EMessageType } from "../enums";

interface IProps {
    singerId: number;
    albumCount: number;
}

const SingerAlbums: React.FunctionComponent<IProps> = (props: IProps) => {
    const { singerId, albumCount } = props;
    const history = useHistory();
    const [page, setPage] = React.useState<number>(1);
    const [pageSize, setPageSize] = React.useState<number>(16);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [albums, setAlbums] = React.useState<HotAlbum[]>([]);

    const getSubUsers = React.useCallback(() => {
        setLoading(true);
        reqs.netease
            .singerAlbums(singerId, pageSize, (page - 1) * pageSize)
            .then((res) => {
                setAlbums(res.hotAlbums);
            })
            .catch((e) =>
                notify(
                    EMessageType.ERROR,
                    (e.response && e.response.statusText) ||
                        e.message ||
                        "加载歌手专辑数据失败"
                )
            )
            .finally(() => setLoading(false));
    }, [page, pageSize, singerId]);

    React.useEffect(() => {
        getSubUsers();
    }, [getSubUsers, page, pageSize]);

    const pageChange = React.useCallback((page1, pageSize1) => {
        setPage(page1);
        setPageSize(pageSize1);
    }, []);

    const toDetail = React.useCallback(
        (id: number) => {
            history.push(`/album/${id}`);
        },
        [history]
    );

    return (
        <Spin tip="Loading..." spinning={loading}>
            {albums.length ? (
                <React.Fragment>
                    <StyledWrapper>
                        {albums.map((item: HotAlbum) => {
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
                                            {item.subType}
                                        </StyledCount>
                                        <StyledDesc width={DEFAULT_IMG_WIDTH}>
                                            {`${dateFormat(
                                                item.publishTime
                                            )} 发行`}
                                        </StyledDesc>
                                    </div>

                                    <StyledName width={DEFAULT_IMG_WIDTH}>
                                        {item.name}
                                    </StyledName>
                                </StyledItem>
                            );
                        })}
                    </StyledWrapper>
                    <Pagination
                        style={{ float: "right" }}
                        current={page}
                        pageSize={pageSize}
                        total={albumCount}
                        showSizeChanger={true}
                        showQuickJumper={true}
                        showTotal={(total) => `共 ${total} 条`}
                        onChange={(page, pageSize) =>
                            pageChange(page, pageSize)
                        }
                    />
                </React.Fragment>
            ) : (
                <Empty />
            )}
        </Spin>
    );
};

export default SingerAlbums;
