import React from "react";
import LazyLoad from "react-lazyload";
import { Empty } from "antd";
import { CustomerServiceOutlined } from "@ant-design/icons";

import StyledCount from "../../../components/detail/StyledCount";
import StyledDesc from "../../../components/detail/StyledDesc";
import StyledItem from "../../../components/detail/StyledItem";
import StyledName from "../../../components/detail/StyledName";
import StyledWrapper from "../../../components/detail/StyledWrapper";
import LoadingImg from "../../../components/LoadingImg";
import { DEFAULT_IMG_WIDTH, DEFAULT_IMG_HEIGHT } from "../../../web-config/defaultConfig";
import { countFormat } from "../../../utils";
import { ISearchs } from "../type";
import { useHistory } from "react-router-dom";

interface IProps {
    result: ISearchs | undefined;
}

const Details: React.FC<IProps> = (props: IProps) => {
    const { result } = props;
    const history = useHistory();

    const toDetail = React.useCallback(
        (id: number) => {
            history.push(`/detail/${id}`);
        },
        [history]
    );

    return result && result.playlists && result.playlists.length ? (
        <>
            <StyledWrapper>
                {result.playlists.map((item) => {
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
                                    <img
                                        style={{ opacity: 0.8 }}
                                        width={DEFAULT_IMG_WIDTH}
                                        height={DEFAULT_IMG_HEIGHT}
                                        alt="mv-cover"
                                        src={item.coverImgUrl}
                                    />
                                </LazyLoad>
                                <StyledCount>
                                    <CustomerServiceOutlined />
                                    {countFormat(item.playCount)}
                                </StyledCount>
                                <StyledDesc width={DEFAULT_IMG_WIDTH}>
                                    {`By ${item.creator.nickname}`}
                                </StyledDesc>
                            </div>

                            <StyledName width={DEFAULT_IMG_WIDTH}>
                                {item.name}
                            </StyledName>
                        </StyledItem>
                    );
                })}
            </StyledWrapper>
        </>
    ) : (
        <Empty />
    );
};

export default Details;
