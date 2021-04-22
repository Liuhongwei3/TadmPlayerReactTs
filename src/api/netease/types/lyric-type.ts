export interface TransUser {
    id: number;
    status: number;
    demand: number;
    userid: number;
    nickname: string;
    uptime: number;
}

export interface LyricUser {
    id: number;
    status: number;
    demand: number;
    userid: number;
    nickname: string;
    uptime: number;
}

export interface Lrc {
    version: number;
    lyric: string;
}

export interface Klyric {
    version: number;
    lyric: string;
}

export interface Tlyric {
    version: number;
    lyric: string;
}

export interface ILyricRes {
    nolyric?: boolean;
    nocollected?: boolean;
    sgc: boolean;
    sfy: boolean;
    qfy: boolean;
    transUser?: TransUser;
    lyricUser?: LyricUser;
    lrc: Lrc;
    klyric: Klyric;
    tlyric: Tlyric;
    code: number;
}

export interface ILyric {
    time: number;
    text: string;
}
export interface ITLyric {
    time: number;
    text: string;
    texts: string[];
}

export interface ILyrics {
    lrcTime: Map<number, number>;
    lrcMap: Map<number, string>;
    tlrcTime: Map<number, number>;
    tlrcMap: Map<number, string>;
    lyric: ILyric[];
    tlyric: ILyric[];
    transUser?: TransUser;
    lyricUser?: LyricUser;
}
