import { action, autorun, makeObservable, observable } from 'mobx';
import RootStore from '@stores/RootStore';

export default class TestStore {
    rootStore: RootStore;

    @observable
    testId: number;

    @observable
    testString: string;

    @observable
    testBoolean: boolean;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        makeObservable(this);

        this.testId = 0;
        this.testString = '';
        this.testBoolean = false;

        autorun(() => {
            if (this.testId >= 3) {
                this.rootStore.useAsyncErrorHandler(new Error('AsyncError: testId 3이상'));
            }
        });
    }

    @action
    setTestId = (): void => {
        this.testId += 1;
    };

    @action
    setTestString = (string: string): void => {
        this.testString = string;
    };

    @action
    setTestBoolean = (): void => {
        this.testBoolean = !this.testBoolean;
    };
}
