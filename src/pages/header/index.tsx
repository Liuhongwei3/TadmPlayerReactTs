import React from "react";
import { SettingOutlined } from "@ant-design/icons";
import styled, { keyframes } from "styled-components";

const hue = keyframes`
    from {
        filter: hue-rotate(0deg);
    }
    to {
        filter: hue-rotate(360deg);
    }
`;
const StyledHeader = styled.header`
    color: #ff4040;
    min-height: 50px;
    font-size: 18px;
    font-family: STXingkai;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
    position: sticky;
    z-index: 666;
    top: 0;
    background-image: linear-gradient(
        to right,
        #f26969,
        #e8ba66,
        #e6e663,
        #5fe05f,
        #6ceaea,
        #7e7eea,
        #d869d8
    );
    animation: ${hue} 10s ease-out infinite;
`;

const StyledSettingOutlined = styled(SettingOutlined)`
    position: absolute;
    z-index: 999;
    top: 15px;
    right: 5px;
    color: #fff;
`;

const ContentHeader: React.FunctionComponent = () => {
    return (
        <StyledHeader>
            Tadm-Player-React ^-^
            <StyledSettingOutlined />
        </StyledHeader>
    );
};

export default ContentHeader;
