import React from "react";
import styled from "styled-components";
import { Carousel, Tag } from "antd";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";

import req from "../../../api/req";
import { IBanner } from "../type";
import { CarouselRef } from "antd/lib/carousel";

const StyledCarousel = styled.div`
    width: 100%;
    margin: 0 auto;
    text-align: center;
    position: relative;
    background-size: 60000px;
    background-position: center center;

    ${(props: { backImg: null | string }) => {
        return props.backImg ? `background-image: url(${props.backImg})` : '';
    }}
`;

const StyledCarouselItem = styled.div`
    width: 66% !important;
    position: relative;

    &:hover {
        cursor: pointer;
    }
`;

const StyledImage = styled.img`
    width: 100%;
    height: 285px;
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
    border-bottom-left-radius: 10px;
`;

const StyledLeftCircleOutlined = styled(LeftCircleOutlined)`
    font-size: 32px;
    color: #fff;
    position: absolute;
    top: 45%;
    left: 6%;
`;

const StyledRightCircleOutlined = styled(RightCircleOutlined)`
    font-size: 32px;
    color: #fff;
    position: absolute;
    top: 45%;
    right: 6%;
`;

const CarouselContent: React.FunctionComponent = () => {
    const [currentSlide, setCurrentSlide] = React.useState<number>(0);
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
        <StyledCarousel backImg={banners[currentSlide] ? banners[currentSlide].imageUrl : null}>
            <Carousel
                effect={"fade"}
                autoplay={true}
                ref={imgRef}
                beforeChange={(currentSlide, nextSlide) => setCurrentSlide(nextSlide)}
            >
                {banners.map((item: IBanner) => {
                    return (
                        <StyledCarouselItem key={item.scm}>
                            <StyledImage
                                alt="banner-cover"
                                src={item.imageUrl}
                            />
                            <StyledTag color={item.titleColor}>
                                {item.typeTitle}
                            </StyledTag>
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
