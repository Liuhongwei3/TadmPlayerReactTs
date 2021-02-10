import React from "react";
import { HashRouter as Router } from "react-router-dom";
import { ConfigProvider, BackTop, Divider, Layout } from "antd";
import { SettingOutlined, UpSquareTwoTone } from "@ant-design/icons";
import styled from "styled-components";
import enUS from "antd/lib/locale/en_US";
import zhCN from "antd/lib/locale/zh_CN";

import "./App.css";

import LeftSide from "./pages/aside";
import ContentHeader from "./pages/header";
import Footer from "./pages/footer";
import Routers from "./routers";
import { DEFAULT_BG_IMG } from "./defaultConfig";

const StyledBg = styled.div`
    width: 100%;
    height: 100%;
    z-index: 0;
    background-image: url(${DEFAULT_BG_IMG});
`;

const StyledContent = styled(Layout.Content)`
    background: rgba(0, 0, 0, 0.5);
`;

const StyledSettingOutlined = styled(SettingOutlined)`
    position: absolute;
    z-index: 999;
    top: 15px;
    right: 5px;
`;

const App: React.FunctionComponent = () => {
    const [locale, setLocale] = React.useState(zhCN);

    const changeLocale = React.useCallback(() => {
        setLocale(locale.locale === 'zh-cn' ? enUS : zhCN);
    }, [locale]);

    return (
        <Router>
            <ConfigProvider locale={locale}>
                <Layout>
                    <LeftSide />

                    <Layout style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
                        <ContentHeader />

                        <StyledBg>
                            <StyledContent>
                                <Routers />
                            </StyledContent>

                            <Divider />
                            <Footer />
                        </StyledBg>
                    </Layout>

                    <BackTop>
                        <UpSquareTwoTone style={{ fontSize: 28 }} />
                    </BackTop>
                </Layout>
            </ConfigProvider>
        </Router>
    );
};

export default App;
