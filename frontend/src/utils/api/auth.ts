import axios, { AxiosResponse } from 'axios';
import { LoginFormData, SignUpFormData } from '@components/molecule/forms/types';
import { UserInfo } from '@utils/api/userInfo';

export const sendLoginRequest = async (form: LoginFormData): Promise<UserInfo> => {
    const response: AxiosResponse<UserInfo> = await axios.post('/api/auth/login', form);
    return {
        ...response.data,
    } as UserInfo;
};

export const sendSignUpRequest = async (form: SignUpFormData): Promise<UserInfo> => {
    const response: AxiosResponse<UserInfo> = await axios.post('/api/auth/signup', form);
    return {
        ...response.data,
    } as UserInfo;
};

export const sendLogoutRequest = async (): Promise<number> => {
    const response: AxiosResponse = await axios.post('/api/auth/logout');
    return response.status;
};
