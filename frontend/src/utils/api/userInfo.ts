import axios from 'axios';

export interface UserInfo {
    userid: string;
    username: string;
    email: string;
    point: number;
    isAdmin: boolean;
}

export const fetchCurrentUserInfo = async (): Promise<UserInfo> => {
    const response = await axios.get('api/auth/info');
    return {
        ...response.data,
    } as UserInfo;
};
