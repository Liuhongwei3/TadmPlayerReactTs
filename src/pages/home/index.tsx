import { Divider } from "antd";
import React from "react";
import CarouselContent from "./carousel-content";
import RecommendDetail from "./recommend-detail";


const Home: React.FunctionComponent = () => {
    return (
        <>
            <CarouselContent />
            <Divider />
            <RecommendDetail />
        </>
    );
};

export default Home;
