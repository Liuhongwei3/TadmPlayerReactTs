import React from "react";
import { autorun, makeAutoObservable } from "mobx";
import enUS from "antd/lib/locale/en_US";
import zhCN from "antd/lib/locale/zh_CN";
import {
    DEFAULT_ALBUM_ID,
    DEFAULT_DETAIL_ID,
    DEFAULT_MV_ID,
    DEFAULT_SINGER_ID,
    DEFAULT_SONG_ID,
    DEFAULT_USER_ID,
} from "../web-config/defaultConfig";
import { IUserPlaylist } from "../pages/user/type";
import req from "../api/req";
import { ISong } from "../pages/detail/type";
import { isObject, isArray, notify, shuffle } from "../utils";
import {
    CUR_HISTORY_SONGS,
    ECanvasType,
    EMessageType,
    EPlayMode,
    IPlayModeText,
} from "../pages/enums";

const LIMIT = 999;

class Root {
    locale = zhCN;
    curRoute = ["home"];

    curAlbumId = DEFAULT_ALBUM_ID;
    curDetailId = DEFAULT_DETAIL_ID;
    curSingerId = DEFAULT_SINGER_ID;
    curUserId = DEFAULT_USER_ID;
    curMvId = DEFAULT_MV_ID;
    curSongId = DEFAULT_SONG_ID;
    recommSongId = DEFAULT_SONG_ID;
    curPlayMode = EPlayMode.ORDER;
    curSong: ISong | undefined;
    curTime: number = 0;
    curCanvasType: ECanvasType = ECanvasType.SQUARE;
    // curCanvasType: ECanvasType = ECanvasType.CIRCLEBAR;
    // curCanvasType: ECanvasType = ECanvasType.CIRCLEWAVE;
    curCircleCanvasColorIndex: number = 0;
    curLyric: string = "暂无歌词";
    curPlayDetailId: number | undefined;
    curPlaylists: number[] = [DEFAULT_SONG_ID];
    curOrderPlaylists: number[] = [DEFAULT_SONG_ID];
    curRandomPlaylists: number[] = [DEFAULT_SONG_ID];
    curHeartPlaylists: ISong[] = [];
    historyPlaySongs: ISong[] =
        JSON.parse(window.localStorage.getItem(CUR_HISTORY_SONGS) || "[]") ||
        [];

    showUserBackImg: boolean = true;
    showLyrics: boolean = false;
    audioPlaying: boolean = false;
    videoPlaying: boolean = false;

    userInfo = {
        userId: 0,
        userName: "",
        userCover: "",
    };
    userPlaylists: IUserPlaylist[] = [];
    userLikeSongIds: number[] = [];

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

    updateCurTime(time: number) {
        this.curTime = time;
    }

    updateCurCanvasType(type: ECanvasType) {
        if (type !== this.curCanvasType) {
            this.curCanvasType = type;
        }
    }

    updateCurCircleCanvasColorIndex(index: number) {
        this.curCircleCanvasColorIndex = index;
    }

    updateCurLyric(lyric: string) {
        this.curLyric = lyric;
    }

    changeLocale(flag: boolean) {
        this.locale = flag ? zhCN : enUS;
    }

    updateShowUserBackImg(show: boolean) {
        this.showUserBackImg = show;
    }

    toggleShowLyrics(show?: boolean) {
        this.showLyrics = typeof show === "undefined" ? !this.showLyrics : show;
    }

    toggleAudioPlaying(play: boolean) {
        this.audioPlaying = play;
    }

    toggleVideoPlaying(play: boolean) {
        this.videoPlaying = play;
    }

    updateUserInfo(userId: number, userName: string, userCover: string) {
        this.userInfo = { userId, userName, userCover };
    }

    updateUserPlaylists(playlists: IUserPlaylist[]) {
        this.userPlaylists = playlists;
    }

    updateCurSongId(sid: number) {
        this.curSongId = sid;
    }

