import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Image } from "antd";
import {
    HomeOutlined,
    AppstoreOutlined,
    BarsOutlined,
    CloudOutlined,
    UserOutlined,
    VideoCameraOutlined,
    TrophyOutlined,
    UserSwitchOutlined,
    SearchOutlined,
} from "@ant-design/icons";
import {
    DEFAULT_ALBUM_ID,
    DEFAULT_AVATAR,
    DEFAULT_DETAIL_ID,
    DEFAULT_MV_ID,
    DEFAULT_SINGER_ID,
    DEFAULT_USER_ID,
} from "../../web-config/defaultConfig";
import { observer } from "mobx-react-lite";
import { useStore } from "../../hooks/useStore";

const LeftSide: React.FunctionComponent = observer(() => {
    const store = useStore();
    const [collapsed, setCollapsed] = React.useState<boolean>(true);

    return (
        <Layout.Sider
            style={{
                overflow: "hidden",
                height: "calc(100vh - 48px)",
                position: "sticky",
                left: 0,
                top: 0,
                transition: "all 0.3s",
            }}
            width={collapsed ? 80 : 160}
            collapsible={true}
            collapsed={collapsed}
            onCollapse={setCollapsed}
        >
            <Image width={collapsed ? 80 : 160} src={DEFAULT_AVATAR} />
            <Menu
                style={{
                    height: "100%",
                    overflowY: "scroll",
                    paddingBottom: 40,
                }}
                theme="dark"
                mode="vertical"
                selectedKeys={store.curRoute}
                defaultSelectedKeys={["home"]}
            >
                <Menu.Item key="home" icon={<HomeOutlined />}>
                    <Link to="/">首页</Link>
                </Menu.Item>
                <Menu.Item key="top" icon={<TrophyOutlined />}>
                    <Link to="/top">巅峰榜</Link>
                </Menu.Item>
                <Menu.Item key="search" icon={<SearchOutlined />}>
                    <Link to="/search">搜索</Link>
                </Menu.Item>
                <Menu.Item key="hotDetail" icon={<CloudOutlined />}>
                    <Link to="/hotDetail">热门歌单</Link>
                </Menu.Item>
                <Menu.Item key="detail" icon={<BarsOutlined />}>
                    <Link to={`/detail/${DEFAULT_DETAIL_ID}`}>歌单详情</Link>
                </Menu.Item>
                <Menu.Item key="album" icon={<AppstoreOutlined />}>
                    <Link to={`/album/${DEFAULT_ALBUM_ID}`}>专辑</Link>
                </Menu.Item>
                <Menu.Item key="singer" icon={<UserOutlined />}>
                    <Link to={`/singer/${DEFAULT_SINGER_ID}`}>歌手</Link>
                </Menu.Item>
                <Menu.Item key="user" icon={<UserSwitchOutlined />}>
                    <Link to={`/user/${DEFAULT_USER_ID}`}>用户</Link>
                </Menu.Item>
                <Menu.Item key="mv" icon={<VideoCameraOutlined />}>
                    <Link to={`/mv/${DEFAULT_MV_ID}`}>MV</Link>
                </Menu.Item>
            </Menu>
        </Layout.Sider>
    );
});

export default LeftSide;
