export interface ISinger {
	info: string;
	id: number;
	name: string;
	trans?: any;
	alias: any[];
	albumSize: number;
	mvSize: number;
	picId: number;
	picUrl: string;
	img1v1Url: string;
}

export interface ISingersRes {
	data: ISinger[];
	hasMore: boolean;
	count: number;
	code: number;
}

export interface Creator {
	userId: number;
	userName: string;
}

export interface IMv {
	type: number;
	title: string;
	durationms: number;
	creator: Creator[];
	playTime: number;
	coverUrl: string;
	vid: string;
	aliaName: string;
	transName: string;
	alg?: any;
	markTypes?: any;
}

export interface IMvsRes {
	code: number;
	data: IMv[];
	hasMore: boolean;
	count: number;
}

export interface Artist {
	img1v1Id: number;
	topicPerson: number;
	alias: any[];
	picId: number;
	followed: boolean;
	musicSize: number;
	albumSize: number;
	briefDesc: string;
	img1v1Url: string;
	trans: string;
	picUrl: string;
	name: string;
	id: number;
	img1v1Id_str: string;
}

export interface IAlbum {
	subTime: number;
	msg: any[];
	alias: any[];
	artists: Artist[];
	picId: number;
	picUrl: string;
	name: string;
	id: number;
	size: number;
	transNames: any[];
}

export interface IAlbumsRes {
	data: IAlbum[];
	count: number;
	hasMore: boolean;
	paidCount: number;
	code: number;
}
