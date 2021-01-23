import React from "react";
import { Divider } from "antd";

import CarouselContent from "./carousel-content";
import NewSongs from "./new-songs";
import PersonPush from "./person-push";
import RecommendDetail from "./recommend-detail";
import RecommendMv from "./recommend-mv";


const Home: React.FunctionComponent = () => {
    return (
        <>
            <CarouselContent />
            <Divider />
            <RecommendDetail />
            <Divider />
            <PersonPush />
            <Divider />
            <NewSongs />
            <Divider />
            <RecommendMv />
        </>
    );
};

export default Home;
