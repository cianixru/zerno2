import { SecretCodeEntity } from '../../entities';
import { SecretCodeModel } from '../../models';

type CreateSecretCodeEntityParams = SecretCodeModel;

abstract class SecretCodesRepository {
    public abstract create (params: CreateSecretCodeEntityParams): Promise <SecretCodeEntity>;

    public abstract save (entity: SecretCodeEntity): Promise <void>;

    public abstract find (phoneNumber: string): Promise <SecretCodeEntity[]>;

    public abstract deleteAll (phoneNumber: string): Promise <void>;
}

export { CreateSecretCodeEntityParams, SecretCodesRepository };
