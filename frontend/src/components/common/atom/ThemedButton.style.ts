import styled from 'styled-components';

interface ThemedButtonProps {
    backgroundColor?: string;
    fontColor?: string;
}

export default {
    ThemedButton: styled.button<ThemedButtonProps>`
        display: flex;
        align-items: center;
        box-shadow: rgba(0, 0, 0, 0.2) 0 1px 2px;
        padding: 0 8px 0 4px;
        border: 0;
        border-radius: 4px;
        background-color: ${(props) => props.backgroundColor || props.theme.smoke10};
        color: ${(props) => props.fontColor || props.theme.white};
        font-size: 14px;
        height: 32px;
        cursor: pointer;
        margin: 3px 0;

        > span {
            padding-left: 4px;
            font-weight: 500;
        }
    `,
};
