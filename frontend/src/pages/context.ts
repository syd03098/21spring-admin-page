import { createContext, useContext } from 'react';

interface AuthContextState {
    logined: boolean;
    setLogined: (val: boolean) => void;
}

export const AuthContext = createContext<AuthContextState | null>(null);

export const useAuth = (): AuthContextState => {
    const store = useContext(AuthContext);
    if (!store) {
        throw new Error('페이지를 구성하는데 필요한 \nAuthStore를 초기화하는데 실패했습니다.');
    }
    return store;
};
