import axios, { AxiosResponse } from 'axios';
import { PurchaseTicketsForm, ShowSchedule } from '@utils/api/show/types';
import showList from '@utils/jsons/showList.json';

export interface ScheduleResponseBody {
    movieName: string;
    movieGrade: string;
    showSchedule: ShowSchedule[];
}

export const getScheduleListBody = async (movieId: number): Promise<ScheduleResponseBody> => {
    return axios
        .get(`/api/shows?movie_id=${movieId}`)
        .then((res) => res.data)
        .catch(() => showList as ScheduleResponseBody);
};

export const requestPurchaseTickets = async (showId: number, form: PurchaseTicketsForm): Promise<AxiosResponse> => {
    console.log('form:', form);
    return axios.post(`/api/shows/${showId}/seats`, form);
};
