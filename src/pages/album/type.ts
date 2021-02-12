export interface Ar {
	id: number;
	name: string;
	alia: string[];
}

export interface Al {
	id: number;
	name: string;
	picUrl: string;
	pic_str: string;
	pic: number;
}

export interface FreeTrialPrivilege {
	resConsumable: boolean;
	userConsumable: boolean;
}

export interface ChargeInfoList {
	rate: number;
	chargeUrl?: any;
	chargeMessage?: any;
	chargeType: number;
}

export interface Privilege {
	id: number;
	fee: number;
	payed: number;
	st: number;
	pl: number;
	dl: number;
	sp: number;
	cp: number;
	subp: number;
	cs: boolean;
	maxbr: number;
	fl: number;
	toast: boolean;
	flag: number;
	preSell: boolean;
	playMaxbr: number;
	downloadMaxbr: number;
	freeTrialPrivilege: FreeTrialPrivilege;
	chargeInfoList: ChargeInfoList[];
}

export interface Song {
	rtUrls: any[];
	ar: Ar[];
	al: Al;
	st: number;
	noCopyrightRcmd?: any;
	djId: number;
	no: number;
	fee: number;
	v: number;
	mv: number;
	cd: string;
	rtype: number;
	rurl?: any;
	pst: number;
	t: number;
	alia?: any[];
	pop: number;
	rt: string;
	mst: number;
	cp: number;
	crbt?: any;
	cf: string;
	dt: number;
	rtUrl?: any;
	ftype: number;
	name: string;
	id: number;
	privilege: Privilege;
}

export interface Artist {
	img1v1Id: number;
	topicPerson: number;
	picId: number;
	briefDesc: string;
	musicSize: number;
	albumSize: number;
	followed: boolean;
	img1v1Url: string;
	trans: string;
	picUrl: string;
	name: string;
	id: number;
	picId_str: string;
	img1v1Id_str: string;
}

export interface ResourceInfo {
	id: number;
	userId: number;
	name: string;
	imgUrl: string;
	creator?: any;
	encodedId?: any;
	subTitle?: any;
	webUrl?: any;
}

export interface CommentThread {
	id: string;
	resourceInfo: ResourceInfo;
	resourceType: number;
	commentCount: number;
	likedCount: number;
	shareCount: number;
	hotCount: number;
	latestLikedUsers?: any;
	resourceId: number;
	resourceOwnerId: number;
	resourceTitle: string;
}

export interface Info {
	commentThread: CommentThread;
	latestLikedUsers?: any;
	liked: boolean;
	comments?: any;
	resourceType: number;
	resourceId: number;
	commentCount: number;
	likedCount: number;
	shareCount: number;
	threadId: string;
}

export interface Album {
	songs: any[];
	paid: boolean;
	onSale: boolean;
	mark: number;
	copyrightId: number;
	picId: number;
	artist: Artist;
	company: string;
	briefDesc: string;
	publishTime: number;
	commentThreadId: string;
	picUrl: string;
	pic: number;
	blurPicUrl: string;
	companyId: number;
	description?: any;
	tags: string;
	status: number;
	subType: string;
	name: string;
	id: number;
	type: string;
	size: number;
	picId_str: string;
	info: Info;
}

export interface IAlbumRes {
	songs: Song[];
	code: number;
	album: Album;
}

export interface IAlbumDetailCount {
	onSale: boolean;
	albumGameInfo?: any;
	commentCount: number;
	likedCount: number;
	shareCount: number;
	isSub: boolean;
	subTime: number;
	subCount: number;
	code: number;
}
