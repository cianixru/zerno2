import { MigrationInterface, QueryRunner, Table } from 'typeorm';

class CreateRefreshTokensTable1648209669497 implements MigrationInterface {
    private readonly tableName = 'refresh_tokens';

    async up (queryRunner: QueryRunner): Promise <void> {
        const usersTable = new Table({
            name: this.tableName,
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                },
                {
                    name: 'user_id',
                    type: 'int',
                },
                {
                    name: 'created_at',
                    type: 'int',
                },
            ],
        });

        await queryRunner.createTable(usersTable);
    }

    async down (queryRunner: QueryRunner): Promise <void> {
        await queryRunner.dropTable(this.tableName);
    }
}

export { CreateRefreshTokensTable1648209669497 };
