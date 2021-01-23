import styled from "styled-components";
import { IStyledProps } from "../../pages/home/type";

const StyledDesc = styled.div`
    line-height: 28px;
    position: absolute;
    bottom: 0;
    left: 0;
    padding-left: 6px;
    background: rgba(0, 0, 0, 0.4);
    border-bottom-left-radius: 14%;
    border-bottom-right-radius: 14%;

    ${(props: IStyledProps) =>
        props.width ? `width: ${props.width}px` : `width: 100%`}
`;

export default StyledDesc;
