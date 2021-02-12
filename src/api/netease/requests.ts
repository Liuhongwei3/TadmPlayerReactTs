import api from "../index";
import { ITopListRes } from "../../pages/top/type";
import { IHotDetailCats, IHotdetailRes } from "../../pages/hot-detail/type";
import {
    IBannerRes,
    INewSongsRes,
    IPersonPushRes,
    IRecomDetailRes,
    IRecommendMvRes,
} from "../../pages/home/type";
import { IUserDetail } from "../../pages/user/type";
import {
    IDetailRes,
    IDetailSubUsersRes,
    ISimilarDetailsRes,
    ISongsRes,
} from "../../pages/detail/type";
import { IAlbumDetailCount, IAlbumRes } from "../../pages/album/type";
import { ICommentsRes } from "../../pages/commType";

// -----------------------------------------------------
// 首页

// 0: pc
// 1: android
// 2: iphone
// 3: ipad
const getBanner = (type = 0) => {
    return api.get<IBannerRes>(`/banner?type=${type}`);
};

const getRecomDetails = (limit = 16) => {
    return api.get<IRecomDetailRes>(`/personalized?limit=${limit}`);
};

const getPerPush = () => {
    return api.get<IPersonPushRes>(`/personalized/privatecontent`);
};

const getNewSongs = (limit = 16) => {
    return api.get<INewSongsRes>(`/personalized/newsong?limit=${limit}`);
};

const getNewMvs = () => {
    return api.get<IRecommendMvRes>(`/personalized/mv`);
};

// ----------------------------------------------------------
// 巅峰榜

const toplist = () => {
    return api.get<ITopListRes>(`/toplist`);
};

// -----------------------------------------------------------
// 热门歌单

const hotDetailCats = () => {
    return api.get<IHotDetailCats>(`/playlist/catlist`);
};

const hotDetails = (cat = "全部", limit = 24) => {
    return api.get<IHotdetailRes>(`/top/playlist?cat=${cat}&limit=${limit}`);
};

// ---------------------------------------------------------------------
// 用户

const userDetail = (uid: number) => {
    return api.get<IUserDetail>(`/user/detail?uid=${uid}`);
};

// ----------------------------------------------------------------------
// 歌单详情

const playlistdetail = (id: number | string) => {
    return api.get<IDetailRes>(`/playlist/detail?id=${id}`);
};

const detailComment = (
    id: number | string,
    limit = 10,
    offset?: number,
    before?: number
) => {
    const base = `/comment/playlist?id=${id}&limit=${limit}`;
    const optional1 = offset ? `&offset=${offset}` : "";
    const optional2 = before ? `&before=${before}` : "";
    return api.get<ICommentsRes>(`${base}${optional1}${optional2}`);
};

const detailSubscribe = (id: string | number, limit = 20, offset?: number) => {
    const optional = offset ? `&offset=${offset}` : "";
    return api.get<IDetailSubUsersRes>(
        `/playlist/subscribers?id=${id}&limit=${limit}${optional}`
    );
};

const getSimiDetails = (id: number) => {
    return api.get<ISimilarDetailsRes>(`/related/playlist?id=${id}`);
};

// ---------------------------------------------------------------------
// 专辑详情
const albumDetail = (id: number) => {
    return api.get<IAlbumRes>(`/album?id=${id}`);
};

const albumDetailCount = (id: number) => {
    return api.get<IAlbumDetailCount>(`/album/detail/dynamic?id=${id}`);
};

const AlbumComments = (
    id: number,
    limit = 10,
    offset?: number,
    before?: number
) => {
    const base = `/comment/album?id=${id}&limit=${limit}`;
    const optional1 = offset ? `&offset=${offset}` : "";
    const optional2 = before ? `&before=${before}` : "";
    return api.get<ICommentsRes>(`${base}${optional1}${optional2}`);
};

// ----------------------------------------------------------------------
// 歌曲详情

const getMusicDetail = (ids: string) => {
    return api.get<ISongsRes>(`/song/detail?ids=${ids}`);
};

// ----------------------------------------------------------------------
// MV

// ----------------------------------------------------------------------
// 视频
const reqFuncs = {
    getBanner,
    getRecomDetails,
    getPerPush,
    getNewSongs,
    getNewMvs,
    toplist,
    hotDetailCats,
    hotDetails,
    userDetail,
    playlistdetail,
    detailComment,
    detailSubscribe,
    getSimiDetails,
    getMusicDetail,
    albumDetail,
    albumDetailCount,
    AlbumComments,
};

export default reqFuncs;
