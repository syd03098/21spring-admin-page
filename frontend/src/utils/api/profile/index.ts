import axios, { AxiosResponse } from 'axios';
import { TicketDetail, UserProfile } from '@utils/api/profile/types';
import { ChangePasswordFormData } from '@components/molecule/forms/types';

export const fetchUserProfile = async (): Promise<UserProfile> => {
    const response = await axios.get('/api/user/profile');
    return {
        ...response.data,
    } as UserProfile;
};

export const getTickets = async (): Promise<{ canceled: TicketDetail[]; tickets: TicketDetail[] }> => {
    const response = await axios.get('/api/user/tickets');
    return {
        ...response.data,
    } as {
        canceled: TicketDetail[];
        tickets: TicketDetail[];
    };
};

export const getPoints = async (): Promise<{ point: number }> => {
    const response = await axios.get('/api/user/point');
    return {
        ...response.data,
    } as {
        point: number;
    };
};

export const requestChangePassword = async (form: ChangePasswordFormData): Promise<AxiosResponse> => {
    return axios.post('/api/user/password', form);
};

export const requestCancelTicket = async (payId: number): Promise<AxiosResponse> => {
    return axios.delete(`/api/user/tickets/${payId}`);
};
