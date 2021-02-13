import React from "react";
import { Empty, Pagination, Spin } from "antd";
import LazyLoad from "react-lazyload";
import StyledDesc from "../../components/detail/StyledDesc";
import StyledItem from "../../components/detail/StyledItem";
import StyledName from "../../components/detail/StyledName";
import StyledWrapper from "../../components/detail/StyledWrapper";
import LoadingImg from "../../components/LoadingImg";
import { notify, updateCurMenu } from "../../utils";
import { useHistory } from "react-router-dom";
import reqs from "../../api/req";
import { HotAlbum } from "./type";

interface IProps {
    singerId: number;
    albumCount: number;
}

const SingerAlbums: React.FunctionComponent<IProps> = (props: IProps) => {
    const { singerId, albumCount } = props;
    const history = useHistory();
    const [page, setPage] = React.useState<number>(1);
    const [pageSize, setPageSize] = React.useState<number>(24);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [albums, setAlbums] = React.useState<HotAlbum[]>([]);

    const getSubUsers = React.useCallback(() => {
        setLoading(true);
        reqs.netease
            .singerAlbums(singerId, pageSize, (page - 1) * pageSize)
            .then((res) => {
                setAlbums(res.hotAlbums);
            })
            .catch((e) => notify("error", e))
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
            updateCurMenu();
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
                                            width: 150,
                                            height: 150,
                                            position: "relative",
                                        }}
                                    >
                                        <LazyLoad
                                            height={100}
                                            placeholder={<LoadingImg />}
                                        >
                                            <img
                                                style={{ opacity: 0.85 }}
                                                width={150}
                                                height={150}
                                                alt="detail-cover"
                                                src={item.picUrl}
                                            />
                                        </LazyLoad>
                                    </div>

                                    <StyledName width={150}>
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
