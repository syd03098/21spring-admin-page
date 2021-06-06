import axios from 'axios';
import { Seat, SeatFee, ShowInfo } from '@utils/api/tickets/types';

export interface SeatsInfoResponseBody {
    showInfo: ShowInfo;
    seatFee: SeatFee[];
    seats: Seat[][];
}

export const getTicketingDataResponseBody = async (showId: number): Promise<SeatsInfoResponseBody> => {
    const response = await axios.get(`/api/shows/${showId}/seats`);
    return {
        ...response.data,
    } as SeatsInfoResponseBody;
};

export const getNumberOfTickets = async (): Promise<{ count: number }> => {
    const response = await axios.get('/api/user/tickets?count');
    return {
        ...response.data,
    } as {
        count: number;
    };
};
