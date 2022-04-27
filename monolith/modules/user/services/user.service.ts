import { Injectable, UnauthorizedException } from '@nestjs/common';

import { MemoryStoredFile } from 'nestjs-form-data';

import { Nullable } from '@zern/types';

import { AccountEntity, AccountsRepository, UsersRepository } from '../../../store';

import { UserAlreadyCreatedException, UserNotFoundException } from '../exceptions';

type CreateUserParams = {
    name: string;
    patronymic: Nullable <string>;
    surname: string;
    position: Nullable <string>;
    email: string;
};

type CreateUserResult = {
    userId: number;
};

@Injectable()
class UserService {
    public constructor (
        private readonly accountsRepository: AccountsRepository,
        private readonly usersRepository: UsersRepository,
    ) {
    }

    public async createUser (account: Record <string, unknown>, params: CreateUserParams): Promise <CreateUserResult> {
        const accountId = (account.sub as number);
        const accountEntity = await this.accountsRepository.getById(accountId);

        if ((accountEntity === null) || accountEntity.hasUser()) {
            throw new UserAlreadyCreatedException(accountId);
        }

        const accountModel = AccountEntity.serialize(accountEntity);

        const userEntity = await this.usersRepository.createAndSave({
            phoneNumber: accountModel.signInId,
            ...params,
        });

        const userId = userEntity.id;

        accountEntity.setUserId(userId);

        await this.accountsRepository.save(accountEntity);

        return { userId };
    }

    public async uploadProfilePicture (
        account: Record <string, unknown>,
        userId: number,
        profilePicture: MemoryStoredFile,
    ): Promise <string> {
        if (userId !== account.userId) {
            throw new UnauthorizedException();
        }

        const userEntity = await this.usersRepository.getById(userId);

        if (userEntity === null) {
            throw new UserNotFoundException(userId);
        }

        const { buffer, mimetype } = profilePicture;

        const encodedProfilePicture = buffer.toString('base64');

        const profilePictureUrl = `data:${mimetype};base64,${encodedProfilePicture}`;

        userEntity.profilePictureUrl = profilePictureUrl;

        await this.usersRepository.save(userEntity);

        return profilePictureUrl;
    }
}

export { UserService };
