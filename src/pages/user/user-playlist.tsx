import React from "react";
import LazyLoad from "react-lazyload";
import { useHistory } from "react-router-dom";
import { Button, Empty, Spin } from "antd";
import { CustomerServiceOutlined } from "@ant-design/icons";
import StyledDesc from "../../components/detail/StyledDesc";
import StyledItem from "../../components/detail/StyledItem";
import StyledName from "../../components/detail/StyledName";
import StyledCount from "../../components/detail/StyledCount";
import StyledWrapper from "../../components/detail/StyledWrapper";
import LoadingImg from "../../components/LoadingImg";
import {
    countFormat,
    dateFormat,
    notify,
    toTop,
} from "../../utils";
import req from "../../api/req";
import { IUserPlaylistRes } from "./type";

interface IProps {
    userId: number;
}

const INIT_LIMIT = 16;

const UserPlaylist: React.FunctionComponent<IProps> = (props: IProps) => {
    const history = useHistory();
    const { userId } = props;
    const [loading, setLoading] = React.useState<boolean>(false);
    const [limit, setLimit] = React.useState<number>(INIT_LIMIT);
    const [playlistsRes, setPlaylistsRes] = React.useState<IUserPlaylistRes>();

    const getPlaylists = React.useCallback(() => {
        setLoading(true);
        req.netease
            .userPlaylist(userId, limit)
            .then((res) => {
                setPlaylistsRes(res);
            })
            .catch((e) =>
                notify(
                    "error",
                    (e.response && e.response.statusText) ||
                        e.message ||
                        "加载用户歌单数据失败"
                )
            )
            .finally(() => setLoading(false));
    }, [limit, userId]);

    React.useEffect(() => {
        toTop();
    }, []);

    React.useEffect(() => {
        getPlaylists();
    }, [getPlaylists]);

    React.useEffect(() => {
        setLimit(INIT_LIMIT);
    }, [userId]);

    const toDetail = React.useCallback(
        (id: number) => {
            history.push(`/detail/${id}`);
            // updateCurMenu();
        },
        [history]
    );

    return (
        <Spin tip="Loading..." spinning={loading}>
            {playlistsRes && playlistsRes.playlist.length ? (
                <>
                    <StyledWrapper>
                        {playlistsRes.playlist.map((item) => {
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
                                            height={150}
                                            placeholder={<LoadingImg />}
                                        >
                                            <img
                                                style={{ opacity: 0.85 }}
                                                width={150}
                                                height={150}
                                                alt="mv-cover"
                                                src={item.coverImgUrl}
                                            />
                                        </LazyLoad>
                                        <StyledCount>
                                            <CustomerServiceOutlined />
                                            {countFormat(item.playCount)}
                                        </StyledCount>
                                        <StyledDesc width={150}>
                                            {`${dateFormat(
                                                item.updateTime
                                            )} 更新`}
                                        </StyledDesc>
                                    </div>

                                    <StyledName width={150}>
                                        {item.name}
                                    </StyledName>
                                </StyledItem>
                            );
                        })}
                    </StyledWrapper>
                    <Button
                        style={{ margin: "0 auto", display: "flex" }}
                        type="primary"
                        disabled={!playlistsRes.more}
                        loading={loading}
                        onClick={() => setLimit(limit + 12)}
                    >
                        Loading More
                    </Button>
                </>
            ) : (
                <Empty />
            )}
        </Spin>
    );
};

export default UserPlaylist;
