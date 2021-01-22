import React from "react";
import { Layout, Typography } from "antd";
import { HeartTwoTone } from "@ant-design/icons";
import styled, { keyframes } from "styled-components";

const heartAnimate = keyframes`
    0%,
    100% {
        transform: scale(1);
    }
    10%,
    30% {
        transform: scale(0.9);
    }
    20%,
    40%,
    60%,
    80% {
        transform: scale(1.1);
    }
    50%,
    70% {
        transform: scale(1.1);
    }
`;
const StyledHeart = styled(HeartTwoTone)`
    animation: ${heartAnimate} 1s linear infinite;
    margin: 0 5px;
`;

const Footer: React.FunctionComponent = () => {
    return (
        <Layout.Footer style={{ textAlign: "center" }}>
            <code>Welcome to Tadm-Player-React~</code>
            <div>本站不存储任何资源，相关版权均归所属版权方所有！</div>
            <div>
                <span>&copy;2021</span>
                <StyledHeart twoToneColor="#eb2f96" />
                <Typography.Link href="https://github.com/Liuhongwei3" target="_blank">
                    Tadm(jingke)
                </Typography.Link>
            </div>
        </Layout.Footer>
    );
};

export default Footer;
