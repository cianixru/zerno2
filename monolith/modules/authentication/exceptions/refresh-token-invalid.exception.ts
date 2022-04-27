import { BaseException } from '@zern/nest';

class RefreshTokenInvalidException extends BaseException {
    public constructor () {
        super('Refresh token is invalid');
    }
}

export { RefreshTokenInvalidException };
