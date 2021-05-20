export interface UserPoint {
    userId: number;
    balance: number;
    updateTime: number;
    version: number;
    status: number;
    blockBalance: number;
}

export interface Profile {
    remarkName?: any;
    expertTags?: any;
    allAuthTypes?: AllAuthType[];
    artistId?: number;
    mainAuthType?: MainAuthType;
    followTime?: any;
    artistName?: string;
    vipType: number;
    userType: number;
    createTime: number;
    nickname: string;
    avatarUrl: string;
    mutual: boolean;
    followed: boolean;
    authStatus: number;
    detailDescription: string;
    djStatus: number;
    accountStatus: number;
    birthday: number;
    gender: number;
    province: number;
    city: number;
    defaultAvatar: boolean;
    avatarImgId: number;
    backgroundImgId: number;
    backgroundUrl: string;
    backgroundImgIdStr: string;
    avatarImgIdStr: string;
    description: string;
    userId: number;
    signature: string;
    authority: number;
    followeds: number;
    follows: number;
    blacklist: boolean;
    eventCount: number;
    allSubscribedCount: number;
    playlistBeSubscribedCount: number;
    avatarImgId_str: string;
    followMe: boolean;
    artistIdentity: any;
    cCount: number;
    sDJPCount: number;
    playlistCount: number;
    sCount: number;
    newFollows: number;
}

export interface IUserDetail {
    level: number;
    listenSongs: number;
    userPoint: UserPoint;
    mobileSign: boolean;
    pcSign: boolean;
    profile: Profile;
    peopleCanSeeMyPlayRecord: boolean;
    bindings?: Binding[];
    adValid: boolean;
    code: number;
    createTime: number;
    createDays: number;
}

export interface AllAuthType {
    type: number;
    desc: string;
    tags: string[];
}

export interface MainAuthType {
    type: number;
    desc: string;
    tags: string[];
}

export interface Binding {
    expiresIn: number;
    refreshTime: number;
    bindingTime: number;
    tokenJsonStr?: any;
    expired: boolean;
    url: string;
    userId: number;
    id: number;
    type: number;
}

export interface IUserPlaylistRes {
    version: string;
    more: boolean;
    playlist: IUserPlaylist[];
    code: number;
}

export interface Creator {
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
    djStatus: number;
    vipType: number;
    remarkName?: any;
    authenticationTypes: number;
    avatarDetail?: any;
    anchor: boolean;
    avatarImgIdStr: string;
    backgroundImgIdStr: string;
    avatarImgId_str: string;
}

export interface IUserPlaylist {
    subscribers: any[];
    subscribed: boolean;
    creator: Creator;
    artists?: any;
    tracks?: any;
    updateFrequency?: any;
    backgroundCoverId: number;
    backgroundCoverUrl?: any;
    titleImage: number;
    titleImageUrl?: any;
    englishTitle?: any;
    opRecommend: boolean;
    recommendInfo?: any;
    adType: number;
    trackNumberUpdateTime: number;
    subscribedCount: number;
    userId: number;
    createTime: number;
    highQuality: boolean;
    updateTime: number;
    anonimous: boolean;
    newImported: boolean;
    coverImgId: number;
    trackCount: number;
    coverImgUrl: string;
    specialType: number;
    trackUpdateTime: number;
    commentThreadId: string;
    totalDuration: number;
    privacy: number;
    playCount: number;
    cloudTrackCount: number;
    tags: any[];
    ordered: boolean;
    description?: any;
    status: number;
    name: string;
    id: number;
    coverImgId_str: string;
}

export interface Follow {
    py: string;
    time: number;
    nickname: string;
    follows: number;
    followeds: number;
    remarkName?: any;
    mutual: boolean;
    experts?: any;
    gender: number;
    expertTags?: any;
    authStatus: number;
    followed: boolean;
    accountStatus: number;
    vipType: number;
    avatarUrl: string;
    userId: number;
    userType: number;
    signature: string;
    eventCount: number;
    playlistCount: number;
}

export interface IFollowRes {
    follow: Follow[];
    touchCount: number;
    more: boolean;
    code: number;
}

export interface IFollowedRes {
    code: number;
    more: boolean;
    followeds: Follow[];
}

export interface User {
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
    urlAnalyze: boolean;
    vipRights?: any;
    avatarImgId_str: string;
    followeds: number;
}

export interface Pic {
    width: number;
    height: number;
    originUrl: string;
    squareUrl: string;
    rectangleUrl: string;
    pcSquareUrl: string;
    pcRectangleUrl: string;
    format: string;
}

