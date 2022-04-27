import { RefreshTokenModel } from '../models';

class RefreshTokenEntity {
    public constructor (
        private readonly model: RefreshTokenModel,
    ) {
    }

    public get id (): string {
        return this.model.id;
    }

    public static serialize (entity: RefreshTokenEntity): Readonly <RefreshTokenModel> {
        return entity.model;
    }
}

export { RefreshTokenEntity };
