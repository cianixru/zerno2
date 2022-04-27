import { createMappedProxy } from '@zern/common';

import { RefreshTokenPostgresSchema } from '../../schemas';

import { RefreshTokenModel } from '../abstract';

import { PropertiesMap } from './utils';

class RefreshTokenPostgresModel extends RefreshTokenModel {
    public static readonly storage = new Map <RefreshTokenModel, RefreshTokenPostgresSchema> ();

    public static readonly map: PropertiesMap <RefreshTokenModel, RefreshTokenPostgresSchema> = {
        id: 'id',
        accountId: 'account_id',
        createdAt: 'created_at',
    };

    public constructor (schema: RefreshTokenPostgresSchema) {
        super();

        const model = new RefreshTokenModel();

        const modelProxy = createMappedProxy(model, schema, RefreshTokenPostgresModel.map);

        RefreshTokenPostgresModel.storage.set(modelProxy, schema);

        return modelProxy;
    }

    public static getSchema (model: RefreshTokenModel): RefreshTokenPostgresSchema {
        const schema = RefreshTokenPostgresModel.storage.get(model);

        return (schema as RefreshTokenPostgresSchema);
    }
}

export { RefreshTokenPostgresModel };
