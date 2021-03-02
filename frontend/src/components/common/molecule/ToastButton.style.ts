import styled from 'styled-components';

export const Overlay = styled.div`
    position: fixed;
    overflow: hidden auto;
    padding: 8px;
    top: 0;
    right: 0;
`;

export const Contents = styled.div`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    height: 32px;
    background-color: white;
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.1);

    > span {
        padding: 4px;
    }
`;