export interface Info {
    latestLikedUsers?: any;
    liked: boolean;
    comments?: any;
    resourceType: number;
    resourceId: number;
    likedCount: number;
    commentCount: number;
    shareCount: number;
    threadId: string;
}

export interface Event {
    actName?: any;
    pendantData?: any;
    forwardCount: number;
    lotteryEventData?: any;
    typeDesc?: any;
    json: string | IJson;
    user: User;
    eventTime: number;
    tmplId: number;
    expireTime: number;
    rcmdInfo?: any;
    pics: Pic[];
    showTime: number;
    actId: number;
    uuid: string;
    id: number;
    type: number;
    topEvent: boolean;
    insiteForwardCount: number;
    info: Info;
}

export interface IUserEventsRes {
    lasttime: number;
    more: boolean;
    size: number;
    events: Event[];
    code: number;
}

export interface Artist {
    name: string;
    id: number;
    picId: number;
    img1v1Id: number;
    briefDesc: string;
    picUrl: string;
    img1v1Url: string;
    albumSize: number;
    trans: string;
    musicSize: number;
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
    songs: any[];
    alias: any[];
    status: number;
    copyrightId: number;
    commentThreadId: string;
    artists: Artist[];
    img80x80?: string;
}

export interface Dj {
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
    avatarImgIdStr: string;
    backgroundImgIdStr: string;
}

export interface DjRadio {
    id: number;
    dj: Dj;
    name: string;
    picUrl: string;
    desc: string;
    subCount: number;
    programCount: number;
    createTime: number;
    categoryId: number;
    category: string;
    radioFeeType: number;
    feeScope: number;
    buyed: boolean;
    videos?: any;
    finished: boolean;
    underShelf: boolean;
    purchaseCount: number;
    price: number;
    originalPrice: number;
    discountPrice?: any;
    lastProgramCreateTime: number;
    lastProgramName?: any;
    lastProgramId: number;
    picId: number;
    rcmdText: string;
    composeVideo: boolean;
    img80x80: string;
}

export interface Mv {
    id: number;
    name: string;
    status: number;
    artist: Artist;
    artistName: string;
    imgurl: string;
    imgurl16v9: string;
    artists: Artist[];
    urlInfo?: any;
    price: number;
    duration: number;
    playCount: number;
    height: number;
    width: number;
}

export interface Song {
    name: string;
    id: number;
    position: number;
    alias: string[];
    status: number;
    fee: number;
    copyrightId: number;
    disc: string;
    no: number;
    artists: Artist[];
    album: Album;
    starred: boolean;
    popularity: number;
    score: number;
    starredNum: number;
    duration: number;
    playedNum: number;
    dayPlays: number;
    hearTime: number;
    ringtone: string;
    crbt?: any;
    audition?: any;
    copyFrom: string;
    commentThreadId: string;
    rtUrl?: any;
    ftype: number;
    rtUrls: any[];
    copyright: number;
    mvid: number;
    mp3Url?: any;
    rtype: number;
    rurl?: any;
    img80x80?: string;
}

export interface Creator {
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
    backgroundImgIdStr: string;
    avatarImgIdStr: string;
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
    subscribed?: any;
    commentThreadId: string;
    newImported: boolean;
    adType: number;
    highQuality: boolean;
    privacy: number;
    ordered: boolean;
    anonimous: boolean;
    recommendInfo?: any;
    extProperties?: any;
    xInfo?: any;
    coverStatus: number;
}

export interface Video {
    coverUrl: string;
    creator: {
        gender: number;
        nickname: string;
    };
    duration: number;
    height: number;
    playTime: number;
    size: number;
    title: string;
    videoId: string;
    width: number;
}

export interface IJson {
    msg: string;
    soundeffectsInfo?: any;
    album?: Album;
    song?: Song;
    playlist?: Playlist;
    mv?: Mv;
    video: Video;
    djRadio?: DjRadio;
    forward?: Event;
    event?: Event;
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

export interface RecSong {
    name: string;
    id: number;
    pst: number;
    t: number;
    ar: Ar[];
    alia?: string[];
    pop: number;
    st: number;
    rt?: any;
    fee: number;
    v: number;
    crbt?: any;
    cf: string;
    al: Al;
    dt: number;
    a?: any;
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
    rtype: number;
    rurl?: any;
    mst: number;
    cp: number;
    mv: number;
    publishTime: number;
    tns: string[];
}

export interface RecSongData {
    playCount: number;
    score: number;
    song: RecSong;
}

export interface IPlayRecRes {
    data: RecSongData[];
    weekData: RecSongData[];
    allData: RecSongData[];
    code: number;
}
