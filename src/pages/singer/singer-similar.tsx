import React from "react";
import { Empty, Spin } from "antd";
import LazyLoad from "react-lazyload";
import StyledDesc from "../../components/detail/StyledDesc";
import StyledItem from "../../components/detail/StyledItem";
import StyledName from "../../components/detail/StyledName";
import StyledWrapper from "../../components/detail/StyledWrapper";
import LoadingImg from "../../components/LoadingImg";
import { useHistory } from "react-router-dom";
import reqs from "../../api/req";
import { notify, updateCurMenu } from "../../utils";
import { Artist } from "./type";

interface IProps {
    singerId: number;
}

const SingerSimilar: React.FunctionComponent<IProps> = (props: IProps) => {
    const { singerId } = props;
    const history = useHistory();
    const [loading, setLoading] = React.useState<boolean>(false);
    const [similarSingers, setSimilarSingers] = React.useState<Artist[]>(
        []
    );

    const getSimilarDetails = React.useCallback(() => {
        setLoading(true);
        reqs.netease
            .simiSingers(+singerId)
            .then((res) => {
                console.log(res);
                setSimilarSingers(res.artists);
            })
            .catch((e) => notify("error", e))
            .finally(() => setLoading(false));
    }, [singerId]);

    React.useEffect(() => {
        getSimilarDetails();
    }, [getSimilarDetails]);

    const toDetail = React.useCallback(
        (id: number) => {
            history.push(`/singer/${id}`);
            updateCurMenu();
        },
        [history]
    );

    return (
        <Spin tip="Loading..." spinning={loading}>
            {similarSingers.length ? (
                <StyledWrapper>
                    {similarSingers.map((item: Artist) => {
                        return (
                            <StyledItem
                                key={item.id}
                                onClick={() => toDetail(+item.id)}
                            >
                                <div
                                    style={{
                                        width: 150,
                                        height: 150,
                                        position: "relative",
                                    }}
                                >
                                    <LazyLoad
                                        height={100}
                                        placeholder={<LoadingImg />}
                                    >
                                        <img
                                            style={{ opacity: 0.85 }}
                                            width={150}
                                            height={150}
                                            alt="detail-cover"
                                            src={item.picUrl}
                                        />
                                    </LazyLoad>
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

export default SingerSimilar;
