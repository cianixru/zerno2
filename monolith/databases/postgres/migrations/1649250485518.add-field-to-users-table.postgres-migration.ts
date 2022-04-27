import { MigrationInterface, QueryRunner, TableColumn, TableColumnOptions } from 'typeorm';

class AddFieldsToUsersTable1649250485518 implements MigrationInterface {
    private readonly tableName = 'users';

    public async up (queryRunner: QueryRunner): Promise <void> {
        const columnOptions: TableColumnOptions[] = [
            {
                name: 'name',
                type: 'varchar',
            },
            {
                name: 'patronymic',
                type: 'varchar',
                isNullable: true,
            },
            {
                name: 'surname',
                type: 'varchar',
            },
            {
                name: 'email',
                type: 'varchar',
            },
        ];

        const columns = columnOptions.map(options => new TableColumn(options));

        await queryRunner.addColumns(this.tableName, columns);
    }

    public async down (queryRunner: QueryRunner): Promise <void> {
        const columnNames = [
            'name',
            'patronymic',
            'surname',
            'email',
        ];

        await queryRunner.dropColumns(this.tableName, columnNames);
    }
}

export { AddFieldsToUsersTable1649250485518 };
