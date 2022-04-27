import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

import { Nullable } from '@zern/types';

@Entity('users')
class UserPostgresSchema {
    @PrimaryGeneratedColumn('increment')
    public id: number;

    @Column()
    public name: string;

    @Column({
        type: 'varchar',
        nullable: true,
    })
    public patronymic: Nullable <string>;

    @Column()
    public surname: string;

    @Column({
        type: 'varchar',
        nullable: true,
    })
    public position: Nullable <string>;

    @Column()
    public 'phone_number': string;

    @Column()
    public email: string;

    @Column({
        type: 'varchar',
        nullable: true,
    })
    public 'profile_picture_url': Nullable <string>;
}

export { UserPostgresSchema };
