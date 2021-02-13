import { shuffle } from "./utils";

export const DEFAULT_DEV_BASE_URL = "http://localhost:3000/";
export const DEFAULT_PROD_BASE_URL = "https://api.mtnhao.com/";

export const DEFAULT_BG_IMG =
    "http://p2.music.126.net/ek5FsopWHRxf9tQSLaRnAA==/109951165643377225.jpg";

export const DEFAULT_AVATAR =
    "https://i.loli.net/2021/01/30/t3OwgJQEAnphYrm.jpg";

export const DEFAULT_LOADING_IMG =
    "https://i.loli.net/2021/01/25/QoPhZfYVWMUsA6J.gif";

export const DEFAULT_COLORS = [
    "magenta",
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "purple",
    "cyan",
    "lime",
    "gold",
];
export const DEFAULT_RANDOM_COLORS = shuffle(DEFAULT_COLORS);

export const DEFAULT_ALBUM_ID = 21506;
export const DEFAULT_DETAIL_ID = 3778678;
export const DEFAULT_SINGER_ID = 160947;  // 华晨宇：861777
export const DEFAULT_USER_ID = 537069044;
