import React from "react";

import CarouselContent from "./carousel-content";
import NewSongs from "./new-songs";
import PersonPush from "./person-push";
import RecommendDetail from "./recommend-detail";
import RecommendMv from "./recommend-mv";
import StyledDivider from "../../components/StyledDivider";
import { toTop } from "../../utils";
import NewMv from "./new-mvs";

const Home: React.FC = () => {
    React.useEffect(() => {
        toTop();
    }, []);

    return (
        <>
            <CarouselContent />
            <StyledDivider />
            <RecommendDetail />
            <StyledDivider />
            <PersonPush />
            <StyledDivider />
            <NewSongs />
            <StyledDivider />
            <RecommendMv />
            <NewMv />
        </>
    );
};

export default Home;
