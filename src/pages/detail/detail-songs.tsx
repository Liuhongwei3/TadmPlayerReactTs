import React from "react";
import { Avatar, Table, Image, Typography, Popconfirm } from "antd";
import { ISong, ITrackId } from "./type";
import req from "../../api/req";
import { dateFormat, notify, timeFormat, toTop, unique } from "../../utils";
import { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazyload";
import LoadingImg from "../../components/LoadingImg";
import StyledDivider from "../../components/StyledDivider";
import { EDetailSongOprType } from "../enums";
import openAddSongToDetailDialog from "./add-song-to-detail-dialog";
import { useStore } from "../../hooks/useStore";

interface IProps {
    isOwnDetail: boolean;
    detailId: number;
    trackIds: ITrackId[];
    songCount: number;
    getDetails: (force: boolean) => void;
    dailySongs?: ISong[];
}

const DetailSongs: React.FunctionComponent<IProps> = (props: IProps) => {
    const store = useStore();
    const {
        isOwnDetail,
        detailId,
        trackIds,
        songCount,
        dailySongs,
        getDetails,
    } = props;
    const [loading, setLoading] = React.useState<boolean>(false);
    const [page, setPage] = React.useState<number>(1);
    const [pageSize, setPageSize] = React.useState<number>(10);
    const [songs, setSongs] = React.useState<ISong[]>([]);

    const getSongsDetail = React.useCallback(() => {
        if (!trackIds || trackIds.length === 0) {
            notify("warning", "该歌单暂无歌曲");
            return;
        }

        setLoading(true);
        req.netease
            .getMusicDetail(
                unique(
                    trackIds.slice(
                        page === 1 ? 0 : (page - 1) * pageSize,
                        page * pageSize
                    )
                ).map((trackId) => trackId.id)
            )
            .then((res) => {
                setSongs(
                    res.songs.map((item, index) => {
                        return {
                            ...item,
                            index: (page - 1) * pageSize + index + 1,
                        };
                    })
                );
            })
            .catch((e) => {
                notify(
                    "error",
                    (e.response && e.response.statusText) ||
                        e.message ||
                        "获取歌曲详情数据失败"
                );
            })
            .finally(() => {
                setLoading(false);
            });
    }, [trackIds, page, pageSize]);

    React.useEffect(() => {
        if (dailySongs) {
            setSongs(
                dailySongs.map((item, index) => {
                    return { ...item, index: index + 1 };
                })
            );
        } else {
            getSongsDetail();
        }
    }, [getSongsDetail, dailySongs]);

    const pageChange = React.useCallback((page1, pageSize1) => {
        setPage(page1);
        setPageSize(pageSize1);
        toTop();
    }, []);

    const handleDeleteSongFromDetail = React.useCallback(
        (op: EDetailSongOprType, track: number) => {
            req.neteaseLogined
                .addDeleteSongFromDetail(op, detailId, [track])
                .then((res) => {
                    notify("success", "删除歌曲成功");
                    getDetails(true);
                })
                .catch((e) => {
                    notify("error", e.message || "删除歌曲失败");
                });
        },
        [detailId, getDetails]
    );

    const handleAddSongFromDetail = React.useCallback(
        (op: EDetailSongOprType, track: number) => {
            openAddSongToDetailDialog(op, track);
        },
        []
    );

    const columns: ColumnsType<ISong> = [
        {
            title: "序号",
            dataIndex: "index",
            key: "index",
            width: "6%",
        },
        {
            title: "封面",
            key: "picUrl",
            width: "8%",
            render: (data: ISong) => (
                <Avatar
                    src={
                        <LazyLoad height={32} placeholder={<LoadingImg />}>
                            <Image
                                alt="detail-cover"
                                loading="lazy"
                                src={data.al.picUrl}
                                placeholder={<LoadingImg />}
                            />
                        </LazyLoad>
                    }
                />
            ),
        },
        {
            title: "音乐标题",
            dataIndex: "name",
            key: "name",
            width: "15%",
        },
        {
            title: "歌手",
            key: "singer",
            width: "20%",
            render: (data: ISong) => {
                return data.ar.length === 1 ? (
                    <Link key={data.ar[0].id} to={`/singer/${data.ar[0].id}`}>
                        {data.ar[0].name}
                    </Link>
                ) : (
                    data.ar.map((ar) => (
                        <Link
                            key={`${ar.id}${ar.name}`}
                            to={`/singer/${ar.id}`}
                        >
                            {ar.name} /
                        </Link>
                    ))
                );
            },
        },
        {
            title: "专辑",
            key: "album",
            width: "10%",
            render: (data: ISong) => (
                <Link to={`/album/${data.al.id}`}>{data.al.name}</Link>
            ),
        },
        {
            title: "时长",
            key: "dt",
            width: "8%",
            render: (data: ISong) => (
                <div>{timeFormat(Math.floor(data.dt / 1000))}</div>
            ),
        },
        {
            title: "MV",
            key: "mv",
            width: "10%",
            render: (data: ISong) =>
                data.mv ? <Link to={`/mv/${data.mv}`}>去欣赏</Link> : null,
        },
        {
            title: "发行日期",
            key: "publishTime",
            width: "15%",
            render: (data: ISong) => <div>{dateFormat(data.publishTime)}</div>,
        },
        {
            title: "操作",
            key: "operation",
            width: "10%",
            render: (data: ISong) =>
                isOwnDetail ? (
                    <Popconfirm
                        title="确定要从该歌单删除该歌曲吗？"
                        okText="是的"
                        cancelText="否"
                        placement="topRight"
                        onConfirm={() =>
                            handleDeleteSongFromDetail(
                                EDetailSongOprType.DELETE,
                                data.id
                            )
                        }
                    >
                        <Typography.Link>删除</Typography.Link>
                    </Popconfirm>
                ) : (
                    <Typography.Link
                        onClick={() =>
                            handleAddSongFromDetail(
                                EDetailSongOprType.ADD,
                                data.id
                            )
                        }
                    >
                        收藏
                    </Typography.Link>
                ),
        },
    ];

    return (
        <React.Fragment>
            {dailySongs && (
                <>
                    <Typography.Title
                        level={4}
                        style={{ color: "#dcdcdc", paddingTop: 10 }}
                    >
                        《今日推荐歌曲》
                    </Typography.Title>
                    <StyledDivider />
                </>
            )}

            <Table<ISong>
                rowKey="id"
                bordered={false}
                scroll={{ x: true }}
                columns={columns}
                loading={loading}
                dataSource={songs}
                pagination={{
                    showQuickJumper: true,
                    total: songCount,
                    current: page,
                    pageSize,
                    onChange: (page, pageSize) => pageChange(page, pageSize),
                    showTotal: (total) => `共 ${total} 条`,
                }}
                onRow={(record) => {
                    return {
                        onDoubleClick: (event) => {
                            store.updateCurSongId(record.id);
                            store.updateCurSong(record);
                        },
                        onContextMenu: (event) => {},
                    };
                }}
            />
        </React.Fragment>
    );
};
export default DetailSongs;
