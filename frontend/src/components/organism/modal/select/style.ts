import styled from 'styled-components';

export const StyledContentsWrap = styled.div`
    position: relative;
    padding: 0 16px;
`;

export const StyledContentsInner = styled.div`
    margin: 16px auto 0;
    max-width: 720px;
    h3 {
        letter-spacing: -1.2px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin: 8px 0;
    }
`;

export const StyledSelectShowContainer = styled.div`
    padding-top: 12px;
    padding-bottom: 48px;
    position: relative;
`;

export const StyledSelectShowGridTemplate = styled.ol`
    display: grid;
    grid-gap: 16px;
    list-style: none;
    padding: 0;
    margin: 0;
    grid-template-columns: repeat(auto-fill, minmax(128px, 1fr));
`;
