import { BaseException } from '@zern/nest';

class RefreshTokenNotConfirmedException extends BaseException {
    public constructor () {
        super('Refresh token not confirmed');
    }
}

export { RefreshTokenNotConfirmedException };
