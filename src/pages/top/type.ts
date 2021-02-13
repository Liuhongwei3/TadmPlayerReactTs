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

// type : 地区 1: 华语 2: 欧美 3: 韩国 4: 日本
export enum ESingerType {
    CHINESE = 1,
    ENGLISH,
    KOREAN,
    JAPANESE,
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
	alias: string[];
	trans: string;
	musicSize: number;
	topicPerson: number;
	lastRank: number;
	score: number;
	picId_str: string;
	transNames: string[];
	img1v1Id_str: string;
}

export interface List {
	artists: Artist[];
	updateTime: number;
	type: number;
}

export interface ITopSingerRes {
	list: List;
	code: number;
}
