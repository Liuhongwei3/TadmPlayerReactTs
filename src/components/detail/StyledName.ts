import styled from "styled-components";
import { IStyledProps } from "../../pages/home/type";

const StyledName = styled.div`
    height: 40px;
    line-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    font-size: 15px;
    margin-top: 5px;

    ${(props: IStyledProps) =>
        props.width ? `width: ${props.width}px` : `width: 100%`}
`;

export default StyledName;
