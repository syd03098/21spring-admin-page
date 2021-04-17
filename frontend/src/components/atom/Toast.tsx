import React, { useEffect, useRef } from 'react';
import CloseIcon from '@components/atom/icons/CloseIcon';
import styled, { css, keyframes } from 'styled-components';
import GlobeSynthesisIcon from '@components/molecule/GlobeSynthesisIcon';
import FlexBox from '@components/atom/FlexBox';

interface Props {
    toast: Toast;
    onclose: () => void;
}

const Toast = ({ toast, onclose }: Props): JSX.Element => {
    const { timeout: closeTime, type, message } = toast;
    const timeout = useRef<number>(0);

    useEffect(() => {
        timeout.current = window.setTimeout(onclose, closeTime);
        return (): void => window.clearTimeout(timeout.current);
    }, []);

    return (
        <Animation>
            <Container type={type} onClick={onclose}>
                <Notification>
                    <GlobeSynthesisIcon iconType={type} />
                </Notification>
                <Contents>{message}</Contents>
                <Tail>
                    <CloseIcon />
                </Tail>
            </Container>
        </Animation>
    );
};

export default Toast;

const bounce = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const Animation = styled.li`
    animation: ${bounce} 100ms ease;
    animation-delay: 100ms;
`;

const Container = styled.div<{ type: string }>`
    display: flex;
    align-items: stretch;
    border-radius: 4px;
    box-shadow: ${({ theme }) => theme.smoke100} 0 3px 8px;
    max-height: 68px;
    min-height: 40px;
    width: 304px;
    margin-bottom: 8px;
    background-color: ${({ theme }) => theme.white};
    ${({ type }) =>
        (type === 'success' &&
            css`
                border: 1px solid ${({ theme }) => theme.green}};
            `) ||
        (type === 'error' &&
            css`
                border: 1px solid ${({ theme }) => theme.red};
            `) ||
        (type === 'default' &&
            css`
                border: 1px solid ${({ theme }) => theme.primary100};
            `)}
`;

const Notification = styled(FlexBox)`
    align-items: center;
    justify-content: center;
    min-width: 40px;
`;

const Contents = styled(FlexBox)`
    align-items: center;
    font-size: 15px;
    font-weight: 500;
    padding: 8px 4px;
    user-select: none;
    color: ${({ theme }) => theme.black80};
    flex-grow: 1;
`;

const Tail = styled(FlexBox)`
    min-width: 32px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: ${({ theme }) => theme.black60};
`;
