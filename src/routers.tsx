import React from "react";
import { Route, Switch } from "react-router-dom";
import Detail from "./pages/detail";

import Home from "./pages/home";
import HotDetail from "./pages/hot-detail";
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
            <Route exact path="/user">
                <User />
            </Route>
        </Switch>
    );
};

export default Routers;
