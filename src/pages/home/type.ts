export interface IStyledProps {
    width?: number;
    height?: number;
}

export interface IBannerRes {
    code: number;
    banners: IBanner[];
}

export interface IBanner {
    imageUrl: string;
    targetId: number;
    targetType: number;
    titleColor: string;
    typeTitle: string;
    url: string;
    scm: string;
}

export interface IRecomDetailRes {
    hasTaste: number;
    code: number;
    category: number;
    result: IRecomDetail[];
}

export interface IRecomDetail {
    id: number;
    type: number;
    name: string;
    copywriter: string;
    picUrl: string;
    playCount: number;
    trackCount: number;
}

export interface IPersonPushRes {
    code: number;
    name: string;
    result: IPersonPush[];
}

export interface IPersonPush {
    id: number;
    url: string;
    picUrl: string;
    sPicUrl: string;
    type: number;
    copywriter: string;
    name: string;
    alg: string;
}

export interface IArtist {
    id: number;
    name: string;
    picUrl: string;
    briefDesc: string;
    albumSize: number;
    musicSize: number;
}

export interface INewSongsRes {
    code: number;
    category: number;
    result: INewSongs[];
}

export interface INewSongs {
    id: number;
    type: number;
    name: string;
    copywriter: string;
    picUrl: string;
    song: { artists: IArtist[] };
}

export interface IRecommendMvRes {
    code: number;
    category: number;
    result: IRecommendMv[];
}

export interface IArtists {
    id: number;
    name: string;
}

export interface IRecommendMv {
    id: number;
    type: number;
    name: string;
    copywriter: string;
    picUrl: string;
    canDislike: boolean;
    duration: number;
    playCount: number;
    subed: boolean;
    artists: IArtists[];
    artistName: string;
    artistId: number;
    alg: string;
}

export interface Artist {
    id: number;
    name: string;
}

export interface INewMv {
    id: number;
    cover: string;
    name: string;
    playCount: number;
    briefDesc?: any;
    desc?: any;
    artistName: string;
    artistId: number;
    duration: number;
    mark: number;
    subed: boolean;
    artists: Artist[];
}

export interface INewMvRes {
    data: INewMv[];
    code: number;
}
