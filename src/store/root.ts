import React from "react";
import { makeAutoObservable } from "mobx";
import enUS from "antd/lib/locale/en_US";
import zhCN from "antd/lib/locale/zh_CN";
import {
    DEFAULT_ALBUM_ID,
    DEFAULT_DETAIL_ID,
    DEFAULT_MV_ID,
    DEFAULT_SINGER_ID,
    DEFAULT_USER_ID,
} from "../web-config/defaultConfig";

class Root {
    locale = zhCN;
    curRoute = ["home"];
    curAlbumId = DEFAULT_ALBUM_ID;
    curDetailId = DEFAULT_DETAIL_ID;
    curSingerId = DEFAULT_SINGER_ID;
    curUserId = DEFAULT_USER_ID;
    curMvId = DEFAULT_MV_ID;

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

    updateCurAlbumId(id: number) {
        this.curAlbumId = id;
    }

    updateCurDetailId(id: number) {
        this.curDetailId = id;
    }

    updateCurSingerId(id: number) {
        this.curSingerId = id;
    }

    updateCurUserId(id: number) {
        this.curUserId = id;
    }

    updateCurMvId(id: number) {
        this.curMvId = id;
    }

    changeLocale() {
        this.locale = this.locale.locale === "zh-cn" ? enUS : zhCN;
    }

    updateUserInfo(userId: number, userName: string, userCover: string) {
        this.userInfo = { userId, userName, userCover };
    }
}

export const RootStore = React.createContext(new Root());
