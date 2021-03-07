import React from "react";
import { Link } from "react-router-dom";
import { Table, Typography } from "antd";
import { ColumnsType } from "antd/es/table";

import req from "../../api/req";
import { notify, timeFormat, toTop } from "../../utils";
import { ISong } from "./type";
import { EOrderType } from "../enums";

interface IProps {
    singerId: number;
}

const SingerSongs: React.FunctionComponent<IProps> = (props: IProps) => {
    const { singerId } = props;
    const [loading, setLoading] = React.useState<boolean>(false);
    const [page, setPage] = React.useState<number>(1);
    const [pageSize, setPageSize] = React.useState<number>(10);
    const [total, setTotal] = React.useState<number>(0);
    const [songs, setSongs] = React.useState<ISong[]>([]);

    const getSongsDetail = React.useCallback(() => {
        setLoading(true);
        req.netease
            .singerSongs(
                singerId,
                pageSize,
                (page - 1) * pageSize,
                EOrderType.HOT
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
                setTotal(res.total);
            })
            .catch((e) => {
                notify(
                    "error",
                    (e.response && e.response.statusText) ||
                        e.message ||
                        "加载歌手全部歌曲数据失败"
                );
            })
            .finally(() => {
                setLoading(false);
            });
    }, [singerId, page, pageSize]);
    React.useEffect(() => {
        getSongsDetail();
    }, [getSongsDetail]);

    const pageChange = React.useCallback((page1, pageSize1) => {
        setPage(page1);
        setPageSize(pageSize1);
        toTop();
    }, []);

    const columns: ColumnsType<ISong> = [
        {
            title: "序号",
            dataIndex: "index",
            key: "index",
            width: "6%",
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
                    <Typography.Link>{data.ar[0].name}</Typography.Link>
                ) : (
                    data.ar.map((ar) => (
                        <Link key={ar.id} to={`/singer/${ar.id}`}>
                            {ar.name} /
                        </Link>
                    ))
                );
            },
        },
        {
            title: "专辑",
            key: "album",
            width: "15%",
            render: (data: ISong) => (
                <Link to={`/album/${data.al.id}`}>{data.al.name}</Link>
            ),
        },
        {
            title: "时长",
            key: "dt",
            width: "10%",
            render: (data: ISong) => (
                <div>{timeFormat(Math.floor(data.dt / 1000))}</div>
            ),
        },
        {
            title: "MV",
            key: "mv",
            width: "14%",
            render: (data: ISong) =>
                data.mv ? <Link to={`/mv/${data.mv}`}>去欣赏</Link> : null,
        },
    ];

    return (
        <Table<ISong>
            rowKey="id"
            bordered={false}
            scroll={{ x: true }}
            columns={columns}
            loading={loading}
            dataSource={songs}
            pagination={{
                showQuickJumper: true,
                total,
                current: page,
                pageSize,
                onChange: (page, pageSize) => pageChange(page, pageSize),
                showTotal: (total) => `共 ${total} 条`,
            }}
            onRow={(record) => {
                return {
                    onDoubleClick: () => {
                        console.log(record);
                    },
                    onContextMenu: () => {},
                    onMouseEnter: () => {}, // 鼠标移入行
                    onMouseLeave: () => {},
                };
            }}
        />
    );
};

export default SingerSongs;
