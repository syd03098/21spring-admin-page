import axios, { AxiosResponse } from 'axios';
import { LoginFormData, SignUpFormData } from '@components/molecule/forms/types';

export const sendLoginRequest = async (loginForm: LoginFormData): Promise<number> => {
    const response: AxiosResponse<number> = await axios.post('/api/auth/login', loginForm);
    return response.status;
};

export const sendSignUpRequest = async (signUpForm: SignUpFormData): Promise<number> => {
    const response: AxiosResponse<number> = await axios.post('/api/auth/signup', signUpForm);
    return response.status;
};

export const sendLogoutRequest = async (): Promise<number> => {
    const response: AxiosResponse = await axios.post('/api/auth/logout');
    return response.status;
};
