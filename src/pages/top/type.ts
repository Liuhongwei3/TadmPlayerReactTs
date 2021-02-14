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

export interface TagSign {
	br: number;
	type: string;
	tagSign: string;
	mvtype: string;
	resolution: number;
}

export interface Video {
	tagSign: TagSign;
	tag: string;
	url: string;
	duration: number;
	size: number;
	width: number;
	height: number;
	container: string;
	md5: string;
	check: boolean;
}

export interface Mv {
	authId: number;
	status: number;
	id: number;
	title: string;
	subTitle: string;
	appTitle: string;
	aliaName: string;
	transName: string;
	pic4v3: number;
	pic16v9: number;
	caption: number;
	captionLanguage: string;
	style?: any;
	mottos: string;
	oneword?: any;
	appword: string;
	stars?: any;
	desc: string;
	area: string;
	type: string;
	subType: string;
	neteaseonly: number;
	upban: number;
	topWeeks: string;
	publishTime: string;
	online: number;
	score: number;
	plays: number;
	monthplays: number;
	weekplays: number;
	dayplays: number;
	fee: number;
	artists: Artist[];
	videos: Video[];
}

export interface Data {
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
	mv: Mv;
	lastRank: number;
	score: number;
	subed: boolean;
	artists: Artist[];
}

export interface ITopMvRes {
	code: number;
	data: Data[];
	hasMore: boolean;
	updateTime: number;
}