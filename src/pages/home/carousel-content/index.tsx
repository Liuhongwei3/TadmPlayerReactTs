import React from "react";
import styled from "styled-components";
import { Carousel, Tag } from "antd";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";

import req from "../../../api/req";
import { IBanner } from "../types";
import { CarouselRef } from "antd/lib/carousel";

const StyledCarousel = styled.div`
    width: 80vw;
    margin: 0 auto;
    text-align: center;
    position: relative;
`;

const StyledCarouselItem = styled.div`
    width: 70vw !important;
    position: relative;

    &:hover {
        cursor: pointer;
    }
`;

const StyledImage = styled.img`
    width: 100%;
    height: 320px;
    border-radius: 10px;
    margin: 0 auto;
`;

const StyledTag = styled(Tag)`
    position: absolute;
    right: -8px;
    top: 0;
    font-size: 14px;
    padding: 6px 10px;
    border-top-right-radius: 10px;
`;

const StyledLeftCircleOutlined = styled(LeftCircleOutlined)`
    font-size: 32px;
    color: #fff;
    position: absolute;
    top: 45%;
    left: 0;
`;

const StyledRightCircleOutlined = styled(RightCircleOutlined)`
    font-size: 32px;
    color: #fff;
    position: absolute;
    top: 45%;
    right: 0;
`;

const CarouselContent: React.FunctionComponent = () => {
    const [banners, setBanners] = React.useState<Array<IBanner>>([]);
    const imgRef = React.useRef<CarouselRef | null>(null);

    const getBanners = async () => {
        let data = await req.netease.getBanner();
        setBanners(data);
    };

    React.useEffect(() => {
        getBanners();
    }, []);

    return (
        <StyledCarousel>
            <Carousel effect={"fade"} autoplay={true} ref={imgRef}>
                {banners.map((item: IBanner) => {
                    return (
                        <StyledCarouselItem key={item.scm}>
                            <StyledImage
                                alt="banner-cover"
                                src={item.imageUrl}
                            />
                            <StyledTag color={item.titleColor}>{item.typeTitle}</StyledTag>
                        </StyledCarouselItem>
                    );
                })}
            </Carousel>
            <StyledLeftCircleOutlined onClick={() => imgRef.current?.prev()} />
            <StyledRightCircleOutlined onClick={() => imgRef.current?.next()} />
        </StyledCarousel>
    );
};

export default CarouselContent;
