import { request } from "./index";
import { notify, to } from "../../utils";

const doReq = async (url) => {
    let [err, data] = await to(request({ url }));
    if (err) {
        notify("error", err.response.statusText || "加载错误！");
        return false;
    } else {
        return data;
    }
};

export default doReq;
