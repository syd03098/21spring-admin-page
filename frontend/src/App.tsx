import React, { Suspense } from 'react';
import { configure } from 'mobx';
import { GlobalStyles } from '@components/global/GlobalStyles';
import ErrorBoundary from '@components/errorBoundary/index';
import { hot } from 'react-hot-loader/root';

configure({ enforceActions: 'always' });

const AdminMainPage = React.lazy(() => import('@components/index'));

const App = (): JSX.Element => {
    return (
        <>
            <GlobalStyles />
            <Suspense fallback={<div />}>
                <ErrorBoundary>
                    <AdminMainPage />
                </ErrorBoundary>
            </Suspense>
        </>
    );
};

export default hot(App);
