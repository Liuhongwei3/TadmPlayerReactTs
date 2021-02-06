import React from "react";
import { Avatar, Table, Image } from "antd";
import { ISong, ITrackId } from "./type";
import req from "../../api/req";
import { dateFormat, notify, timeFormat } from "../../utils";
import { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazyload";
import LoadingImg from "../../components/LoadingImg";

interface IProps {
    trackIds: ITrackId[];
}

const DetailSongs: React.FunctionComponent<IProps> = (props: IProps) => {
    const { trackIds } = props;
    const [loading, setLoading] = React.useState<boolean>(false);
    const [songs, setSongs] = React.useState<ISong[]>([]);

    const getSongsDetail = React.useCallback(() => {
        setLoading(true);
        req.netease
            .getMusicDetail(trackIds.map((trackId) => trackId.id).join(","))
            .then((res) => {
                setSongs(
                    res.songs.map((item, index) => {
                        return { ...item, index: index + 1 };
                    })
                );
            })
            .catch((e) => {
                notify("error", e || "获取歌曲详情数据失败");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [trackIds]);
    React.useEffect(() => {
        getSongsDetail();
    }, [getSongsDetail]);

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
                    <Link to={`${data.ar[0].id}`}>{data.ar[0].name}</Link>
                ) : (
                    data.ar.map((ar) => (
                        <Link key={ar.id} to={`${ar.id}`}>
                            {ar.name}/
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
                <Link to={`${data.al.id}`}>{data.al.name}</Link>
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
            title: "发行日期",
            key: "publishTime",
            width: "15%",
            render: (data: ISong) => <div>{dateFormat(data.publishTime)}</div>,
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

export default DetailSongs;
