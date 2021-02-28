import React from "react";
import LazyLoad from "react-lazyload";
import { useHistory } from "react-router-dom";
import { Empty } from "antd";
import { VideoCameraOutlined } from "@ant-design/icons";

import StyledCount from "../../../components/detail/StyledCount";
import StyledDesc from "../../../components/detail/StyledDesc";
import StyledItem from "../../../components/detail/StyledItem";
import StyledName from "../../../components/detail/StyledName";
import StyledWrapper from "../../../components/detail/StyledWrapper";
import LoadingImg from "../../../components/LoadingImg";
import { DEFAULT_IMG_WIDTH, DEFAULT_IMG_HEIGHT } from "../../../web-config/defaultConfig";
import { countFormat } from "../../../utils";
import { ISearchs } from "../type";

interface IProps {
    result: ISearchs | undefined;
}

const Singers: React.FC<IProps> = (props: IProps) => {
    const { result } = props;
    const history = useHistory();

    const toDetail = React.useCallback(
        (id: number) => {
            history.push(`/singer/${id}`);
        },
        [history]
    );

    return result && result.artists && result.artists.length ? (
        <>
            <StyledWrapper>
                {result.artists.map((item) => {
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
                                        src={item.picUrl || item.img1v1Url}
                                    />
                                </LazyLoad>
                                <StyledCount>
                                    <VideoCameraOutlined />
                                    {countFormat(item.mvSize)}
                                </StyledCount>
                                <StyledDesc>
                                    {`专辑数：${item.albumSize}`}
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

export default Singers;
