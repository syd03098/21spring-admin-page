import axios from 'axios';
import seatsInfoJson from '@utils/jsons/seats.json';
import { Seat, SeatFee, ShowInfo } from '@utils/api/ticktes/types';

export interface SeatsInfoResponseBody {
    showInfo: ShowInfo;
    seatFee: SeatFee[];
    seats: Seat[][];
}

export const getTicketingDataResponseBody = async (showId: number): Promise<SeatsInfoResponseBody> => {
    return axios
        .get(`/api/shows/${showId}/seats`)
        .then((res) => res.data)
        .catch(() => seatsInfoJson as SeatsInfoResponseBody);
};
