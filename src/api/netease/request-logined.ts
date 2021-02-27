import api from "../index";

const userLoginByPhone = (phone: string, password: string) => {
    return api.get(`/login/cellphone?phone=${phone}&password=${password}`);
};

const getUserRecomm = () => {
    return api.get(`/recommend/resource`);
};

const reqLoginedFuncs = {
    userLoginByPhone,
    getUserRecomm,
};

export default reqLoginedFuncs;
