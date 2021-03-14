import React, { createContext } from 'react';
import useAsyncErrorHook, { UseAsyncErrorReturnType } from '@hooks/useAsyncErrorHook';
import TestStore from '@pages/main/services/stores/TestStore';

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
