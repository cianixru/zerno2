import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

import { Nullable } from '@zern/types';

@Entity('accounts')
class AccountPostgresSchema {
    @PrimaryGeneratedColumn('increment')
    public id: number;

    @Column()
    public 'sign_in_id': string;

    @Column({
        type: 'int',
        nullable: true,
    })
    public 'user_id': Nullable <number>;

    @Column({
        type: 'int',
        nullable: true,
    })
    public 'company_id': Nullable <number>;
}

export { AccountPostgresSchema };
