import { createMappedProxy } from '@zern/common';

import { AccountPostgresSchema } from '../../schemas';

import { AccountModel } from '../abstract';

import { PropertiesMap } from './utils';

class AccountPostgresModel extends AccountModel {
    public static readonly storage = new Map <AccountPostgresModel, AccountPostgresSchema> ();

    public static readonly map: PropertiesMap <AccountModel, AccountPostgresSchema> = {
        id: 'id',
        signInId: 'sign_in_id',
        userId: 'user_id',
        companyId: 'company_id',
    };

    public constructor (schema: AccountPostgresSchema) {
        super();

        const model = new AccountModel();

        const modelProxy = createMappedProxy(model, schema, AccountPostgresModel.map);

        AccountPostgresModel.storage.set(modelProxy, schema);

        return modelProxy;
    }

    public static getSchema (model: AccountPostgresModel): AccountPostgresSchema {
        const schema = AccountPostgresModel.storage.get(model);

        return (schema as AccountPostgresSchema);
    }
}

export { AccountPostgresModel };
