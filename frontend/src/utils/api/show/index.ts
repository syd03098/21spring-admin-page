import axios, { AxiosResponse } from 'axios';
import { PurchaseTicketsForm, ShowSchedule } from '@utils/api/show/types';

export interface ScheduleResponseBody {
    movieName: string;
    movieGrade: string;
    showSchedule: ShowSchedule[];
}

export const getScheduleListBody = async (movieId: number): Promise<ScheduleResponseBody> => {
    const response = await axios.get(`/api/shows?movie_id=${movieId}`);
    return {
        ...response.data,
    } as ScheduleResponseBody;
};

export const requestPurchaseTickets = async (showId: number, form: PurchaseTicketsForm): Promise<AxiosResponse> => {
    return axios.post(`/api/shows/${showId}/seats`, form);
};
