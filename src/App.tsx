import React from "react";
import { HashRouter as Router } from "react-router-dom";
import { ConfigProvider, BackTop, Divider, Layout } from "antd";
import { UpSquareTwoTone } from "@ant-design/icons";
import styled from "styled-components";

import "./App.css";

import LeftSide from "./pages/aside";
import ContentHeader from "./pages/header";
import Footer from "./pages/footer";
import Routers from "./routers";
import { DEFAULT_BG_IMG } from "./web-config/defaultConfig";
import { useStore } from "./hooks/useStore";
import { observer } from "mobx-react-lite";
import AudioControl from "./pages/audio";

const App: React.FunctionComponent = observer(() => {
    const store = useStore();

    return (
        <Router>
            <ConfigProvider locale={store.locale}>
                <div style={{ display: "flex" }}>
                    <LeftSide />

                    <StyledRight>
                        <ContentHeader />

                        <StyledBg>
                            <StyledContent>
                                <Routers />
                            </StyledContent>

                            <Divider />
                            <Footer />
                        </StyledBg>
                    </StyledRight>

                    <AudioControl />

                    <BackTop>
                        <UpSquareTwoTone style={{ fontSize: 32 }} />
                    </BackTop>
                </div>
            </ConfigProvider>
        </Router>
    );
});

export default App;

const StyledRight = styled.div`
    background-color: rgba(0, 0, 0, 0.2);
    width: calc(100vw - 86px);
    margin-left: 80px;
`;

const StyledBg = styled.div`
    width: 100%;
    height: 100%;
    min-height: 86vh;
    z-index: 0;
    background-image: url(${DEFAULT_BG_IMG});
`;

const StyledContent = styled(Layout.Content)`
    background: rgba(0, 0, 0, 0.5);
`;
