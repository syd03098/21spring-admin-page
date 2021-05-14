import styled from 'styled-components';
import lighten from 'polished/lib/color/lighten';

export const StyledFieldSet = styled.fieldset`
    border: 0;
    padding: 0;
    margin: 4px 0;
`;

export const StyledHalfFieldSet = styled.fieldset`
    border: 0;
    padding: 0;
    margin: 4px 0;
    width: 48%;
`;

export const StyledLabel = styled.label`
    display: inline-block;
    margin: 8px 0;
    font-size: 14px;
    font-weight: 600;
    color: ${({ theme }) => theme.black100};
`;

export const StyledError = styled.span`
    font-size: 12px;
    font-weight: 400;
    color: ${({ theme }) => theme.red};
    margin: 0 4px;
`;

export const StyledInput = styled.input`
    width: 100%;
    background-color: ${({ theme }) => theme.smoke50};
    font-size: 14px;
    font-weight: 500;
    padding: 12px 10px;
    border-radius: 8px;
    border: 1px solid transparent;
    transition: background-color ease 0.3s, border ease 0.3s;
    letter-spacing: -0.8px;

    &:hover,
    &:focus {
        box-shadow: 0 0 0 4px ${({ theme }) => lighten(0.33, theme.pink)};
        background-color: ${({ theme }) => theme.white};
    }
    &:focus {
        border: 1px solid ${({ theme }) => lighten(0.2, theme.red)};
    }
`;

export const StyledSubmitButton = styled.input`
    width: 100%;
    background-color: ${({ theme }) => theme.pink};
    color: white;
    padding: 10px 0;
    border-radius: 8px;
    margin-top: 24px;
    font-weight: 600;
    cursor: pointer;
    letter-spacing: -0.8px;

    &:disabled {
        opacity: 0.5;
    }
`;

export const StyledBottomLink = styled.div`
    font-size: 14px;
    font-weight: 500;
    color: ${({ theme }) => theme.black80};
    text-align: center;
    letter-spacing: -0.8px;

    a {
        padding: 0 3px;
        color: ${({ theme }) => theme.primary100};
        cursor: pointer;
    }
`;
