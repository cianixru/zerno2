import { BaseException } from '@zern/nest';

class UserNotFoundException extends BaseException {
    public constructor (userId: number) {
        super(`User "${userId}" not found`);
    }
}

export { UserNotFoundException };
