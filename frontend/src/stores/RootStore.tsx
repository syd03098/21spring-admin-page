import React, { createContext, useContext } from 'react';
import useAsyncErrorHook, { UseAsyncErrorReturnType } from '@hooks/useAsyncErrorHook';
import TestStore from '@stores/TestStore';

export default class RootStore {
    testStore: TestStore;

    useAsyncErrorHandler: UseAsyncErrorReturnType;

    constructor(useAsyncErrorHandler: UseAsyncErrorReturnType) {
        this.testStore = new TestStore(this);
        this.useAsyncErrorHandler = useAsyncErrorHandler;
    }
}

export const RootStoreContext = createContext<RootStore | null>(null);

export const RootStoreProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
    const useAsyncErrorHandler: UseAsyncErrorReturnType = useAsyncErrorHook();
    return (
        <RootStoreContext.Provider value={new RootStore(useAsyncErrorHandler)}>{children}</RootStoreContext.Provider>
    );
};

export const useRootStore = (): RootStore => {
    const store = useContext(RootStoreContext);
    if (!store) {
        throw new Error('페이지를 구성하는데 필요한 \nRootStore를 초기화하는데 실패했습니다.');
    }
    return store;
};
