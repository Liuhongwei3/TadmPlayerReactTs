import React from "react";
import styled from "styled-components";
import { SoundOutlined } from "@ant-design/icons";
import { Col, Row, Slider, Tooltip } from "antd";
import { useStore } from "../../hooks/useStore";
import { observer } from "mobx-react-lite";
import { AUDIO_VOLUME } from "../enums";

interface IProps {
    volume: number;
    handleVolumeChange: (volume: number) => void;
}

const RightControl: React.FC<IProps> = observer((props: IProps) => {
    const store = useStore();
    const { volume, handleVolumeChange } = props;

    const toLocalAudioVolume = React.useCallback((v: number) => {
        if (window.localStorage) {
            window.localStorage.setItem(AUDIO_VOLUME, String(v));
        }
    }, []);

    return (
        <StyledRight>
            <Row justify="center">
                <Col span={3}>
                    <SoundOutlined />
                </Col>
                <Col span={16} push={2}>
                    <Slider
                        step={1}
                        max={100}
                        value={volume * 100}
                        onChange={(e: number) =>
                            handleVolumeChange(+(e / 100).toFixed(2))
                        }
                        onAfterChange={(v: number) =>
                            toLocalAudioVolume(+(v / 100).toFixed(2))
                        }
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
