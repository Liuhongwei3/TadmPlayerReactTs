import React from "react";
import styled from "styled-components";
import { SoundOutlined } from "@ant-design/icons";
import { Col, Row, Slider, Tooltip } from "antd";
import { useStore } from "../../hooks/useStore";
import { observer } from "mobx-react-lite";

interface IProps {
    handleVolumeChange: (volume: number) => void;
}

const RightControl: React.FC<IProps> = observer((props: IProps) => {
    const store = useStore();
    const { handleVolumeChange } = props;

    return (
        <StyledRight>
            <Row justify="center">
                <Col span={3}>
                    <SoundOutlined />
                </Col>
                <Col span={16} push={2}>
                    <Slider
                        defaultValue={0.8}
                        step={0.1}
                        max={1}
                        onChange={(e: number) => handleVolumeChange(e)}
                    />
                </Col>
            </Row>

            <Row justify="center">
                <Tooltip title={store.curLyric}>
                    <StyledLyric>{store.curLyric}</StyledLyric>
                </Tooltip>
            </Row>
        </StyledRight>
    );
});

export default RightControl;

const StyledLyric = styled.div`
    color: transparent;
    background: linear-gradient(to right, #0af, #2fff39);
    -webkit-background-clip: text;
    background-clip: text;
    font-size: 15px;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const StyledRight = styled.div`
    width: 25%;

    @media screen and (max-width: 768px) {
        display: none;
    }
`;
