import styled from 'styled-components';

export const StyledModalContainer = styled.div`
    display: block;
    position: relative;
    width: 100%;
    height: 100%;
    background-color: white;
    overflow-y: auto;
`;

export const StyledModalInner = styled.div`
    display: block;
    position: relative;
    padding-top: 90px;
    height: 100%;
`;

export const StyledModalHeader = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    background-color: ${({ theme }) => theme.white};
    width: 100%;
    height: auto;
    padding: 0 16px;
    border-bottom: 1px solid ${({ theme }) => theme.smoke80};
    h2 {
        font-size: 22px;
        font-weight: 600;
        letter-spacing: -1.2px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin: 8px 0 12px 0;
    }
`;
