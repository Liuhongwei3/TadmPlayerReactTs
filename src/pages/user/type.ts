export interface UserPoint {
    userId: number;
    balance: number;
    updateTime: number;
    version: number;
    status: number;
    blockBalance: number;
}

export interface Profile {
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
    bindings: [];
    adValid: boolean;
    code: number;
    createTime: number;
    createDays: number;
}
