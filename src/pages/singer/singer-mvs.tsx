import React from "react";
import LazyLoad from "react-lazyload";
import { useHistory } from "react-router-dom";
import { Empty, Pagination, Spin } from "antd";
import { VideoCameraOutlined, FieldTimeOutlined } from "@ant-design/icons";
import StyledDesc from "../../components/detail/StyledDesc";
import StyledItem from "../../components/detail/StyledItem";
import StyledName from "../../components/detail/StyledName";
import StyledCount from "../../components/detail/StyledCount";
import StyledWrapper from "../../components/detail/StyledWrapper";
import LoadingImg from "../../components/LoadingImg";
import { countFormat, notify, timeFormat } from "../../utils";
import reqs from "../../api/req";
import { Mv } from "./type";
import {
    DEFAULT_MV_SMALL_HEIGHT,
    DEFAULT_MV_SMALL_WIDTH,
} from "../../web-config/defaultConfig";

interface IProps {
    singerId: number;
    mvCount: number;
}

const SingerMvs: React.FunctionComponent<IProps> = (props: IProps) => {
    const { singerId, mvCount } = props;
    const history = useHistory();
    const [page, setPage] = React.useState<number>(1);
    const [pageSize, setPageSize] = React.useState<number>(18);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [mvs, setMvs] = React.useState<Mv[]>([]);

    const getSubUsers = React.useCallback(() => {
        setLoading(true);
        reqs.netease
            .singerMvs(singerId, pageSize, (page - 1) * pageSize)
            .then((res) => {
                setMvs(res.mvs);
            })
            .catch((e) =>
                notify(
                    "error",
                    (e.response && e.response.statusText) ||
                        e.message ||
                        "加载歌手 MV 数据失败"
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
            history.push(`/mv/${id}`);
        },
        [history]
    );

    return (
        <Spin tip="Loading..." spinning={loading}>
            {mvs.length ? (
                <React.Fragment>
                    <StyledWrapper>
                        {mvs
                            .sort((a, b) => b.playCount - a.playCount)
                            .map((item: Mv) => {
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
                                                    style={{ opacity: 0.75 }}
                                                    width={
                                                        DEFAULT_MV_SMALL_WIDTH
                                                    }
                                                    height={
                                                        DEFAULT_MV_SMALL_HEIGHT
                                                    }
                                                    alt="detail-cover"
                                                    src={item.imgurl}
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
                                                    Math.floor(
                                                        item.duration / 1000
                                                    )
                                                )}
                                            </StyledDesc>
                                        </div>

                                        <StyledName
                                            width={DEFAULT_MV_SMALL_WIDTH}
                                        >
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
                        total={mvCount}
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

export default SingerMvs;
