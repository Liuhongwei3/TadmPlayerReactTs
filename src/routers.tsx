import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./pages/home";
import HotDetail from "./pages/hotDetail";
import Top from "./pages/top";

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
        </Switch>
    );
};

export default Routers;
