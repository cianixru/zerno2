import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

class AddFieldProfilePictureUrlToUsersTable1649338116599 implements MigrationInterface {
    private readonly tableName = 'users';
    private readonly columnName = 'profile_picture_url';

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

export { AddFieldProfilePictureUrlToUsersTable1649338116599 };
