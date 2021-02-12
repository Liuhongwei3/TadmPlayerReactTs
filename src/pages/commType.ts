export interface Associator {
    vipCode: number;
    rights: boolean;
}

export interface VipRight {
    associator: Associator;
    musicPackage?: any;
    redVipAnnualCount: number;
    redVipLevel: number;
}

export interface User {
    locationInfo?: any;
    liveInfo?: any;
    anonym: number;
    avatarDetail?: any;
    userId: number;
    userType: number;
    remarkName?: any;
    vipRights: VipRight;
    nickname: string;
    avatarUrl: string;
    authStatus: number;
    expertTags?: any;
    experts?: any;
    vipType: number;
}

export interface PendantData {
    id: number;
    imageUrl: string;
}

export interface IHotComment {
    user: User;
    beReplied: any[];
    pendantData: PendantData;
    showFloorComment?: any;
    status: number;
    commentId: number;
    content: string;
    time: number;
    likedCount: number;
    expressionUrl?: any;
    commentLocationType: number;
    parentCommentId: number;
    repliedMark?: any;
    liked: boolean;
}

export interface ICommReply {
    user: User;
    beRepliedCommentId: number;
    content: string;
    status: number;
    expressionUrl?: any;
}

export interface IComment {
    user: User;
    beReplied: any[];
    pendantData?: any;
    showFloorComment?: any;
    status: number;
    commentId: number;
    content: string;
    time: number;
    likedCount: number;
    expressionUrl?: any;
    commentLocationType: number;
    parentCommentId: number;
    repliedMark?: any;
    liked: boolean;
}

export interface ICommentsRes {
    isMusician: boolean;
    userId: number;
    topComments: any[];
    moreHot?: boolean;
    hotComments?: IHotComment[];
    code: number;
    comments: IComment[];
    total: number;
    more: boolean;
}
