import { SecretCodeModel } from '../abstract';

class SecretCodeInMemoryModel extends SecretCodeModel {
    public constructor (
        public phoneNumber: string,
        public secretCode: string,
        public expiredAt: Date,
    ) {
        super();
    }
}

export { SecretCodeInMemoryModel };
