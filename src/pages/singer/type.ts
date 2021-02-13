export interface Artist {
    img1v1Id: number;
    topicPerson: number;
    alias: string[];
    picId: number;
    musicSize: number;
    albumSize: number;
    briefDesc: string;
    followed: boolean;
    img1v1Url: string;
    trans: string;
    picUrl: string;
    name: string;
    id: number;
    publishTime: number;
    accountId: number;
    picId_str: string;
    transNames?: string[];
    img1v1Id_str: string;
    mvSize: number;
}

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

export interface HotSong {
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
    a?: any;
    name: string;
    id: number;
}

export interface ISingerRes {
    artist: Artist;
    hotSongs: HotSong[];
    more: boolean;
    code: number;
}

export interface Ar {
    id: number;
    name: string;
}

export interface Al {
    id: number;
    name: string;
    pic_str: string;
    pic: number;
}

export interface ChargeInfoList {
    rate: number;
    chargeUrl?: any;
    chargeMessage?: any;
    chargeType: number;
}

export interface ISong {
    rtUrls: any[];
    ar: Ar[];
    al: Al;
    st: number;
    noCopyrightRcmd?: any;
    pop: number;
    rt: string;
    mst: number;
    cp: number;
    cf: string;
    dt: number;
    mv: number;
    pst: number;
    t: number;
    alia?: any[];
    djId: number;
    no: number;
    fee: number;
    crbt?: any;
    rtUrl?: any;
    ftype: number;
    v: number;
    rtype: number;
    rurl?: any;
    cd: string;
    name: string;
    id: number;
}

export interface ISongRes {
    songs: ISong[];
    more: boolean;
    total: number;
    code: number;
}

export enum EOrderType {
    HOT = "hot",
    TIME = "time",
}

export interface HotAlbum {
    songs: any[];
    paid: boolean;
    onSale: boolean;
    mark: number;
    alias: any[];
    artists: Artist[];
    copyrightId: number;
    picId: number;
    artist: Artist;
    publishTime: number;
    company: string;
    briefDesc: string;
    commentThreadId: string;
    picUrl: string;
    pic: number;
    companyId: number;
    blurPicUrl: string;
    description: string;
    tags: string;
    status: number;
    subType: string;
    name: string;
    id: number;
    type: string;
    size: number;
    picId_str: string;
}

export interface ISingerAlbumsRes {
    artist: Artist;
    hotAlbums: HotAlbum[];
    more: boolean;
    code: number;
}

export interface ISimiSingersRes {
    code: number;
    artists: Artist[];
}

export interface Mv {
	id: number;
	name: string;
	status: number;
	imgurl16v9: string;
	artist: Artist;
	imgurl: string;
	artistName: string;
	duration: number;
	playCount: number;
	publishTime: string;
	subed: boolean;
}

export interface ISingerMvsRes {
	mvs: Mv[];
	time: number;
	hasMore: boolean;
	code: number;
}

export interface Introduction {
	ti: string;
	txt: string;
}

export interface ISingerDesc {
	introduction: Introduction[];
	briefDesc: string;
	count: number;
	topicData?: any;
	code: number;
}
