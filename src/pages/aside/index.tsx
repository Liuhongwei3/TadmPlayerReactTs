import React from "react";
import { Link } from "react-router-dom";
import { Menu, Image, Button } from "antd";
import {
    HomeOutlined,
    AppstoreOutlined,
    BarsOutlined,
    CloudOutlined,
    UserOutlined,
    VideoCameraOutlined,
    TrophyOutlined,
    UserSwitchOutlined,
    TeamOutlined,
    SearchOutlined,
    StarOutlined,
    HeartOutlined,
    HistoryOutlined,
} from "@ant-design/icons";
import { DEFAULT_AVATAR } from "../../web-config/defaultConfig";
import { observer } from "mobx-react-lite";
import { useStore } from "../../hooks/useStore";
import styled from "styled-components";

const LeftSide: React.FunctionComponent = observer(() => {
    const store = useStore();

    return (
        <StyledLeftSide onClick={() => store.toggleShowLyrics(false)}>
            <Image width={80} height={80} src={DEFAULT_AVATAR} />
            <Menu
                style={{
                    height: "calc(100vh - 80px)",
                    overflowY: "scroll",
                }}
                theme="dark"
                mode="inline"
                inlineCollapsed={true}
                defaultSelectedKeys={["home"]}
                selectedKeys={store.curRoute}
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
                    <Link to={`/detail/${store.curDetailId}`}>歌单详情</Link>
                </Menu.Item>
                <Menu.Item key="album" icon={<AppstoreOutlined />}>
                    <Link to={`/album/${store.curAlbumId}`}>专辑</Link>
                </Menu.Item>
                <Menu.Item key="singer" icon={<UserOutlined />}>
                    <Link to={`/singer/${store.curSingerId}`}>歌手</Link>
                </Menu.Item>
                <Menu.Item key="user" icon={<UserSwitchOutlined />}>
                    <Link to={`/user/${store.curUserId}`}>用户</Link>
                </Menu.Item>
                {store.userInfo.userId && (
                    <Menu.Item key="heartDetail" icon={<HeartOutlined />}>
                        <Link to={`/heartDetail`}>心动歌单详情</Link>
                    </Menu.Item>
                )}
                {store.userInfo.userId && (
                    <Menu.Item key="myStars" icon={<StarOutlined />}>
                        <Link to={`/myStars`}>我的收藏</Link>
                    </Menu.Item>
                )}
                {store.userInfo.userId && (
                    <Menu.Item key="events" icon={<TeamOutlined />}>
                        <Link to={`/events`}>动态</Link>
                    </Menu.Item>
                )}
                <Menu.Item key="mv" icon={<VideoCameraOutlined />}>
                    <Link to={`/mv/${store.curMvId}`}>MV</Link>
                </Menu.Item>
                <Menu.Item key="historyPlaySongs" icon={<HistoryOutlined />}>
                    <Link to={`/historyPlaySongs`}>历史听歌</Link>
                </Menu.Item>
            </Menu>
            <Button
                type="primary"
                onClick={() => console.log("click")}
                style={{ marginBottom: 16 }}
            >
                {/* {React.createElement(
                    this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined
                )} */}
                hello
            </Button>
        </StyledLeftSide>
    );
});

export default LeftSide;

const StyledLeftSide = styled.div`
    width: 80px;
    height: 100vh;
    position: fixed;
    overflow: hidden;
    left: 0;
    top: 0;
    transition: all 0.3s;
`;
