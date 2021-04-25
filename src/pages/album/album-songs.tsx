import React from "react";
import { Avatar, Table, Image, Empty } from "antd";
import { Song } from "./type";
import { timeFormat, toTop } from "../../utils";
import { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazyload";
import LoadingImg from "../../components/LoadingImg";
import { useStore } from "../../hooks/useStore";

interface IProps {
    songs: Song[] | undefined;
}

const AlbumSongs: React.FC<IProps> = (props: IProps) => {
    const store = useStore();
    const { songs } = props;
    const [page, setPage] = React.useState<number>(1);
    const [pageSize, setPageSize] = React.useState<number>(10);

    const pageChange = React.useCallback((page1, pageSize1) => {
        setPage(page1);
        setPageSize(pageSize1);
        toTop();
    }, []);

    const handleSongNameClick = React.useCallback(
        (data: Song) => {
            store.updateCurSongId(data.id);
            store.updateCurOrderPlaylist(songs!.map((item) => item.id) || []);
        },
        [songs, store]
    );

    const columns: ColumnsType<Song> = [
        {
            title: "序号",
            dataIndex: "index",
            key: "index",
            width: "10%",
        },
        {
            title: "封面",
            key: "picUrl",
            width: "10%",
            render: (data: Song) => (
                <Avatar
                    src={
                        <LazyLoad height={32} placeholder={<LoadingImg />}>
                            <Image
                                alt="album-cover"
                                loading="lazy"
                                preview={false}
                                style={{ opacity: 0.8 }}
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
            key: "name",
            width: "15%",
            render: (data: Song) => (
                <div onClick={() => handleSongNameClick(data)}>{data.name}</div>
            ),
        },
        {
            title: "歌手",
            key: "singer",
            width: "20%",
            render: (data: Song) => {
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
            render: (data: Song) => <div>{data.al.name}</div>,
        },
        {
            title: "时长",
            key: "dt",
            width: "10%",
            render: (data: Song) => (
                <div>{timeFormat(Math.floor(data.dt / 1000))}</div>
            ),
        },
        {
            title: "MV",
            key: "mv",
            width: "10%",
            render: (data: Song) =>
                data.mv ? <Link to={`/mv/${data.mv}`}>去欣赏</Link> : null,
        },
    ];

    return songs && songs.length ? (
        <Table<Song>
            rowKey="id"
            bordered={false}
            scroll={{ x: true }}
            columns={columns}
            dataSource={songs.map((item, index) => {
                return {
                    ...item,
                    index: (page - 1) * pageSize + index + 1,
                };
            })}
            pagination={{
                showQuickJumper: true,
                showSizeChanger: true,
                total: songs.length,
                current: page,
                pageSize,
                onChange: (page, pageSize) => pageChange(page, pageSize),
                showTotal: (total) => `共 ${total} 条`,
            }}
            onRow={(record) => {
                return {
                    onDoubleClick: (event) => handleSongNameClick(record),
                    onContextMenu: (event) => {},
                };
            }}
        />
    ) : (
        <Empty />
    );
};

export default AlbumSongs;
