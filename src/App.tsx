import React from "react";
import { HashRouter as Router } from "react-router-dom";
import { ConfigProvider, BackTop, Divider, Layout } from "antd";
import { UpSquareTwoTone } from "@ant-design/icons";
import styled from "styled-components";
import enUS from "antd/lib/locale/en_US";
import zhCN from "antd/lib/locale/zh_CN";

import "./App.css";

import LeftSide from "./pages/aside";
import ContentHeader from "./pages/header";
import Footer from "./pages/footer";
import Routers from "./routers";
import { DEFAULT_BG_IMG } from "./web-config/defaultConfig";

const StyledBg = styled.div`
    width: 100%;
    height: 100%;
    z-index: 0;
    background-image: url(${DEFAULT_BG_IMG});
`;

const StyledContent = styled(Layout.Content)`
    background: rgba(0, 0, 0, 0.5);
`;

const App: React.FunctionComponent = () => {
    const [locale, setLocale] = React.useState(zhCN);

    const changeLocale = React.useCallback(() => {
        setLocale(locale.locale === "zh-cn" ? enUS : zhCN);
    }, [locale]);

    return (
        <Router>
            <ConfigProvider locale={locale}>
                <div style={{ display: "flex" }}>
                    <LeftSide />

                    <div
                        style={{
                            backgroundColor: "rgba(0, 0, 0, 0.2)",
                            width: "calc(100vw - 80px)",
                            marginLeft: 80,
                        }}
                    >
                        <ContentHeader changeLocale={changeLocale} />

                        <StyledBg>
                            <StyledContent>
                                <Routers />
                            </StyledContent>

                            <Divider />
                            <Footer />
                        </StyledBg>
                    </div>

                    <BackTop>
                        <UpSquareTwoTone style={{ fontSize: 28 }} />
                    </BackTop>
                </div>
            </ConfigProvider>
        </Router>
    );
};

export default App;
