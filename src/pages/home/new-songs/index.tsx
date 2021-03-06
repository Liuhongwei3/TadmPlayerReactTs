import React from "react";
import LazyLoad from "react-lazyload";
import { Spin, Image } from "antd";

import req from "../../../api/req";
import { INewSongs } from "../type";
import StyledItem from "../../../components/detail/StyledItem";
import StyledWrapper from "../../../components/detail/StyledWrapper";
import StyledDesc from "../../../components/detail/StyledDesc";
import StyledName from "../../../components/detail/StyledName";
import LoadingImg from "../../../components/LoadingImg";
import { notify } from "../../../utils";
import {
    DEFAULT_IMG_HEIGHT,
    DEFAULT_IMG_WIDTH,
} from "../../../web-config/defaultConfig";
import { useStore } from "../../../hooks/useStore";
import { EMessageType } from "../../enums";

const NewSongs: React.FC = () => {
    const store = useStore();
    const [loading, setLoading] = React.useState<boolean>(false);
    const [newSongs, setNewSongs] = React.useState<Array<INewSongs>>([]);

    const getNewSongs = React.useCallback(() => {
        setLoading(true);
        req.netease
            .getNewSongs()
            .then((res) => {
                setNewSongs(res.result);
            })
            .catch((e) =>
                notify(
                    EMessageType.ERROR,
                    (e.response && e.response.statusText) ||
                        e.message ||
                        "加载最新音乐数据失败"
                )
            )
            .finally(() => setLoading(false));
    }, []);

    React.useEffect(() => {
        getNewSongs();
    }, [getNewSongs]);

    const toDetail = React.useCallback(
        (id: number) => {
            store.updateCurSongId(id);
        },
        [store]
    );

    return (
        <Spin tip="Loading..." spinning={loading}>
            <h2>《最新音乐》</h2>

            {newSongs.length ? (
                <StyledWrapper>
                    {newSongs.map((item: INewSongs) => {
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
                                            src={item.picUrl}
                                            placeholder={<LoadingImg />}
                                        />
                                    </LazyLoad>
                                    <StyledDesc width={DEFAULT_IMG_WIDTH}>
                                        <span>By </span>
                                        {item.song.artists.map((artist) => {
                                            return item.song.artists.length ===
                                                1 ? (
                                                <span key={artist.id}>
                                                    {artist.name}
                                                </span>
                                            ) : (
                                                <span key={artist.id}>
                                                    {`${artist.name} / `}
                                                </span>
                                            );
                                        })}
                                    </StyledDesc>
                                </div>

                                <StyledName width={DEFAULT_IMG_WIDTH}>
                                    {item.name}
                                </StyledName>
                            </StyledItem>
                        );
                    })}
                </StyledWrapper>
            ) : null}
        </Spin>
    );
};

export default NewSongs;
