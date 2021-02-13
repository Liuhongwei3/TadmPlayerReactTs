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
} from "@ant-design/icons";
import {
    DEFAULT_ALBUM_ID,
    DEFAULT_AVATAR,
    DEFAULT_DETAIL_ID,
    DEFAULT_SINGER_ID,
} from "../../defaultConfig";
import { updateCurMenu } from "../../utils";

const LeftSide: React.FunctionComponent = () => {
    const [collapsed, setCollapsed] = React.useState<boolean>(true);
    const [selectedKeys, setSelectedKeys] = React.useState<Array<string>>([
        "home",
    ]);

    const updateSelectedKeys = React.useCallback(() => {
        setSelectedKeys(updateCurMenu());
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
            <Image width={collapsed ? 80 : 160} src={DEFAULT_AVATAR} />
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
                    <Link to="/user">用户</Link>
                </Menu.Item>
                <Menu.Item key="mv" icon={<VideoCameraOutlined />}>
                    <Link to="/mv">MV</Link>
                </Menu.Item>
            </Menu>
        </Layout.Sider>
    );
};

export default LeftSide;
