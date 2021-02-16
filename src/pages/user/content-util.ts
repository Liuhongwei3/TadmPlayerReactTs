import { Event } from "./type";

export const userType = (type: number, desc: string | undefined) => {
    if (type === 2 || type === 4) {
        return desc || "未知";
    } else {
        return "普通用户";
    }
};

export const createTime = (days: number) => {
    const year = Math.floor(days / 365);
    const day = days - year * 365;

    return day === 0 ? `${year} 年` : `${year} 年 ${day} 天`;
};

export const handleJson = (events: Event[]) => {
    return [
        ...events.map((event) => {
            const temp =
                typeof event.json === "string" && JSON.parse(event.json);
            event.json = Object.assign(
                { ...temp },
                {
                    msg: temp.msg,
                    song: temp.song,
                    playlist: temp.playlist,
                    album: temp.album,
                    mv: temp.mv,
                    video: temp.video,
                    djRadio: temp.djRadio,
                    forward: temp.event,
                }
            );

            return event;
        }),
    ];
};
