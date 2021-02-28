import React from "react";
import { DEFAULT_LOADING_IMG } from "../web-config/defaultConfig";

const LoadingImg: React.FunctionComponent = () => {
    return <img width="100%" height="100%" alt="loading-cover" src={DEFAULT_LOADING_IMG} />;
};

export default LoadingImg;
