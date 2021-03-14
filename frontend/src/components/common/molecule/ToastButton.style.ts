import styled from 'styled-components';

export default {
    Overlay: styled.div`
        position: fixed;
        overflow: hidden auto;
        padding: 8px;
        top: 0;
        right: 0;
    `,
    Contents: styled.div`
        display: flex;
        position: relative;
        align-items: center;
        justify-content: center;
        height: 32px;
        box-shadow: rgba(0, 0, 0, 0.18) 0 3px 8px;
        border-radius: 4px;
        background-color: ${(props) => props.theme.smoke1};

        > span {
            font-size: 14px;
            padding: 4px;
        }
    `,
};
