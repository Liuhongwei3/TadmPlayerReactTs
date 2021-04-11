import api from "../index";
import { ISong } from "../../pages/detail/type";
import { IEventsRes } from "../../pages/events/type";
import { IAlbumsRes, IMvsRes, ISingersRes } from "../../pages/my-stars/type";
import { ELikeOpr, ESourceType, ESubscribeDetail } from "./types/like-type";
import { ILoginedUser, IQRImg, IQRKey, IQRStatus } from "./types/login-type";

const userLoginByPhone = (phone: string, password: string) => {
    // ?phone=${phone}&password=${password}
    return api.post<ILoginedUser>(`/login/cellphone`, { phone, password });
};

const sendCodeByPhone = (phone: string) => {
    return api.get(`/captcha/sent?phone=${phone}`);
};

const checkCodeByPhone = (phone: number, captcha: number) => {
    return api.get(`/captcha/verify?phone=${phone}&captcha=${captcha}`);
};

const getLoginQRKey = () => {
    return api.get<{ data: IQRKey }>(`/login/qr/key?timerstamp=${Date.now()}`);
};

const getLoginQR = (key: string) => {
    return api.get<{ data: IQRImg }>(
        `/login/qr/create?key=${key}&qrimg=true&timerstamp=${Date.now()}`
    );
};

const checkQRStatus = (key: string) => {
    return api.get<IQRStatus>(
        `/login/qr/check?key=${key}&timerstamp=${Date.now()}`
    );
};

const loginStatus = () => {
    return api.get<{ data: ILoginedUser }>(
        `/login/status?timerstamp=${Date.now()}`
    );
};

const logOut = () => {
    return api.get(`/logout`);
}

const getUserRecomm = () => {
    return api.get(`/recommend/resource`);
};

// 获取每日推荐歌曲
const getRecommendSongs = () => {
    return api.get<{ data: { dailySongs: ISong[] } }>(`/recommend/songs`);
};

const followUser = (type: ELikeOpr, id: number) => {
    return api.get(`/follow?id=${id}&t=${type}`);
};

const subscribeDetail = (type: ESubscribeDetail, id: number) => {
    return api.get(`/playlist/subscribe?t=${type}&id=${id}`);
};

const subscribeAlbum = (type: ELikeOpr, id: number) => {
    return api.get(`/album/sub?t=${type}&id=${id}`);
};

const subscribeSinger = (type: ELikeOpr, id: number) => {
    return api.get(`/artist/sub?t=${type}&id=${id}`);
};

const subscribeMv = (type: ELikeOpr, mvid: number) => {
    return api.get(`/mv/sub?t=${type}&mvid=${mvid}`);
};

// ---------------------------------------------------------------------
// 朋友动态
const getEvents = (limit: number) => {
    return api.get<IEventsRes>(
        `/event?pagesize=${limit}&lasttime=${Date.now()}`
    );
};

// 点赞资源
const likeSth = (opr: ELikeOpr, type: ESourceType, id: string | number) => {
    // 点赞动态
    if (typeof id === "string") {
        return api.get(`/resource/like?t=${opr}&type=${type}&threadId=${id}`);
    }
    return api.get(`/resource/like?t=${opr}&type=${type}&id=${id}`);
};

// 点赞评论
const likeComment = (
    opr: ELikeOpr,
    type: ESourceType,
    id: string | number,
    cid: string | number
) => {
    // 点赞动态
    if (typeof id === "string") {
        return api.get(
            `/comment/like?t=${opr}&type=${type}&threadId=${id}&cid=${cid}`
        );
    }
    return api.get(`/comment/like?t=${opr}&type=${type}&id=${id}&cid=${cid}`);
};

const userComments = (uid: number, limit = 10, time = 0) => {
    return api.get(
        `/user/comment/history?uid=${uid}&limit=${limit}&time=${time}`
    );
};

// 用户的收藏
const starSingers = (limit: number, offset?: number) => {
    return api.get<ISingersRes>(`/artist/sublist?limit=${limit}`);
}

const starMvs = (limit: number, offset?: number) => {
    return api.get<IMvsRes>(`/mv/sublist?limit=${limit}`);
}

const starAlbums = (limit: number, offset?: number) => {
    return api.get<IAlbumsRes>(`/album/sublist?limit=${limit}`);
}

const reqLoginedFuncs = {
    userLoginByPhone,
    sendCodeByPhone,
    checkCodeByPhone,
    getLoginQRKey,
    getLoginQR,
    checkQRStatus,
    loginStatus,
    logOut,
    getUserRecomm,
    followUser,
    subscribeDetail,
    subscribeAlbum,
    subscribeSinger,
    subscribeMv,
    getRecommendSongs,
    getEvents,
    likeSth,
    likeComment,
    userComments,
    starSingers,
    starMvs,
    starAlbums,
};

export default reqLoginedFuncs;
