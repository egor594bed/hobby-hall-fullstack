class OrderService {
    getStatus(status: string) {
        switch (status) {
            case 'Новый':
                return 'new'
            case 'Принят':
                return 'work'
            case 'Отменен':
                return 'cancelled'
            case 'Завершен':
                return 'done'
            default:
                break;
        }
    }
}

export default new OrderService()