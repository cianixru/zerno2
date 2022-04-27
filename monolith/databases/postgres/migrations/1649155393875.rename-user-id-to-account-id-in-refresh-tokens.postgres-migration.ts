import { MigrationInterface, QueryRunner } from 'typeorm';

class RenameUserIdToAccountIdInRefreshTokens1649155393875 implements MigrationInterface {
    private readonly tableName = 'refresh_tokens';

    private readonly oldColumnName = 'user_id';
    private readonly newColumnName = 'account_id';

    public async up (queryRunner: QueryRunner): Promise <void> {
        await queryRunner.renameColumn(this.tableName, this.oldColumnName, this.newColumnName);
    }

    public async down (queryRunner: QueryRunner): Promise <void> {
        await queryRunner.renameColumn(this.tableName, this.newColumnName, this.oldColumnName);
    }
}

export { RenameUserIdToAccountIdInRefreshTokens1649155393875 };
