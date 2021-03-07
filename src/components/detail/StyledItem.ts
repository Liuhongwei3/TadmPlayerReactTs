import styled from "styled-components";

const StyledItem = styled.div`
    margin: 15px;
    transition: all 0.36s;
    border-radius: 6px;

    &:hover {
        color: #fff;
        cursor: pointer;
        background-color: transparent;
        box-shadow: 0 4px 12px 8px rgb(161 137 123 / 98%);
        transform: scale(1.02);
    }

    @media screen and (max-width: 768px) {
        margin: 5px;
    }
`;

export default StyledItem;
