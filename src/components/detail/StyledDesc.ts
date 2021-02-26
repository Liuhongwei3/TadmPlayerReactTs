import styled from "styled-components";
import { IStyledProps } from "../../pages/home/type";

const StyledDesc = styled.div`
    line-height: 25px;
    position: absolute;
    bottom: 0;
    left: 0;
    padding-left: 6px;
    background: rgba(0, 0, 0, 0.4);
    border-bottom-left-radius: 12%;
    border-bottom-right-radius: 12%;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;

    ${(props: IStyledProps) =>
        props.width ? `width: ${props.width}px` : `width: 100%`};

    @media screen and (max-width: 768px) {
        line-height: 20px;
    }
`;

export default StyledDesc;
