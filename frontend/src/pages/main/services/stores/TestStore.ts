import { action, autorun, makeObservable, observable } from 'mobx';
import RootStore from '@pages/main/services/stores/RootStore';

export default class TestStore {
    rootStore: RootStore;

    testId: number;

    testString: string;

    testBoolean: boolean;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        makeObservable(this, {
            testId: observable,
            testString: observable,
            testBoolean: observable,

            // actions
            setTestId: action,
            setTestString: action,
            setTestBoolean: action,
        });

        this.testId = 0;
        this.testString = '';
        this.testBoolean = false;

        autorun(() => {
            if (this.testId >= 3) {
                this.rootStore.useAsyncErrorHandler(new Error('AsyncError: testId 3이상'));
            }
        });
    }

    setTestId = (): void => {
        this.testId += 1;
    };

    setTestString = (string: string): void => {
        this.testString = string;
    };

    setTestBoolean = (): void => {
        this.testBoolean = !this.testBoolean;
    };
}
