import api from "../index";
import { ITopListRes, ITopMvRes, ITopSingerRes } from "../../pages/top/type";
import { IHotDetailCats, IHotdetailRes } from "../../pages/hot-detail/type";
import {
    IBannerRes,
    INewSongsRes,
    IPersonPushRes,
    IRecomDetailRes,
    IRecommendMvRes,
} from "../../pages/home/type";
import {
    IUserEventsRes,
    IFollowedRes,
    IFollowRes,
    IUserDetail,
    IUserPlaylistRes,
} from "../../pages/user/type";
import {
    IDetailRes,
    IDetailSubUsersRes,
    ISimilarDetailsRes,
    ISongsRes,
} from "../../pages/detail/type";
import { IAlbumDetailCount, IAlbumRes } from "../../pages/album/type";
import { ICommentsRes } from "../../pages/commType";
import {
    ISimiSingersRes,
    ISingerAlbumsRes,
    ISingerDesc,
    ISingerMvsRes,
    ISingerRes,
    ISongRes,
} from "../../pages/singer/type";
import { IMvDetailRes, IMvUrlRes, ISimiMvRes } from "../../pages/mv/type";
import {
    IHotSearchDetailRes,
    IHotSearchRes,
    ISearchs,
    ISearchSuggestRes,
} from "../../pages/search/type";
import { EOrderType, ESearchType, ESingerType } from "../../pages/enums";
import { ISongUrlRes } from "./types/song-type";

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

const topSinger = (type = ESingerType.CHINESE) => {
    return api.get<ITopSingerRes>(`/toplist/artist?type=${type}`);
};

const topMv = (limit = 10, area?: string) => {
    const base = `/top/mv?limit=${limit}`;
    const optional1 = area ? `&area=${area}` : "";

    return api.get<ITopMvRes>(`${base}${optional1}`);
};

// -----------------------------------------------------------
// 热门歌单

const hotDetailCats = () => {
    return api.get<IHotDetailCats>(`/playlist/catlist`);
};

const hotDetails = (cat = "全部", limit = 24) => {
    return api.get<IHotdetailRes>(`/top/playlist?cat=${cat}&limit=${limit}`);
};

// -----------------------------------------------------------------------
// 搜索

const hotSearchList = () => {
    return api.get<IHotSearchRes>(`/search/hot`);
};

const hotSearchDetailList = () => {
    return api.get<IHotSearchDetailRes>(`/search/hot/detail`);
};

const searchSuggest = (keyword: string) => {
    return api.get<ISearchSuggestRes>(
        `/search/suggest?keywords=${keyword}&type=mobile`
    );
};

const search = (
    keyword: string,
    type = ESearchType.SONG,
    limit?: number,
    offset?: number
) => {
    const optional1 = limit ? `&limit=${limit}` : "";
    const optional2 = offset ? `&offset=${offset}` : "";

    return api.get<{ result: ISearchs; code: number }>(
        `/search?keywords=${keyword}&type=${type}${optional1}${optional2}`
    );
};

// ---------------------------------------------------------------------
// 用户

const userDetail = (uid: number) => {
    return api.get<IUserDetail>(`/user/detail?uid=${uid}`);
};

const userPlaylist = (uid: number, limit?: number, offset?: number) => {
    const optional1 = limit ? `&limit=${limit - 1}` : "";
    const optional2 = offset ? `&offset=${offset}` : "";

    return api.get<IUserPlaylistRes>(
        `/user/playlist?uid=${uid}${optional1}${optional2}`
    );
};

const userLikeSongIds = (uid: number) => {
    return api.get<{ code: number; ids: number[] }>(`/likelist?uid=${uid}`);
};

const userFollow = (uid: number, limit?: number, offset?: number) => {
    const optional1 = limit ? `&limit=${limit}` : "";
    const optional2 = offset ? `&offset=${offset}` : "";

    return api.get<IFollowRes>(
        `/user/follows?uid=${uid}${optional1}${optional2}`
    );
};

const userFollowed = (uid: number, limit?: number, offset?: number) => {
    const optional1 = limit ? `&limit=${limit}` : "";
    const optional2 = offset ? `&offset=${offset}` : "";

    return api.get<IFollowedRes>(
        `/user/followeds?uid=${uid}${optional1}${optional2}`
    );
};

const userEvent = (uid: number, limit?: number, lasttime?: number) => {
    const optional1 = limit ? `&limit=${limit}` : "";
    const optional2 = lasttime ? `&lasttime=${lasttime}` : "";

    return api.get<IUserEventsRes>(
        `/user/event?uid=${uid}${optional1}${optional2}`
    );
};
const userEventComm = (
    threadId: string,
    limit: number,
    offset?: number,
    before?: number
) => {
    const base = `/comment/event?threadId=${threadId}&limit=${limit}`;
    const optional1 = offset ? `&offset=${offset}` : "";
    const optional2 = offset && before ? `&before=${before}` : "";

    return api.get<ICommentsRes>(`${base}${optional1}${optional2}`);
};

// ----------------------------------------------------------------------
// 歌单详情

const playlistdetail = (id: number, force = false) => {
    const url = force
        ? `/playlist/detail?id=${id}&timestamp=${Date.now()}`
        : `/playlist/detail?id=${id}`;
    return api.get<IDetailRes>(url);
};

const detailComment = (
    id: number,
    limit = 10,
    offset?: number,
    before?: number
) => {
    const base = `/comment/playlist?id=${id}&limit=${limit}`;
    const optional1 = offset ? `&offset=${offset}` : "";
    const optional2 = offset && before ? `&before=${before}` : "";

    return api.get<ICommentsRes>(`${base}${optional1}${optional2}`);
};

