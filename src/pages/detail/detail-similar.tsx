import React from "react";
import { Empty, Spin, Image } from "antd";
import LazyLoad from "react-lazyload";
import StyledDesc from "../../components/detail/StyledDesc";
import StyledItem from "../../components/detail/StyledItem";
import StyledName from "../../components/detail/StyledName";
import StyledWrapper from "../../components/detail/StyledWrapper";
import LoadingImg from "../../components/LoadingImg";
import { useHistory } from "react-router-dom";
import reqs from "../../api/req";
import { Playlist } from "./type";
import { notify } from "../../utils";
import {
    DEFAULT_IMG_HEIGHT,
    DEFAULT_IMG_WIDTH,
} from "../../web-config/defaultConfig";
import { EMessageType } from "../enums";

interface IProps {
    detailId: number;
}

const DetailSimilar: React.FunctionComponent<IProps> = (props: IProps) => {
    const { detailId } = props;
    const history = useHistory();
    const [loading, setLoading] = React.useState<boolean>(false);
    const [similarDetails, setSimilarDetails] = React.useState<Playlist[]>([]);

    const getSimilarDetails = React.useCallback(() => {
        setLoading(true);
        reqs.netease
            .getSimiDetails(+detailId)
            .then((res) => {
                setSimilarDetails(res.playlists);
            })
            .catch((e) =>
                notify(
                    EMessageType.ERROR,
                    (e.response && e.response.statusText) ||
                        e.message ||
                        "加载相似歌单数据失败"
                )
            )
            .finally(() => setLoading(false));
    }, [detailId]);

    React.useEffect(() => {
        getSimilarDetails();
    }, [getSimilarDetails]);

    const toDetail = React.useCallback(
        (id: number) => {
            history.push(`/detail/${id}`);
        },
        [history]
    );

    return (
        <Spin tip="Loading..." spinning={loading}>
            {similarDetails.length ? (
                <StyledWrapper>
                    {similarDetails.map((item: Playlist) => {
                        return (
                            <StyledItem
                                key={item.id}
                                onClick={() => toDetail(+item.id)}
                            >
                                <div
                                    style={{
                                        width: DEFAULT_IMG_WIDTH,
                                        height: DEFAULT_IMG_HEIGHT,
                                        position: "relative",
                                    }}
                                >
                                    <LazyLoad
                                        height={100}
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
                                    <StyledDesc width={DEFAULT_IMG_WIDTH}>
                                        {`By ${item.creator.nickname}`}
                                    </StyledDesc>
                                </div>

                                <StyledName width={DEFAULT_IMG_WIDTH}>
                                    {item.creator.nickname}
                                </StyledName>
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

export default DetailSimilar;
