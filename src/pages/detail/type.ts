export interface IDetailRes {
    code: number;
    relatedVideos?: any;
    playlist: IPlaylist;
    urls?: any;
    privileges: any[];
}

export interface ISubscriber {
    defaultAvatar: boolean;
    province: number;
    authStatus: number;
    followed: boolean;
    avatarUrl: string;
    accountStatus: number;
    gender: number;
    city: number;
    birthday: number;
    userId: number;
    userType: number;
    nickname: string;
    signature: string;
    description: string;
    detailDescription: string;
    backgroundUrl: string;
    authority: number;
    mutual: boolean;
    expertTags?: any;
    experts?: any;
    djStatus: number;
    vipType: number;
    remarkName?: any;
	subscribeTime?: number;
    authenticationTypes: number;
    avatarDetail?: any;
    anchor: boolean;
}

export interface ICreator {
    defaultAvatar: boolean;
    province: number;
    authStatus: number;
    followed: boolean;
    avatarUrl: string;
    accountStatus: number;
    gender: number;
    city: number;
    birthday: number;
    userId: number;
    userType: number;
    nickname: string;
    signature: string;
    description: string;
    detailDescription: string;
    avatarImgId: number;
    backgroundImgId: number;
    backgroundUrl: string;
    authority: number;
    mutual: boolean;
    expertTags?: any;
    experts?: any;
    djStatus: number;
    vipType: number;
    remarkName?: any;
    authenticationTypes: number;
    backgroundImgIdStr: string;
    avatarImgIdStr: string;
    anchor: boolean;
    avatarImgId_str: string;
}

export interface IPlaylist {
    subscribers: ISubscriber[];
    subscribed: boolean;
    creator: ICreator;
    videoIds?: any;
    videos?: any;
    trackIds: ITrackId[];
    updateFrequency?: any;
    backgroundCoverId: number;
    backgroundCoverUrl?: any;
    titleImage: number;
    titleImageUrl?: any;
    englishTitle?: any;
    opRecommend: boolean;
    adType: number;
    trackNumberUpdateTime: number;
    subscribedCount: number;
    cloudTrackCount: number;
    userId: number;
    createTime: number;
    highQuality: boolean;
    updateTime: number;
    coverImgId: number;
    newImported: boolean;
    trackCount: number;
    coverImgUrl: string;
    specialType: number;
    commentThreadId: string;
    trackUpdateTime: number;
    privacy: number;
    playCount: number;
    ordered: boolean;
    tags: string[];
    description: string;
    status: number;
    name: string;
    id: number;
    shareCount: number;
    coverImgId_str: string;
    commentCount: number;
}

export interface ITrackId {
    id: number;
    v: number;
    at: number;
    alg?: any;
    lr: number;
}

export interface Ar {
    id: number;
    name: string;
    tns: any[];
    alias: any[];
}

export interface Al {
    id: number;
    name: string;
    picUrl: string;
    tns: any[];
    pic_str: string;
    pic: number;
}

export interface ISong {
    name: string;
    id: number;
    pst: number;
    t: number;
    ar: Ar[];
    alia?: any[];
    pop: number;
    st: number;
    rt: string;
    fee: number;
    v: number;
    cf: string;
    al: Al;
    dt: number;
    cd: string;
    no: number;
    rtUrl?: any;
    ftype: number;
    rtUrls: any[];
    djId: number;
    copyright: number;
    s_id: number;
    mark: number;
    originCoverType: number;
    originSongSimpleData?: any;
    single: number;
    noCopyrightRcmd?: any;
    mv: number;
    rtype: number;
    rurl?: any;
    mst: number;
    cp: number;
    publishTime: number;
}

export interface ISongsRes {
    songs: ISong[];
    code: number;
}

export interface IDetailSubUsersRes {
    total: number;
    code: number;
    more: boolean;
    subscribers: ISubscriber[];
}

export interface Creator {
	userId: string;
	nickname: string;
}

export interface Playlist {
	creator: Creator;
	coverImgUrl: string;
	name: string;
	id: string;
}

export interface ISimilarDetailsRes {
	code: number;
	playlists: Playlist[];
}
