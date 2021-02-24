import { makeAutoObservable } from "mobx";

class Root {
    curRoute = ["home"];

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    updateCurRoute(route: string[]) {
        this.curRoute = route;
    }
}

export const RootStore = new Root();
