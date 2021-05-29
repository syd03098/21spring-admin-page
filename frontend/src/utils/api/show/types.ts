export interface ShowSchedule {
    showDate: string;
    showList: Show[];
}

export interface Show {
    seatsAvailable: number;
    seatsCapacity: number;
    showId: number;
    showStartTime: string;
    showEndTime: string;
    theaterName: string;
}
