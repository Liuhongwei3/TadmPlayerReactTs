import React from "react";
import { makeAutoObservable } from "mobx";
import enUS from "antd/lib/locale/en_US";
import zhCN from "antd/lib/locale/zh_CN";

class Root {
    curRoute = ["home"];
    locale = zhCN;

    userInfo = {
        userId: 0,
        userName: "",
        userCover: "",
    };

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    updateCurRoute(route: string[]) {
        this.curRoute = route;
    }
    changeLocale() {
        this.locale = this.locale.locale === "zh-cn" ? enUS : zhCN;
    }

    updateUserInfo(userId: number, userName: string, userCover: string) {
        this.userInfo = { userId, userName, userCover };
    }
}

export const RootStore = React.createContext(new Root());
