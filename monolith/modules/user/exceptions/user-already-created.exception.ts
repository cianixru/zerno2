import { BaseException } from '@zern/nest';

class UserAlreadyCreatedException extends BaseException {
    public constructor (accountId: number) {
        super(`For account "${accountId}" user has already been created`);
    }
}

export { UserAlreadyCreatedException };
