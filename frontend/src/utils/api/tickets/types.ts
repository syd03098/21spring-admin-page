export interface ShowInfo {
    movieName: string;
    movieGrade: string;
    moviePosterUrl: string;
    showId: number;
    showStartTime: string;
    showEndTime: string;
    theaterId: number;
    theaterName: string;
    theaterCapacity: number;
    bookingCount: number;
}

export interface SeatFee {
    customerTypeId: number;
    movieFee: number;
}

export interface Seat {
    seatNo: number;
    seatRow: number;
    seatColumn: number;
    seatType: number;
}
