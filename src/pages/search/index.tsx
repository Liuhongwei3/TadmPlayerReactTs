import React from "react";
import styled from "styled-components";
import { AutoComplete, Input, Select, Spin, Tabs } from "antd";

import reqs from "../../api/req";
import { notify, throttle } from "../../utils";
import HotSearchComp from "./hot-search-detail";
import Albums from "./result-display/albums";
import Details from "./result-display/details";
import Singers from "./result-display/singers";
import Songs from "./result-display/songs";
import SearchSuggest from "./search-suggest";
import { ISearchs } from "./type";
import Users from "./result-display/users";
import Mvs from "./result-display/mvs";
import HandleMore from "./result-display/handleMore";
import { EMessageType, ESearchType } from "../enums";

const SEARCH_THROTTLE_TIME = 500;
const LIMIT = 16;

const SearchComp: React.FunctionComponent = () => {
    const firstRender = React.useRef(true);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [activeKey, setActiveKey] = React.useState<ESearchType>(
        ESearchType.SONG
    );
    const [keyword, setKeyword] = React.useState<string>("");
    // 避免输入关键词时结果页也直接就搜索
    const [keywordSugg, setKeywordSugg] = React.useState<string>("");
    const [limit, setLimit] = React.useState<number>(LIMIT);
    const [result, setResult] = React.useState<ISearchs>();

    const SEARCH_RES_TABS = React.useMemo(
        () => [
            {
                key: ESearchType.SONG,
                title: "单曲",
                component: <Songs result={result} />,
            },
            {
                key: ESearchType.SINGER,
                title: "歌手",
                component: <Singers result={result} />,
            },
            {
                key: ESearchType.ALBUM,
                title: "专辑",
                component: <Albums result={result} />,
            },
            {
                key: ESearchType.DETAIL,
                title: "歌单",
                component: <Details result={result} />,
            },
            {
                key: ESearchType.LYRIC,
                title: "歌词",
                component: <Songs result={result} />,
            },
            {
                key: ESearchType.USER,
                title: "用户",
                component: <Users result={result} />,
            },
            {
                key: ESearchType.MV,
                title: "MV",
                component: <Mvs result={result} />,
            },
        ],
        [result]
    );

    const resCount = React.useMemo(() => {
        return (
            result?.songCount ||
            result?.artistCount ||
            result?.albumCount ||
            result?.playlistCount ||
            result?.userprofileCount ||
            result?.mvCount ||
            0
        );
    }, [result]);

    const onSearchSuggest = React.useCallback((keyword: string) => {
        setKeywordSugg(keyword);
    }, []);

    const onSearch = React.useCallback(
        (keyword1: string, type = activeKey) => {
            setLoading(true);
            reqs.netease
                .search(keyword1, type, limit)
                .then((res) => {
                    setResult(res.result);
                })
                .catch((e) => {
                    notify(EMessageType.ERROR, e.message || "获取搜索结果失败");
                })
                .finally(() => setLoading(false));
        },
        [activeKey, limit]
    );

    React.useEffect(() => {
        // 屏蔽掉第一次渲染时的作用
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        if (!keyword) {
            notify(EMessageType.WARNING, "请输入关键词后搜索");
            return;
        }
        onSearch(keyword);
    }, [firstRender, keyword, limit, onSearch]);

    const updateActiveKey = React.useCallback((activeKey: string) => {
        setLimit(LIMIT);
        setActiveKey(+activeKey);
    }, []);

    return (
        <StyledWrapper>
            <Input.Group
                compact={true}
                style={{ padding: 10, textAlign: "center" }}
            >
                <Select defaultValue="netease">
                    <Select.Option value="netease">网易云</Select.Option>
                    <Select.Option value="qq" disabled={true}>
                        QQ
                    </Select.Option>
                    <Select.Option value="kugou" disabled={true}>
                        酷狗
                    </Select.Option>
                </Select>
                <AutoComplete
                    className="input"
                    options={[
                        ...SearchSuggest(keywordSugg),
                        ...HotSearchComp(keywordSugg),
                    ]}
                    onSearch={throttle(onSearchSuggest, SEARCH_THROTTLE_TIME)}
                    onSelect={(keyword) => setKeyword(keyword)}
                >
                    {/* {SearchSuggest(keyword)}
                    {HotSearchComp()} */}
                    <Input.Search
                        placeholder="please input keyword"
                        allowClear={true}
                        enterButton={true}
                        loading={loading}
                        onSearch={(keyword) => setKeyword(keyword)}
                    />
                </AutoComplete>
            </Input.Group>

            <div>{`找到 ${resCount} 条结果`}</div>

            <Tabs activeKey={`search-${activeKey}`} onChange={updateActiveKey}>
                {SEARCH_RES_TABS.map((tab) => {
                    return (
                        <Tabs.TabPane key={`search-${tab.key}`} tab={tab.title}>
                            <Spin spinning={loading}>
                                {tab.component}
                                <HandleMore
                                    loading={loading}
                                    resCount={resCount}
                                    limit={limit}
                                    setLimit={setLimit}
                                />
                            </Spin>
                        </Tabs.TabPane>
                    );
                })}
            </Tabs>
        </StyledWrapper>
    );
};

export default SearchComp;

const StyledWrapper = styled.div`
    padding: 20px;

    .input {
        width: 40%;
    }

    @media screen and (max-width: 768px) {
        padding: 5px;

        .input {
            width: 64%;
        }
    }
`;
