import React, { ReactNode } from 'react';
import Warning from '@components/atom/icons/Warning';
import FlexBox from '@components/atom/Flexbox';
import styled from 'styled-components';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
        };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return {
            hasError: true,
            error,
        };
    }

    render(): ReactNode {
        const { hasError, error } = this.state;
        const { children } = this.props;

        return hasError ? (
            <ErrorContainer>
                <Warning size={32} />
                <h1>페이지 로드중 에러가 발생했습니다.</h1>
                <span>자세한 내역은 이하 에러코드를 참조하세요.</span>
                {error && <pre>{error.toString()}</pre>}
            </ErrorContainer>
        ) : (
            children
        );
    }
}

const ErrorContainer = styled(FlexBox)`
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
    height: 100vw;

    h1 {
        font-size: 20px;
    }

    span {
        color: ${({ theme }) => theme.black80};
    }

    pre {
        white-space: pre-wrap;
        word-break: break-word;
        margin: 10px 0;
        color: ${({ theme }) => theme.red};
        font-weight: bold;
        font-size: 12px;
    }
`;

export default ErrorBoundary;
