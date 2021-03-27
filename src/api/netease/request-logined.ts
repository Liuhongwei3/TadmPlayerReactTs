import api from "../index";
import { ILoginedUser, IQRImg, IQRKey, IQRStatus } from "./login-type";

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

const getUserRecomm = () => {
    return api.get(`/recommend/resource`);
};

const reqLoginedFuncs = {
    userLoginByPhone,
    sendCodeByPhone,
    checkCodeByPhone,
    getLoginQRKey,
    getLoginQR,
    checkQRStatus,
    loginStatus,
    getUserRecomm,
};

export default reqLoginedFuncs;
