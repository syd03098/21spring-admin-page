import React from 'react';
import { observer } from 'mobx-react';
import useRootStore from '@pages/main/hooks/useRootStore';
import ToastButton from '@components/common/molecule/ToastButton';

export default observer(
    (): JSX.Element => {
        const { testStore } = useRootStore();
        const { testId } = testStore;

        return (
            <>
                <h2>메인화면 테스트</h2>
                <>{testId}</>
                <ToastButton />
                <button
                    type="button"
                    onClick={(): void => {
                        testStore.setTestId();
                    }}
                >
                    +1
                </button>
            </>
        );
    },
);
