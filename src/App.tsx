import React from "react";
import { HashRouter as Router } from "react-router-dom";
import styled from "styled-components";
import { BackTop, Divider, Layout } from "antd";
import { UpSquareTwoTone } from "@ant-design/icons";

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

const App: React.FunctionComponent = () => {
    return (
        <Router>
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
                    <UpSquareTwoTone style={{fontSize: 28}} />
                </BackTop>
            </Layout>
        </Router>
    );
};

export default App;
