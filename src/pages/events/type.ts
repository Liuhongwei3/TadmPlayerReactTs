export interface Circle {
	imageUrl: string;
	postCount: string;
	member: string;
}

export interface TailMark {
	markTitle: string;
	markType: string;
	markResourceId: string;
	markOrpheusUrl: string;
	extInfo?: any;
	circle: Circle;
}

export interface ExtParam {}

export interface ExtJsonInfo {
	actId: number;
	actIds: any[];
	uuid: string;
	extType: string;
	extId: string;
	circleId: string;
	circlePubType: string;
	extParams: ExtParam;
	tailMark?: any;
	typeDesc?: any;
}

export interface AvatarDetail {
	userType: number;
	identityLevel: number;
	identityIconUrl: string;
}

export interface User {
	defaultAvatar: boolean;
	province: number;
	authStatus: number;
	followed: boolean;
	avatarUrl: string;
	accountStatus: number;
	gender: number;
	city: number;
	birthday: number;
	userId: number;
	userType: number;
	nickname: string;
	signature: string;
	description: string;
	detailDescription: string;
	avatarImgId: number;
	backgroundImgId: number;
	backgroundUrl: string;
	authority: number;
	mutual: boolean;
	expertTags?: any;
	experts?: any;
	djStatus: number;
	vipType: number;
	remarkName?: any;
	authenticationTypes: number;
	avatarDetail: AvatarDetail;
	backgroundImgIdStr: string;
	anchor: boolean;
	avatarImgIdStr: string;
	urlAnalyze: boolean;
	vipRights?: any;
	avatarImgId_str: string;
	followeds: number;
}

export interface Pic {
	originUrl: string;
	width: number;
	height: number;
	format: string;
	squareUrl: string;
	rectangleUrl: string;
	pcSquareUrl: string;
	pcRectangleUrl: string;
}

export interface ResourceInfo {
	id: number;
	userId: number;
	name: string;
	imgUrl?: any;
	creator?: any;
	artistAreaCode: number;
	subTitle?: any;
	webUrl?: any;
	resourceSpecialType?: any;
	artistId: number;
	eventType: number;
	encodedId?: any;
}

export interface LatestLikedUser {
	s: number;
	t: number;
}

export interface CommentThread {
	id: string;
	resourceInfo: ResourceInfo;
	resourceType: number;
	commentCount: number;
	likedCount: number;
	shareCount: number;
	hotCount: number;
	latestLikedUsers: LatestLikedUser[];
	resourceId: number;
	resourceOwnerId: number;
	resourceTitle: string;
	extProperties?: any;
	xInfo?: any;
}

export interface Info {
	commentThread: CommentThread;
	latestLikedUsers?: any;
	liked: boolean;
	comments?: any;
	resourceType: number;
	resourceId: number;
	threadId: string;
	commentCount: number;
	likedCount: number;
	shareCount: number;
}

export interface Event {
	actName?: any;
	pendantData?: any;
	forwardCount: number;
	lotteryEventData?: any;
	tailMark: TailMark;
	typeDesc?: any;
	extJsonInfo: ExtJsonInfo;
	eventTime: number;
	json: string;
	user: User;
	tmplId: number;
	expireTime: number;
	rcmdInfo?: any;
	pics: Pic[];
	uuid: string;
	actId: number;
	showTime: number;
	id: number;
	type: number;
	topEvent: boolean;
	insiteForwardCount: number;
	info: Info;
}

export interface IEventsRes {
	code: number;
	more: boolean;
	event: Event[];
	lasttime: number;
}