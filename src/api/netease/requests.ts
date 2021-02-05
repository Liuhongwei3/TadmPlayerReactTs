import api from '../index';
import { ITopListRes } from "../../pages/top/type";
import { IHotDetailCats, IHotdetailRes } from '../../pages/hot-detail/type';
import { IBannerRes, INewSongsRes, IPersonPushRes, IRecomDetailRes, IRecommendMvRes } from '../../pages/home/type';
import { IUserDetail } from '../../pages/user/type';

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

const toplist = () => {
    return api.get<ITopListRes>(`/toplist`);
};

const hotDetailCats = () => {
    return api.get<IHotDetailCats>(`/playlist/catlist`);
};

const hotDetails = (cat = "全部", limit = 24) => {
    return api.get<IHotdetailRes>(`/top/playlist?cat=${cat}&limit=${limit}`);
};

const userDetail = (uid: number) => {
    return api.get<IUserDetail>(`/user/detail?uid=${uid}`);
};

const reqFuncs = {
        getBanner,
        getRecomDetails,
        getPerPush,
        getNewSongs,
        getNewMvs,
        toplist,
        hotDetailCats,
        hotDetails,
        userDetail
};

export default reqFuncs;