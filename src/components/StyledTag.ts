import { Tag } from "antd";
import styled from "styled-components";

const StyledTag = styled(Tag)`
    margin: 6px;
    padding: 6px 12px;

    &:hover {
        cursor: pointer;
    }

    ${(props: { fontSize?: number }) =>
        props.fontSize ? `font-size: ${props.fontSize}px` : "font-size: 14px"}
`;

export default StyledTag;
