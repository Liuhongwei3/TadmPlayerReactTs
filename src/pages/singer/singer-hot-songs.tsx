import React from "react";
import { Avatar, Table, Image, Typography } from "antd";
import { timeFormat, toTop } from "../../utils";
import { ColumnsType } from "antd/es/table";
import { HotSong, ISong } from "./type";
import LazyLoad from "react-lazyload";
import LoadingImg from "../../components/LoadingImg";
import { Link } from "react-router-dom";

interface IProps {
    hotSongs: HotSong[];
}

const SingerHotSongs: React.FunctionComponent<IProps> = (props: IProps) => {
    const { hotSongs } = props;
    const [page, setPage] = React.useState<number>(1);
    const [pageSize, setPageSize] = React.useState<number>(10);

    const pageChange = React.useCallback((page1, pageSize1) => {
        setPage(page1);
        setPageSize(pageSize1);
        toTop();
    }, []);

    const columns: ColumnsType<HotSong> = [
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
                        <LazyLoad height={50} placeholder={<LoadingImg />}>
                            <Image
                                width={50}
                                height={50}
                                src={data.al.picUrl}
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
        <Table<HotSong>
            rowKey="id"
            bordered={false}
            scroll={{ x: true }}
            columns={columns}
            dataSource={hotSongs.map((item, index) => {
                return {
                    ...item,
                    index: (page - 1) * pageSize + index + 1,
                };
            })}
            pagination={{
                showQuickJumper: true,
                total: hotSongs.length,
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

export default SingerHotSongs;
