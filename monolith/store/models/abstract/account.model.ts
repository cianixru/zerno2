import { Nullable } from '@zern/types';

class AccountModel {
    public id: number;

    public signInId: string;

    public userId: Nullable <number>;

    public companyId: Nullable <number>;
}

export { AccountModel };
