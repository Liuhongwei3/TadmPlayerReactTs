import { makeAutoObservable } from "mobx";
import React from "react";

class Root {
    curRoute = ["home"];

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    updateCurRoute(route: string[]) {
        this.curRoute = route;
    }
}

export const RootStore = React.createContext(new Root());
