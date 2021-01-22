export interface IBanner {
    imageUrl: string;
    targetId: number;
    targetType: number;
    titleColor: string;
    typeTitle: string;
    url: string;
    scm: string;
}

export interface IRecomDetail {
    id: number
    type: number;
    name: string;
    copywriter: string;
    picUrl: string;
    playCount: number;
    trackCount: number;
}
