import styled from 'styled-components';

export const Wrap = styled.div`
    width: 100%;
    padding: 0 20px;
`;

export const Container = styled.div`
    max-width: 420px;
    margin: auto;

    h2 {
        margin: 60px 0 24px;
    }
`;

export const Divider = styled.hr`
    border-bottom: 1px solid ${(props) => props.theme.smoke80};
    margin: 10px 0 6px;
`;

export const FieldSet = styled.fieldset`
    padding: 0;
    margin: 0 12px 0 0;
`;

export const Label = styled.label`
    display: block;
    margin: 14px 0 4px;
    font-size: 15px;
    font-weight: bold;
    color: ${(props) => props.theme.black80};

    span {
        margin-left: 4px;
        font-size: 12px;
        font-weight: 400;
        color: ${(props) => props.theme.pink};
    }
`;

export const Input = styled.input`
    width: 100%;
    background-color: ${(props) => props.theme.smoke50};
    font-size: 14px;
    padding: 14px 10px;
    border-radius: 8px;
`;

export const SubmitButton = styled.input`
    width: 100%;
    background-color: ${(props) => props.theme.pink};
    color: white;
    padding: 10px 0;
    border-radius: 8px;
    margin-top: 20px;
    font-weight: 500;
`;

export const JoinMember = styled.div`
    font-size: 14px;
    font-weight: 500;
    color: ${(props) => props.theme.black80};
    text-align: center;
    margin: 20px 0 0 0;

    button {
        margin-left: 4px;
        color: ${(props) => props.theme.primary100};
        cursor: pointer;
    }
`;
