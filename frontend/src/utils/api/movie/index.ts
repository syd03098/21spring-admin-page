import axios, { AxiosResponse } from 'axios';

export const requestMovieResources = async (): Promise<AxiosResponse> => {
    return axios.get('/api/movies');
};
