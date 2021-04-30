import React from "react";
import { Empty, Spin, Image } from "antd";
import LazyLoad from "react-lazyload";
import StyledItem from "../../components/detail/StyledItem";
import StyledName from "../../components/detail/StyledName";
import StyledWrapper from "../../components/detail/StyledWrapper";
import LoadingImg from "../../components/LoadingImg";
import { useHistory } from "react-router-dom";
import reqs from "../../api/req";
import { notify } from "../../utils";
import { Artist } from "./type";
import {
    DEFAULT_IMG_HEIGHT,
    DEFAULT_IMG_WIDTH,
} from "../../web-config/defaultConfig";
import { EMessageType } from "../enums";

interface IProps {
    singerId: number;
}

const SingerSimilar: React.FunctionComponent<IProps> = (props: IProps) => {
    const { singerId } = props;
    const history = useHistory();
    const [loading, setLoading] = React.useState<boolean>(false);
    const [similarSingers, setSimilarSingers] = React.useState<Artist[]>([]);

    const getSimilarDetails = React.useCallback(() => {
        setLoading(true);
        reqs.netease
            .simiSingers(+singerId)
            .then((res) => {
                setSimilarSingers(res.artists);
            })
            .catch((e) =>
                notify(
                    EMessageType.ERROR,
                    (e.response && e.response.statusText) ||
                        e.message ||
                        "加载相似歌手数据失败"
                )
            )
            .finally(() => setLoading(false));
    }, [singerId]);

    React.useEffect(() => {
        getSimilarDetails();
    }, [getSimilarDetails]);

    const toDetail = React.useCallback(
        (id: number) => {
            history.push(`/singer/${id}`);
        },
        [history]
    );

    return (
        <Spin tip="Loading..." spinning={loading}>
            {similarSingers && similarSingers.length ? (
                <StyledWrapper>
                    {similarSingers.map((item: Artist) => {
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
                                            alt="ainger-cover"
                                            loading="lazy"
                                            style={{ opacity: 0.8 }}
                                            preview={false}
                                            width={DEFAULT_IMG_WIDTH}
                                            height={DEFAULT_IMG_HEIGHT}
                                            src={item.picUrl}
                                            placeholder={<LoadingImg />}
                                        />
                                    </LazyLoad>
                                </div>

                                <StyledName width={DEFAULT_IMG_WIDTH}>
                                    {item.name}
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

export default SingerSimilar;
