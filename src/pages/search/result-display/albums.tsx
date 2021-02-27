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
import { DEFAULT_IMG_WIDTH, DEFAULT_IMG_HEIGHT } from "../../../defaultConfig";
import { countFormat } from "../../../utils";
import { ISearchs } from "../type";
import { useHistory } from "react-router-dom";

interface IProps {
    result: ISearchs | undefined;
}

const Albums: React.FC<IProps> = (props: IProps) => {
    const { result } = props;
    const history = useHistory();

    const toDetail = React.useCallback(
        (id: number) => {
            history.push(`/album/${id}`);
        },
        [history]
    );

    return result && result.albums && result.albums.length ? (
        <>
            <StyledWrapper>
                {result.albums.map((item) => {
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
                                        src={item.picUrl}
                                    />
                                </LazyLoad>
                                <StyledCount>
                                    <CustomerServiceOutlined />
                                    {countFormat(item.size)}
                                </StyledCount>
                                <StyledDesc width={DEFAULT_IMG_WIDTH}>
                                    {`By ${item.artist.name}`}
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

export default Albums;
