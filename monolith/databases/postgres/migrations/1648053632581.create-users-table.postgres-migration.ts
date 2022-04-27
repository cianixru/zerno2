import { MigrationInterface, QueryRunner, Table } from 'typeorm';

class CreateUsersTable1648053632581 implements MigrationInterface {
    async up (queryRunner: QueryRunner): Promise <void> {
        const usersTable = new Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                },
                {
                    name: 'phone_number',
                    type: 'varchar',
                    length: '12',
                },
            ],
        });

        await queryRunner.createTable(usersTable);
    }

    async down (queryRunner: QueryRunner): Promise <void> {
        await queryRunner.dropTable('users');
    }
}

export { CreateUsersTable1648053632581 };
