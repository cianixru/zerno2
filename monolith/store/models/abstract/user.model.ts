import { Nullable } from '@zern/types';

class UserModel {
    public id: number;

    public name: string;

    public patronymic: Nullable <string>;

    public surname: string;

    public position: Nullable <string>;

    public phoneNumber: string;

    public email: string;

    public profilePictureUrl: Nullable <string>;
}

export { UserModel };
