import { shuffle } from "./utils";

export const DEFAULT_ALBUM_ID = 21506;
export const DEFAULT_DETAIL_ID = 3778678;
export const DEFAULT_SINGER_ID = 160947; // 华晨宇: 861777
export const DEFAULT_USER_ID = 328199093; //  ME: 537069044 栗先达: 264256080 王贰浪: 328199093
export const DEFAULT_MV_ID = 393006; // IU: 14239660

export const clientWidth = window.document.body.clientWidth;

export const DEFAULT_IMG_PC_WIDTH = 150;
export const DEFAULT_IMG_PC_HEIGHT = 150;
export const DEFAULT_IMG_PH_WIDTH = 120;
export const DEFAULT_IMG_PH_HEIGHT = 120;

export const DEFAULT_IMG_WIDTH =
    clientWidth >= 768 ? DEFAULT_IMG_PC_WIDTH : DEFAULT_IMG_PH_WIDTH;
export const DEFAULT_IMG_HEIGHT =
    clientWidth >= 768 ? DEFAULT_IMG_PC_HEIGHT : DEFAULT_IMG_PH_HEIGHT;

export const DEFAULT_MV_PC_WIDTH = 320;
export const DEFAULT_MV_PC_HEIGHT = 200;

export const DEFAULT_MV_WIDTH =
    clientWidth >= 768 ? DEFAULT_MV_PC_WIDTH : DEFAULT_MV_PC_WIDTH * 0.8;
export const DEFAULT_MV_HEIGHT =
    clientWidth >= 768 ? DEFAULT_MV_PC_HEIGHT : DEFAULT_MV_PC_HEIGHT * 0.8;

export const DEFAULT_MV_PC_SMALL_WIDTH = 200;
export const DEFAULT_MV_PC_SMALL_HEIGHT = 150;

export const DEFAULT_MV_SMALL_WIDTH =
    clientWidth >= 768
        ? DEFAULT_MV_PC_SMALL_WIDTH
        : DEFAULT_MV_PC_SMALL_WIDTH;
export const DEFAULT_MV_SMALL_HEIGHT =
    clientWidth >= 768
        ? DEFAULT_MV_PC_SMALL_HEIGHT
        : DEFAULT_MV_PC_SMALL_HEIGHT * 0.8;

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
