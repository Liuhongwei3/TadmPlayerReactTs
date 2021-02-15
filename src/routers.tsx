import React from "react";
import { Route, Switch } from "react-router-dom";
import Album from "./pages/album";
import Detail from "./pages/detail";

import Home from "./pages/home";
import HotDetail from "./pages/hot-detail";
import Mv from "./pages/mv";
import Singer from "./pages/singer";
import Top from "./pages/top";
import User from "./pages/user";

const Routers: React.FunctionComponent = () => {
    return (
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route exact path="/top">
                <Top />
            </Route>
            <Route exact path="/hotDetail">
                <HotDetail />
            </Route>
            <Route exact path="/detail/:detailId">
                <Detail />
            </Route>
            <Route exact path="/album/:albumId">
                <Album />
            </Route>
            <Route exact path="/singer/:singerId">
                <Singer />
            </Route>
            <Route exact path="/user/:userId">
                <User />
            </Route>
            <Route exact path="/mv/:mvId">
                <Mv />
            </Route>
        </Switch>
    );
};

export default Routers;
