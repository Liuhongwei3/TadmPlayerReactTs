import { Tabs } from "antd";
import React from "react";
import { toTop } from "../../utils";
import TopDetail from "./top-detail";
import TopMv from "./top-mv";
import TopSinger from "./top-singer";

const Top: React.FunctionComponent = () => {
    const [activeKey, setActiveKey] = React.useState<string>("1");

    const onTabChange = React.useCallback((activeKey: string) => {
        setActiveKey(activeKey);
        toTop();
    }, []);

    return (
        <Tabs
            style={{ padding: 10 }}
            activeKey={activeKey}
            defaultActiveKey="1"
            onChange={(activeKey) => onTabChange(activeKey)}
        >
            <Tabs.TabPane tab={`歌单排行榜`} key="1">
                <TopDetail />
            </Tabs.TabPane>
            <Tabs.TabPane tab={`歌手排行榜`} key="2">
                <TopSinger />
            </Tabs.TabPane>
            <Tabs.TabPane tab={`MV 排行榜`} key="3">
                <TopMv />
            </Tabs.TabPane>
        </Tabs>
    );
};

export default Top;
