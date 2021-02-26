import React from "react";
import { Empty, Table } from "antd";

import { dateFormat, timeFormat, toTop } from "../../../utils";
import { ISearchs, Song } from "../type";
import { Link } from "react-router-dom";
import { ColumnsType } from "antd/lib/table";

interface IProps {
    result: ISearchs | undefined;
}

const Songs: React.FC<IProps> = (props: IProps) => {
    const { result } = props;
    const [page, setPage] = React.useState<number>(1);
    const [pageSize, setPageSize] = React.useState<number>(10);

    const pageChange = React.useCallback((page1, pageSize1) => {
        setPage(page1);
        setPageSize(pageSize1);
        toTop();
    }, []);

    const columns: ColumnsType<Song> = [
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
            width: "25%",
        },
        {
            title: "歌手",
            key: "singer",
            width: "20%",
            render: (data: Song) => {
                return data.artists.length === 1 ? (
                    <Link to={`/singer/${data.artists[0].id}`}>
                        {data.artists[0].name}
                    </Link>
                ) : (
                    data.artists.map((ar) => (
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
            render: (data: Song) => (
                <Link to={`/album/${data.album.id}`}>{data.album.name}</Link>
            ),
        },
        {
            title: "时长",
            key: "dt",
            width: "10%",
            render: (data: Song) => (
                <div>{timeFormat(Math.floor(data.duration / 1000))}</div>
            ),
        },
        {
            title: "MV",
            key: "mv",
            width: "14%",
            render: (data: Song) =>
                data.mvid ? <Link to={`/mv/${data.mvid}`}>去欣赏</Link> : null,
        },
        {
            title: "发行日期",
            key: "publishTime",
            width: "15%",
            render: (data: Song) => (
                <div>{dateFormat(data.album.publishTime)}</div>
            ),
        },
    ];

    return result && result.songs && result.songs.length ? (
        <>
            <Table<Song>
                rowKey="id"
                bordered={false}
                columns={columns}
                dataSource={result.songs.map((item, index) => {
                    return { ...item, index: index + 1 };
                })}
                pagination={{
                    showQuickJumper: true,
                    total: result.songs.length,
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
        </>
    ) : (
        <Empty />
    );
};

export default Songs;
