import React from 'react';
import { observer } from 'mobx-react';
import { useRootStore } from '@stores/RootStore';

const EntranceHallPage = observer(
    (): JSX.Element => {
        const { testStore } = useRootStore();
        const { testId, setTestId } = testStore;

        return (
            <>
                <div>{testId}</div>
                <button
                    type="button"
                    onClick={(): void => {
                        setTestId();
                    }}
                >
                    +1
                </button>
            </>
        );
    },
);

export default EntranceHallPage;
