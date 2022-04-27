import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

class AddFieldPositionToUsersTable1650274015467 implements MigrationInterface {
    private readonly tableName = 'users';
    private readonly columnName = 'position';

    public async up (queryRunner: QueryRunner): Promise <void> {
        const column = new TableColumn({
            name: this.columnName,
            type: 'varchar',
            isNullable: true,
        });

        await queryRunner.addColumn(this.tableName, column);
    }

    public async down (queryRunner: QueryRunner): Promise <void> {
        await queryRunner.dropColumn(this.tableName, this.columnName);
    }
}

export { AddFieldPositionToUsersTable1650274015467 };
