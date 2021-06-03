import styled from 'styled-components';

export const StyledTicketCardWrap = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;

export const StyledTicketCardContents = styled.div`
    display: flex;
    border-radius: 6px;
    border: 1px solid ${({ theme }) => theme.smoke80};
    overflow: hidden;
    padding: 0 12px;
`;

export const StyledTicketCardTemplates = styled.div`
    position: relative;
    flex: 1 1 auto;
    padding: 12px 0;
    h2 {
        font-size: 18px;
        letter-spacing: -0.8px;
        margin: 12px 0;
    }
    p {
        font-size: 14px;
        font-weight: 500;
        letter-spacing: -0.8px;
    }
`;

export const StyledTicketDetailRow = styled.dl`
    font-size: 14px;
    letter-spacing: -0.6px;
    margin: 6px 0;
    padding: 0;
    dt {
        font-weight: 500;
        color: ${({ theme }) => theme.black30};
    }
    dd {
        color: ${({ theme }) => theme.black100};
    }
`;
