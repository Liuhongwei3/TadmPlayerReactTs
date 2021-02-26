import React from "react";
import styled from "styled-components";
import { AutoComplete, Input, Select, Spin, Tabs } from "antd";

import reqs from "../../api/req";
import { notify } from "../../utils";
import HotSearchComp from "./hot-search-detail";
import Albums from "./result-display/albums";
import Details from "./result-display/details";
import Singers from "./result-display/singers";
import Songs from "./result-display/songs";
import SearchSuggest from "./search-suggest";
import { ESearchType, ISearchs } from "./type";
import Users from "./result-display/users";
import Mvs from "./result-display/mvs";

const SearchComp: React.FunctionComponent = () => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [activeKey, setActiveKey] = React.useState<ESearchType>(
        ESearchType.SONG
    );
    const [keyword, setKeyword] = React.useState<string>("");
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

    const onSearchSuggest = React.useCallback((keyword: string) => {
        setKeyword(keyword);
    }, []);

    const onSearch = React.useCallback(
        (keyword1: string, type = activeKey) => {
            if (!keyword1) {
                notify("warning", "请输入关键词后搜索");
                return;
            }

            setKeyword(keyword1);
            setLoading(true);
            reqs.netease
                .search(keyword1, type)
                .then((res) => {
                    setResult(res.result);
                })
                .catch((e) => {
                    notify("error", e.message || "获取搜索结果失败");
                })
                .finally(() => setLoading(false));
        },
        [activeKey]
    );

    const updateActiveKey = React.useCallback(
        (activeKey: string) => {
            setActiveKey(+activeKey);
            onSearch(keyword, +activeKey);
        },
        [keyword, onSearch]
    );

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
                    style={{ width: "60%" }}
                    options={[...SearchSuggest(keyword), ...HotSearchComp()]}
                    onSearch={onSearchSuggest}
                    onSelect={(keyword) => onSearch(keyword)}
                >
                    {/* {SearchSuggest(keyword)}
                    {HotSearchComp()} */}
                    <Input.Search
                        placeholder="please input keyword"
                        enterButton={true}
                        loading={loading}
                        onSearch={(keyword) => onSearch(keyword)}
                    />
                </AutoComplete>
            </Input.Group>

            <div>
                {`找到
                ${
                    result?.songCount ||
                    result?.artistCount ||
                    result?.albumCount ||
                    result?.playlistCount ||
                    result?.userprofileCount ||
                    result?.mvCount ||
                    0
                }
                条结果`}
            </div>

            <Tabs activeKey={String(activeKey)} onChange={updateActiveKey}>
                {SEARCH_RES_TABS.map((tab) => {
                    return (
                        <Tabs.TabPane key={tab.key} tab={tab.title}>
                            <Spin spinning={loading}>{tab.component}</Spin>
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

    @media screen and (max-width: 768px) {
        padding: 5px;
    }
`;
