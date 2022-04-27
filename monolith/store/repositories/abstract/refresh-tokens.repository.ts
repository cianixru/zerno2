import { Nullable } from '@zern/types';

import { RefreshTokenEntity } from '../../entities';
import { RefreshTokenModel } from '../../models';

abstract class RefreshTokensRepository {
    public abstract createAndSave (params: RefreshTokenModel): Promise <RefreshTokenEntity>;

    public abstract getById (id: string): Promise <Nullable <RefreshTokenEntity>>;

    public abstract findByAccountId (accountId: number): Promise <RefreshTokenEntity[]>;

    public abstract delete (entity: RefreshTokenEntity): Promise <void>;

    public abstract deleteAll (entities: RefreshTokenEntity[]): Promise <void>;
}

export { RefreshTokensRepository };
