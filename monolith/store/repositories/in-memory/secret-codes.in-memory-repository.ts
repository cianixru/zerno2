import { SecretCodeEntity } from '../../entities';
import { SecretCodeInMemoryModel } from '../../models';

import { CreateSecretCodeEntityParams, SecretCodesRepository } from '../abstract';

type SecretCodeInfo = {
    secretCode: string;
    expiredAt: Date;
};

class SecretCodesInMemoryRepository extends SecretCodesRepository {
    private readonly storage = new Map <string, Set <SecretCodeInfo>> ();

    public async create (params: CreateSecretCodeEntityParams): Promise <SecretCodeEntity> {
        return SecretCodeEntity.create(params);
    }

    public async save (entity: SecretCodeEntity): Promise <void> {
        const model = SecretCodeEntity.serialize(entity);

        const { phoneNumber, secretCode, expiredAt } = model;

        const secretCodes = (this.storage.get(phoneNumber) ?? new Set());

        secretCodes.add({ secretCode, expiredAt });

        this.storage.set(phoneNumber, secretCodes);
    }

    public async find (phoneNumber: string): Promise <SecretCodeEntity[]> {
        const secretCodes = (this.storage.get(phoneNumber) ?? new Set());

        const entities: SecretCodeEntity[] = [];

        for (const { secretCode, expiredAt } of secretCodes.values()) {
            const model = new SecretCodeInMemoryModel(phoneNumber, secretCode, expiredAt);

            const entity = SecretCodeEntity.create(model);

            entities.push(entity);
        }

        return entities;
    }

    public async deleteAll (phoneNumber: string): Promise <void> {
        this.storage.delete(phoneNumber);
    }
}

export { SecretCodesInMemoryRepository };
