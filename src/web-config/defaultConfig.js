import { shuffle } from "../utils";

export const DEFAULT_DEV_BASE_URL = "http://localhost:3000/";
export const DEFAULT_PROD_BASE_URL =
    "https://netease-music-api-jingke.vercel.app/";

export const DEFAULT_BG_IMG =
    "http://p2.music.126.net/ek5FsopWHRxf9tQSLaRnAA==/109951165643377225.jpg";

export const DEFAULT_AVATAR =
    "http://p1.music.126.net/GgShTIn1JgFkYvjHQMdhGA==/109951165716168492.jpg";

export const DEFAULT_LOADING_IMG =
    "https://img.imgdb.cn/item/603cf1185f4313ce25774bf3.gif";

export const RECOMMEND_DAY_ID = 999;

export const DEFAULT_SONG_ID = 1364247901;
export const DEFAULT_ALBUM_ID = 21506;
export const DEFAULT_DETAIL_ID = 3778678;
export const DEFAULT_SINGER_ID = 160947; // 华晨宇: 861777
export const DEFAULT_USER_ID = 328199093; //  ME: 537069044 栗先达: 264256080 王贰浪: 328199093
export const DEFAULT_MV_ID = 14257559; // IU: 14239660  See-you-again: 393006

export const clientWidth = window.document.body.clientWidth;
export const isPc = clientWidth >= 768;

export const DEFAULT_IMG_PC_WIDTH = 150;
export const DEFAULT_IMG_PC_HEIGHT = 150;
export const DEFAULT_IMG_PH_WIDTH = 120;
export const DEFAULT_IMG_PH_HEIGHT = 120;

export const DEFAULT_IMG_WIDTH = isPc
    ? DEFAULT_IMG_PC_WIDTH
    : DEFAULT_IMG_PH_WIDTH;
export const DEFAULT_IMG_HEIGHT = isPc
    ? DEFAULT_IMG_PC_HEIGHT
    : DEFAULT_IMG_PH_HEIGHT;

export const DEFAULT_MV_PC_WIDTH = 320;
export const DEFAULT_MV_PC_HEIGHT = 200;

export const DEFAULT_MV_WIDTH = isPc
    ? DEFAULT_MV_PC_WIDTH
    : DEFAULT_MV_PC_WIDTH * 0.8;
export const DEFAULT_MV_HEIGHT = isPc
    ? DEFAULT_MV_PC_HEIGHT
    : DEFAULT_MV_PC_HEIGHT * 0.8;

export const DEFAULT_MV_PC_SMALL_WIDTH = 210;
export const DEFAULT_MV_PC_SMALL_HEIGHT = 150;

export const DEFAULT_MV_SMALL_WIDTH = isPc
    ? DEFAULT_MV_PC_SMALL_WIDTH
    : DEFAULT_MV_PC_SMALL_WIDTH;
export const DEFAULT_MV_SMALL_HEIGHT = isPc
    ? DEFAULT_MV_PC_SMALL_HEIGHT
    : DEFAULT_MV_PC_SMALL_HEIGHT * 0.8;

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

export const infoMsg = `
%c^-^    ^-^    ^-^    ^-^    ^-^    ^-^\n
%cWelcome to Tadm-Player-React-Ts!\n
%cThis is my personal player by Tadm with react-buckt & Antd.\n
If you think well,thanks to star ~\n
%cGithub: https://github.com/Liuhongwei3\n
%c^-^    ^-^    ^-^    ^-^    ^-^    ^-^\n
`;
