import { BaseException } from '@zern/nest';

class AccountNotFoundException extends BaseException {
    public constructor (userId: number) {
        super(`User "${userId}" not found`);
    }
}

export { AccountNotFoundException };
