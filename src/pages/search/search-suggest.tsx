import { AutoComplete } from "antd";
import React from "react";
import reqs from "../../api/req";
import { notify } from "../../utils";
import { AllMatch } from "./type";

const SearchSuggest = (keyword: string) => {
    const [allMatch, setAllMatch] = React.useState<AllMatch[]>([]);

    const onSearchSuggest = React.useCallback((keyword: string) => {
        keyword.length &&
            reqs.netease
                .searchSuggest(keyword)
                .then((res) => {
                    setAllMatch(res.result.allMatch);
                })
                .catch((e) => {
                    notify("error", e.message || "获取搜索建议列表数据失败");
                });
    }, []);

    React.useEffect(() => {
        onSearchSuggest(keyword);
    }, [keyword, onSearchSuggest]);

    return keyword.length
        ? allMatch.map((hotSearch) => {
              return {
                  value: hotSearch.keyword,
                  label: <div key={hotSearch.feature}>{hotSearch.keyword}</div>,
              };
          })
        : [];

    // return keyword.length && allMatch.length
    //     ? allMatch.map((hotSearch) => (
    //           <AutoComplete.Option
    //               key={hotSearch.feature}
    //               value={hotSearch.keyword}
    //           >
    //               <div>{hotSearch.keyword}</div>
    //           </AutoComplete.Option>
    //       ))
    //     : null;
};

export default SearchSuggest;
