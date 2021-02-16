import styled from 'styled-components';

const StyledItem = styled.div`
    margin: 15px;

    &:hover {
        color: #fff;
        cursor: pointer;
    }

    @media screen and (max-width: 768px) {
        margin: 5px;
    }
`;

export default StyledItem;