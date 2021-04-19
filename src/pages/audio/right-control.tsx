import React from "react";
import styled from "styled-components";
import { SoundOutlined } from "@ant-design/icons";
import { Col, Row, Slider } from "antd";

interface IProps {
    handleVolumeChange: (volume: number) => void;
}

const RightControl: React.FC<IProps> = (props: IProps) => {
    const { handleVolumeChange } = props;

    return (
        <StyledRight>
            <Row justify="start">
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
            <div>lyric</div>
        </StyledRight>
    );
};

export default RightControl;

const StyledRight = styled.div`
    width: 15%;

    @media screen and (max-width: 768px) {
        display: none;
    }
`;
