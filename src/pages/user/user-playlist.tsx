import React from "react";
import LazyLoad from "react-lazyload";
import { useHistory } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Button, Empty, Spin, Image } from "antd";
import { CustomerServiceOutlined, FolderAddOutlined } from "@ant-design/icons";
import StyledDesc from "../../components/detail/StyledDesc";
import StyledItem from "../../components/detail/StyledItem";
import StyledName from "../../components/detail/StyledName";
import StyledCount from "../../components/detail/StyledCount";
import StyledWrapper from "../../components/detail/StyledWrapper";
import LoadingImg from "../../components/LoadingImg";
import { countFormat, dateFormat, notify, toTop } from "../../utils";
import req from "../../api/req";
import { IUserPlaylistRes } from "./type";
import {
    DEFAULT_IMG_HEIGHT,
    DEFAULT_IMG_WIDTH,
} from "../../web-config/defaultConfig";
import StyledDivider from "../../components/StyledDivider";
import { useStore } from "../../hooks/useStore";
import openAddDetailDialog from "./add-detail-dialog";
import { EMessageType } from "../enums";

interface IProps {
    userId: number;
}

const INIT_LIMIT = 16;

const UserPlaylist: React.FunctionComponent<IProps> = observer(
    (props: IProps) => {
        const store = useStore();
        const history = useHistory();
        const { userId } = props;
        const [loading, setLoading] = React.useState<boolean>(false);
        const [limit, setLimit] = React.useState<number>(INIT_LIMIT);
        const [
            playlistsRes,
            setPlaylistsRes,
        ] = React.useState<IUserPlaylistRes>();

        const getPlaylists = React.useCallback(() => {
            setLoading(true);
            req.netease
                .userPlaylist(userId, limit)
                .then((res) => {
                    setPlaylistsRes(res);
                })
                .catch((e) =>
                    notify(
                        EMessageType.ERROR,
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
                                                width: DEFAULT_IMG_WIDTH,
                                                height: DEFAULT_IMG_HEIGHT,
                                                position: "relative",
                                            }}
                                        >
                                            <LazyLoad
                                                height={DEFAULT_IMG_HEIGHT}
                                                placeholder={<LoadingImg />}
                                            >
                                                <Image
                                                    alt="detail-cover"
                                                    loading="lazy"
                                                    style={{ opacity: 0.8 }}
                                                    preview={false}
                                                    width={DEFAULT_IMG_WIDTH}
                                                    height={DEFAULT_IMG_HEIGHT}
                                                    src={item.coverImgUrl}
                                                    placeholder={<LoadingImg />}
                                                />
                                            </LazyLoad>
                                            <StyledCount>
                                                <CustomerServiceOutlined />
                                                {countFormat(item.playCount)}
                                            </StyledCount>
                                            <StyledDesc
                                                width={DEFAULT_IMG_WIDTH}
                                            >
                                                {`${dateFormat(
                                                    item.updateTime
                                                )} 更新`}
                                            </StyledDesc>
                                        </div>

                                        <StyledName width={DEFAULT_IMG_WIDTH}>
                                            {item.name}
                                        </StyledName>
                                    </StyledItem>
                                );
                            })}

                            {!!store.userInfo.userId &&
                                userId === store.userInfo.userId && (
                                    <StyledItem
                                        style={{
                                            width: DEFAULT_IMG_WIDTH,
                                            height: DEFAULT_IMG_HEIGHT,
                                            position: "relative",
                                            fontSize: 100,
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            flexDirection: "column",
                                        }}
                                        onClick={openAddDetailDialog}
                                    >
                                        <FolderAddOutlined />
                                        <StyledName width={DEFAULT_IMG_WIDTH}>
                                            创建歌单
                                        </StyledName>
                                    </StyledItem>
                                )}

                            <StyledDivider />
                            <Button
                                style={{ margin: "0 auto", display: "flex" }}
                                type="primary"
                                disabled={!playlistsRes.more}
                                loading={loading}
                                onClick={() => setLimit(limit + 12)}
                            >
                                Loading More
                            </Button>
                        </StyledWrapper>
                    </>
                ) : (
                    <Empty />
                )}
            </Spin>
        );
    }
);

export default UserPlaylist;
