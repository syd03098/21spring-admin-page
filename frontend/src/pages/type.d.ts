type LoginFormType = {
    account: string;
    password: string;
};

type Toast = {
    createdAt: number;
    message: string;
    timeout?: number;
    type: 'success' | 'error' | 'default';
};

type TokenDecoded = {
    exp: number;
    iat: number;
} & User;

type User = {
    email: string;
    userName: string;
    isAdmin: boolean;
};
