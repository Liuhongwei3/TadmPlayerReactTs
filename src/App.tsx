import React from "react";
import styled from "styled-components";
import { HashRouter as Router } from "react-router-dom";
import { Divider, Layout } from "antd";

import LeftSide from "./pages/aside";
import ContentHeader from "./pages/header";
import Footer from "./pages/footer";
import Routers from "./routers";

const StyledBg = styled.div`
    width: 100%;
    height: 100%;
    z-index: 0;
    background-image: url("http://p2.music.126.net/ek5FsopWHRxf9tQSLaRnAA==/109951165643377225.jpg");
`;

const StyledContent = styled(Layout.Content)`
    padding: 12px 24px;
    background: rgba(0, 0, 0, 0.2);
`;

const App: React.FunctionComponent = () => {
    return (
        <Router>
            <Layout>
                <LeftSide />
                <Layout style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
                    <ContentHeader />

                    <StyledBg>
                        <StyledContent>
                            <Routers />
                        </StyledContent>

                        <Divider />
                        <Footer />
                    </StyledBg>
                </Layout>
            </Layout>
        </Router>
    );
};

export default App;
