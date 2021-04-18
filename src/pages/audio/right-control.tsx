import React from "react";
import styled from "styled-components";
import { SoundOutlined } from "@ant-design/icons";
import { Slider } from "antd";

interface IProps {
    handleVolumeChange: Function;
}

const RightControl: React.FC<IProps> = (props: IProps) => {
    const { handleVolumeChange } = props;

    return (
        <StyledRight>
            <div>
                <SoundOutlined />
            </div>

            <Slider
                defaultValue={0.8}
                step={0.1}
                max={1}
                onChange={(e: number) => handleVolumeChange(e)}
            />
        </StyledRight>
    );
};

export default RightControl;

const StyledRight = styled.div`
    width: 15%;
`;
