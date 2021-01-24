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
    all: { name: string };
    categories: { [key: string]: string };
    sub: ICat[];
}
