import React, { CSSProperties, ReactNode, useEffect, useState } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

interface Props {
    type: 'warning' | 'info';
    style?: CSSProperties;
    error: string | null;
}

const ErrorBlock = ({ type, style, error }: Props): JSX.Element => {
    const [message, setMessage] = useState<ReactNode>();

    useEffect(() => {
        try {
            setMessage(<p>{error}</p>);
        } catch (_) {
            setMessage(<></>);
        }
    }, [error]);

    return (
        <>
            {error !== null && (
                <StyledErrorBlock className={classNames([type])} style={style}>
                    {message}
                </StyledErrorBlock>
            )}
        </>
    );
};

const StyledErrorBlock = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    padding: 10px 20px;
    color: ${({ theme }) => theme.white};

    p {
        margin: 0 auto;
        font-size: 14px;
        font-weight: 500;
    }

    &.warning {
        background-color: ${({ theme }) => theme.red};
    }

    &.info {
        background-color: ${({ theme }) => theme.primary100};
    }
`;

export default ErrorBlock;
