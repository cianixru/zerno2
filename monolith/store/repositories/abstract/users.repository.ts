import { Nullable } from '@zern/types';

import { UserEntity } from '../../entities';
import { UserModel } from '../../models';

abstract class UsersRepository {
    public abstract createAndSave (params: Partial <UserModel>): Promise <UserEntity>;

    public abstract save (entity: UserEntity): Promise <void>;

    public abstract getById (id: number): Promise <Nullable <UserEntity>>;
}

export { UsersRepository };
