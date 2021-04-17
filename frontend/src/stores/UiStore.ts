import { action, computed, makeObservable, observable } from 'mobx';
import orderBy from 'lodash-es/orderBy';

interface optionProps {
    type?: 'success' | 'error' | 'default';
    timeout?: number;
}

class UiStore {
    @observable
    toasts: Map<number, Toast> = new Map();

    @observable
    lastToastCreatedTime?: number;

    constructor() {
        makeObservable(this);
    }

    @action
    appendToast = (message: string, { type = 'default', timeout = 3000 }: optionProps = {}): void => {
        if (message) {
            const createdAt = new Date().getTime();
            this.toasts.set(createdAt, {
                createdAt,
                message,
                type,
                timeout,
            });
            this.lastToastCreatedTime = createdAt;
        }
    };

    @action
    removeToast = (id: number): void => {
        this.toasts.delete(id);
    };

    @computed
    get orderedToasts(): Toast[] {
        return orderBy(Array.from(this.toasts.values()), 'createdAt');
    }
}

export default UiStore;
