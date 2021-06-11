import React from "react";
import LazyLoad from "react-lazyload";
import { useHistory } from "react-router-dom";
import { Empty, Image } from "antd";
import { VideoCameraOutlined } from "@ant-design/icons";

import StyledCount from "../../../components/detail/StyledCount";
import StyledDesc from "../../../components/detail/StyledDesc";
import StyledItem from "../../../components/detail/StyledItem";
import StyledName from "../../../components/detail/StyledName";
import StyledWrapper from "../../../components/detail/StyledWrapper";
import LoadingImg from "../../../components/LoadingImg";
import {
    DEFAULT_MV_SMALL_HEIGHT,
    DEFAULT_MV_SMALL_WIDTH,
} from "../../../web-config/defaultConfig";
import { countFormat } from "../../../utils";
import { ISearchs } from "../type";

interface IProps {
    result: ISearchs | undefined;
}

const Mvs: React.FC<IProps> = (props: IProps) => {
    const { result } = props;
    const history = useHistory();

    const toDetail = React.useCallback(
        (id: number) => {
            history.push(`/mv/${id}`);
        },
        [history]
    );

    return result && result.mvs && result.mvs.length ? (
        <>
            <StyledWrapper>
                {result.mvs.map((item) => {
                    return (
                        <StyledItem
                            key={`search-mv-${item.id}`}
                            onClick={() => toDetail(item.id)}
                        >
                            <div
                                style={{
                                    width: DEFAULT_MV_SMALL_WIDTH,
                                    height: DEFAULT_MV_SMALL_HEIGHT,
                                    position: "relative",
                                }}
                            >
                                <LazyLoad
                                    height={DEFAULT_MV_SMALL_HEIGHT}
                                    placeholder={<LoadingImg />}
                                >
                                    <Image
                                        alt="mv-cover"
                                        loading="lazy"
                                        style={{ opacity: 0.8 }}
                                        preview={false}
                                        width={DEFAULT_MV_SMALL_WIDTH}
                                        height={DEFAULT_MV_SMALL_HEIGHT}
                                        src={item.cover}
                                        placeholder={<LoadingImg />}
                                    />
                                </LazyLoad>
                                <StyledCount>
                                    <VideoCameraOutlined />
                                    {countFormat(item.playCount)}
                                </StyledCount>
                                <StyledDesc width={DEFAULT_MV_SMALL_WIDTH}>
                                    {`By ${item.artistName}`}
                                </StyledDesc>
                            </div>

                            <StyledName width={DEFAULT_MV_SMALL_WIDTH}>
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

export default Mvs;
