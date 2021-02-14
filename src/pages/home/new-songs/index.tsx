import React from "react";
import LazyLoad from "react-lazyload";
import { Empty, Spin } from "antd";

import req from "../../../api/req";
import { IArtist, INewSongs } from "../type";
import StyledItem from "../../../components/detail/StyledItem";
import StyledWrapper from "../../../components/detail/StyledWrapper";
import StyledDesc from "../../../components/detail/StyledDesc";
import StyledName from "../../../components/detail/StyledName";
import LoadingImg from "../../../components/LoadingImg";
import { notify } from "../../../utils";

const NewSongs: React.FunctionComponent = () => {
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
                    "error",
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

    return (
        <Spin tip="Loading..." spinning={loading}>
            <h2>《最新音乐》</h2>
            {newSongs.length ? (
                <StyledWrapper>
                    {newSongs.map((item: INewSongs) => {
                        return (
                            <StyledItem key={item.id}>
                                <div
                                    style={{
                                        width: 150,
                                        height: 150,
                                        position: "relative",
                                    }}
                                >
                                    <LazyLoad
                                        height={160}
                                        placeholder={<LoadingImg />}
                                    >
                                        <img
                                            style={{ opacity: 0.65 }}
                                            width={150}
                                            height={150}
                                            alt="detail-cover"
                                            loading="lazy"
                                            src={item.picUrl}
                                        />
                                    </LazyLoad>
                                    <StyledDesc width={150}>
                                        <span>By </span>
                                        {item.song.artists.map(
                                            (artist: IArtist) => {
                                                return item.song.artists
                                                    .length === 1 ? (
                                                    <span key={artist.id}>
                                                        {artist.name}
                                                    </span>
                                                ) : (
                                                    <span key={artist.id}>
                                                        {`${artist.name} / `}
                                                    </span>
                                                );
                                            }
                                        )}
                                    </StyledDesc>
                                </div>

                                <StyledName width={150}>{item.name}</StyledName>
                            </StyledItem>
                        );
                    })}
                </StyledWrapper>
            ) : (
                <Empty />
            )}
        </Spin>
    );
};

export default NewSongs;
