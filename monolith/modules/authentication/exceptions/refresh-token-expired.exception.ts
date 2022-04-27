import { BaseException } from '@zern/nest';

class RefreshTokenExpiredException extends BaseException {
    public constructor () {
        super('Refresh token has expired');
    }
}

export { RefreshTokenExpiredException };
