export interface IHotdetailRes {
    total: number;
    code: number;
    more: boolean;
    cat: string;
    playlists: IHotDetail[];
}

export interface IHotDetail {
    id: number;
    name: string;
    userId: number;
    creator: { nickname: string };
    playCount: number;
    updateTime: number;
    coverImgUrl: string;
    description: string;
}

export interface ICat {
    name: string;
    type: number;
    category: number;
    resourceType: number;
    hot: boolean;
    activity: boolean;
}
export interface IHotDetailCats {
    code: number;
    sub: ICat[];
    all: { name: string };
    categories: { [key: string]: string };
}
