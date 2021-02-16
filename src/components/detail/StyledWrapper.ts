import styled from "styled-components";

const StyledWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    font-size: 14px;
    color: #dfdfdf;
    padding: 12px;

    @media screen and (max-width: 768px) {
        font-size: 12px;
        padding: 4px;
    }
`;

export default StyledWrapper;
