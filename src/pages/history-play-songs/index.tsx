import React from "react";
import { Avatar, Table, Image, Button, Popconfirm } from "antd";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PlayCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { ISong } from "../detail/type";
import { dateFormat, timeFormat, toTop } from "../../utils";
import { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazyload";
import LoadingImg from "../../components/LoadingImg";
import { useStore } from "../../hooks/useStore";
import StyledWrapper from "../../components/detail/StyledWrapper";
import StyledTag from "../../components/StyledTag";
import { observer } from "mobx-react-lite";

const HistoryPlaySongs: React.FC = observer(() => {
    const store = useStore();
    const [page, setPage] = React.useState<number>(1);
    const [pageSize, setPageSize] = React.useState<number>(10);

    const pageChange = React.useCallback((page1, pageSize1) => {
        setPage(page1);
        setPageSize(pageSize1);
        toTop();
    }, []);

    const handleSongNameClick = React.useCallback(
        (data: ISong) => {
            store.updateCurSong(data);
        },
        [store]
    );

    // const playHistorySongs = React.useCallback(() => {
    //     store.updateCurPlaylist(store.curHeartPlaylists.map((song) => song.id));
    // }, [store]);

    const clearAll = React.useCallback(() => {
        store.updateHistoryPlaySongs([]);
    }, [store]);

    const columns: ColumnsType<ISong> = [
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
            key: "name",
            width: "15%",
            render: (data: ISong) => (
                <div onClick={() => handleSongNameClick(data)}>{data.name}</div>
            ),
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
            width: "10%",
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
    ];

    return (
        <StyledWrapper>
            <div style={{ width: "100%" }}>
                <StyledTag color="magenta">历史听歌</StyledTag>
                {/* <Button
                    style={{ marginRight: 6 }}
                    type="primary"
                    icon={<PlayCircleOutlined />}
                    onClick={playHistorySongs}
                >
                    播放全部
                </Button> */}
                <Popconfirm
                    title="确定要清空所有的播放历史记录吗？"
                    okText="是的"
                    cancelText="否"
                    placement="bottom"
                    onConfirm={clearAll}
                >
                    <Button
                        type="primary"
                        danger={true}
                        icon={<DeleteOutlined />}
                    >
                        清空记录
                    </Button>
                </Popconfirm>

                <Table<ISong>
                    rowKey="id"
                    bordered={false}
                    scroll={{ x: true }}
                    columns={columns}
                    dataSource={store.historyPlaySongs.map((item, index) => {
                        return { ...item, index: index + 1 };
                    })}
                    pagination={{
                        showQuickJumper: true,
                        total: store.historyPlaySongs.length,
                        current: page,
                        pageSize,
                        onChange: (page, pageSize) =>
                            pageChange(page, pageSize),
                        showTotal: (total) => `共 ${total} 条`,
                    }}
                    onRow={(record) => {
                        return {
                            onDoubleClick: () => handleSongNameClick(record),
                            onContextMenu: () => {},
                        };
                    }}
                />
            </div>
        </StyledWrapper>
    );
});

export default HistoryPlaySongs;
