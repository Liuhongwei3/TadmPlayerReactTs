import axios from "axios";
import { DEFAULT_DEV_BASE_URL, DEFAULT_PROD_BASE_URL } from "../web-config/defaultConfig";
import { notify } from "../utils";
import { parseResponseData } from "./tools";
import { cacheAdapterEnhancer } from "axios-extensions";

const baseURL =
    process.env.NODE_ENV === "development"
        ? DEFAULT_DEV_BASE_URL
        : DEFAULT_PROD_BASE_URL;

const axiosInst = axios.create({
    baseURL,
    timeout: 15000,
    withCredentials: true, // 允许携带cookie
    // do cache
    adapter: cacheAdapterEnhancer(axios.defaults.adapter!, {
        enabledByDefault: false,
        cacheFlag: "useCache",
    }),
});

const defaultReqConfig = {
    // default open cache with same req
    useCache: true,
};

axiosInst.interceptors.request.use(
    (config) => {
        return { ...defaultReqConfig, ...config };
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
        const res = parseResponseData(response);

        if (res.data && typeof res.data === "string") {
            notify("error", res.data);
            return Promise.reject(res.data);
        }

        if (res.data.reason) {
            notify("warning", res.data.reason || "需要登录~");
        }
        return res.data;
    },
    (error) => {
        console.error(error, error.response);
        // 当 401 重定向到登录页
        if (error && error.response && error.response.status === 401) {
            // window.location.href = getSsoRedirectUrl();
            notify("warning", error.response.statusText || "需要登录~");
        } else if (error && error.response && error.response.status >= 500) {
            notify("error", error.response.statusText || "服务器异常！");
        } else {
            notify(
                "error",
                (error.response && error.response.statusText) ||
                    error.message ||
                    "加载数据失败"
            );
        }

        return Promise.reject(error);
    }
);

export default axiosInst;
