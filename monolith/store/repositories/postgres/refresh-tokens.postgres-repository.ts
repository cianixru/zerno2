import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Nullable } from '@zern/types';

import { RefreshTokenEntity } from '../../entities';
import { RefreshTokenModel, RefreshTokenPostgresModel } from '../../models';
import { RefreshTokenPostgresSchema } from '../../schemas';

import { RefreshTokensRepository } from '../abstract';

@Injectable()
class RefreshTokensPostgresRepository extends RefreshTokensRepository {
    public constructor (
        @InjectRepository(RefreshTokenPostgresSchema)
        private readonly refreshTokensRepository: Repository <RefreshTokenPostgresSchema>,
    ) {
        super();
    }

    public async createAndSave (params: RefreshTokenModel): Promise <RefreshTokenEntity> {
        const schema = this.createSchema(params);

        await this.refreshTokensRepository.save(schema);

        return RefreshTokensPostgresRepository.createEntity(schema);
    }

    public async getById (id: string): Promise <Nullable <RefreshTokenEntity>> {
        const schema = await this.refreshTokensRepository.findOne({
            [RefreshTokenPostgresModel.map.id]: id,
        });

        if (!schema) {
            return null;
        }

        return RefreshTokensPostgresRepository.createEntity(schema);
    }

    public async findByAccountId (accountId: number): Promise <RefreshTokenEntity[]> {
        const schemas = await this.refreshTokensRepository.find({
            [RefreshTokenPostgresModel.map.accountId]: accountId,
        });

        return schemas.map(schema => RefreshTokensPostgresRepository.createEntity(schema));
    }

    public async delete (entity: RefreshTokenEntity): Promise <void> {
        const schema = RefreshTokensPostgresRepository.getSchema(entity);

        await this.refreshTokensRepository.remove([schema]);
    }

    public async deleteAll (entities: RefreshTokenEntity[]): Promise <void> {
        const schemas = entities.map(entity => RefreshTokensPostgresRepository.getSchema(entity));

        await this.refreshTokensRepository.remove(schemas);
    }

    private createSchema (params: Partial <RefreshTokenModel>): RefreshTokenPostgresSchema {
        const entries = (Object.entries(params) as [keyof RefreshTokenModel, unknown][]);

        const mappedEntries = entries
            .map(([key, value]) => ([RefreshTokenPostgresModel.map[key], value] as const))
            .filter(([_key, value]) => (value !== undefined));

        const creationParams = Object.fromEntries(mappedEntries);

        return this.refreshTokensRepository.create(creationParams);
    }

    private static createEntity (schema: RefreshTokenPostgresSchema): RefreshTokenEntity {
        const model = new RefreshTokenPostgresModel(schema);

        return new RefreshTokenEntity(model);
    }

    private static getSchema (entity: RefreshTokenEntity): RefreshTokenPostgresSchema {
        const model = RefreshTokenEntity.serialize(entity);

        return RefreshTokenPostgresModel.getSchema(model);
    }
}

export { RefreshTokensPostgresRepository };
