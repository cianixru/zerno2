import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Nullable } from '@zern/types';

import { AccountEntity } from '../../entities';
import { AccountModel, AccountPostgresModel } from '../../models';
import { AccountPostgresSchema } from '../../schemas';

import { AccountsRepository } from '../abstract';

@Injectable()
class AccountsPostgresRepository extends AccountsRepository {
    public constructor (
        @InjectRepository(AccountPostgresSchema)
        private readonly accountRepository: Repository <AccountPostgresSchema>,
    ) {
        super();
    }

    public async save (entity: AccountEntity): Promise <void> {
        const schema = AccountsPostgresRepository.getSchema(entity);

        await this.accountRepository.save(schema);
    }

    public async getById (id: number): Promise <Nullable <AccountEntity>> {
        const schema = await this.accountRepository.findOne({
            [AccountPostgresModel.map.id]: id,
        });

        if (!schema) {
            return null;
        }

        return AccountsPostgresRepository.createEntity(schema);
    }

    public async getBySignInId (signInId: string): Promise <Nullable <AccountEntity>> {
        const schema = await this.accountRepository.findOne({
            [AccountPostgresModel.map.signInId]: signInId,
        });

        if (!schema) {
            return null;
        }

        return AccountsPostgresRepository.createEntity(schema);
    }

    public async getBySignInIdOrCreate (signInId: string): Promise <AccountEntity> {
        let schema = await this.accountRepository.findOne({
            [AccountPostgresModel.map.signInId]: signInId,
        });

        if (!schema) {
            schema = this.createSchema({ signInId });

            await this.accountRepository.save(schema);
        }

        return AccountsPostgresRepository.createEntity(schema);
    }

    private createSchema (params: Partial <AccountModel>): AccountPostgresSchema {
        const entries = (Object.entries(params) as [keyof AccountModel, unknown][]);

        const mappedEntries = entries
            .map(([key, value]) => ([AccountPostgresModel.map[key], value] as const))
            .filter(([_key, value]) => (value !== undefined));

        const creationParams = Object.fromEntries(mappedEntries);

        return this.accountRepository.create(creationParams);
    }

    private static createEntity (schema: AccountPostgresSchema): AccountEntity {
        const model = new AccountPostgresModel(schema);

        return new AccountEntity(model);
    }

    private static getSchema (entity: AccountEntity): AccountPostgresSchema {
        const model = AccountEntity.serialize(entity);

        return AccountPostgresModel.getSchema(model);
    }
}

export { AccountsPostgresRepository };
