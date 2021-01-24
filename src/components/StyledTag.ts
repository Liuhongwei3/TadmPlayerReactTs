import { Tag } from "antd";
import styled from "styled-components";

const StyledTag = styled(Tag)`
    margin: 6px;
    padding: 3px 6px;

    &:hover {
        cursor: pointer;
    }

    ${(props: { fontSize: number }) =>
        props.fontSize ? `font-size: ${props.fontSize}px` : ""}
`;

export default StyledTag;
