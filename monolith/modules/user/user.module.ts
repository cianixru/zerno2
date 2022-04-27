import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NestjsFormDataModule } from 'nestjs-form-data';

import { AccountsPostgresRepository, AccountsRepository, UsersPostgresRepository, UsersRepository } from '../../store';
import { AccountPostgresSchema, UserPostgresSchema } from '../../store/schemas';

import { UserController } from './controllers';
import { UserService } from './services';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            AccountPostgresSchema,
            UserPostgresSchema,
        ]),

        NestjsFormDataModule,
    ],
    controllers: [
        UserController,
    ],
    providers: [
        UserService,

        {
            provide: AccountsRepository,
            useClass: AccountsPostgresRepository,
        },

        {
            provide: UsersRepository,
            useClass: UsersPostgresRepository,
        },
    ],
})
export class UserModule {}
