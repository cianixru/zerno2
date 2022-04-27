import { BaseException } from '@zern/nest';

class SecretCodeInvalidException extends BaseException {
    public constructor () {
        super('Secret code is invalid');
    }
}

export { SecretCodeInvalidException };
