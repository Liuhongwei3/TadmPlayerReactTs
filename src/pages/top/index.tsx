import { Tabs } from "antd";
import React from "react";
import { toTop } from "../../utils";
import TopDetail from "./top-detail";
import TopMv from "./top-mv";
import TopSinger from "./top-singer";

const Top: React.FunctionComponent = () => {
    const [activeKey, setActiveKey] = React.useState<string>("top-detail");

    const onTabChange = React.useCallback((activeKey: string) => {
        setActiveKey(activeKey);
        toTop();
    }, []);

    return (
        <Tabs
            size="large"
            centered={true}
            defaultActiveKey="1"
            activeKey={activeKey}
            onChange={(activeKey) => onTabChange(activeKey)}
        >
            <Tabs.TabPane tab={`歌单排行榜`} key="top-detail">
                <TopDetail />
            </Tabs.TabPane>
            <Tabs.TabPane tab={`歌手排行榜`} key="top-singer">
                <TopSinger />
            </Tabs.TabPane>
            <Tabs.TabPane tab={`MV 排行榜`} key="top-mv">
                <TopMv />
            </Tabs.TabPane>
        </Tabs>
    );
};

export default Top;
