import { action, autorun, makeObservable, observable } from 'mobx';
import RootStore from '@stores/RootStore';

export default class TestStore {
    rootStore: RootStore;

    @observable
    testId = 0;

    @observable
    testString = '';

    @observable
    testBoolean = false;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeObservable(this);

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
