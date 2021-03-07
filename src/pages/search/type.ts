export interface Hot {
    first: string;
    second: number;
    third?: any;
    iconType: number;
}

export interface IHotSearchRes {
    code: number;
    result: { hots: Hot[] };
}

export interface IHotSearchDetail {
    searchWord: string;
    score: number;
    content: string;
    source: number;
    iconType: number;
    iconUrl?: string;
    url: string;
    alg: string;
}

export interface IHotSearchDetailRes {
    code: number;
    data: IHotSearchDetail[];
    message: string;
}

export interface AllMatch {
    keyword: string;
    type: number;
    alg: string;
    lastKeyword: string;
    feature: string;
}

export interface Result {
    allMatch: AllMatch[];
}

export interface ISearchSuggestRes {
    result: Result;
    code: number;
}

export interface Artist {
    id: number;
    name: string;
    picUrl: string;
    alias: any[];
    albumSize: number;
    picId: number;
    img1v1Url: string;
    img1v1: number;
    mvSize: number;
    musicSize: number;
    followed: boolean;
    trans?: any;
}

export interface Song {
    index: number;
    id: number;
    name: string;
    artists: Artist[];
    album: Album;
    duration: number;
    copyrightId: number;
    status: number;
    alias: any[];
    rtype: number;
    ftype: number;
    mvid: number;
    fee: number;
    rUrl?: any;
    mark: number;
    lyrics: Lyric;
}

export interface ISong {
    songs: Song[];
    hasMore: boolean;
    songCount: number;
}

export interface ISinger {
    artistCount: number;
    hasMore: boolean;
    artists: Artist[];
}

export interface Album {
    name: string;
    id: number;
    type: string;
    size: number;
    picId: number;
    blurPicUrl: string;
    companyId: number;
    pic: number;
    picUrl: string;
    publishTime: number;
    description: string;
    tags: string;
    company: string;
    briefDesc: string;
    artist: Artist;
    songs?: any;
    alias: any[];
    status: number;
    copyrightId: number;
    commentThreadId: string;
    artists: Artist[];
    paid: boolean;
    onSale: boolean;
    alg: string;
    mark: number;
    containedSong: string;
}

export interface IAlbum {
    albums: Album[];
    albumCount: number;
}

export interface Creator {
    nickname: string;
    userId: number;
    userType: number;
    authStatus: number;
    expertTags?: any;
    experts?: any;
}

export interface Playlist {
    id: number;
    name: string;
    coverImgUrl: string;
    creator: Creator;
    subscribed: boolean;
    trackCount: number;
    userId: number;
    playCount: number;
    bookCount: number;
    specialType: number;
    officialTags?: any;
    description?: any;
    highQuality: boolean;
    alg: string;
}

export interface IDetail {
    playlists: Playlist[];
    hasMore: boolean;
    playlistCount: number;
}

export interface Lyric {
    txt: string;
    range: Range[];
}

export interface ILyric {
    songs: Song[];
    songCount: number;
}

export interface Userprofile {
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
    avatarDetail?: any;
    anchor: boolean;
    avatarImgIdStr: string;
    backgroundImgIdStr: string;
    avatarImgId_str: string;
    alg: string;
}

export interface IUser {
    hasMore: boolean;
    userprofileCount: number;
    userprofiles: Userprofile[];
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
    arTransName: string;
    artists: Artist[];
    transNames?: any;
    alias?: any;
    alg: string;
}

export interface IMv {
    mvCount: number;
    mvs: Mv[];
}

export interface ISearchs extends ISong, ISinger, IAlbum, IDetail, IUser, IMv {
    id: number;
}
