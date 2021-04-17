import { makeObservable, observable, action, toJS } from 'mobx';
import RootStore from '@stores/RootStore';

export default class AuthStore {
    user: User;

    token: string;

    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        makeObservable(this, {
            user: observable,

            setAccessToken: action,
            logout: action,
        });
    }

    get getUser(): User | null | undefined {
        return toJS(this.user);
    }

    setAccessToken = (accessToken: string): void => {
        this.token = accessToken;
    };

    setUser = (user: User): void => {
        this.user = user;
    };

    get isAuthenticated(): boolean {
        return !!this.token;
    }

    logout = (): void => {
        this.user = null;
        this.token = null;
    };
}
