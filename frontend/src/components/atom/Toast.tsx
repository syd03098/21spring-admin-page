import React, { useEffect, useRef } from 'react';
import CloseIcon from '@components/atom/icons/Close';
import styled, { keyframes } from 'styled-components';
import Flex from '@components/atom/FlexBox';
import Confirm from '@components/atom/icons/Confirm';
import Error from '@components/atom/icons/Error';
import Info from '@components/atom/icons/Info';
import Globe from '@components/atom/Globe';

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
            <Container className={type} onClick={onclose}>
                <Flex align="center" justify="center" style={{ minWidth: '40px' }}>
                    <StyledGlobe className={type} />
                    <IconWrap>
                        {type === 'success' && <Confirm size={16} />}
                        {type === 'error' && <Error size={24} />}
                        {type === 'default' && <Info size={20} />}
                    </IconWrap>
                </Flex>
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

const Container = styled.div`
    display: flex;
    align-items: stretch;
    border-radius: 4px;
    box-shadow: ${({ theme }) => theme.smoke50} 0 0 4px 2px;
    max-height: 68px;
    min-height: 40px;
    width: 304px;
    margin-bottom: 8px;
    background-color: ${({ theme }) => theme.white};
    &.success {
        border: 1px solid ${({ theme }) => theme.green};
    }
    &.error {
        border: 1px solid ${({ theme }) => theme.red};
    }
    &.default {
        border: 1px solid ${({ theme }) => theme.primary100};
    }
`;

const Contents = styled(Flex)`
    align-items: center;
    font-size: 15px;
    font-weight: 500;
    padding: 8px 4px;
    user-select: none;
    color: ${({ theme }) => theme.black80};
    flex-grow: 1;
`;

const StyledGlobe = styled(Globe)`
    width: 24px;
    height: 24px;
    &.success {
        background-color: ${({ theme }) => theme.green};
    }
    &.error {
        background-color: ${({ theme }) => theme.red};
    }
    &.default {
        background-color: ${({ theme }) => theme.primary100};
    }
`;

const IconWrap = styled(Flex)`
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.smoke1};
    z-index: 1;
`;

const Tail = styled(Flex)`
    min-width: 32px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: ${({ theme }) => theme.black60};
`;
