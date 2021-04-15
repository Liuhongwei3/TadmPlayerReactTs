import React from "react";
import { autorun, makeAutoObservable } from "mobx";
import enUS from "antd/lib/locale/en_US";
import zhCN from "antd/lib/locale/zh_CN";
import {
    DEFAULT_ALBUM_ID,
    DEFAULT_DETAIL_ID,
    DEFAULT_MV_ID,
    DEFAULT_SINGER_ID,
    DEFAULT_USER_ID,
} from "../web-config/defaultConfig";
import { IUserPlaylist } from "../pages/user/type";
import req from "../api/req";

const LIMIT = 999;

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
    userPlaylists: IUserPlaylist[] = [];

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    updateCurRoute(route: string[]) {
        this.curRoute = route;
    }

    updateCurAlbumId(id: number) {
        this.curAlbumId = id || DEFAULT_ALBUM_ID;
    }

    updateCurDetailId(id: number) {
        this.curDetailId = id || DEFAULT_DETAIL_ID;
    }

    updateCurSingerId(id: number) {
        this.curSingerId = id || DEFAULT_SINGER_ID;
    }

    updateCurUserId(id: number) {
        this.curUserId = id || DEFAULT_USER_ID;
    }

    updateCurMvId(id: number) {
        this.curMvId = id || DEFAULT_MV_ID;
    }

    changeLocale() {
        this.locale = this.locale.locale === "zh-cn" ? enUS : zhCN;
    }

    updateUserInfo(userId: number, userName: string, userCover: string) {
        this.userInfo = { userId, userName, userCover };
    }

    updateUserPlaylists(playlists: IUserPlaylist[]) {
        this.userPlaylists = playlists;
    }
}

const root = new Root();
export const RootStore = React.createContext(root);

autorun(() => {
    const uid = root.userInfo.userId;
    if (!uid) return;
    req.netease.userPlaylist(uid, LIMIT).then((res) => {
        root.updateUserPlaylists(res.playlist);
    });
});
