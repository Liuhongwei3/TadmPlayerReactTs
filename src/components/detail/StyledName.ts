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
        props.width ? `width: ${props.width}px` : `width: 100%`};

    @media screen and (max-width: 768px) {
        font-size: 13px;
        height: 36px;
        line-height: 18px;
    }
`;

export default StyledName;
