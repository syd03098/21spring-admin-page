import { createContext, useContext } from 'react';

interface TicketContextState {
    count: number;
    setCount: (num: number) => void;
}

export const TicketContext = createContext<TicketContextState | null>(null);

export const useTickets = (): TicketContextState => {
    const store = useContext(TicketContext);
    if (!store) {
        throw new Error('페이지를 구성하는데 필요한 \nTicketStore를 초기화하는데 실패했습니다.');
    }
    return store;
};
