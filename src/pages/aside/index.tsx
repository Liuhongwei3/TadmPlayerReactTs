import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Image } from "antd";
import {
    HomeOutlined,
    AppstoreOutlined,
    BarChartOutlined,
    CloudOutlined,
    ShopOutlined,
    TeamOutlined,
    UserOutlined,
    VideoCameraOutlined,
    TrophyOutlined,
} from "@ant-design/icons";

const LeftSide: React.FunctionComponent = () => {
    const [collapsed, setCollapsed] = React.useState<boolean>(true);
    const [selectedKeys, setSelectedKeys] = React.useState<Array<string>>([
        "home",
    ]);

    const updateSelectedKeys = React.useCallback(() => {
        const curUrl = window.location.hash.split("#")![1].replace("/", "");
        console.log(curUrl);
        setSelectedKeys(curUrl ? [curUrl] : ["home"]);
    }, []);

    React.useEffect(updateSelectedKeys, [updateSelectedKeys]);

    return (
        <Layout.Sider
            style={{
                overflow: "auto",
                height: "100vh",
                position: "sticky",
                left: 0,
                top: 0,
            }}
            width={160}
            collapsible={true}
            collapsed={collapsed}
            onCollapse={setCollapsed}
        >
            <Image
                width={collapsed ? 80 : 160}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
            <Menu
                theme="dark"
                mode="vertical"
                selectedKeys={selectedKeys}
                defaultSelectedKeys={["home"]}
                onClick={updateSelectedKeys}
            >
                <Menu.Item key="home" icon={<HomeOutlined />}>
                    <Link to="/">首页</Link>
                </Menu.Item>
                <Menu.Item key="top" icon={<TrophyOutlined />}>
                    <Link to="/top">巅峰榜</Link>
                </Menu.Item>
                <Menu.Item key="hotDetail" icon={<CloudOutlined />}>
                    <Link to="/hotDetail">热门歌单</Link>
                </Menu.Item>
                <Menu.Item key="4" icon={<BarChartOutlined />}>
                    nav 4
                </Menu.Item>
                <Menu.Item key="6" icon={<AppstoreOutlined />}>
                    nav 6
                </Menu.Item>
                <Menu.Item key="7" icon={<TeamOutlined />}>
                    nav 7
                </Menu.Item>
                <Menu.Item key="8" icon={<ShopOutlined />}>
                    nav 8
                </Menu.Item>
            </Menu>
        </Layout.Sider>
    );
};

export default LeftSide;
