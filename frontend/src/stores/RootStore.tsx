import React, { createContext, ReactNode, useContext } from 'react';
import useAsyncErrorHook, { UseAsyncErrorReturnType } from '@hooks/useAsyncErrorHook';
import TestStore from '@stores/TestStore';
import AuthStore from '@stores/AuthStore';
import UiStore from '@stores/UiStore';

export default class RootStore {
    authStore: AuthStore;

    uiStore: UiStore;

    testStore: TestStore;

    useAsyncErrorHandler: UseAsyncErrorReturnType;

    constructor(useAsyncErrorHandler: UseAsyncErrorReturnType) {
        this.testStore = new TestStore(this);
        this.authStore = new AuthStore(this);
        this.uiStore = new UiStore();
        this.useAsyncErrorHandler = useAsyncErrorHandler;
    }
}

export const RootStoreContext = createContext<RootStore | null>(null);

export const RootStoreProvider = ({ children }: { children: ReactNode }): JSX.Element => {
    const useAsyncErrorHandler: UseAsyncErrorReturnType = useAsyncErrorHook();
    return (
        <RootStoreContext.Provider value={new RootStore(useAsyncErrorHandler)}>{children}</RootStoreContext.Provider>
    );
};

export const useRootStore = (): RootStore => {
    const store = useContext(RootStoreContext);
    if (!store) {
        throw new Error('페이지를 구성하는데 필요한 \\nRootStore를 초기화하는데 실패했습니다.');
    }
    return store;
};
