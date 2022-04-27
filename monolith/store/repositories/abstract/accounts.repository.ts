import { Nullable } from '@zern/types';

import { AccountEntity } from '../../entities';

abstract class AccountsRepository {
    public abstract save (entity: AccountEntity): Promise <void>;

    public abstract getById (id: number): Promise <Nullable <AccountEntity>>;

    public abstract getBySignInId (signInId: string): Promise <Nullable <AccountEntity>>;

    public abstract getBySignInIdOrCreate (signInId: string): Promise <AccountEntity>;
}

export { AccountsRepository };
