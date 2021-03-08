import React from "react";
import { SettingOutlined } from "@ant-design/icons";
import styled, { keyframes } from "styled-components";

interface IProps {
    changeLocale: () => void;
}

const ContentHeader: React.FunctionComponent<IProps> = (props: IProps) => {
    const { changeLocale } = props;

    return (
        <StyledHeader>
            Tadm-Player-React ^-^
            <StyledSettingOutlined onClick={changeLocale} />
        </StyledHeader>
    );
};

export default ContentHeader;

const hue = keyframes`
    from {
        filter: hue-rotate(0deg);
    }
    to {
        filter: hue-rotate(360deg);
    }
`;

const shine = keyframes`
	0% {
		background-position: 50% 0;
	}
	100% {
		background-position: -190% 0;
	}
`;

const StyledHeader = styled.header`
    color: #ff4040;
    min-height: 50px;
    font-size: 24px;
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

    &::after {
        content: attr(data-text);
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-image: linear-gradient(
            120deg,
            transparent 0%,
            transparent 6rem,
            white 11rem,
            transparent 11.15rem,
            transparent 15rem,
            rgba(255, 255, 255, 0.3) 20rem,
            transparent 25rem,
            transparent 27rem,
            rgba(255, 255, 255, 0.6) 32rem,
            white 33rem,
            rgba(255, 255, 255, 0.3) 33.15rem,
            transparent 38rem,
            transparent 40rem,
            rgba(255, 255, 255, 0.3) 45rem,
            transparent 50rem,
            transparent 100%
        );
        background-clip: text;
        background-size: 190% 100%;
        background-repeat: no-repeat;
        animation: ${shine} 5s infinite linear alternate;
    }

    @media screen and (max-width: 768px) {
        font-size: 18px;
    }
`;

const StyledSettingOutlined = styled(SettingOutlined)`
    position: absolute;
    z-index: 999;
    top: 15px;
    right: 5px;
    color: #fff;
`;