// 注意：该接口不会返回所有的收藏者，所以总数应以这里返回的 total 为准 (目前 max --> 2000)
const detailSubscribe = (id: number, limit = 20, offset?: number) => {
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
    const optional2 = offset && before ? `&before=${before}` : "";

    return api.get<ICommentsRes>(`${base}${optional1}${optional2}`);
};

// ----------------------------------------------------------------------
// 歌手
const singerDetail = (sid: number) => {
    return api.get<ISingerRes>(`/artists?id=${sid}`);
};

const singerSongs = (
    sid: number,
    limit = 10,
    offset?: number,
    order?: EOrderType
) => {
    const base = `/artist/songs?id=${sid}&limit=${limit}`;
    const optional1 = offset ? `&offset=${offset}` : "";
    const optional2 = order ? `&order=${order}` : "";

    return api.get<ISongRes>(`${base}${optional1}${optional2}`);
};

const singerAlbums = (sid: number, limit = 10, offset?: number) => {
    const base = `/artist/album?id=${sid}&limit=${limit}`;
    const optional1 = offset ? `&offset=${offset}` : "";

    return api.get<ISingerAlbumsRes>(`${base}${optional1}`);
};

const singerMvs = (sid: number, limit = 10, offset?: number) => {
    const base = `/artist/mv?id=${sid}&limit=${limit}`;
    const optional1 = offset ? `&offset=${offset}` : "";

    return api.get<ISingerMvsRes>(`${base}${optional1}`);
};

const singerDesc = (sid: number) => {
    return api.get<ISingerDesc>(`/artist/desc?id=${sid}`);
};

const simiSingers = (sid: number) => {
    return api.get<ISimiSingersRes>(`/simi/artist?id=${sid}`);
};

// ----------------------------------------------------------------------
// 歌曲详情

const getMusicDetail = (ids: number | number[]) => {
    return api.get<ISongsRes>(
        `/song/detail?ids=${typeof ids === "object" ? ids.join(",") : ids}`
    );
};

const getMusicComment = (
    id: number,
    limit = 30,
    offset?: number,
    before?: number
) => {
    const base = `/comment/music?id=${id}&limit=${limit}`;
    const optional1 = offset ? `&offset=${offset}` : "";
    const optional2 = offset && before ? `&before=${before}` : "";

    return api.get<ICommentsRes>(`${base}${optional1}${optional2}`);
};

const getMusicUrl = (ids: number | number[]) => {
    return api.get<ISongUrlRes>(
        `/song/url?id=${typeof ids === "object" ? ids.join(",") : ids}`
    );
};

const downloadMusic = (url: string) => {
    return api.get(url, { responseType: "arraybuffer" });
};

// ----------------------------------------------------------------------
/**
 * 新版评论接口
 * @param type 资源类型
 * @param id
 * @param pageNo 分页参数,第N页,默认为1
 * @param pageSize 分页参数,每页多少条数据,默认20
 * @param sortType 排序方式,99:按推荐排序,2:按热度排序,3:按时间排序
 * @param cursor 当sortType为3时且页数不是第一页时需传入,值为上一条数据的time
 */
const newComment = (
    type: number,
    id: number,
    pageNo?: number,
    pageSize?: number,
    sortType?: number,
    cursor?: number
) => {
    const base = `/comment/new?&type=${type}&id=${id}`;
    const optional1 =
        pageNo && pageSize ? `&pageNo=${pageNo}&pageSize=${pageSize}` : "";
    const optional2 = sortType ? `&sortType=${sortType}` : "";
    const optional3 = cursor ? `&cursor=${cursor}` : "";

    return api.get(`${base}${optional1}${optional2}${optional3}`);
};

// ----------------------------------------------------------------------
// MV

const mvDetail = (id: number) => {
    return api.get<IMvDetailRes>(`/mv/detail?mvid=${id}`);
};

const mvUrl = (id: number, r?: number) => {
    const optional1 = r ? `&r=${r}` : "";

    return api.get<IMvUrlRes>(`/mv/url?id=${id}${optional1}`);
};

const mvComment = (
    id: number,
    limit = 10,
    offset?: number,
    before?: number
) => {
    const base = `/comment/mv?id=${id}&limit=${limit}`;
    const optional1 = offset ? `&offset=${offset}` : "";
    const optional2 = offset && before ? `&before=${before}` : "";

    return api.get<ICommentsRes>(`${base}${optional1}${optional2}`);
};

const simiMv = (id: number) => {
    return api.get<ISimiMvRes>(`/simi/mv?mvid=${id}`);
};

// ----------------------------------------------------------------------
// 视频

const reqFuncs = {
    getBanner,
    getRecomDetails,
    getPerPush,
    getNewSongs,
    getNewMvs,
    toplist,
    topSinger,
    topMv,
    hotSearchList,
    hotSearchDetailList,
    searchSuggest,
    search,
    hotDetailCats,
    hotDetails,
    userDetail,
    userPlaylist,
    userLikeSongIds,
    userFollow,
    userFollowed,
    userEvent,
    userEventComm,
    playlistdetail,
    detailComment,
    detailSubscribe,
    getSimiDetails,
    getMusicDetail,
    getMusicComment,
    getMusicUrl,
    downloadMusic,
    albumDetail,
    albumDetailCount,
    AlbumComments,
    singerDetail,
    singerSongs,
    singerAlbums,
    singerMvs,
    simiSingers,
    singerDesc,
    newComment,
    mvDetail,
    mvUrl,
    mvComment,
    simiMv,
};

export default reqFuncs;
