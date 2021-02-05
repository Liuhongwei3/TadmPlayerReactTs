export interface ITopListRes {
    artistToplist: {
        coverUrl: string;
        name: string;
        position: number;
        upateFrequency: string;
        updateFrequency: string;
    };
    code: number;
    list: ITopList[];
}

export interface ITopList {
    id: number;
    name: string;
    userId: number;
    playCount: number;
    updateTime: number;
    updateFrequency: string;
    coverImgUrl: string;
    description: string;
}
