import { Nullable } from '@zern/types';

import { AccountModel } from '../models';

class AccountEntity {
    public constructor (
        private readonly model: AccountModel,
    ) {
    }

    public get id (): number {
        return this.model.id;
    }

    public getUserId (): Nullable <number> {
        return this.model.userId;
    }

    public getCompanyId (): Nullable <number> {
        return this.model.companyId;
    }

    public setUserId (userId: number): void {
        this.model.userId = userId;
    }

    public setCompanyId (companyId: number): void {
        this.model.companyId = companyId;
    }

    public hasUser (): boolean {
        return (this.model.userId !== null);
    }

    public hasCompany (): boolean {
        return (this.model.companyId !== null);
    }

    public static serialize (entity: AccountEntity): Readonly <AccountModel> {
        return entity.model;
    }
}

export { AccountEntity };
