import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Carousel, Tag, Image } from "antd";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";

import req from "../../../api/req";
import { IBanner } from "../type";
import { CarouselRef } from "antd/lib/carousel";
import { notify } from "../../../utils";
import { ETartgetType } from "../../enums";
import LoadingImg from "../../../components/LoadingImg";
import { useStore } from "../../../hooks/useStore";

const CarouselContent: React.FC = () => {
    const store = useStore();
    const history = useHistory();
    const [currentSlide, setCurrentSlide] = React.useState<number>(0);
    const [banners, setBanners] = React.useState<Array<IBanner>>([]);
    const imgRef = React.useRef<CarouselRef | null>(null);

    const getBanners = React.useCallback(() => {
        req.netease
            .getBanner()
            .then((res) => {
                setBanners(res.banners);
            })
            .catch((e) =>
                notify(
                    "error",
                    (e.response && e.response.statusText) ||
                        e.message ||
                        "加载轮播图数据失败"
                )
            );
    }, []);

    React.useEffect(() => {
        getBanners();
    }, [getBanners]);

    const handleClickItem = React.useCallback(
        (item: IBanner) => {
            if (!item.targetId && !item.url) return;

            switch (item.targetType) {
                case ETartgetType.SONG:
                    store.updateCurSongId(item.targetId);
                    notify("info", "开始播放该歌曲");
                    break;
                case ETartgetType.ALBUM:
                    history.push(`/album/${item.targetId}`);
                    break;
                case ETartgetType.SINGER:
                    history.push(`/singer/${item.targetId}`);
                    break;
                case ETartgetType.DETAIL:
                    history.push(`/detail/${item.targetId}`);
                    break;
                case ETartgetType.USER:
                    history.push(`/user/${item.targetId}`);
                    break;
                case ETartgetType.MV:
                    history.push(`/mv/${item.targetId}`);
                    break;
                case ETartgetType.JUMP:
                    window.open(item.url);
                    break;
                default:
                    notify("warning", "该功能暂未开放");
                    break;
            }
        },
        [history, store]
    );

    return banners && banners.length ? (
        <StyledCarousel
            backImg={
                banners[currentSlide] ? banners[currentSlide].imageUrl : null
            }
        >
            <Carousel
                effect={"fade"}
                autoplay={true}
                autoplaySpeed={5000}
                ref={imgRef}
                beforeChange={(currentSlide, nextSlide) =>
                    setCurrentSlide(nextSlide)
                }
            >
                {banners.map((item: IBanner) => {
                    return (
                        <StyledCarouselItem
                            key={item.scm}
                            onClick={() => handleClickItem(item)}
                        >
                            <StyledImage
                                alt="banner-cover"
                                src={item.imageUrl}
                                loading="lazy"
                                preview={false}
                                placeholder={<LoadingImg />}
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
    ) : null;
};

export default CarouselContent;

const StyledCarousel = styled.div`
    width: 100%;
    margin: 0 auto;
    text-align: center;
    position: relative;
    background-size: 60000px;
    background-position: center center;

    ${(props: { backImg: null | string }) => {
        return props.backImg ? `background-image: url(${props.backImg})` : "";
    }}
`;

const StyledCarouselItem = styled.div`
    width: 66% !important;
    position: relative;
    padding: 10px 0;

    &:hover {
        cursor: pointer;
    }

    @media screen and (max-width: 768px) {
        width: 96% !important;
    }
`;

const StyledImage = styled(Image)`
    width: 100%;
    height: 300px;
    border-radius: 10px;
    margin: 0 auto;

    @media screen and (max-width: 768px) {
        height: 25vh;
    }
`;

const StyledTag = styled(Tag)`
    position: absolute;
    right: -8px;
    top: 10px;
    font-size: 14px;
    padding: 6px 10px;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 10px;

    @media screen and (max-width: 768px) {
        font-size: 12px;
    }
`;

const StyledLeftCircleOutlined = styled(LeftCircleOutlined)`
    font-size: 32px;
    color: #fff;
    position: absolute;
    top: 45%;
    left: 6%;

    @media screen and (max-width: 768px) {
        font-size: 20px;
    }
`;

const StyledRightCircleOutlined = styled(RightCircleOutlined)`
    font-size: 32px;
    color: #fff;
    position: absolute;
    top: 45%;
    right: 6%;

    @media screen and (max-width: 768px) {
        font-size: 20px;
    }
`;
