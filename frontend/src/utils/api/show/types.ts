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

export interface PurchaseTicketsForm {
    email?: string;
    password?: string;
    payType: number;
    ticketAmount: TicketAmount[];
    seatIds: number[];
}

export interface TicketAmount {
    customerTypeId: number;
    amount: number;
}
