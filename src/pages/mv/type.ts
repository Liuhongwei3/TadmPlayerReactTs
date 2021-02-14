export interface Br {
    size: number;
    br: number;
    point: number;
}

export interface Artist {
    id: number;
    name: string;
    img1v1Url?: any;
    followed: boolean;
    alias?: string[];
    transNames?: string[];
}

export interface Data {
    id: number;
    name: string;
    artistId: number;
    artistName: string;
    briefDesc: string;
    desc: string;
    cover: string;
    coverId_str: string;
    coverId: number;
    playCount: number;
    subCount: number;
    shareCount: number;
    commentCount: number;
    duration: number;
    nType: number;
    publishTime: string;
    price?: any;
    brs: Br[];
    artists: Artist[];
    commentThreadId: string;
    videoGroup: any[];
}

export interface IMvDetailRes {
    loadingPic: string;
    bufferPic: string;
    loadingPicFS: string;
    bufferPicFS: string;
    subed: boolean;
    data: Data;
    code: number;
}

export interface IMvUrl {
    id: number;
    url: string;
    r: number;
    size: number;
    md5: string;
    code: number;
    expi: number;
    fee: number;
    mvFee: number;
    st: number;
    promotionVo?: any;
    msg: string;
}

export interface IMvUrlRes {
    code: number;
    data: IMvUrl;
}

export interface Mv {
    id: number;
    cover: string;
    name: string;
    playCount: number;
    briefDesc: string;
    desc?: any;
    artistName: string;
    artistId: number;
    duration: number;
    mark: number;
    artists: Artist[];
    alg: string;
}

export interface ISimiMvRes {
    mvs: Mv[];
    code: number;
}
