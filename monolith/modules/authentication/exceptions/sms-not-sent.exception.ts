import { BaseException } from '@zern/nest';

class SmsNotSentException extends BaseException {
    public constructor () {
        super('Sms was not sent');
    }
}

export { SmsNotSentException };
