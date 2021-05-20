import api from "../index";
import { ISong } from "../../pages/detail/type";
import { IEventsRes } from "../../pages/events/type";
import { IAlbumsRes, IMvsRes, ISingersRes } from "../../pages/my-stars/type";
import { ELikeOpr, ESubscribeDetail } from "./types/like-type";
import { ILoginedUser, IQRImg, IQRKey, IQRStatus } from "./types/login-type";
import {
    EDetailSongOprType,
    EPlayRecordType,
    EShareResourceType,
    ESourceType,
} from "../../pages/enums";
import { IPlayRecRes } from "../../pages/user/type";
import { EReplyOpr } from "./types/reply-type";

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
};

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

const forwardEvent = (id: number, userId: number, forward = "") => {
    return api.get<{ code: number; message: string }>(
        `/event/forward?evId=${id}&uid=${userId}&forwards=${forward}&timestamp=${Date.now()}`
    );
};

const forwardResourceToEvent = (
    type: EShareResourceType,
    id: number,
    msg: string
) => {
    return api.get(`/share/resource?type=${type}&id=${id}&msg=${msg}`);
};

const delEvent = (id: number) => {
    return api.get<{ code: number }>(`event/del?evId=${id}`);
};

// 点赞资源
const likeSong = (id: number, like = true) => {
    return api.get(`/like?id=${id}&like=${like}`);
};

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

// 发送、回复评论
const replyComment = (
    opr: EReplyOpr,
    type: ESourceType,
    id: string | number,
    content: string,
    commentId?: string | number
) => {
    const reply = opr === EReplyOpr.REPLY ? `&commentId=${commentId}` : "";
    // 评论动态
    if (typeof id === "string") {
        return api.get(
            `/comment?t=${opr}&type=${type}&threadId=${id}&content=${content}${reply}`
        );
    }
    return api.get(
        `/comment?t=${opr}&type=${type}&id=${id}&content=${content}${reply}`
    );
};

// 删除评论
const delComment = (
    type: ESourceType,
    id: string | number,
    commentId: string | number,
    content?: string,
) => {
    const opr = 0;
    // 删除动态评论
    if (typeof id === "string") {
        return api.get(
            `/comment?t=${opr}&type=${type}&threadId=${id}&commentId=${commentId}`
        );
    }
    return api.get(
        `/comment?t=${opr}&type=${type}&id=${id}&commentId=${commentId}`
    );
};

const userComments = (uid: number, limit = 10, time = 0) => {
    return api.get(
        `/user/comment/history?uid=${uid}&limit=${limit}&time=${time}`
    );
};

const userPlayRecords = (uid: number, type = EPlayRecordType.WEEK) => {
    return api.get<IPlayRecRes>(`/user/record?uid=${uid}&type=${type}`);
};

// 用户的收藏
const starSingers = (limit: number, offset?: number) => {
    return api.get<ISingersRes>(`/artist/sublist?limit=${limit}`);
};

const starMvs = (limit: number, offset?: number) => {
    return api.get<IMvsRes>(`/mv/sublist?limit=${limit}`);
};

const starAlbums = (limit: number, offset?: number) => {
    return api.get<IAlbumsRes>(`/album/sublist?limit=${limit}`);
};

// 歌单操作
// 10 为隐私歌单
// 'VIDEO'则为视频歌单
const createDetail = (name: string, privacy = 0, type = "NORMAL") => {
    return api.get(
        `/playlist/create?name=${name}&privacy=${privacy}&type=${type}`
    );
};

const editDetail = (id: number, name: string, desc: string, tags: string[]) => {
    return api.get(
        `/playlist/update?id=${id}&name=${name}&desc=${desc}&tags=${tags.join(
            ";"
        )}`
    );
};

const deleteDetail = (id: number | number[]) => {
    return api.get(
        typeof id === "object"
            ? `/playlist/delete?id=${id.join(",")}`
            : `/playlist/delete?id=${id}`
    );
};

const addDeleteSongFromDetail = (
    op: EDetailSongOprType,
    pid: number,
    tracks: number[]
) => {
    return api.get(
        `/playlist/tracks?op=${op}&pid=${pid}&tracks=${tracks.join(",")}`
    );
};

const heartMode = (id: number, pid: number) => {
    return api.get<{
        code: number;
        data: { songInfo: ISong }[];
        message: string;
    }>(`/playmode/intelligence/list?id=${id}&pid=${pid}`);
};

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
    forwardResourceToEvent,
    forwardEvent,
    delEvent,
    likeSong,
    likeSth,
    likeComment,
    replyComment,
    delComment,
    userComments,
    userPlayRecords,
    starSingers,
    starMvs,
    starAlbums,
    createDetail,
    editDetail,
    deleteDetail,
    addDeleteSongFromDetail,
    heartMode,
};

export default reqLoginedFuncs;
