import React, { createContext, ReactNode, useCallback, useContext, useState } from 'react';
import { UserInfo } from '@utils/api/userInfo';

interface AuthContext {
    initialized: boolean;
    currentUser: UserInfo | null;
    setCurrentUser: (userInfo: UserInfo | null) => void;
}

function CreateAuthStore(): AuthContext {
    const [isInitialized, setInitialized] = useState(false);
    const [currentUser, setUser] = useState<UserInfo | null>(null);

    const setCurrentUser = useCallback((data: UserInfo | null) => {
        if (data) setUser(data);
        setInitialized(true);
    }, []);

    return {
        initialized: isInitialized,
        currentUser,
        setCurrentUser,
    };
}

export const AuthStoreContext = createContext<AuthContext | null>(null);

export const AuthStoreProvider = ({ children }: { children: ReactNode }): JSX.Element => {
    return <AuthStoreContext.Provider value={CreateAuthStore()}>{children}</AuthStoreContext.Provider>;
};

export const useAuth = (): AuthContext => {
    const store = useContext(AuthStoreContext);
    if (!store) {
        throw new Error('페이지를 구성하는데 필요한 \nauthStore를 초기화하는데 실패했습니다.');
    }
    return store;
};
