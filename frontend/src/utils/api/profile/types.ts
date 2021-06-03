export interface UserProfile {
    userId?: string;
    username: string;
    email: string;
}

export interface TicketDetail {
    payId: number;
    payState: number;
    theaterName: string;
    movieName: string;
    showStartTime: string;
    showCount: number;
    seatsList: {
        seatRow: number;
        seatCol: number;
        customerType: number;
    }[];
    payDate: string;
    payPrice: number;
}
