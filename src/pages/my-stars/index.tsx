import React from "react";
import { Typography, Tabs } from "antd";
import { toTop } from "../../utils";
import StarSingers from "./star-singers";
import StarMvs from "./star-mvs";
import StarAlbums from "./star-albums";

const MyStars: React.FunctionComponent = () => {
    const [activeKey, setActiveKey] = React.useState<string>("1");

    React.useEffect(() => {
        toTop();
    }, []);

    const onTabChange = React.useCallback((activeKey: string) => {
        setActiveKey(activeKey);
    }, []);

    return (
        <div style={{ padding: 10 }}>
            <Typography.Title level={3} style={{ color: "#d0c051" }}>
                我的收藏
            </Typography.Title>

            <Tabs
                style={{ width: "100%" }}
                activeKey={activeKey}
                defaultActiveKey="1"
                onChange={(activeKey) => onTabChange(activeKey)}
            >
                <Tabs.TabPane tab={`专辑`} key="2">
                    <StarAlbums />
                </Tabs.TabPane>
                <Tabs.TabPane tab={`歌手`} key="1">
                    <StarSingers />
                </Tabs.TabPane>
                <Tabs.TabPane tab={`MV`} key="3">
                    <StarMvs />
                </Tabs.TabPane>
                <Tabs.TabPane tab={`专栏`} key="4">
                    <div>敬请期待~</div>
                </Tabs.TabPane>
            </Tabs>
        </div>
    );
};

export default MyStars;
