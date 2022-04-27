import { createMappedProxy } from '@zern/common';

import { UserPostgresSchema } from '../../schemas';

import { UserModel } from '../abstract';

import { PropertiesMap } from './utils';

class UserPostgresModel extends UserModel {
    public static readonly storage = new Map <UserPostgresModel, UserPostgresSchema> ();

    public static readonly map: PropertiesMap <UserModel, UserPostgresSchema> = {
        id: 'id',
        name: 'name',
        patronymic: 'patronymic',
        surname: 'surname',
        position: 'position',
        phoneNumber: 'phone_number',
        email: 'email',
        profilePictureUrl: 'profile_picture_url',
    };

    public constructor (schema: UserPostgresSchema) {
        super();

        const model = new UserModel();

        const modelProxy = createMappedProxy(model, schema, UserPostgresModel.map);

        UserPostgresModel.storage.set(modelProxy, schema);

        return modelProxy;
    }

    public static getSchema (model: UserPostgresModel): UserPostgresSchema {
        const schema = UserPostgresModel.storage.get(model);

        return (schema as UserPostgresSchema);
    }
}

export { UserPostgresModel };
