import { MigrationInterface, QueryRunner, Table } from 'typeorm';

class CreateAccountsTable1649072356286 implements MigrationInterface {
    private readonly tableName = 'accounts';

    async up (queryRunner: QueryRunner): Promise <void> {
        const usersTable = new Table({
            name: this.tableName,
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                },
                {
                    name: 'sign_in_id',
                    type: 'varchar',
                    length: '12',
                },
                {
                    name: 'user_id',
                    type: 'int',
                    isNullable: true,
                },
                {
                    name: 'company_id',
                    type: 'int',
                    isNullable: true,
                },
            ],
        });

        await queryRunner.createTable(usersTable);
    }

    async down (queryRunner: QueryRunner): Promise <void> {
        await queryRunner.dropTable(this.tableName);
    }
}

export { CreateAccountsTable1649072356286 };
