import { SecretCodeModel } from '../models';

class SecretCodeEntity {
    private constructor (
        private readonly model: SecretCodeModel,
    ) {
    }

    public isEqual (secretCode: string): boolean {
        return (secretCode === this.model.secretCode);
    }

    public isExpired (): boolean {
        const currentTime = Date.now();
        const expirationTime = this.model.expiredAt.getTime();

        return (currentTime > expirationTime);
    }

    public static create (model: SecretCodeModel): SecretCodeEntity {
        return new SecretCodeEntity(model);
    }

    public static serialize (entity: SecretCodeEntity): SecretCodeModel {
        return entity.model;
    }
}

export { SecretCodeEntity };
