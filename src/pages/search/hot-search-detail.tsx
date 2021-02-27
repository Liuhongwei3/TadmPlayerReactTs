import React from "react";
import styled from "styled-components";
import reqs from "../../api/req";
import { notify } from "../../utils";
import { IHotSearchDetail } from "./type";

const HotSearchComp = (keyword: string) => {
    const [hotSearchs, setHotSearchs] = React.useState<IHotSearchDetail[]>([]);

    const getHotSearch = React.useCallback(() => {
        reqs.netease
            .hotSearchDetailList()
            .then((res) => {
                setHotSearchs(res.data);
            })
            .catch((e) => {
                notify("error", (e && e.message) || "获取热搜列表数据失败");
            });
    }, []);

    React.useEffect(() => {
        !keyword.length && getHotSearch();
    }, [getHotSearch, keyword.length]);

    return !keyword.length
        ? hotSearchs.map((hotSearch) => {
              return {
                  value: hotSearch.searchWord,
                  label: (
                      <div key={hotSearch.searchWord}>
                          <div>
                              <span style={{ marginRight: 10 }}>
                                  {hotSearch.searchWord}
                              </span>
                              {hotSearch.iconUrl && (
                                  <img
                                      width={20}
                                      height={20}
                                      alt="hot-search-icon"
                                      src={hotSearch.iconUrl}
                                  />
                              )}
                              <span
                                  style={{
                                      color: "grey",
                                      marginLeft: 10,
                                  }}
                              >
                                  {hotSearch.score}
                              </span>
                          </div>
                          <StyledHotSearchContent>
                              {hotSearch.content}
                          </StyledHotSearchContent>
                      </div>
                  ),
              };
          })
        : [];

    // return hotSearchs.map((hotSearch) => (
    //     <AutoComplete.Option
    //         key={hotSearch.searchWord}
    //         value={hotSearch.searchWord}
    //     >
    //         <div>
    //             <span style={{ marginRight: 10 }}>{hotSearch.searchWord}</span>
    //             {hotSearch.iconUrl && (
    //                 <img
    //                     width={20}
    //                     height={20}
    //                     alt="hot-search-icon"
    //                     src={hotSearch.iconUrl}
    //                 />
    //             )}
    //             <span
    //                 style={{
    //                     color: "grey",
    //                     marginLeft: 10,
    //                 }}
    //             >
    //                 {hotSearch.score}
    //             </span>
    //         </div>
    //         <StyledHotSearchContent>{hotSearch.content}</StyledHotSearchContent>
    //     </AutoComplete.Option>
    // ));
};

export default HotSearchComp;

const StyledHotSearchContent = styled.div`
    font-size: 13px;
    color: #b4b4b4;
`;