    updateCurSong(song: ISong) {
        this.curSong = song;
        this.updateCurSongId(song.id);
        this.updateHistoryPlaySongs(song);
    }

    updateCurRecommSongId(id: number) {
        this.recommSongId = id;
    }

    updateCurPlayDetailid(id: number) {
        this.curPlayDetailId = id;
        this.updateCurRecommSongId(this.curSongId);
    }

    updateUserLikeSongIds(ids: number[]) {
        this.userLikeSongIds = ids;
    }

    updateCurPlaylist(ids: number | number[]) {
        this.curPlaylists = [DEFAULT_SONG_ID];
        if (isObject(ids)) {
            this.curPlaylists = ids as number[];
        } else {
            this.curPlaylists.push(ids as number);
        }
    }

    updateCurOrderPlaylist(ids: number[]) {
        this.curOrderPlaylists = ids;
    }

    updateCurRandomPlaylist(ids: number[]) {
        this.curRandomPlaylists = ids;
    }

    updateCurHeartPlaylist(songs: ISong[]) {
        this.curHeartPlaylists = songs;
    }

    updateCurPlayMode() {
        if (this.curPlayMode === EPlayMode.HEART) {
            this.curPlayMode = EPlayMode.ORDER;
        } else {
            this.curPlayMode++;
        }
        notify(EMessageType.INFO, IPlayModeText[this.curPlayMode]);
    }

    updateHistoryPlaySongs(songs: ISong | ISong[]) {
        if (isArray(songs)) {
            this.historyPlaySongs = songs as ISong[];
        } else {
            const index = this.historyPlaySongs
                .map((song) => song.id)
                .findIndex((id) => id === (songs as ISong).id);

            if (index !== -1) {
                this.historyPlaySongs.splice(index, 1);
            }
            this.historyPlaySongs.unshift(songs as ISong);
        }
    }
}

const root = new Root();
export const RootStore = React.createContext(root);

autorun(
    () => {
        const uid = root.userInfo.userId;

        if (!uid) return;

        Promise.all([
            req.netease.userPlaylist(uid, LIMIT),
            req.netease.userLikeSongIds(uid),
        ]).then((res) => {
            root.updateUserPlaylists(res[0].playlist);
            root.updateUserLikeSongIds(res[1].ids);
        });
    },
    {
        // set run time
        scheduler: (run) => {
            run();
        },
    }
);

autorun(() => {
    const sid = root.curSongId;

    if (!sid || (sid && root.curSong && sid === root.curSong.id)) return;

    req.netease.getMusicDetail(sid).then((res) => {
        if (res.songs.length) {
            const song = res.songs[0];
            root.updateCurSong(song);
        }
    });
});

autorun(() => {
    root.updateCurRandomPlaylist(
        shuffle(Array.from(root.curOrderPlaylists) || [DEFAULT_SONG_ID])
    );
});

autorun(() => {
    switch (root.curPlayMode) {
        case EPlayMode.ORDER:
            root.updateCurPlaylist(root.curOrderPlaylists);
            break;
        case EPlayMode.RANDOM:
            root.updateCurPlaylist(root.curRandomPlaylists);
            break;
        case EPlayMode.SINGLE:
            root.updateCurPlaylist([root.curSongId]);
            break;
        case EPlayMode.HEART:
            req.neteaseLogined
                .heartMode(
                    root.recommSongId,
                    root.curPlayDetailId || root.curDetailId
                )
                .then((res) => {
                    root.updateCurPlaylist(
                        res.data.map((song) => song.songInfo.id) ||
                            root.curOrderPlaylists
                    );
                    root.updateCurHeartPlaylist(
                        res.data.map((song) => song.songInfo) ||
                            root.curOrderPlaylists
                    );
                });
            break;
        default:
            root.updateCurPlaylist(root.curOrderPlaylists);
            break;
    }
});

autorun(() => {
    if (window.localStorage) {
        window.localStorage.setItem(
            CUR_HISTORY_SONGS,
            JSON.stringify(root.historyPlaySongs)
        );
    }
});
