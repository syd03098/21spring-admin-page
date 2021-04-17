import { AxiosError } from 'axios';

export const parseAxiosError = (e: AxiosError): string => {
    return e.response && e.response.data;
};
