export enum EPlayMode {
    ORDER,
    RANDOM,
    SINGLE,
    HEART,
}

export const IPlayModeText: Record<EPlayMode, string> = {
    [EPlayMode.ORDER]: "顺序播放",
    [EPlayMode.RANDOM]: "随机播放",
    [EPlayMode.SINGLE]: "单曲循环",
    [EPlayMode.HEART]: "心动模式",
};

export enum EDetailSongOprType {
    ADD = "add",
    DELETE = "del",
}

export enum ETartgetType {
    SONG = 1,
    ALBUM = 10,
    SINGER = 100,
    DETAIL = 1000,
    USER = 1002,
    MV = 1004,
    JUMP = 3000,
}

export enum ESearchType {
    SONG = 1,
    ALBUM = 10,
    SINGER = 100,
    DETAIL = 1000,
    USER = 1002,
    MV = 1004,
    LYRIC = 1006,
    DJ_RADIO = 1009,
    VIDEO = 1014,
    ALL = 1018,
}

export enum EOrderType {
    HOT = "hot",
    TIME = "time",
}

// type : 地区 1: 华语 2: 欧美 3: 韩国 4: 日本
export enum ESingerType {
    CHINESE = 1,
    ENGLISH,
    KOREAN,
    JAPANESE,
}

// 18 分享单曲
// 19 分享专辑
// 17、28 分享电台节目
// 22 转发
// 39 发布视频
// 13 分享歌单
// 24 分享专栏文章
// 41、21 分享视频
// 35 发布动态
export enum EEventType {
    SHARE_DETAIL = 13,
    SHARE_DJ_PROGRAM = 17,
    SHARE_SONG = 18,
    SHARE_ALBUM = 19,
    SHARE_MV = 21,
    REWARD = 22,
    SHARE_ARTICLE = 24,
    SHARE_DJ_RADIO = 28,
    PUBILSH_EVENT = 35,
    PUBLISH_VIDEO = 39,
    SHARE_VIDEO = 41,
}

export const IEventTypeText: Record<EEventType, string> = {
    [EEventType.SHARE_DETAIL]: "分享歌单",
    [EEventType.SHARE_DJ_PROGRAM]: "分享节目",
    [EEventType.SHARE_SONG]: "分享单曲",
    [EEventType.SHARE_ALBUM]: "分享专辑",
    [EEventType.SHARE_MV]: "分享 MV",
    [EEventType.REWARD]: "转发",
    [EEventType.SHARE_ARTICLE]: "发布专栏文章",
    [EEventType.SHARE_DJ_RADIO]: "分享电台",
    [EEventType.PUBILSH_EVENT]: "发布动态",
    [EEventType.PUBLISH_VIDEO]: "发布视频",
    [EEventType.SHARE_VIDEO]: "分享视频",
};
