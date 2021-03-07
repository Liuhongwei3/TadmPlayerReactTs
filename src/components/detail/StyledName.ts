import styled from "styled-components";
import { IStyledProps } from "../../pages/home/type";

const StyledName = styled.div`
    height: 40px;
    line-height: 20px;
    padding: 0 6px;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    font-size: 15px;
    margin: 5px 0;

    ${(props: IStyledProps) =>
        props.width ? `width: ${props.width}px` : `width: 100%`};

    @media screen and (max-width: 768px) {
        font-size: 13px;
        height: 36px;
        line-height: 18px;
    }
`;

export default StyledName;
