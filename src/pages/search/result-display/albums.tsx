import React from "react";
import LazyLoad from "react-lazyload";
import { Empty, Image } from "antd";
import { CustomerServiceOutlined } from "@ant-design/icons";

import StyledCount from "../../../components/detail/StyledCount";
import StyledDesc from "../../../components/detail/StyledDesc";
import StyledItem from "../../../components/detail/StyledItem";
import StyledName from "../../../components/detail/StyledName";
import StyledWrapper from "../../../components/detail/StyledWrapper";
import LoadingImg from "../../../components/LoadingImg";
import {
    DEFAULT_IMG_WIDTH,
    DEFAULT_IMG_HEIGHT,
} from "../../../web-config/defaultConfig";
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
                            key={`search-album-${item.id}`}
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
                                        alt="album-cover"
                                        loading="lazy"
                                        style={{ opacity: 0.8 }}
                                        preview={false}
                                        width={DEFAULT_IMG_WIDTH}
                                        height={DEFAULT_IMG_HEIGHT}
                                        src={item.picUrl}
                                        placeholder={<LoadingImg />}
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
