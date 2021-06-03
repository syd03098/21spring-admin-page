export function makeCustomerIdLabel(id: number): string {
    switch (id) {
        case 1:
            return '성인';
        case 2:
            return '청소년';
        case 3:
            return '노약자';
        default:
            return '';
    }
}

export function makeTicketStateLabel(id: number): string {
    switch (id) {
        case 1:
            return '진행중';
        case 2:
            return '취소가능';
        case 3:
            return '에러발생';
        case 4:
            return '취소됨';
        default:
            return '';
    }
}
