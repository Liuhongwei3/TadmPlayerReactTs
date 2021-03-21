import api from "../index";

const userLoginByPhone = (phone: string, password: string) => {
    // ?phone=${phone}&password=${password}
    return api.post(`/login/cellphone`, { phone, password });
};

const getUserRecomm = () => {
    return api.get(`/recommend/resource`);
};

const reqLoginedFuncs = {
    userLoginByPhone,
    getUserRecomm,
};

export default reqLoginedFuncs;
