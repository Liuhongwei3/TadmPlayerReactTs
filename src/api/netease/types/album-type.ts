export enum EAlbumType {
    ALBUM, // 数字专辑
    SONG, // 数字单曲
}

export enum EALbumTopType {
    DAILY = "daily",
    WEEK = "week",
    YEAR = "year",
    TOTAL = "total",
}

export interface Product {
    newAlbum: boolean;
    albumId: number;
    albumName: string;
    artistName: string;
    coverUrl: string;
    saleNum: number;
    period: number;
    rank: number;
    rankIncr: number;
    newest: boolean;
    price: number;
    albumType: number;
    status: number;
    saleType: number;
    bundling: number;
}

export interface ITopAlbumRes {
    products: Product[];
    code: number;
}
