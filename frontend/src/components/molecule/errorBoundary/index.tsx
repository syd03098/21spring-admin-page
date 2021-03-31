import React, { ReactNode } from 'react';
import Warning from '@components/atom/icons/Warning';
import Sty from './index.style';

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
            <Sty.Container>
                <Warning />
                <h1>페이지 로드중 에러가 발생했습니다.</h1>
                <span>자세한 내역은 이하 에러코드를 참조하세요.</span>
                {error && <pre>{error.toString()}</pre>}
            </Sty.Container>
        ) : (
            children
        );
    }
}

export default ErrorBoundary;
