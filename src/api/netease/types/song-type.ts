export interface FreeTrialPrivilege {
    resConsumable: boolean;
    userConsumable: boolean;
}

export interface FreeTimeTrialPrivilege {
    resConsumable: boolean;
    userConsumable: boolean;
    type: number;
    remainTime: number;
}

export interface ISongUrl {
    id: number;
    url: string | null;
    br: number;
    size: number;
    md5: string;
    code: number;
    expi: number;
    type: string;
    gain: number;
    fee: number;
    uf?: any;
    payed: number;
    flag: number;
    canExtend: boolean;
    freeTrialInfo?: any;
    level: string;
    encodeType: string;
    freeTrialPrivilege: FreeTrialPrivilege;
    freeTimeTrialPrivilege: FreeTimeTrialPrivilege;
    urlSource: number;
}

export interface ISongUrlRes {
    data: ISongUrl[];
    code: number;
}

export interface Artist {
    img1v1Id: number;
    topicPerson: number;
    alias: any[];
    picId: number;
    briefDesc: string;
    musicSize: number;
    albumSize: number;
    followed: boolean;
    img1v1Url: string;
    trans: string;
    picUrl: string;
    name: string;
    id: number;
    img1v1Id_str: string;
}

export interface Album {
    songs: any[];
    paid: boolean;
    onSale: boolean;
    mark: number;
    alias: any[];
    artists: Artist[];
    copyrightId: number;
    picId: number;
    artist: Artist;
    briefDesc: string;
    publishTime: number;
    company?: any;
    commentThreadId: string;
    pic: number;
    picUrl: string;
    companyId: number;
    blurPicUrl: string;
    description: string;
    tags: string;
    status: number;
    subType: string;
    name: string;
    id: number;
    type: string;
    size: number;
    picId_str: string;
}

export interface Song {
    starred: boolean;
    popularity: number;
    starredNum: number;
    playedNum: number;
    dayPlays: number;
    hearTime: number;
    mp3Url: string;
    rtUrls?: any;
    mark: number;
    noCopyrightRcmd?: any;
    originCoverType: number;
    originSongSimpleData?: any;
    alias: any[];
    score: number;
    artists: Artist[];
    copyrightId: number;
    album: Album;
    audition?: any;
    copyFrom: string;
    ringtone: string;
    disc: string;
    no: number;
    fee: number;
    commentThreadId: string;
    mvid: number;
    rurl?: any;
    rtype: number;
    crbt?: any;
    ftype: number;
    rtUrl?: any;
    duration: number;
    position: number;
    status: number;
    name: string;
    id: number;
    recommendReason: string;
    alg: string;
}

export interface ISimiMusicsRes {
    songs: Song[];
    code: number;
}

export interface Creator {
    extProperties?: any;
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
    expertTags: string[];
    djStatus: number;
    vipType: number;
    remarkName?: any;
    avatarImgIdStr: string;
    backgroundImgIdStr: string;
    xInfo?: any;
}

export interface Playlist {
    name: string;
    id: number;
    trackNumberUpdateTime: number;
    status: number;
    userId: number;
    createTime: number;
    updateTime: number;
    subscribedCount: number;
    trackCount: number;
    cloudTrackCount: number;
    coverImgUrl: string;
    coverImgId: number;
    description: string;
    tags: string[];
    playCount: number;
    trackUpdateTime: number;
    specialType: number;
    totalDuration: number;
    creator: Creator;
    tracks?: any;
    subscribers: any[];
    subscribed: boolean;
    commentThreadId: string;
    newImported: boolean;
    adType: number;
    highQuality: boolean;
    privacy: number;
    ordered: boolean;
    anonimous: boolean;
    coverStatus: number;
    recommendInfo?: any;
    recommendReason: string;
    alg: string;
}

export interface ISimiDetailsRes {
    playlists: Playlist[];
    code: number;
}
