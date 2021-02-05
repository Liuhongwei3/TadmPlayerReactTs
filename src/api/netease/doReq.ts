import request from "../index";
import { notify, to } from "../../utils";

const doReq = async (url: string) => {
    let [err, data] = await to(request({ url }));
    if (err) {
        notify("error", err.response.statusText || "加载错误！");
        return false;
    } else {
        if (data.status === 200) {
            return data.data;
        } else if (data.status >= 500) {
            notify("error", err.response.statusText || "服务器异常！");
            return false;
        }
    }
};

export default doReq;
