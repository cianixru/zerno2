import { UserModel } from '../models';

class UserEntity {
    public constructor (
        private readonly model: UserModel,
    ) {
    }

    public get id (): number {
        return this.model.id;
    }

    public set name (name: string) {
        this.model.name = name;
    }

    public set patronymic (patronymic: string) {
        this.model.patronymic = patronymic;
    }

    public set surname (surname: string) {
        this.model.surname = surname;
    }

    public set email (email: string) {
        this.model.email = email;
    }

    public set profilePictureUrl (profilePictureUrl: string) {
        this.model.profilePictureUrl = profilePictureUrl;
    }

    public static serialize (entity: UserEntity): Readonly <UserModel> {
        return entity.model;
    }
}

export { UserEntity };
