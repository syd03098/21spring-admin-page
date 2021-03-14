import { useCallback, useState } from 'react';

export type UseAsyncErrorReturnType = (e: Error) => void;

const useAsyncErrorHook = (): UseAsyncErrorReturnType => {
    const [_, setAsyncError] = useState();
    return useCallback(
        (e) => {
            setAsyncError(() => {
                throw e;
            });
        },
        [setAsyncError],
    );
};

export default useAsyncErrorHook;
