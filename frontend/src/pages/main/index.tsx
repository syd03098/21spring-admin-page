import React from 'react';
import { observer } from 'mobx-react';
import useRootStore from '@hooks/useRootStore';

export default observer(
    (): JSX.Element => {
        const { testStore } = useRootStore();
        const { testId } = testStore;

        return (
            <>
                <h2>메인화면 테스트</h2>
                <>{testId}</>
                <button
                    style={{ display: 'flex', border: '1px solid black', margin: '8px 0' }}
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
