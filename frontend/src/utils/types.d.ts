type Toast = {
    createdAt: number;
    message: string;
    timeout?: number;
    type: 'success' | 'error' | 'default';
};
