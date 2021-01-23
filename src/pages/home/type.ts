export interface IStyledProps {
    width?: number;
    height?: number;
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

export interface IRecomDetail {
    id: number;
    type: number;
    name: string;
    copywriter: string;
    picUrl: string;
    playCount: number;
    trackCount: number;
}

export interface IArtist {
    id: number;
    name: string;
    picUrl: string;
    briefDesc: string;
    albumSize: number;
    musicSize: number;
}

export interface INewSongs {
    id: number;
    type: number;
    name: string;
    copywriter: string;
    picUrl: string;
    song: { artists: IArtist[] };
}
