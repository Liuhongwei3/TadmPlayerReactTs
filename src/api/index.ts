import axios from "axios";
import {
    DEFAULT_DEV_BASE_URL,
    DEFAULT_PROD_BASE_URL,
} from "../defaultConfig";
import { notify } from "../utils";
import { parseResponseData } from "./tools";

const baseURL =
    process.env.NODE_ENV === "development"
        ? DEFAULT_DEV_BASE_URL
        : DEFAULT_PROD_BASE_URL;

const axiosInst = axios.create({
    baseURL,
    timeout: 10000,
    withCredentials: true, // 允许携带cookie
});

axiosInst.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        const { response } = error;
        if (!response) {
            error = {
                response: { statusText: "网络错误，请检查您的网络连接！" },
            };
        }
        return Promise.reject(error);
    }
);

axiosInst.interceptors.response.use(
    (response) => {
        const data = parseResponseData(response.data);

        return data;
    },
    (error) => {
        // 当 401 重定向到登录页
        if (error && error.response && error.response.status === 401) {
            // window.location.href = getSsoRedirectUrl();
            console.log('redirect')
            return;
        } else if (error && error.response && error.response.status >= 500) {
            notify("error", error.response.statusText || "服务器异常！");
        } else {
            notify("error", error.response.statusText || "加载错误！");
        }

        return Promise.reject(error);
    }
);

export default axiosInst;