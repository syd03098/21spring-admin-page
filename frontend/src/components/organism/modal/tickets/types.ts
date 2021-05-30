export interface CountersResource {
    ticketsLimit: number;
    counters: CounterState[];
}

export interface CounterState {
    customerTypeId: number;
    amount: number;
    movieFee: number;
}
