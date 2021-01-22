import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./pages/home";

const Routers: React.FunctionComponent = () => {
    return (
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
        </Switch>
    );
};

export default Routers;
