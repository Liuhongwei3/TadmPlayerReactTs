import axios from "axios";
import {
    DEFAULT_DEV_BASE_URL,
    DEFAULT_PROD_BASE_URL,
} from "../web-config/defaultConfig";
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
        if (res.data.code === 400 && res.data.msg) {
            notify("warning", res.data.msg || "请求参数错误~");
        }
        return res.data;
    },
    (error) => {
        console.error(error, error.response);
        if (error && error.response && error.response.status) {
            const status = error.response.status;

            switch (status) {
                // 当 401,301 重定向到登录页
                case 301:
                case 401:
                    // window.location.href = getSsoRedirectUrl();
                    notify(
                        "warning",
                        error.response.data.msg ||
                            error.response.statusText ||
                            "需要登录~"
                    );
                    break;
                case 400:
                    notify(
                        "warning",
                        error.response.data.msg ||
                            error.response.statusText ||
                            "请求参数错误~"
                    );
                    break;
                case 500:
                    notify(
                        "error",
                        error.response.data.msg ||
                            error.response.statusText ||
                            "服务器异常！"
                    );
                    break;
                default:
                    notify(
                        "error",
                        (error.response && error.response.statusText) ||
                            error.response.data.msg ||
                            error.response.statusText ||
                            error.message ||
                            "加载数据失败"
                    );
                    break;
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInst;
