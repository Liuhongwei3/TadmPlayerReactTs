import React from "react";

import CarouselContent from "./carousel-content";
import NewSongs from "./new-songs";
import PersonPush from "./person-push";
import RecommendDetail from "./recommend-detail";
import RecommendMv from "./recommend-mv";
import StyledDivider from "../../components/StyledDivider";
import { toTop } from "../../utils";

const Home: React.FunctionComponent = () => {
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
        </>
    );
};

export default Home;
