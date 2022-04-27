import { Body, Controller, Param, ParseIntPipe, Post, Req } from '@nestjs/common';
import { ApiConsumes, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { Request } from 'express';
import { FormDataRequest } from 'nestjs-form-data';

import { Action, CreateUser, UploadProfilePicture } from '@zern/contract/monolith';

import { ApiAction, MapHttpExceptions } from '@zern/nest';

import { UserAlreadyCreatedException } from '../exceptions';
import { UserService } from '../services';

@Controller()
@ApiTags('User')
class UserController {
    public constructor (
        private readonly userService: UserService,
    ) {
    }

    @Post(CreateUser.path)
    @ApiAction({
        Action,
        id: Action.CREATE_USER,
        description: `
            Метод создаёт пользователя и привязывает к аккаунту
        `,
    })
    @MapHttpExceptions([
        [CreateUser.Exception.UserAlreadyCreatedHttpException, UserAlreadyCreatedException],
    ])
    @ApiCreatedResponse({
        type: CreateUser.Response,
        description: 'Пользователь успешно создан и привязан к аккаунту',
    })
    public async createUser (
        @Req()
        request: Request,

        @Body()
        body: CreateUser.Body,
    ): Promise <CreateUser.Response> {
        const account = (request.user as Record <string, unknown>);
        const { name, patronymic, surname, position, email } = body;

        const { userId } = await this.userService.createUser(account, {
            name,
            patronymic,
            surname,
            position,
            email,
        });

        return { userId };
    }

    @Post(UploadProfilePicture.path)
    @ApiAction({
        Action,
        id: Action.UPLOAD_PROFILE_PICTURE,
        description: `
            Метод создаёт пользователя и привязывает к аккаунту
        `,
    })
    @FormDataRequest()
    @ApiConsumes('multipart/form-data')
    @ApiCreatedResponse({
        type: UploadProfilePicture.Response,
        description: 'Фотография профиля успешно загружена',
    })
    public async uploadProfilePicture (
        @Req()
        request: Request,

        @Param('userId', ParseIntPipe)
        userId: number,

        @Body()
        body: UploadProfilePicture.Body,
    ): Promise <UploadProfilePicture.Response> {
        const account = (request.user as Record <string, unknown>);
        const { profilePicture } = body;

        const profilePictureUrl = await this.userService.uploadProfilePicture(account, userId, profilePicture);

        return { profilePictureUrl };
    }
}

export { UserController };
