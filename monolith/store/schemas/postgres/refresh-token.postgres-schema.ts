import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('refresh_tokens')
class RefreshTokenPostgresSchema {
    @PrimaryColumn()
    public id: string;

    @Column()
    public 'account_id': number;

    @Column()
    public 'created_at': number;
}

export { RefreshTokenPostgresSchema };
