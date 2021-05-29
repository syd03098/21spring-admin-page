import axios from 'axios';
import { ShowSchedule } from '@utils/api/show/types';
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
