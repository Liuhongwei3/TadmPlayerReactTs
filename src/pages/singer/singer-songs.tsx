import React from "react";
import { Table } from "antd";
import req from "../../api/req";
import { notify, timeFormat, toTop } from "../../utils";
import { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { EOrderType, ISong } from "./type";

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
                notify("error", e || "获取歌曲详情数据失败");
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
                    <Link to={`/singer/${data.ar[0].id}`}>
                        {data.ar[0].name}
                    </Link>
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
                    onDoubleClick: (event) => {
                        console.log(record);
                    },
                    onContextMenu: (event) => {},
                    onMouseEnter: (event) => {}, // 鼠标移入行
                    onMouseLeave: (event) => {},
                };
            }}
        />
    );
};

export default SingerSongs;
