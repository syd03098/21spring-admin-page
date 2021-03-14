import styled from 'styled-components';

export default {
    Container: styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;

        > h1 {
            font-size: 24px;
        }

        > span {
            color: ${(props) => props.theme.black60};
        }

        > pre {
            white-space: pre-wrap;
            word-break: break-word;
            margin: 10px 0;
            color: ${(props) => props.theme.dangerRed};
            font-weight: bold;
            font-size: 12px;
        }
    `,
};
