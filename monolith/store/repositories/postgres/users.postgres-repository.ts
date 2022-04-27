import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { UserEntity } from '../../entities';
import { UserModel, UserPostgresModel } from '../../models';
import { UserPostgresSchema } from '../../schemas';

import { UsersRepository } from '../abstract';
import { Nullable } from '@zern/types';

@Injectable()
class UsersPostgresRepository extends UsersRepository {
    public constructor (
        @InjectRepository(UserPostgresSchema)
        private readonly usersRepository: Repository <UserPostgresSchema>,
    ) {
        super();
    }

    public async createAndSave (params: Partial <UserModel>): Promise <UserEntity> {
        const schema = this.createSchema(params);

        await this.usersRepository.save(schema);

        return UsersPostgresRepository.createEntity(schema);
    }

    public async save (entity: UserEntity): Promise <void> {
        const schema = UsersPostgresRepository.getSchema(entity);

        await this.usersRepository.save(schema);
    }

    public async getById (id: number): Promise <Nullable <UserEntity>> {
        const schema = await this.usersRepository.findOne({ id });

        if (!schema) {
            return null;
        }

        return UsersPostgresRepository.createEntity(schema);
    }

    private createSchema (params: Partial <UserModel>): UserPostgresSchema {
        const entries = (Object.entries(params) as [keyof UserModel, unknown][]);

        const mappedEntries = entries
            .map(([key, value]) => ([UserPostgresModel.map[key], value] as const))
            .filter(([_key, value]) => (value !== undefined));

        const creationParams = Object.fromEntries(mappedEntries);

        return this.usersRepository.create(creationParams);
    }

    private static createEntity (schema: UserPostgresSchema): UserEntity {
        const model = new UserPostgresModel(schema);

        return new UserEntity(model);
    }

    private static getSchema (entity: UserEntity): UserPostgresSchema {
        const model = UserEntity.serialize(entity);

        return UserPostgresModel.getSchema(model);
    }
}

export { UsersPostgresRepository };
