import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../hooks/useStore";
import reqs from "../../../api/req";
import { notify } from "../../../utils";
import {
    ILyricRes,
    ILyrics,
    ITLyric,
} from "../../../api/netease/types/lyric-type";
import lyricParser from "../../../features";
import { EMessageType } from "../../enums";

const DEFAULT_LINE_HEIGHT = 25;

const Lyrics: React.FC = observer(() => {
    const lyricsRef = React.useRef<HTMLDivElement>(null);
    const store = useStore();
    const { curSong: song, curTime } = store;
    // const [halfIndex, setHalfIndex] = React.useState<number>(3);
    const [curLyricTime, setCurLyricTime] = React.useState<number>(0);
    const [curLyricIndex, setCurLyricIndex] = React.useState<number>(0);
    // const [lineHeight, setLineHeight] = React.useState<number>(DEFAULT_LINE_HEIGHT);
    // const [needScrollHeight, setNeedScrollHeight] = React.useState<number>(0);
    const [lyricMap, setLyricMap] = React.useState<Map<number, string>>(
        new Map()
    );
    const [lrcTimeMap, setLrcTimeMap] = React.useState<Map<number, number>>(
        new Map()
    );
    const [lyrics, setLyrics] = React.useState<ITLyric[]>([
        { time: 0, text: "暂无歌词", texts: ["暂无歌词"] },
    ]);

    const setDefault = React.useCallback(() => {
        document.getElementById("lyrics")?.scroll({ top: 0 });
        setLyrics([{ time: 0, text: "暂无歌词", texts: ["暂无歌词"] }]);
        setLyricMap(new Map());
        setLrcTimeMap(new Map());
    }, []);

    React.useEffect(() => {
        if (lyrics.length === 1) return;
        const index = lrcTimeMap.get(curTime);
        const lyric = lyricMap.get(curTime);

        if (index) {
            setCurLyricTime(curTime);
            setCurLyricIndex(index);
        }
        if (lyric) {
            store.updateCurLyric(lyric);
        }
    }, [curTime, lrcTimeMap, lyricMap, lyrics.length, store]);

    React.useEffect(() => {
        // default: highlight the first line
        setCurLyricTime(lyrics[0].time);
        store.updateCurLyric(lyrics[0].text);
    }, [lyrics, store]);

    const lyricWithTranslation = React.useCallback((lyricsArg: ILyrics) => {
        let ret: ITLyric[] = [];
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { lyric, tlyric, lrcMap, lrcTime, tlrcMap, tlrcTime } = lyricsArg;

        setLyricMap(lrcMap);
        setLrcTimeMap(lrcTime);

        // 空内容的去除
        const lyricFiltered = lyric.filter(({ text }) => Boolean(text));
        // content统一转换数组形式
        if (lyricFiltered.length && tlrcMap.size) {
            lyricFiltered.forEach((l) => {
                const { time, text } = l;
                const lyricItem = { time, text, texts: [text] };
                const sameTimeTLyric = tlrcMap.get(time);

                // // 解决翻译歌词但只有一种语言的
                // lyricItem.texts.push(sameTimeTLyric || text);

                if (sameTimeTLyric) {
                    lyricItem.texts.push(sameTimeTLyric);
                }
                ret.push(lyricItem);
            });
        } else {
            ret = lyricFiltered.map(({ time, text }) => ({
                time,
                text,
                texts: [text],
            }));
        }

        setLyrics(ret);
    }, []);

    const handleLyrics = React.useCallback(
        (lyricRes: ILyricRes) => {
            if (
                !lyricRes ||
                lyricRes.nolyric ||
                lyricRes.nocollected ||
                !lyricRes.lrc
            ) {
                setDefault();
                return;
            }
            let lrc = lyricRes.lrc.lyric;
            if (lrc) {
                lyricWithTranslation(lyricParser(lyricRes));
            }
        },
        [lyricWithTranslation, setDefault]
    );

    const getDetailLyrics = React.useCallback(() => {
        reqs.netease
            .getMusicLyric(song!.id)
            .then((res) => {
                handleLyrics(res);
            })
            .catch((e) => {
                notify(EMessageType.ERROR, e.message);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [song?.id]);

    React.useEffect(() => {
        setDefault();
        if (!song) return;

        getDetailLyrics();
    }, [song, getDetailLyrics, setDefault]);

    // React.useLayoutEffect(() => {
    //     setTimeout(() => {
    //         if (lyricsRef && lyricsRef.current) {
    //             const outHeight =
    //                 lyricsRef.current.getBoundingClientRect().height - 48;
    //             const lyricLineHeight =
    //                 lyricsRef.current.firstElementChild?.getBoundingClientRect()
    //                     .height || 24;
    //             setLineHeight(lyricLineHeight + 5);
    //             setHalfIndex(
    //                 Math.floor(
    //                     Math.round(outHeight / (lyricLineHeight + 5)) / 2
    //                 )
    //             );
    //         }
    //     }, 500);
    // }, [lyricsRef, song?.id]);

    React.useEffect(() => {
        if (lyricsRef && lyricsRef.current) {
            const outHeight =
                lyricsRef.current.getBoundingClientRect().height - 48;
            const curLine: HTMLDivElement | null =
                document.querySelector("#lyrics .active");
            // https://blog.csdn.net/jinxi1112/article/details/90692484
            const offset =
                (curLine?.offsetTop || 0) -
                Math.floor(Math.round(outHeight / 2)) +
                DEFAULT_LINE_HEIGHT;

            if (curLine) {
                lyricsRef.current.scrollTop = offset;
            }
        }

        // if (lyricsRef && lyricsRef.current && curLyricIndex >= halfIndex) {
        //     lyricsRef.current.scrollTop =
        //         lineHeight * (curLyricIndex - halfIndex);
        //     // setNeedScrollHeight(lineHeight * (curLyricIndex - halfIndex));
        // }
    }, [curLyricIndex]);

    return song ? (
        <StyledLyrics
            id="lyrics"
            ref={lyricsRef}
            // needScrollHeight={needScrollHeight}
        >
            {lyrics.map((tlyric, index) => (
                <div
                    key={`${tlyric.text}${index}`}
                    className={curLyricTime === tlyric.time ? "active" : ""}
                >
                    {tlyric.texts.map((lyric, index1) => (
                        <StyledLyric
                            active={curLyricTime === tlyric.time}
                            key={`${lyric}${index1}`}
                        >
                            {lyric}
                        </StyledLyric>
                    ))}
                </div>
            ))}
        </StyledLyrics>
    ) : null;
});

export default Lyrics;

const StyledLyric = styled.div`
    margin: 5px 0;

    ${(props: { active: boolean }) =>
        props.active
            ? {
                  color: "transparent",
                  background: "linear-gradient(to right, #0af, #2fff39)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  fontWeight: 700,
              }
            : `color: #b1b1b1`};
`;

const StyledLyrics = styled.div`
    position: relative;
    height: 50vh;
    overflow-y: scroll;
    margin: 24px 0;
    padding-right: 16px;
    font-size: 15px;
    white-space: pre-line;
    transition: transform 1s ease-out;
    scroll-behavior: smooth;
`;
// transition: all 1s;

//     ${(props: { needScrollHeight: number }) =>
//         props.needScrollHeight
//             ? {
//                   transform: `translateY(${-props.needScrollHeight}px)`,
//               }
//             : ``};
